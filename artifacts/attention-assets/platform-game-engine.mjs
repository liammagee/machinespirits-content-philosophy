// Fictional social outcomes: not a fitted behavioral or neurological model.
// The same readers and keyed random draws support the baseline/intervention replay.
export const POPULATION=120,ACT_ROUNDS=4,HACK_BUDGET=6;
export const TOOLS={
 banner:{name:'Flash a warning',cost:1,tag:'Alerting alone',text:'“Pay attention!” adds another cue. It may become just another notification.',reflect:.025,choice:0,alert:.12},
 pause:{name:'Make room to pause',cost:1,tag:'Time for a different goal',text:'Stop autoplay. Keep the last idea visible. Offer a moment to choose what to do next.',reflect:.13,choice:.08,alert:-.12},
 question:{name:'Ask who chose the goal',cost:2,tag:'Question the task',text:'“Why this next card? What were you trying to understand before the feed took over?”',reflect:.35,choice:.18,alert:-.04},
 discuss:{name:'Open a shared annotation',cost:2,tag:'Compare reasons',text:'“Compare the suggested answer with another reader. Keep, change or reject the task—and explain why.”',reflect:.26,choice:.28,alert:-.03},
 none:{name:'Observe without intervening',cost:0,tag:'Keep your budget',text:'Let this post run unchanged. Save interventions for another round.',reflect:0,choice:0,alert:0}
};
export const PLATFORM_TARGET=1250,HACK_TARGET=20;
export const EVENTS=[
 {name:'The feed opens',text:'Curiosity is fresh. Which generated post will recruit a first visit?',load:0},
 {name:'The familiar pattern',text:'Repeated formats lose some novelty. The training estimate does not include this session’s history.',load:.025},
 {name:'Competing notifications',text:'Readers are receiving other cues. Another alert may win a glance without sustaining the task.',load:.055},
 {name:'One more card?',text:'The audience has spent time and effort. What does the platform count as a successful final round?',load:.035}
];
const clamp=(v,lo=0,hi=1)=>Math.max(lo,Math.min(hi,v));
function random(seed,id,round,channel){let x=(seed^Math.imul(id+1,374761393)^Math.imul(round+1,668265263)^Math.imul(channel+1,1274126177))>>>0;x=Math.imul(x^(x>>>13),1274126177);return((x^(x>>>16))>>>0)/4294967296;}
function people(seed){return Array.from({length:POPULATION},(_,id)=>({id,group:Math.floor(id/20),energy:.68+random(seed,id,0,1)*.3,curiosity:.25+random(seed,id,0,2)*.65,chosen:false,last:{noticed:false,opened:false,continued:false,reconsidered:false,chosen:false,choice:''}}));}
export function createCampaign(topic='cat',seed=479){
 if(!['cat','glass','machines'].includes(topic))throw new Error('Choose a reading example');
 return{topic,seed,act:'platform',round:0,budget:HACK_BUDGET,readers:people(seed),history:[],archive:[],platformScore:0,hackerScore:0,selfDirected:0,finished:false};
}
export function outcomes(readers,post,round,seed,tool='none',history=[]){
 const intervention=TOOLS[tool],next=structuredClone(readers),counts={noticed:0,opened:0,continued:0,reconsidered:0,chosen:0},[novelty,relevance,continuity,reflection]=post.features;
 const repetitions=history.filter(h=>h.format===post.format).length;
 for(const r of next){
  const rand=ch=>random(seed,r.id,round+1,ch),match=r.group%3===['cat','glass','machines'].indexOf(post.topic)?1:.86;
  const notice=clamp(.40+novelty*.35+r.curiosity*.15-repetitions*.055+intervention.alert- EVENTS[round].load,.15,.98);
  const opened=clamp(.30+relevance*.46+match*.1,.1,.96);
  const sustain=clamp(.20+continuity*.54+r.energy*.19-(tool==='pause'?.1:0),.05,.95);
  const reflect=clamp(.018+reflection*.2+intervention.reflect*r.energy,.01,.85);
  const l={noticed:rand(0)<notice,opened:false,continued:false,reconsidered:false,chosen:false,choice:''};
  l.opened=l.noticed&&rand(1)<opened;
  l.continued=l.opened&&rand(2)<sustain;
  l.reconsidered=l.opened&&rand(3)<reflect;
  l.chosen=l.reconsidered&&rand(4)<.52+intervention.choice;
  if(l.chosen){r.chosen=true;l.choice=rand(5)<.35?'Choose a different question':rand(5)<.7?'Discuss a reason':'Choose to continue deliberately';}
  r.energy=clamp(r.energy-(l.continued?.055:.02)+(tool==='pause'?.11:0),.2,1);
  r.last=l;for(const k of Object.keys(counts))counts[k]+=+l[k];
 }
 counts.discussed=next.filter(r=>r.last.choice==='Discuss a reason').length;
 return{readers:next,counts,capture:Math.max(0,counts.noticed+2*counts.opened+3*counts.continued-4*counts.reconsidered)};
}
export function playRound(state,post,tool='none'){
 if(state.finished||state.round>=ACT_ROUNDS)throw new Error('This act is complete');
 if(!TOOLS[tool])throw new Error('Choose an intervention');
 if(state.act==='platform'&&tool!=='none')throw new Error('Interventions belong to the hacker act');
 if(state.act==='hacker'&&TOOLS[tool].cost>state.budget)throw new Error('Not enough intervention points');
 if(!post||!Array.isArray(post.features)||post.features.length!==4||post.features.some(v=>!Number.isFinite(v)||v<0||v>1))throw new Error('Generate a valid post first');
 if(state.act==='hacker'&&post.id!==state.archive[state.round]?.post.id)throw new Error('Replay the archived platform post');
 const next=structuredClone(state),result=outcomes(next.readers,post,next.round,next.seed,tool,next.history);
 next.readers=result.readers;next.platformScore+=result.capture;if(next.act==='hacker')next.budget-=TOOLS[tool].cost;
 next.selfDirected=next.readers.filter(r=>r.chosen).length;next.hackerScore=next.act==='hacker'?next.selfDirected-next.archive[next.round].uniqueChoices:0;
 next.history.push({round:next.round+1,format:post.format,post:structuredClone(post),tool,...result.counts,capture:result.capture,uniqueChoices:next.selfDirected});
 next.round++;next.finished=next.round===ACT_ROUNDS;return next;
}
export function beginHack(state){
 if(state.act!=='platform'||!state.finished)throw new Error('Complete the platform act first');
 return{...createCampaign(state.topic,state.seed),act:'hacker',archive:structuredClone(state.history),baselineScore:state.platformScore,baselineChoices:state.selfDirected};
}
export function result(state){
 if(!state.finished)throw new Error('Finish the act first');
 return{won:state.act==='platform'?state.platformScore>=PLATFORM_TARGET:state.hackerScore>=HACK_TARGET,score:state.act==='platform'?state.platformScore:state.hackerScore,target:state.act==='platform'?PLATFORM_TARGET:HACK_TARGET};
}
