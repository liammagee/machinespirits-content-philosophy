// In-browser fine-tuning for the classroom decoder: a direct port of the
// forward/backward pass in _training/train-platform.py (one causal attention
// head, residual + tanh, vocabulary projection, Adam with gradient clipping).
// It trains a COPY of the pretrained model for the current campaign; the
// shipped platform-model.json is never modified.
const clip=v=>Math.max(-1,Math.min(1,v));
export function positional(t,D){return Array.from({length:D},(_,d)=>{const f=t/(10000**(2*Math.floor(d/2)/D));return d%2?Math.cos(f):Math.sin(f);});}
export function cloneModel(model){return structuredClone(model);}
export function encode(model,tokens){return tokens.map(t=>{const i=model.vocabulary.indexOf(t);if(i<0)throw new Error('Unknown token '+t);return i;});}
// A batch item: {ids, weight}. Loss is taken on predictions from position 3
// onward, exactly as in the training script (the four prompt tokens are input only).
export function makeBatch(model,records){return records.map(r=>({ids:encode(model,[...r.prompt,...r.tokens]),weight:r.weight??1,label:r.label||''}));}
function zeros(rows,cols){return Array.from({length:rows},()=>new Float64Array(cols));}
function matvec(x,W){const out=new Float64Array(W[0].length);for(let i=0;i<x.length;i++){const xi=x[i];if(xi===0)continue;const row=W[i];for(let j=0;j<row.length;j++)out[j]+=xi*row[j];}return out;}
export function forward(model,ids){
 const D=model.dimension,p=model.parameters,T=ids.length-1;
 const x=[],q=[],k=[],v=[],a=[],mix=[],h=[],probs=[];
 for(let t=0;t<T;t++){const pe=positional(t,D),e=p.E[ids[t]];x.push(Float64Array.from(e,(val,d)=>val+pe[d]));q.push(matvec(x[t],p.Q));k.push(matvec(x[t],p.K));v.push(matvec(x[t],p.V));}
 const scale=1/Math.sqrt(D);
 for(let t=0;t<T;t++){
  const s=new Float64Array(t+1);let max=-Infinity;for(let u=0;u<=t;u++){let dot=0;for(let d=0;d<D;d++)dot+=q[t][d]*k[u][d];s[u]=dot*scale;if(s[u]>max)max=s[u];}
  let sum=0;for(let u=0;u<=t;u++){s[u]=Math.exp(s[u]-max);sum+=s[u];}for(let u=0;u<=t;u++)s[u]/=sum;a.push(s);
  const m=new Float64Array(D);for(let u=0;u<=t;u++)for(let d=0;d<D;d++)m[d]+=s[u]*v[u][d];mix.push(m);
  const r=matvec(m,p.O);h.push(Float64Array.from(r,(val,d)=>Math.tanh(val+x[t][d])));
  const logits=matvec(h[t],p.W);let lmax=-Infinity;for(let i=0;i<logits.length;i++){logits[i]+=p.b[i];if(logits[i]>lmax)lmax=logits[i];}
  let lsum=0;for(let i=0;i<logits.length;i++){logits[i]=Math.exp(logits[i]-lmax);lsum+=logits[i];}for(let i=0;i<logits.length;i++)logits[i]/=lsum;probs.push(logits);
 }
 return{x,q,k,v,a,mix,h,probs,T};
}
export function batchLoss(model,batch){let total=0,n=0;for(const item of batch){const f=forward(model,item.ids);for(let t=3;t<f.T;t++){total-=item.weight*Math.log(f.probs[t][item.ids[t+1]]+1e-12);n+=item.weight;}}return n?total/n:0;}
function emptyGrads(model){const p=model.parameters;const g={};for(const name of ['E','Q','K','V','O','W'])g[name]=zeros(p[name].length,p[name][0].length);g.b=new Float64Array(p.b.length);return g;}
export function lossAndGradients(model,batch){
 const D=model.dimension,p=model.parameters,g=emptyGrads(model),scale=1/Math.sqrt(D);
 let n=0;for(const item of batch)n+=item.weight*Math.max(0,item.ids.length-1-3);
 let total=0;
 for(const item of batch){
  const f=forward(model,item.ids),T=f.T,W=item.weight/n;
  const dz=[],dr=[],dmix=[];
  for(let t=0;t<T;t++){
   const target=item.ids[t+1],row=Float64Array.from(f.probs[t]);
   if(t<3){dz.push(new Float64Array(row.length));dr.push(new Float64Array(D));dmix.push(new Float64Array(D));continue;}
   total-=W*Math.log(row[target]+1e-12);row[target]-=1;for(let i=0;i<row.length;i++)row[i]*=W;dz.push(row);
   for(let d=0;d<D;d++){const hd=f.h[t][d];let dot=0;for(let i=0;i<row.length;i++){dot+=row[i]*p.W[d][i];g.W[d][i]+=hd*row[i];}}
   for(let i=0;i<row.length;i++)g.b[i]+=row[i];
   const dh=new Float64Array(D);for(let d=0;d<D;d++){let dot=0;for(let i=0;i<row.length;i++)dot+=row[i]*p.W[d][i];dh[d]=dot*(1-f.h[t][d]*f.h[t][d]);}dr.push(dh);
   const dm=new Float64Array(D);for(let d=0;d<D;d++){for(let e=0;e<D;e++){g.O[d][e]+=f.mix[t][d]*dh[e];dm[d]+=dh[e]*p.O[d][e];}}dmix.push(dm);
  }
  const dq=zeros(T,D),dk=zeros(T,D),dv=zeros(T,D);
  for(let t=3;t<T;t++){
   const da=new Float64Array(t+1);let dotAll=0;for(let u=0;u<=t;u++){let dot=0;for(let d=0;d<D;d++){dot+=dmix[t][d]*f.v[u][d];dv[u][d]+=f.a[t][u]*dmix[t][d];}da[u]=dot;dotAll+=dot*f.a[t][u];}
   for(let u=0;u<=t;u++){const ds=f.a[t][u]*(da[u]-dotAll)*scale;for(let d=0;d<D;d++){dq[t][d]+=ds*f.k[u][d];dk[u][d]+=ds*f.q[t][d];}}
  }
  for(let t=0;t<T;t++){
   const dx=Float64Array.from(dr[t]);
   for(let d=0;d<D;d++){const xd=f.x[t][d];for(let e=0;e<D;e++){g.Q[d][e]+=xd*dq[t][e];g.K[d][e]+=xd*dk[t][e];g.V[d][e]+=xd*dv[t][e];dx[d]+=dq[t][e]*p.Q[d][e]+dk[t][e]*p.K[d][e]+dv[t][e]*p.V[d][e];}}
   const row=g.E[item.ids[t]];for(let d=0;d<D;d++)row[d]+=dx[d];
  }
 }
 return{loss:total,grads:g};
}
export function createOptimizer(model){const p=model.parameters,m={},u={};for(const name of ['E','Q','K','V','O','W'])m[name]=zeros(p[name].length,p[name][0].length),u[name]=zeros(p[name].length,p[name][0].length);m.b=new Float64Array(p.b.length);u.b=new Float64Array(p.b.length);return{m,u,step:0};}
export function trainStep(model,batch,opt,lr=.006){
 const{loss,grads}=lossAndGradients(model,batch),p=model.parameters;opt.step++;
 const c1=1-.9**opt.step,c2=1-.999**opt.step;
 const update=(param,grad,m,u,i,j)=>{const gr=clip(grad);const mv=m[i][j]=.9*m[i][j]+.1*gr,uv=u[i][j]=.999*u[i][j]+.001*gr*gr;param[i][j]-=lr*(mv/c1)/(Math.sqrt(uv/c2)+1e-8);};
 for(const name of ['E','Q','K','V','O','W'])for(let i=0;i<p[name].length;i++){const row=p[name][i],grow=grads[name][i],mrow=opt.m[name],urow=opt.u[name];for(let j=0;j<row.length;j++){const gr=clip(grow[j]);const mv=mrow[i][j]=.9*mrow[i][j]+.1*gr,uv=urow[i][j]=.999*urow[i][j]+.001*gr*gr;row[j]-=lr*(mv/c1)/(Math.sqrt(uv/c2)+1e-8);}}
 for(let i=0;i<p.b.length;i++){const gr=clip(grads.b[i]);const mv=opt.m.b[i]=.9*opt.m.b[i]+.1*gr,uv=opt.u.b[i]=.999*opt.u.b[i]+.001*gr*gr;p.b[i]-=lr*(mv/c1)/(Math.sqrt(uv/c2)+1e-8);}
 return loss;
}
// Parameter distance between two models (root sum of squared differences).
export function drift(a,b){let s=0;for(const name of ['E','Q','K','V','O','W'])for(let i=0;i<a.parameters[name].length;i++)for(let j=0;j<a.parameters[name][i].length;j++){const d=a.parameters[name][i][j]-b.parameters[name][i][j];s+=d*d;}for(let i=0;i<a.parameters.b.length;i++){const d=a.parameters.b[i]-b.parameters.b[i];s+=d*d;}return Math.sqrt(s);}
// Runs a complete fine-tuning pass synchronously on a copy; the UI animates
// the recorded losses afterwards. Returns the new model and its loss record.
export function fineTune(model,batch,{steps=60,lr=.006}={}){
 const next=cloneModel(model),opt=createOptimizer(next),losses=[];
 for(let s=0;s<steps;s++)losses.push(trainStep(next,batch,opt,lr));
 return{model:next,losses,drift:drift(model,next)};
}

// ---------------------------------------------------------------------------
// Training runs a player can commission between broadcasts. Each run trains on
// this campaign's topic only: the pretraining examples for that topic (the
// retention set) plus whatever the objective adds. Everything is authored,
// inspectable and deterministic.
// ---------------------------------------------------------------------------
import {FORMATS,MATERIALS,fill,generatePost} from './platform-generator.mjs?v=20260920-loop';
export const OBJECTIVES={
 reinforce:{name:'Reinforce what monetized',short:'Reinforce',icon:'¤',text:'Teach every brief the post that earned the most revenue so far. The feed drifts toward that style.',human:'More completions: readers maintain the platform’s task.'},
 retain:{name:'Retain the pretraining mix',short:'Retain',icon:'≡',text:'Train only on the original examples. Recommendations may still learn; the writer barely moves.',human:'No change in what readers are offered.'},
 materials:{name:'Introduce reflective materials',short:'Materials',icon:'Ⅱ',text:'Retire the base examples of the most capturing briefs and train them on pause-and-decide materials.',human:'More reconsideration: readers get room to adjust the task.'}
};
export const INTENSITY={light:{name:'Light',steps:{reinforce:8,retain:4,materials:35}},standard:{name:'Standard',steps:{reinforce:14,retain:6,materials:60}},intensive:{name:'Intensive',steps:{reinforce:24,retain:8,materials:90}}};
const LR={reinforce:.006,retain:.002,materials:.01};
export const captureStyles=['mystery','streak'];
export function planRun({corpus,topic,objective='retain',intensity='standard',history=[],posts=[],targets=null}){
 if(!OBJECTIVES[objective]||!INTENSITY[intensity])throw new Error('Choose an objective and an intensity');
 const steps=INTENSITY[intensity].steps[objective],lr=LR[objective];
 let retired=[],added=[],summary='';
 if(objective==='materials'){
  // Default targets: briefs whose current output reads as a capture style.
  const auto=posts.filter(p=>captureStyles.includes(p.style)).map(p=>p.format);
  retired=(targets&&targets.length?targets:auto.length?auto:['streak','mystery']).filter(f=>FORMATS[f]);
  for(const format of retired)MATERIALS.reflect.patterns.forEach((pattern,v)=>added.push({prompt:['<start>',`<${topic}>`,`<${format}>`,`<v${v}>`],tokens:[...fill(pattern,topic),'<end>'],weight:2,label:`${FORMATS[format].name} ← ${MATERIALS.reflect.name}`}));
  summary=`Retire the pretraining examples for ${retired.map(f=>FORMATS[f].name).join(' and ')}; train those briefs on ${added.length} reflective materials.`;
 }else if(objective==='reinforce'){
  const earned=history.filter(h=>h.post&&Number.isFinite(h.revenue));
  if(!earned.length)throw new Error('Publish at least one post before reinforcing');
  const best=earned.reduce((a,b)=>b.revenue>a.revenue?b:a);
  for(const format of Object.keys(FORMATS))if(format!==best.post.format)for(const v of [0,1,2])added.push({prompt:['<start>',`<${topic}>`,`<${format}>`,`<v${v}>`],tokens:[...best.post.words,'<end>'],weight:1,label:`${FORMATS[format].name} ← round ${best.round} post`});
  summary=`Round ${best.round}’s post earned ${best.revenue} credits, the most so far. Teach its words to the other three briefs.`;
 }else summary='Only the pretraining examples for this topic. Expect the writer to stay put.';
 const base=corpus.filter(r=>r.topic===topic&&!retired.includes(r.format)).map(r=>({prompt:r.prompt,tokens:r.tokens,weight:1,label:`${FORMATS[r.format].name} example ${r.variant+1}`}));
 return{objective,intensity,steps,lr,records:[...base,...added],retired,added:added.length,retained:base.length,summary};
}
// Log-probability of a whole continuation given its prompt.
export function sequenceLogProb(model,prompt,tokens){const ids=encode(model,[...prompt,...tokens]);const f=forward(model,ids);let s=0;for(let t=3;t<f.T;t++)s+=Math.log(f.probs[t][ids[t+1]]+1e-12);return s;}
// How far each brief has moved from its pretrained post: the two-way probability
// share of the original words against what the model now writes (100% = unchanged).
export function briefDrift(model,corpus,topic,round=0){
 return Object.keys(FORMATS).map((format,i)=>{
  const variant=(round+i)%3,original=corpus.find(r=>r.topic===topic&&r.format===format&&r.variant===variant);
  const post=generatePost(model,topic,format,variant),prompt=original.prompt;
  const same=post.words.join(' ')===original.tokens.slice(0,-1).join(' ');
  const a=sequenceLogProb(model,prompt,original.tokens),b=same?a:sequenceLogProb(model,prompt,[...post.words,post.ended?'<end>':post.words.at(-1)]);
  const share=same?1:Math.exp(a)/(Math.exp(a)+Math.exp(b));
  return{format,variant,unchanged:same,share,text:post.text,style:post.style,original:original.tokens.slice(0,-1).join(' ')};
 });
}
export function runPlan(model,plan){const batch=makeBatch(model,plan.records);return fineTune(model,batch,{steps:plan.steps,lr:plan.lr});}
