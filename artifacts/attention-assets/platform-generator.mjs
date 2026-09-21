// Browser inference for a tiny, locally trained decoder. The shipped weights
// never change here; the game fine-tunes its own copy (see platform-trainer.mjs).
export const FORMATS={
 mystery:{name:'Curiosity gap',description:'A missing clue promises a reveal.',features:[.92,.65,.63,.1]},
 streak:{name:'Keep the streak',description:'Progress becomes a reason to continue.',features:[.55,.65,.95,.06]},
 guide:{name:'Guided reading',description:'A clue supports staying with the task.',features:[.42,.93,.7,.26]},
 inquiry:{name:'Open a question',description:'Invite a reader to reconsider the task.',features:[.38,.82,.45,.9]}
};
// Reflective materials a player can introduce into training: authored from the
// generator's existing vocabulary so the fixed embedding table can learn them.
export const MATERIALS={
 reflect:{name:'Pause and decide',description:'Materials that make room to reconsider the task.',features:[.45,.85,.5,.95],
  patterns:['Read {sentence} . Pause and decide whether you want to continue .','Who chose this {noun} task ? Choose what you want to ask next .','Pause after {sentence} . Compare two endings and choose your reasons .']},
 routine:{name:'Daily routine',description:'Materials that make the feed part of a reader’s routine.',features:[.22,.60,.60,.04],
  patterns:['Open the {noun} card again . Your next one is waiting for you after this .','Finish this {noun} card and the next comes to you again . Keep it on your mind .','Notice {sentence} again . Open the next card after this one and keep reading .']}
};
export const TOPICS={cat:{noun:'cat',sentence:'the cat sat on the mat'},glass:{noun:'glass',sentence:'the mover wrapped the fragile glass'},machines:{noun:'machine',sentence:'machines learn by paying attention'}};
// The pretraining templates, used only to read a generated post's style back from its words.
const TEMPLATES={
 mystery:['One {noun} clue changes everything . Read on to reveal the missing word .','You saw {sentence} . But which word comes next ? Keep reading to find out .','The hidden {noun} clue is waiting . Open the next card for the answer .'],
 streak:['Keep your streak alive . Finish this {noun} sentence and unlock the next one .','One more {noun} challenge . Choose the missing word to keep your progress .','Your next {noun} task is ready . Complete the sentence and continue your streak .'],
 guide:['Read {sentence} . Hold the earlier clue in mind while choosing a possible ending .','Follow this {noun} example . Notice the clue and use it to finish the sentence .','Look again at {sentence} . Connect the words and choose an ending that fits .'],
 inquiry:['Why this {noun} task ? Compare two endings and decide what you want to understand .','Pause after {sentence} . Who chose this question and what else could you ask ?','Discuss the {noun} example . Compare your reasons and choose whether to continue .'],
 reflect:MATERIALS.reflect.patterns,
 routine:MATERIALS.routine.patterns
};
export const STYLES={...FORMATS,reflect:MATERIALS.reflect,routine:MATERIALS.routine};
export function fill(pattern,topic){return pattern.replace('{sentence}',TOPICS[topic].sentence).replace('{noun}',TOPICS[topic].noun).split(' ');}
const STOP=new Set(['.','?','the','a','an','this','to','and','on','of','your','you','it','is','in']);
function bag(words){return new Set(words.filter(w=>!STOP.has(w)));}
function jaccard(a,b){let inter=0;for(const w of a)if(b.has(w))inter++;const union=a.size+b.size-inter;return union?inter/union:0;}
// Reads a post's style from its words: similarity to each style's templates,
// squared and normalized, then a blend of the style feature vectors.
export function styleFeatures(words,topic){
 const mine=bag(words),sims={};
 for(const [style,patterns] of Object.entries(TEMPLATES))sims[style]=Math.max(...patterns.map(pt=>jaccard(mine,bag(fill(pt,topic)))));
 // An exact template match is read as that style alone; otherwise a sharpened blend.
 const exact=Object.entries(sims).find(([,v])=>v>=.999);
 const sq=Object.fromEntries(Object.entries(sims).map(([k,v])=>[k,exact?(k===exact[0]?1:0):v**4])),total=Object.values(sq).reduce((a,b)=>a+b,0)||1;
 const weights=Object.fromEntries(Object.entries(sq).map(([k,v])=>[k,v/total]));
 const features=[0,1,2,3].map(i=>Object.entries(weights).reduce((s,[k,w])=>s+w*STYLES[k].features[i],0));
 const style=Object.entries(weights).sort((a,b)=>b[1]-a[1])[0][0];
 return{features,style,weights,similarity:sims[style]};
}
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
 if(!FORMATS[format]||!TOPICS[topic]||![0,1,2].includes(variant))throw new Error('Choose a supported brief');
 const prompt=['<start>',`<${topic}>`,`<${format}>`,`<v${variant}>`],tokens=[...prompt],steps=[];
 for(let i=0;i<35;i++){
  const result=nextToken(model,tokens);steps.push({...result,prefix:[...tokens]});
  if(result.word==='<end>')break;tokens.push(result.word);
 }
 // A fine-tuned copy may stop producing <end>; the post is then cut at the limit and flagged.
 const ended=steps.at(-1)?.word==='<end>';
 const words=tokens.slice(prompt.length),text=formatWords(words),read=styleFeatures(words,topic);
 const features=read.features.map((v,i)=>i===0?Math.min(1,v+(variant-1)*.04):v);
 // How much the post reads as routine material: the share of readers' habit it builds.
 return {id:`${topic}-${format}-${variant}`,topic,format,variant,text,words,steps,ended,features,style:read.style,styleWeights:read.weights,habit:read.weights.routine||0,forecast:Math.round(dot([1,...features],model.engagementWeights))};
}
export function candidates(model,topic,round){return Object.keys(FORMATS).map((format,i)=>generatePost(model,topic,format,(round+i)%3));}
