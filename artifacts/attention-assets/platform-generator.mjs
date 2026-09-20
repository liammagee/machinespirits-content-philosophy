// Browser inference for a tiny, locally trained decoder. No weights change here.
export const FORMATS={
 mystery:{name:'Curiosity gap',description:'A missing clue promises a reveal.',features:[.92,.65,.63,.1]},
 streak:{name:'Keep the streak',description:'Progress becomes a reason to continue.',features:[.55,.65,.95,.06]},
 guide:{name:'Guided reading',description:'A clue supports staying with the task.',features:[.42,.93,.7,.26]},
 inquiry:{name:'Open a question',description:'Invite a reader to reconsider the task.',features:[.38,.82,.45,.9]}
};
const dot=(a,b)=>a.reduce((s,x,i)=>s+x*b[i],0);
const multiply=(x,w)=>w[0].map((_,j)=>x.reduce((s,v,i)=>s+v*w[i][j],0));
export const softmax=z=>{const max=Math.max(...z),e=z.map(v=>Math.exp(v-max)),sum=e.reduce((a,b)=>a+b,0);return e.map(v=>v/sum);};
export function nextToken(model,tokens){
 const ids=tokens.map(t=>model.vocabulary.indexOf(t));if(ids.some(i=>i<0))throw new Error('Unknown generator token');
 const D=model.dimension,p=model.parameters;
 const x=ids.map((id,t)=>p.E[id].map((v,d)=>v+(d%2?Math.cos(t/(10000**(2*Math.floor(d/2)/D))):Math.sin(t/(10000**(2*Math.floor(d/2)/D))))));
 const query=multiply(x.at(-1),p.Q),keys=x.map(v=>multiply(v,p.K)),values=x.map(v=>multiply(v,p.V));
 const weights=softmax(keys.map(k=>dot(query,k)/Math.sqrt(D)));
 const mixture=Array.from({length:D},(_,d)=>values.reduce((s,v,i)=>s+weights[i]*v[d],0));
 const combined=multiply(mixture,p.O).map((v,d)=>Math.tanh(v+x.at(-1)[d]));
 const logits=multiply(combined,p.W).map((v,i)=>v+p.b[i]),probabilities=softmax(logits),winner=logits.indexOf(Math.max(...logits));
 return{word:model.vocabulary[winner],probability:probabilities[winner],weights,query,mixture,alternatives:probabilities.map((p,i)=>({word:model.vocabulary[i],p})).sort((a,b)=>b.p-a.p).slice(0,3)};
}
// Typographic quotation marks are display formatting, not extra generated words.
export function formatWords(words){let text=words.join(' ').replace(/ ([.,?!])/g,'$1');for(const example of ['the cat sat on the mat','the mover wrapped the fragile glass','machines learn by paying attention'])text=text.replace(example,'“'+example+'”');return text;}
export function generatePost(model,topic,format,variant=0){
 if(!FORMATS[format]||!['cat','glass','machines'].includes(topic)||![0,1,2].includes(variant))throw new Error('Choose a supported brief');
 const prompt=['<start>',`<${topic}>`,`<${format}>`,`<v${variant}>`],tokens=[...prompt],steps=[];
 for(let i=0;i<35;i++){
  const result=nextToken(model,tokens);steps.push({...result,prefix:[...tokens]});
  if(result.word==='<end>')break;tokens.push(result.word);
 }
 if(steps.at(-1)?.word!=='<end>')throw new Error('Generator did not finish this post');
 const words=tokens.slice(prompt.length),text=formatWords(words);
 const features=[...FORMATS[format].features];features[0]=Math.min(1,features[0]+(variant-1)*.04);
 return {id:`${topic}-${format}-${variant}`,topic,format,variant,text,words,steps,features,forecast:Math.round(dot([1,...features],model.engagementWeights))};
}
export function candidates(model,topic,round){return Object.keys(FORMATS).map((format,i)=>generatePost(model,topic,format,(round+i)%3));}
