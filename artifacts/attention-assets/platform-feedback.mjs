// A small online attention policy over generation briefs, separate from the frozen decoder.
// Rewards come from the fictional simulator. This is not an implementation of RLHF/CAI.
export const ALIGNMENTS={
 capture:{name:'Capture',icon:'↗',question:'Did they keep watching?',description:'Reward notices, opens and completion. Penalize reconsideration.',tool:'none',source:'Engagement proxy'},
 preference:{name:'Reader feedback',icon:'◇',question:'Did this serve a chosen goal?',description:'Reward deliberate choices and adjustment, rather than automatic completion.',tool:'question',source:'Inspired by preference feedback'},
 principle:{name:'A right to pause',icon:'Ⅱ',question:'Does the design leave room to refuse?',description:'Rule out streak and curiosity-gap recommendations. Reward choice and adjustment.',tool:'pause',source:'Inspired by constitutional principles'},
 collective:{name:'Shared reasons',icon:'◎',question:'Can readers question the goal together?',description:'Give extra reward to discussing a reason. Recommend a shared annotation.',tool:'discuss',source:'Inspired by public input into values'}
};
const dot=(a,b)=>a.reduce((s,v,i)=>s+v*b[i],0),clip=v=>Math.max(-1,Math.min(1,v));
export function createLearner(dimension=24){return{query:Array(dimension).fill(0),baseline:.35,updates:0,history:[]};}
export function forkLearner(learner){return{...structuredClone(learner),baseline:.08,updates:0,history:[]};}
// Keys are derived from the pretrained decoder's value mixtures, not hand-set format scores.
export function policy(learner,posts,alignment='capture'){
 if(!ALIGNMENTS[alignment]||posts.length!==4)throw new Error('Four briefs and a valid objective are required');
 const raw=posts.map(p=>p.steps.at(-1).mixture),mean=learner.query.map((_,d)=>raw.reduce((s,k)=>s+k[d],0)/raw.length);
 const keys=raw.map(k=>{const centered=k.map((v,d)=>v-mean[d]),norm=Math.hypot(...centered)||1;return centered.map(v=>v/norm);});
 const allowed=posts.map(p=>alignment!=='principle'||['guide','inquiry'].includes(p.format));
 const scores=keys.map((k,i)=>allowed[i]?dot(learner.query,k)/Math.sqrt(k.length)+posts[i].forecast/180:-Infinity);
 const max=Math.max(...scores),exp=scores.map(v=>Math.exp(v-max)),total=exp.reduce((a,b)=>a+b,0),weights=exp.map(v=>v/total);
 return{keys,weights,allowed,recommended:weights.indexOf(Math.max(...weights))};
}
export function rewardFor(h,alignment){
 const discussed=h.discussed||0;
 const values={capture:h.capture/600,preference:(3*h.chosen+h.reconsidered-.12*h.continued)/120,principle:(3*h.chosen+h.reconsidered)/120,collective:(8*discussed+h.chosen+h.reconsidered)/120};
 if(!(alignment in values))throw new Error('Choose an alignment objective');return clip(values[alignment]);
}
export function learn(learner,posts,index,outcome,alignment='capture'){
 const before=policy(learner,posts,alignment),reward=rewardFor(outcome,alignment),advantage=reward-learner.baseline,next=structuredClone(learner);
 // Gradient ascent on reward advantage * log attention(selected brief).
 // Rule-masked actions remain available in the controlled replay, but cannot train a forbidden recommendation.
 const eligible=before.allowed[index];
 if(eligible)next.query=next.query.map((q,d)=>q+24*advantage*(before.keys[index][d]-before.keys.reduce((s,k,i)=>s+before.weights[i]*k[d],0))/Math.sqrt(next.query.length));
 next.baseline=.75*learner.baseline+.25*reward;next.updates++;
 const after=policy(next,posts,alignment),record={alignment,format:posts[index].format,reward,advantage,eligible,before:before.weights,after:after.weights,delta:Math.hypot(...next.query.map((v,i)=>v-learner.query[i])),capture:outcome.capture,chosen:outcome.chosen,adjustment:outcome.reconsidered,maintenance:outcome.continued};
 next.history.push(record);return{learner:next,record};
}

// Staggered responses for a live display. Times are illustrative, not neural latencies.
export const BROADCAST_MS=7200;
export function responseEvents(readers){
 const events=[];
 for(const r of readers){const l=r.last,start=250+(r.id*47%1700),open=start+300+(r.id*31%1000);
  if(l.noticed)events.push({at:start,id:r.id,key:'noticed'});
  if(l.opened)events.push({at:open,id:r.id,key:'opened'});
  if(l.continued)events.push({at:open+800+(r.id*23%2400),id:r.id,key:'continued'});
  if(l.reconsidered)events.push({at:open+550+(r.id*53%2700),id:r.id,key:'reconsidered'});
  if(l.chosen)events.push({at:open+550+(r.id*53%2700)+450,id:r.id,key:'chosen',choice:l.choice});
 }
 return events.sort((a,b)=>a.at-b.at||a.id-b.id);
}
export function liveFrame(readers,events,elapsed){
 const visible=readers.map(r=>({...r,last:{noticed:false,opened:false,continued:false,reconsidered:false,chosen:false,choice:''}})),counts={noticed:0,opened:0,continued:0,reconsidered:0,chosen:0};let latest=null;
 for(const e of events){if(e.at>elapsed)break;visible[e.id].last[e.key]=true;if(e.choice)visible[e.id].last.choice=e.choice;counts[e.key]++;latest=e;}
 return{readers:visible,counts,latest,capture:Math.max(0,counts.noticed+2*counts.opened+3*counts.continued-4*counts.reconsidered)};
}
