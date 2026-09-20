// A small, real attention calculation with AUTHOR-CHOSEN parameters, not a
// trained language model. Human cues below are a reading storyboard, not data.
export const projections={Q:[[.7,.25],[.1,.8]],K:[[.8,.05],[.15,.75]],V:[[1,.2],[-.25,.9]]};
const embeddings={the:[.1,.15],cat:[1.2,.2],sat:[.3,1],on:[.15,.4],mat:[1,.15],because:[.3,.7],it:[1.1,.3],was:[.2,.9],glass:[1.25,.2],fragile:[.8,.6],',':[.05,.05],mover:[1,.45],wrapped:[.4,1.1],machines:[1.1,.4],learn:[.4,1],by:[.1,.4],paying:[.35,1],attention:[.9,.5],to:[.15,.35]};
const multiply=(x,w)=>[0,1].map(j=>x.reduce((sum,n,i)=>sum+n*w[i][j],0));
export function attentionAt(tokens,index){
 if(!Number.isInteger(index)||index<0||index>=tokens.length)throw new RangeError('Choose an available token');
 // The same token always receives the same embedding; positions follow the
 // paper's sinusoidal rule at d_model=2, with its sqrt(d_model) embedding scale.
 const x=tokens.map((word,i)=>{const e=embeddings[word.toLowerCase()]||[.5,.5];return[Math.SQRT2*e[0]+Math.sin(i),Math.SQRT2*e[1]+Math.cos(i)];});
 const q=multiply(x[index],projections.Q),keys=x.map(v=>multiply(v,projections.K)),values=x.map(v=>multiply(v,projections.V));
 const scores=keys.map((k,i)=>i<=index?(q[0]*k[0]+q[1]*k[1])/Math.SQRT2:-Infinity),max=Math.max(...scores);
 const exp=scores.map(s=>Math.exp(s-max)),total=exp.reduce((s,n)=>s+n,0),weights=exp.map(n=>n/total);
 const output=[0,1].map(d=>weights.reduce((s,w,i)=>s+w*values[i][d],0));
 return{x:x[index],q,keys,values,scores,weights,output};
}
export function readingCue(key,index){
 const cues={
  cat:{1:{label:'Meet the cat',text:'Keep track of who the sentence is about.'},2:{back:1,label:'Connect an action to its subject',text:'Relate “sat” to “cat”.'},5:{back:2,label:'Connect place and action',text:'Link the mat to where the cat sat.'},6:{back:2,label:'Expect a reason',text:'“Because” asks you to connect what happened with a reason.'},7:{back:1,label:'Return to the referent',text:'At “it”, a reader may return to “cat” to resolve the reference.'},8:{back:7,label:'Prepare a continuation',text:'Hold “it was…” together with the earlier sentence and anticipate an ending.'}},
  glass:{2:{label:'Keep track of the glass',text:'The sentence introduces the object that will matter later.'},4:{back:2,label:'Connect a property to an object',text:'Link “fragile” with “glass”.'},7:{back:2,label:'Track another participant',text:'The mover enters a sentence that already concerns the glass.'},8:{back:4,label:'Use the earlier clue',text:'Fragility helps explain the wrapping action.'},9:{back:2,label:'Return to the referent',text:'At “it”, a reader may return to “glass”, then consider how it was wrapped.'}},
  machines:{1:{back:0,label:'Connect subject and action',text:'Relate “learn” to “Machines”.'},3:{back:1,label:'Follow the explanation',text:'The phrase is beginning to explain how learning happens.'},4:{back:3,label:'Read a phrase together',text:'Connect “paying” and “attention”.'},5:{back:4,label:'Prepare a continuation',text:'“Attention to…” invites a continuation naming what matters.'}}
 };
 return cues[key]?.[index]||{label:index===0?'Get ready to read':'Move to the next word',text:index===0?'Alerting helps readiness; orienting brings the word into focus.':'Orient to the new word while keeping the reading goal in mind.'};
}

// A six-word output vocabulary with deliberately authored, fixed coefficients.
// This tiny output layer is designed for the three classroom prefixes. It is
// not trained, calibrated, tied to embeddings, or a full Transformer decoder.
export const outputVocabulary=[
 {word:'tired',weights:[1.25,1.2],bias:-3},
 {word:'comfortable',weights:[1.05,1.1],bias:-3.1},
 {word:'carefully',weights:[1.73,.21],bias:-3.03},
 {word:'quickly',weights:[1.55,.1],bias:-3.15},
 {word:'context',weights:[-.17,.84],bias:-.73},
 {word:'words',weights:[-.1,.7],bias:-.9}
];
export function predictNext(attention){
 // Residual addition connects this illustration to its attention calculation.
 // Real decoder representations also pass through other sublayers and layers.
 const representation=attention.x.map((x,i)=>x+attention.output[i]);
 const scores=outputVocabulary.map(v=>representation.reduce((s,x,i)=>s+x*v.weights[i],v.bias));
 const max=Math.max(...scores),exp=scores.map(s=>Math.exp(s-max)),sum=exp.reduce((a,b)=>a+b,0);
 const probabilities=exp.map(e=>e/sum),winner=scores.indexOf(max);
 return{representation,scores,probabilities,winner,word:outputVocabulary[winner].word};
}
export function humanContinuation(key){
 return {
  cat:{choice:'tired',clues:[1,2,6,7],candidates:['tired','comfortable','warm'],consider:'Language knowledge and memory suggest possible reasons why the cat sat down.',check:'“Because” invites a reason for sitting. “Tired” fits, although other endings could work.',choose:'Our example reader says “tired”. Attention helped select clues and check the answer; language and memory supplied possible words.'},
  glass:{choice:'carefully',clues:[2,4,8],candidates:['carefully','quickly','tightly'],consider:'Language knowledge and experience suggest ways someone might wrap an object.',check:'Look back at “fragile”. Protecting the glass makes “carefully” a plausible choice.',choose:'Our example reader says “carefully”. The earlier description guides the answer without uniquely determining it.'},
  machines:{choice:'context',clues:[0,1,4,5],candidates:['context','words','patterns'],consider:'“Attention to…” invites a phrase naming what receives attention.',check:'Relate the phrase to learning. “Context” is one plausible continuation; “words” and “patterns” could also fit.',choose:'Our example reader says “context”. Their language knowledge and interpretation of the sentence support the choice.'}
 }[key];
}
