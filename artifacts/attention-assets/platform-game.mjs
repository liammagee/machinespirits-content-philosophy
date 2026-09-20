import {FORMATS,MATERIALS,candidates,formatWords} from './platform-generator.mjs?v=20260920-loop';
import {TOOLS,EVENTS,ACT_ROUNDS,HACK_BUDGET,REVENUE_TARGET,HACK_TARGET,PRICES,createCampaign,playRound,beginHack,result} from './platform-game-engine.mjs?v=20260920-loop';
import {ALIGNMENTS,createLearner,forkLearner,policy,learn,responseEvents,liveFrame,BROADCAST_MS} from './platform-feedback.mjs?v=20260920-loop';
import {cloneModel,planRun,makeBatch,createOptimizer,trainStep,drift as modelDrift,briefDrift,OBJECTIVES,INTENSITY} from './platform-trainer.mjs?v=20260921-guide';
const $=id=>document.getElementById(id),root=$('platform-game'),esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fmt=n=>Math.round(n).toLocaleString(),letter=i=>String.fromCharCode(65+i),credits=n=>`${fmt(n)} ¤`;
let base=null,corpus=null,loading=null,model=null,state=null,posts=[],menu=[],selected=0,tool='none',reader=0,channel=0;
let learners={},alignment='revenue',phase='train',station='train',broadcast=null,liveTimer=null,displayReaders=[],displayCounts={},lastUpdate=null,shift=1,journal=[];
let plan={objective:'reinforce',intensity:'standard',targets:null},training=null,trainingLabel='Pretrained writer',reached=new Set(),writer={post:0,step:0,timer:null,playing:false,queue:null};
const CHANNELS=[
 {key:'noticed',code:'A',name:'Alerting',short:'Notice the cue',text:'Alerting means getting ready. A cue can make a reader glance; a glance proves nothing about understanding. (Petersen & Posner 2012)'},
 {key:'opened',code:'O',name:'Orienting',short:'Open this post',text:'Orienting means pointing attention at one thing. Here the reader opens a post that looks relevant. A behavioural illustration, not a brain measurement.'},
 {key:'continued',code:'E1',name:'Maintain the task',short:'Stay on task · billable',text:'Executive control, held steady: the reader finishes the platform’s task. Petersen and Posner link stable task control to the cingulo-opercular network. The ledger bills it as an engaged session.'},
 {key:'reconsidered',code:'E2',name:'Adjust the task',short:'Change the goal · not billable',text:'Executive control, switched: the reader stops and reconsiders the goal. Petersen and Posner link flexible adjustment to the frontoparietal network. The ledger cannot count it.'}
];
// ---------- info tips ----------
const tip=document.createElement('div');tip.className='pg-tip';tip.hidden=true;tip.setAttribute('role','tooltip');document.body.appendChild(tip);
function showTip(el,pin=false){tip.textContent=el.dataset.tip;tip.hidden=false;tip.dataset.pinned=pin?'1':'0';tip.dataset.owner=el.dataset.tip;const r=el.getBoundingClientRect(),w=Math.min(320,innerWidth-24);tip.style.maxWidth=w+'px';let x=r.left+r.width/2-w/2;x=Math.max(12,Math.min(innerWidth-w-12,x));tip.style.left=x+'px';tip.style.top=(r.bottom+8)+'px';const th=tip.getBoundingClientRect().height;if(r.bottom+8+th>innerHeight)tip.style.top=Math.max(8,r.top-8-th)+'px';}
function hideTip(force=false){if(tip.dataset.pinned==='1'&&!force)return;tip.hidden=true;tip.dataset.pinned='0';}
// Hover or focus shows a tip while the pointer stays; a click pins it (touch and keyboard); a second click, Escape or a click elsewhere releases it.
root.addEventListener('mouseover',e=>{const b=e.target.closest('.pg-info');if(b&&tip.dataset.pinned!=='1')showTip(b);});root.addEventListener('mouseout',e=>{if(e.target.closest('.pg-info'))hideTip();});
root.addEventListener('focusin',e=>{const b=e.target.closest('.pg-info');if(b&&tip.dataset.pinned!=='1')showTip(b);});root.addEventListener('focusout',e=>{if(e.target.closest('.pg-info'))hideTip();});
root.addEventListener('click',e=>{const b=e.target.closest('.pg-info');if(!b)return;e.preventDefault();if(tip.dataset.pinned==='1'&&tip.dataset.owner===b.dataset.tip)hideTip(true);else showTip(b,true);});
document.addEventListener('click',e=>{if(!e.target.closest('.pg-info'))hideTip(true);});
document.addEventListener('keydown',e=>{if(e.key==='Escape')hideTip(true);});
// ---------- loading ----------
async function load(){
 if(base&&corpus)return;if(!loading)loading=Promise.all([fetch(new URL('./platform-model.json?v=20260920-1',import.meta.url)).then(r=>{if(!r.ok)throw new Error('The local model file is unavailable.');return r.json();}),fetch(new URL('./platform-corpus.json?v=20260920-1',import.meta.url)).then(r=>{if(!r.ok)throw new Error('The training corpus is unavailable.');return r.json();})]).then(([m,c])=>{base=m;corpus=c;trainingEvidence();}).catch(e=>{loading=null;throw e;});return loading;}
function trainingEvidence(){const t=base.training;$('pg-training-evidence').innerHTML=`<div class="pg-loss" role="img" aria-label="Offline training loss fell from ${t.loss[0].loss.toFixed(2)} to ${t.loss.at(-1).loss.toFixed(4)} over ${t.steps} steps">${t.loss.filter((_,i)=>i%2===0||i===t.loss.length-1).map(l=>`<span style="height:${Math.max(3,l.loss/t.loss[0].loss*40)}px" data-loss="${l.loss.toFixed(2)}" title="Step ${l.step}: loss ${l.loss}"></span>`).join('')}</div><p class="small">Offline training: ${t.examples} posts · ${fmt(t.steps)} steps · loss ${t.loss[0].loss.toFixed(2)} → ${t.loss.at(-1).loss.toFixed(4)} · ${(100*t.trainingTokenAccuracy).toFixed(0)}% of next words guessed right. It can reproduce these posts; it has not learned language in general.</p>`;}
$('pg-start').addEventListener('click',async()=>{$('pg-start').disabled=true;$('pg-load-status').textContent='Loading the locally trained writer…';try{await load();start();}catch(e){$('pg-load-status').textContent=e.message+' Reload or try Start again.';$('pg-start').disabled=false;}});
function start(keep=false){
 stopWriter();stopLive();broadcast=null;state=createCampaign($('reading-case').value);
 if(!keep){learners={revenue:createLearner(base.dimension)};shift=1;journal=[];model=cloneModel(base);trainingLabel='Pretrained writer';}else{shift++;trainingLabel='Writer carried over';}
 alignment='revenue';phase='train';lastUpdate=null;tool='none';reader=0;channel=0;training=null;reached=new Set(['train']);plan={objective:'reinforce',intensity:'standard',targets:null};
 root.dataset.active='true';root.dataset.brief='false';$('pg-show-brief').setAttribute('aria-expanded','false');$('pg-play').hidden=false;$('pg-start').hidden=true;$('pg-result').hidden=true;$('pg-feedback').textContent='';
 $('pg-load-status').textContent='';posts=[];menu=[];render();setStation('train');$('pg-play').scrollIntoView({block:'start',behavior:'instant'});
}
$('pg-show-brief').addEventListener('click',()=>{const shown=root.dataset.brief!=='true';root.dataset.brief=shown;$('pg-show-brief').setAttribute('aria-expanded',shown);if(shown)$('pg-brief').scrollIntoView({block:'nearest',behavior:'instant'});});
// ---------- stations & loop ----------
const STATIONS=['train','generate','broadcast','monetize'];
function setStation(name){station=name;reached.add(name);root.querySelectorAll('.pg-station').forEach(s=>{s.hidden=s.dataset.station!==name;});renderLoop();
 if(name==='train')renderTrain();if(name==='generate')renderDesk();if(name==='monetize')renderMonetize();renderGuide();const el=root.querySelector(`.pg-station[data-station="${name}"]`);if(el&&!el.hidden)el.scrollIntoView({block:'nearest',behavior:'instant'});}
function renderLoop(){const hacking=state.act==='hacker',last=state.history.at(-1);
 root.querySelectorAll('#pg-loop button').forEach(b=>{const s=b.dataset.station;b.setAttribute('aria-current',s===station?'step':'false');b.classList.toggle('done',reached.has(s)&&s!==station);b.disabled=!reached.has(s)||(hacking&&s==='train');});
 const sums={train:hacking?'writer frozen for the replay':training?`${OBJECTIVES[training.plan.objective].short} · ${training.plan.steps} steps`:trainingLabel,generate:posts.length?(hacking?'archived post':`4 posts · ${menu.filter(p=>!p.unchanged).length||0} changed`):'—',broadcast:phase==='live'?'on air…':last?`${last.opened} opened · ${last.continued} completed`:'—',monetize:last?`+${credits(last.revenue)}`:'—'};
 for(const k in sums)root.querySelector(`[data-sum="${k}"]`).textContent=sums[k];}
root.querySelector('#pg-loop').addEventListener('click',e=>{const b=e.target.closest('[data-station]');if(b&&!b.disabled)setStation(b.dataset.station);});
// ---------- guide: one step at a time ----------
const REF={vaswani:'<a href="https://arxiv.org/abs/1706.03762">Vaswani et al. 2017</a>',pp:'<a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC3413263/">Petersen &amp; Posner 2012</a>',terranova:'<a href="https://culturemachine.net/wp-content/uploads/2019/01/465-973-1-PB.pdf">Terranova 2012</a>',ouyang:'<a href="https://arxiv.org/abs/2203.02155">Ouyang et al. 2022</a>'};
const GUIDE={
 'train-first':{step:'STEP 1 OF 4 · TRAIN',see:'This is the writer: a tiny language model that has already learned 36 example posts. The bars show its training: the loss (how wrong it was) falling to almost zero.',do:'Nothing to train yet. Press <b>Use the writer as it is</b>.',why:`A language model predicts the next word. It learns by adjusting its numbers until its predictions match example text. This one has a single attention head of the kind introduced in ${REF.vaswani}.`},
 'train-plan':{step:'STEP 1 OF 4 · TRAIN',see:'Now the money trains the writer. You choose what it learns from: the post that paid best, the original examples, or new posts that invite a pause.',do:'Pick what it should learn (1) and how hard (2), then press <b>Run training</b>.',why:`Fine-tuning shows a trained model a few new examples and moves its numbers a little toward them. Here the examples are chosen by revenue: this is the arrow from the attention economy back to machine attention (${REF.terranova}).`},
 'train-running':{step:'STEP 1 OF 4 · TRAIN',see:'Real training, in your browser. Each step compares the writer’s guesses with the example words and adjusts all 8,135 numbers. The curve is the loss falling.',do:'Wait a few seconds for the run to finish.',why:'The loss is cross-entropy: how surprised the writer is by the true next word. The optimizer moves the numbers in whichever direction lowers it.'},
 'train-done':{step:'STEP 1 OF 4 · TRAIN',see:'Training finished. The meters show how far each style drifted from its original post. Changed styles show their new text.',do:'Press <b>Generate four posts</b>, or <b>Train again first</b> to run another objective on top.',why:'A few examples move a small model a long way. Whatever the platform rewards is what the writer becomes.'},
 'writing':{step:'STEP 2 OF 4 · GENERATE',see:'The writer is composing four posts, one word at a time. The red word is being chosen now. Arcs show how much attention it pays to each earlier word; thicker means more.',do:'Watch, or press <b>Writing… (click to skip)</b> to jump to the finished posts.',why:`Each new word asks a question (its query) of all earlier words (their keys), takes a weighted mix of their content (values), and scores the vocabulary. A softmax makes the weights add up to 100%. ${REF.vaswani}, §3.2.`},
 'choose':{step:'STEP 2 OF 4 · GENERATE',see:'Four finished posts, one per style. ★ marks the recommender’s pick. A red tag means training changed what that style writes.',do:'Click a post to select it, then press <b>Publish &amp; watch live</b>. <b>Replay</b> shows how any post was written.',why:'The writer decides the words. A separate recommender decides which style to push. Both are machine attention. You are the third decider.'},
 'live':{step:'STEP 3 OF 4 · BROADCAST',see:'120 fictional readers are reacting. A: noticed the cue. O: opened the post. E1: finished the task. E2: stopped to reconsider. Each dot is one reader.',do:'Watch the bars fill, or press <b>Show outcome</b>. Click any dot to see what that reader did.',why:`${REF.pp} describe three attention systems: alerting, orienting and executive control. Executive control can keep a task going (E1) or change it (E2). Only E1 pays.`},
 'monetize':{step:'STEP 4 OF 4 · MONETIZE',see:'The ledger bills what it can count: 1 credit per open, 4 per completed task. Reconsidering earns nothing. Tired readers may leave. The recommender has just learned from this score.',do:'Press <b>Feed it back</b> to spend this result on the next training run.',why:`In an attention economy, attention is the product. ${REF.terranova} asks who sets the score and who benefits. The ledger cannot see a reader who stopped to think.`},
 'finished-platform':{step:'ACT I COMPLETE',see:'Five rounds are banked. The debrief below shows what the ledger counted and what it never saw.',do:'Press <b>Switch sides</b> to replay the same feed as a pedagogical hacker, or start a new campaign.',why:'The loop closed five times: money chose the examples, the examples shaped the writer, the writer shaped what readers did. Now try to open it.'},
 'hack-choose':{step:'STEP 2 OF 4 · INTERVENE',see:'Same post as Act I, same readers. You cannot change the words. You can add a pause, a question or a discussion, and change what the recommender values.',do:'Pick a goal, pick an intervention, then press <b>Broadcast with intervention</b>.',why:'A pause gives executive control a chance to switch instead of maintain. Interventions cost points because friction costs the platform money.'},
 'hack-live':{step:'STEP 3 OF 4 · BROADCAST',see:'The same readers meet the same post, now with your intervention. Faint ticks show the original feed.',do:'Watch, or press <b>Show outcome</b>. Compare E2 with its original value.',why:`Flexible adjustment is the frontoparietal side of executive control in ${REF.pp}. Whether a real intervention works is an empirical question; this is an authored model.`},
 'hack-monetize':{step:'STEP 4 OF 4 · COMPARE',see:'The ledger compares this round with the original: revenue, and the readers who reconsidered or chose a goal.',do:'Press <b>Next broadcast</b>.',why:'The same reading can be valued as revenue, as independent judgment, or as collective inquiry. The score you pick decides what counts.'},
 'finished-hacker':{step:'ACT II COMPLETE',see:'Your interventions are counted against the original feed below.',do:'Press <b>Play a new campaign</b> to try different training choices from the start.',why:`${REF.terranova}: attention becomes a social question once we ask who organizes it and who can change the rules.`}
};
const HOME={train:'train',generate:'generate',choose:'generate',live:'broadcast',monetize:'monetize'},STATION_TEXT={train:'training',generate:'the generated posts',broadcast:'the readers’ responses',monetize:'the ledger'},STATION_NAME={train:'01 Train',generate:'02 Generate',broadcast:'03 Broadcast',monetize:'04 Monetize'};
function guideKey(){const hacking=state.act==='hacker';
 if(state.finished)return hacking?'finished-hacker':'finished-platform';
 if(hacking)return phase==='live'?'hack-live':phase==='monetize'?'hack-monetize':'hack-choose';
 if(phase==='train')return !state.history.length?'train-first':!training?'train-plan':training.done?'train-done':'train-running';
 return phase==='generate'?'writing':phase;}
function renderGuide(){if(!state)return;const key=guideKey(),g=GUIDE[key],home=state.finished?null:HOME[phase],away=!!home&&station!==home;root.dataset.guide=away?'away':key;
 $('pg-guide-step').textContent=away?`LOOKING BACK · ${STATION_NAME[station].toUpperCase()}`:g.step;
 $('pg-guide-see').textContent=away?`You are reviewing ${STATION_TEXT[station]}. The game is waiting at ${STATION_NAME[home]}.`:g.see;
 $('pg-guide-do').innerHTML=away?`Press <b>${STATION_NAME[home]}</b> in the loop above to continue.`:g.do;
 if(!away)$('pg-guide-why-text').innerHTML=g.why;$('pg-guide-why').hidden=away;}
function setGuide(show){root.dataset.guideShown=String(show);$('pg-guide-body').hidden=!show;$('pg-guide-toggle').textContent=show?'Hide guide':'Show guide';$('pg-guide-toggle').setAttribute('aria-expanded',String(show));try{localStorage.setItem('pg-guide',show?'on':'off');}catch{}}
$('pg-guide-toggle').addEventListener('click',()=>setGuide(root.dataset.guideShown!=='true'));
setGuide((()=>{try{return localStorage.getItem('pg-guide')!=='off';}catch{return true;}})());
function render(){
 const hacking=state.act==='hacker',score=hacking?state.hackerScore:state.revenue,target=hacking?HACK_TARGET:REVENUE_TARGET,last=state.history.at(-1);
 root.dataset.act=state.act;root.dataset.round=state.round;root.dataset.finished=state.finished;root.dataset.phase=phase;
 $('pg-act').textContent=hacking?'Act II · pedagogical hacker':'Act I · platform operator';$('pg-round').textContent=`Round ${Math.min(state.round+1,ACT_ROUNDS)} / ${ACT_ROUNDS}`;
 $('pg-score-label').textContent=hacking?'Net additional readers choosing a goal':'Monetization · revenue banked';$('pg-score').textContent=hacking?`${score>=0?'+':''}${score} / ${HACK_TARGET}`:`${credits(score)}`;
 $('pg-goal-label').textContent=hacking?`Goal: ${HACK_TARGET} more readers make a deliberate choice than in your original feed.`:`Target ${credits(REVENUE_TARGET)} in ${ACT_ROUNDS} broadcasts · ${Math.round(score/target*100)}%`;$('pg-progress').value=Math.max(0,Math.min(100,score/target*100));
 $('pg-resource-label').textContent=hacking?'Intervention budget left':'Readers still on the platform';$('pg-resource').textContent=hacking?`${state.budget} / ${HACK_BUDGET}`:`${state.readers.filter(r=>r.active).length} / 120`;
 const energy=state.readers.reduce((s,r)=>s+r.energy,0)/state.readers.length;$('pg-energy').textContent=`${Math.round(energy*100)}%`;
 $('pg-event').textContent=state.finished?'Act complete. Review the outcome below.':`${EVENTS[state.round].name} · ${EVENTS[state.round].text}`;
 displayReaders=state.readers;displayCounts=last||{};renderPopulation();renderChannels();renderLoop();renderLog();
 $('pg-live-pause').disabled=phase!=='live';$('pg-live-skip').disabled=phase!=='live';if(phase!=='live')$('pg-live-pause').textContent='Ⅱ Pause';
 if(phase==='choose'||phase==='generate'||phase==='train'){$('pg-wall-title').textContent=state.round?'Ready for the next broadcast.':'Your audience is waiting.';$('pg-live-clock').textContent='READY';$('pg-on-air').textContent='Publish a post to bring this room to life.';$('pg-live-done').hidden=true;}
 renderGuide();
}
function renderLog(){$('pg-log').innerHTML=state.history.map(h=>`<tr><th scope="row">${h.round}</th><td>${FORMATS[h.format].name}${h.style&&h.style!==h.format?` <small>(writes as ${esc((FORMATS[h.style]||MATERIALS[h.style]||{name:h.style}).name)})</small>`:''}${h.tool!=='none'?'<br>'+TOOLS[h.tool].name:''}</td><td>${esc(h.training||'—')}</td><td>${h.noticed}</td><td>${h.opened}</td><td>${h.continued}</td><td>${h.reconsidered}</td><td>${h.churned||0}</td><td>${credits(h.revenue)}</td></tr>`).join('');}
// ---------- TRAIN ----------
function renderTrain(){
 const first=state.round===0&&!state.history.length;$('pg-train-base').hidden=!first;$('pg-train-plan').hidden=first||!!training;$('pg-train-run').hidden=!training;
 $('pg-train-help').textContent=first?'Round 1 uses the writer as delivered. From round 2 you decide what it learns next.':`Round ${state.round+1} of ${ACT_ROUNDS}. Last broadcast earned ${credits(state.history.at(-1).revenue)}. Choose what the writer learns before it writes again.`;
 if(first||training){renderGuide();return;}
 $('pg-objectives').innerHTML=Object.entries(OBJECTIVES).map(([id,o])=>`<button type="button" data-objective="${id}" aria-pressed="${plan.objective===id}"><span class="pg-ico">${o.icon}</span><strong>${o.name}</strong><small>${o.text}</small></button>`).join('');
 $('pg-intensities').innerHTML=Object.entries(INTENSITY).map(([id,i])=>`<button type="button" data-intensity="${id}" aria-pressed="${plan.intensity===id}"><span class="pg-ico">${{light:'·',standard:'··',intensive:'···'}[id]}</span><strong>${i.name}</strong><small>${i.steps[plan.objective]} steps</small></button>`).join('');
 $('pg-objective-human').textContent='Effect on readers: '+OBJECTIVES[plan.objective].human;
 const mats=plan.objective==='materials';$('pg-targets').hidden=!mats;
 let p;try{p=planRun({corpus,topic:state.topic,history:state.history,posts:menu,...plan});}catch(e){$('pg-plan-summary').textContent=e.message;$('pg-run-training').disabled=true;return;}
 if(mats)$('pg-target-boxes').innerHTML=Object.entries(FORMATS).map(([id,f])=>`<label><input type="checkbox" data-target="${id}" ${p.retired.includes(id)?'checked':''}> ${f.name}</label>`).join('');
 $('pg-plan-summary').innerHTML=`${esc(p.summary)} <b>${p.retained}</b> retained examples + <b>${p.added}</b> added · <b>${p.steps}</b> steps at learning rate ${p.lr}.`;$('pg-run-training').disabled=false;renderGuide();
}
$('pg-objectives').addEventListener('click',e=>{const b=e.target.closest('[data-objective]');if(b){plan.objective=b.dataset.objective;plan.targets=null;renderTrain();}});
$('pg-intensities').addEventListener('click',e=>{const b=e.target.closest('[data-intensity]');if(b){plan.intensity=b.dataset.intensity;renderTrain();}});
$('pg-target-boxes').addEventListener('change',()=>{plan.targets=[...root.querySelectorAll('[data-target]:checked')].map(i=>i.dataset.target);renderTrain();});
$('pg-train-skip').addEventListener('click',()=>{trainingLabel='Pretrained writer';toGenerate();});
$('pg-train-again').addEventListener('click',()=>{training=null;renderTrain();});
$('pg-train-done').addEventListener('click',()=>toGenerate());
$('pg-run-training').addEventListener('click',()=>{if(training)return;const p=planRun({corpus,topic:state.topic,history:state.history,posts:menu,...plan});runTraining(p);});
function runTraining(p){
 $('pg-train-plan').hidden=true;$('pg-train-run').hidden=false;$('pg-train-done').disabled=true;$('pg-train-again').disabled=true;$('pg-drift').innerHTML='';
 const before=model,next=cloneModel(model),batch=makeBatch(next,p.records),opt=createOptimizer(next),losses=[];let step=0;
 training={plan:p,losses,done:false};drawLoss(losses,p.steps);$('pg-run-status').textContent=`Training… step 0 / ${p.steps}`;renderGuide();
 const tick=()=>{if(!training||training.plan!==p)return;const chunk=Math.max(1,Math.round(p.steps/12));for(let k=0;k<chunk&&step<p.steps;k++){losses.push(trainStep(next,batch,opt,p.lr));step++;}
  drawLoss(losses,p.steps);$('pg-run-status').textContent=`Training… step ${step} / ${p.steps} · loss ${losses.at(-1).toFixed(3)}`;
  if(step<p.steps)setTimeout(tick,30);else finishTraining(before,next);};
 setTimeout(tick,20);
}
function finishTraining(before,next){
 model=next;const d=briefDrift(model,corpus,state.topic,state.round),changed=d.filter(x=>!x.unchanged).length,dist=modelDrift(before,next);
 training.done=true;training.drift=d;trainingLabel=`${OBJECTIVES[training.plan.objective].short} · ${INTENSITY[training.plan.intensity].name.toLowerCase()}`;
 $('pg-run-status').textContent=`Done: ${training.plan.steps} steps · loss ${training.losses[0].toFixed(3)} → ${training.losses.at(-1).toFixed(3)} · parameter change ${dist.toFixed(2)} · ${changed} of 4 styles now write something new.`;
 $('pg-drift').innerHTML=d.map(x=>`<div class="pg-drift-row ${x.unchanged?'':'changed'}"><span class="name">${FORMATS[x.format].name}</span><div><div class="meter"><b style="width:${Math.round(x.share*100)}%"></b></div><span class="pct">${x.unchanged?'still writes its original post':`${Math.round(x.share*100)}% of its original post left`}</span></div><span class="txt">${x.unchanged?'unchanged':`now: “${esc(x.text)}” · reads as ${esc((FORMATS[x.style]||MATERIALS[x.style]||{name:x.style}).name)}`}</span></div>`).join('');
 $('pg-train-done').disabled=false;$('pg-train-again').disabled=false;renderLoop();renderGuide();
}
function drawLoss(losses,steps){const svg=$('pg-loss-curve');const max=Math.max(.05,...losses);const x=i=>10+i/Math.max(1,steps-1)*300,y=v=>100-v/max*88;
 svg.innerHTML=`<line class="grid" x1="10" y1="100" x2="310" y2="100"/><line class="grid" x1="10" y1="12" x2="10" y2="100"/><text x="14" y="20">${max.toFixed(2)}</text><text x="14" y="98">0</text><text x="270" y="108">step ${losses.length}</text>${losses.length?`<path d="${losses.map((v,i)=>`${i?'L':'M'} ${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(' ')}"/>`:''}`;}
// ---------- GENERATE: the writer at work ----------
const STYLE_NAME=s=>(FORMATS[s]||MATERIALS[s]||{name:s}).name;let written=new Set();
function toGenerate(){
 stopWriter();written=new Set();menu=candidates(model,state.topic,state.round);
 for(const p of menu){const orig=corpus.find(r=>r.topic===state.topic&&r.format===p.format&&r.variant===p.variant);p.unchanged=!!orig&&p.words.join(' ')===orig.tokens.slice(0,-1).join(' ');}
 posts=state.act==='hacker'?[state.archive[state.round].post]:menu;
 selected=state.act==='platform'?policy(learners[alignment],menu,alignment).recommended:0;
 phase=state.act==='platform'?'generate':'choose';render();setStation('generate');
 if(state.act==='platform')writeAll();else{written=new Set([0]);renderDesk();showWriter(0,posts[0].steps.length-1);}
}
function writeAll(){writer.queue=[0,1,2,3];renderDesk();nextInQueue();}
function nextInQueue(){const i=writer.queue?writer.queue.shift():undefined;if(i===undefined){writer.queue=null;phase='choose';selected=policy(learners[alignment],menu,alignment).recommended;render();renderDesk();showWriter(selected,posts[selected].steps.length-1);return;}selected=i;renderDesk();playWriter(i,()=>{written.add(i);nextInQueue();});}
function skipWriting(){if(!writer.queue)return;stopWriter();writer.queue=null;written=new Set([0,1,2,3]);phase='choose';selected=policy(learners[alignment],menu,alignment).recommended;render();renderDesk();showWriter(selected,posts[selected].steps.length-1);}
function showWriter(i,k){writer.post=i;writer.step=Math.min(k,posts[i].steps.length-1);renderWriter();}
const miniBar=(label,value)=>`<div class="pg-mini-bar"><span>${esc(label)}</span><span>${(value*100).toFixed(1)}%</span><i><b style="width:${value*100}%"></b></i></div>`;
function renderWriter(){
 const post=posts[writer.post];if(!post)return;const step=post.steps[writer.step],prefix=step.prefix;
 root.querySelector('[data-wtokens]').innerHTML=prefix.map((t,j)=>`<span class="pg-wtok ${j<4?'prompt':''}" data-j="${j}"><span class="pct" data-wpct></span><span class="w">${esc(t)}</span></span>`).join('')+`<span class="pg-wtok cur ${step.word==='<end>'?'end':''}" data-j="${prefix.length}"><span class="pct"></span><span class="w">${esc(step.word==='<end>'?'END':step.word)}</span></span>`;
 drawArcs(step);
 $('pg-trace-status').textContent=`${FORMATS[post.format].name} · token ${writer.step+1} / ${post.steps.length} · ${step.word==='<end>'?'end of post':`chose “${step.word}” at ${(step.probability*100).toFixed(0)}%`}`;
 const strongest=step.weights.map((value,i)=>({value,i})).sort((a,b)=>b.value-a.value).slice(0,4);
 $('pg-trace-attention').innerHTML=strongest.map(({value,i})=>miniBar(`${i+1}. ${prefix[i]}`,value)).join('');
 $('pg-trace-next').innerHTML=step.alternatives.map(a=>miniBar(a.word==='<end>'?'END':a.word,a.p)).join('');
 $('pg-trace-step').disabled=writer.step===post.steps.length-1;$('pg-trace-play').textContent=writer.playing?'Ⅱ Pause':'▶ Replay writing';
}
function drawArcs(step){
 const svg=root.querySelector('.pg-arcs'),stage=svg.parentElement,toks=[...stage.querySelectorAll('.pg-wtok')];svg.innerHTML='';
 const n=step.prefix.length,from=toks[n-1];if(!from)return;const sr=stage.getBoundingClientRect(),reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
 const box=el=>{const r=el.querySelector('.w').getBoundingClientRect();return{x:r.left+r.width/2-sr.left,y:r.top-sr.top};};const a=box(from);
 step.weights.forEach((w,j)=>{const el=toks[j];const pct=el.querySelector('[data-wpct]');if(pct)pct.textContent=(w*100).toFixed(0)+'%';if(j===n-1||w<.04)return;const b=box(el),dx=Math.abs(a.x-b.x),h=Math.min(52,16+Math.sqrt(dx)*3.2+Math.abs(a.y-b.y)*.3);
  const p=document.createElementNS('http://www.w3.org/2000/svg','path');p.setAttribute('d',`M ${a.x} ${a.y-3} Q ${(a.x+b.x)/2} ${Math.min(a.y,b.y)-h} ${b.x} ${b.y-3}`);p.setAttribute('stroke-width',(1+7*w).toFixed(1));p.setAttribute('stroke-opacity',(.25+.75*w).toFixed(2));svg.appendChild(p);
  if(!reduce){const len=p.getTotalLength();p.style.strokeDasharray=len;p.style.strokeDashoffset=len;p.getBoundingClientRect();p.style.transition='stroke-dashoffset .35s ease';p.style.strokeDashoffset=0;}});
}
function playWriter(i,done){stopWriter();writer.post=i;writer.step=0;writer.playing=true;writer.onDone=done||null;renderWriter();
 writer.timer=setInterval(()=>{if(writer.step>=posts[i].steps.length-1){const cb=writer.onDone;stopWriter();if(cb)cb();return;}writer.step++;renderWriter();},writer.queue?95:380);}
function stopWriter(){clearInterval(writer.timer);writer.timer=null;writer.playing=false;writer.onDone=null;const b=$('pg-trace-play');if(b)b.textContent='▶ Replay writing';}
$('pg-trace-play').addEventListener('click',()=>{if(writer.queue){skipWriting();return;}if(writer.playing){stopWriter();return;}if(!posts.length)return;if(writer.step>=posts[writer.post].steps.length-1)writer.step=0;writer.playing=true;const i=writer.post;renderWriter();writer.timer=setInterval(()=>{if(writer.step>=posts[i].steps.length-1){stopWriter();renderWriter();return;}writer.step++;renderWriter();},380);});
$('pg-trace-step').addEventListener('click',()=>{if(writer.queue)skipWriting();stopWriter();if(!posts.length)return;writer.step=Math.min(writer.step+1,posts[writer.post].steps.length-1);renderWriter();});
$('pg-trace-reset').addEventListener('click',()=>{if(writer.queue)skipWriting();stopWriter();writer.step=0;renderWriter();});
$('pg-watch').addEventListener('click',()=>{if(writer.queue)skipWriting();if(!posts.length)return;playWriter(selected);$('pg-writer').scrollIntoView({block:'nearest',behavior:'instant'});});
function renderDesk(){
 if(!state||!menu.length)return;const hacking=state.act==='hacker',locked=phase!=='choose'||state.finished,pol=policy(learners[alignment],menu,alignment),rec=pol.recommended;
 $('pg-desk-label').textContent=hacking?'02 / ACT II · INTERVENE IN YOUR OWN FEED':'02 / GENERATE · four posts';
 $('pg-desk-title').textContent=hacking?'Add friction to this post.':phase==='generate'?'The writer is composing four posts…':'Pick one post to publish.';
 $('pg-desk-help').textContent=hacking?'The words stay the same. Your intervention adds a chance to pause, ask or discuss.':'One post per style. ★ is the recommender’s pick. A red tag means training changed that style.';
 $('pg-candidates').classList.toggle('pg-single',hacking);
 $('pg-candidates').innerHTML=posts.map((p,i)=>{const pending=!hacking&&!!writer.queue&&!written.has(i),now=pending&&selected===i;const tag=hacking?'':p.style!==p.format?` · <span class="chg">now writes as ${esc(STYLE_NAME(p.style))}</span>`:!p.unchanged?' · <span class="chg">changed by training</span>':'';
  return `<button type="button" class="pg-candidate ${now?'writing':''}" data-post="${i}" aria-pressed="${i===selected}" ${locked?'disabled':''}><span>${hacking?'Archived post · '+FORMATS[p.format].name:FORMATS[p.format].name}${!hacking&&i===rec?' · ★ recommended':''}${tag}</span><strong class="${pending?'pending':''}">${pending?(now?'writing…':'…'):esc(p.text)}</strong><small>${hacking?'Same post as Act I.':`${Math.round(pol.weights[i]*100)}% recommended · expected score ${p.forecast}/100`}${!hacking&&p.ended===false?' · cut at the token limit':''}</small></button>`;}).join('');
 $('pg-hack-tools').hidden=!hacking;$('pg-hack-tools').innerHTML=hacking?Object.entries(TOOLS).map(([key,t])=>`<button type="button" class="pg-tool" data-tool="${key}" aria-pressed="${tool===key}" ${locked||t.cost>state.budget?'disabled':''}><strong>${t.name}</strong><span>${t.cost} ${t.cost===1?'point':'points'}</span><small>${t.text}</small></button>`).join(''):'';
 $('pg-send').disabled=locked;$('pg-send').textContent=phase==='generate'?'Writing… (click to skip)':phase==='live'?'● Broadcasting…':phase==='monetize'?'Broadcast complete':hacking?'▶ Broadcast with intervention':'▶ Publish & watch live';$('pg-send').disabled=locked&&phase!=='generate';
 $('pg-watch').disabled=phase==='live';renderAlignment();if(station==='generate')renderGuide();
}
$('pg-candidates').addEventListener('click',e=>{const b=e.target.closest('[data-post]');if(!b||phase!=='choose'||state.finished||state.act==='hacker')return;selected=+b.dataset.post;renderDesk();showWriter(selected,posts[selected].steps.length-1);root.querySelector(`[data-post="${selected}"]`).focus({preventScroll:true});});
$('pg-hack-tools').addEventListener('click',e=>{const b=e.target.closest('[data-tool]');if(!b||phase!=='choose'||state.finished||b.disabled)return;tool=b.dataset.tool;renderDesk();root.querySelector(`[data-tool="${tool}"]`).focus({preventScroll:true});});
function renderAlignment(){const hacking=state.act==='hacker';$('pg-alignment').hidden=!hacking;if(!hacking)return;
 $('pg-alignment-choices').innerHTML=Object.entries(ALIGNMENTS).filter(([id])=>id!=='revenue').map(([id,a])=>`<button type="button" data-alignment="${id}" aria-pressed="${alignment===id}" ${phase!=='choose'||state.finished?'disabled':''}><span>${a.icon}</span><strong>${a.name}</strong><small>${a.question}</small></button>`).join('');
 const a=ALIGNMENTS[alignment];$('pg-alignment-detail').textContent=`${a.source}: ${a.description} Suggested intervention: ${TOOLS[a.tool].name}.`;}
$('pg-alignment-choices').addEventListener('click',e=>{const b=e.target.closest('[data-alignment]');if(!b||b.disabled||phase!=='choose')return;alignment=b.dataset.alignment;if(!learners[alignment])learners[alignment]=forkLearner(learners.revenue);lastUpdate=null;tool=TOOLS[ALIGNMENTS[alignment].tool].cost<=state.budget?ALIGNMENTS[alignment].tool:'none';renderDesk();root.querySelector(`[data-alignment="${alignment}"]`).focus({preventScroll:true});});
// ---------- BROADCAST ----------
$('pg-send').addEventListener('click',()=>{
 if(phase==='generate'){skipWriting();return;}if(!state||state.finished||phase!=='choose')return;stopWriter();
 try{const post=posts[selected],next=playRound(state,post,tool);broadcast={next,post,tool,events:responseEvents(next.readers),elapsed:0,paused:false,learn:$('pg-learning-enabled').checked,alignment};phase='live';lastUpdate=null;render();renderDesk();setStation('broadcast');
  $('pg-on-air').textContent=post.text;$('pg-wall-title').textContent='Your post is on air.';$('pg-live-done').hidden=true;tickLive(0);runLive();}
 catch(e){$('pg-feedback').textContent=e.message;}
});
function stopLive(){clearInterval(liveTimer);liveTimer=null;}
function runLive(){stopLive();if(!broadcast||broadcast.paused)return;liveTimer=setInterval(()=>tickLive(100*Number($('pg-speed').value)),100);}
function tickLive(delta){if(!broadcast)return;broadcast.elapsed=Math.min(BROADCAST_MS,broadcast.elapsed+delta);const f=liveFrame(broadcast.next.readers,broadcast.events,broadcast.elapsed);displayReaders=f.readers;displayCounts=f.counts;renderPopulation();renderChannels();
 $('pg-live-clock').textContent=`${(broadcast.elapsed/1000).toFixed(1)} / ${(BROADCAST_MS/1000).toFixed(1)}s`;
 const message=f.latest?`Reader ${f.latest.id+1} ${ {noticed:'notices the cue',opened:'opens the post',continued:'completes the task',reconsidered:'reconsiders the task',chosen:'chooses a goal'}[f.latest.key]}.`:'The first readers are arriving…';
 const rev=PRICES.impression*f.counts.opened+PRICES.session*f.counts.continued;$('pg-live-event').textContent=`${message} ${credits(rev)} billed so far.`;
 if(state.act==='platform')$('pg-score').textContent=credits(state.revenue+rev);
 if(broadcast.elapsed>=BROADCAST_MS)settleBroadcast();
}
function pauseLive(){if(!broadcast)return;broadcast.paused=true;stopLive();$('pg-live-pause').textContent='▶ Resume';root.dataset.paused='true';}
$('pg-live-pause').addEventListener('click',()=>{if(!broadcast)return;if(broadcast.paused){broadcast.paused=false;$('pg-live-pause').textContent='Ⅱ Pause';root.dataset.paused='false';runLive();}else pauseLive();});
$('pg-live-skip').addEventListener('click',()=>{if(broadcast)tickLive(BROADCAST_MS);});
function settleBroadcast(){
 stopLive();const b=broadcast;state=b.next;const h=state.history.at(-1);h.training=trainingLabel;const index=menu.findIndex(p=>p.id===b.post.id);
 if(b.learn&&index>=0){const update=learn(learners[b.alignment],menu,index,h,b.alignment);learners[b.alignment]=update.learner;lastUpdate=update.record;}else lastUpdate={frozen:true};
 journal.push({...h,alignment:b.alignment,learned:b.learn,shift});broadcast=null;phase='monetize';root.dataset.paused='false';render();renderDesk();
 $('pg-wall-title').textContent='Broadcast complete.';$('pg-live-clock').textContent='RESULT';$('pg-live-event').textContent=`${h.opened} opened · ${h.continued} completed · ${h.reconsidered} reconsidered · ${h.churned} left the platform.`;
 $('pg-live-done').hidden=false;$('pg-live-learned').textContent=`${credits(h.revenue)} billed this round.`;$('pg-live-next').textContent='Count the money →';
 $('pg-feedback').textContent='';
}
$('pg-live-next').addEventListener('click',()=>setStation('monetize'));
// ---------- MONETIZE ----------
function renderMonetize(){
 const h=state.history.at(-1),hacking=state.act==='hacker';if(!h)return;const base=hacking?state.archive[state.round-1]:null;
 $('pg-monetize-help').textContent=hacking?`Original feed, same round: ${credits(base.revenue)} billed, ${base.reconsidered} reconsidered. Your intervention changed what could be counted.`:'Only what can be counted is billed: an open is an impression, a completed task is an engaged session. A reader who reconsidered earns nothing. A tired reader is invisible until they leave.';
 $('pg-ledger').innerHTML=`<div><span>Impressions</span><strong>${credits(PRICES.impression*h.opened)}</strong><small>${h.opened} opens × ${PRICES.impression} ¤ · orienting (O)</small></div><div><span>Engaged sessions</span><strong>${credits(PRICES.session*h.continued)}</strong><small>${h.continued} completions × ${PRICES.session} ¤ · task maintained (E1)</small></div><div class="total"><span>Round ${h.round} revenue</span><strong>${credits(h.revenue)}</strong><small>${hacking?`original feed ${credits(base.revenue)} · ${h.revenue-base.revenue>=0?'+':''}${h.revenue-base.revenue} ¤`:`campaign ${credits(state.revenue)} of ${credits(REVENUE_TARGET)}`}</small></div><div class="not-billed"><span>Not billed</span><strong>${h.reconsidered}</strong><small>readers adjusted the task (E2) · ${h.chosen} made a deliberate choice</small></div><div class="not-billed"><span>Left the platform</span><strong>${h.churned}</strong><small>exhausted readers gone for good · ${h.active} remain</small></div><div class="not-billed"><span>Audience energy</span><strong>${Math.round(h.energy*100)}%</strong><small>${h.energy<.5?'tiring: completions cost energy':'still fresh'}</small></div>`;
 renderLearning();
 $('pg-next').hidden=state.finished;$('pg-next').textContent=hacking?'Next broadcast →':'Feed it back → train the writer';$('pg-continue').hidden=!(state.act==='platform'&&state.finished);
 if(state.finished)finish();
}
function renderLearning(){if(!menu.length)return;const l=learners[alignment],p=policy(l,menu,alignment),enabled=$('pg-learning-enabled').checked;
 $('pg-learning-enabled').disabled=phase==='live';
 $('pg-learning-status').textContent=lastUpdate?.frozen?'Learning was frozen: the recommender did not change.':lastUpdate?`${lastUpdate.eligible?'Feedback applied':'Rule protected'} · ${ALIGNMENTS[alignment].name} reward ${lastUpdate.reward.toFixed(2)} · ${l.updates} updates so far.`:`${enabled?'Learning on':'Learning frozen'} · ${ALIGNMENTS[alignment].name} · ${l.updates} updates${shift>1?` · shift ${shift}`:''}.`;
 $('pg-policy-bars').innerHTML=menu.map((post,i)=>`<div class="pg-policy-row"><span>${FORMATS[post.format].name}${p.recommended===i?' ★':''}</span><strong>${(p.weights[i]*100).toFixed(1)}%</strong><div><b style="width:${p.weights[i]*100}%"></b>${lastUpdate?.before?`<i style="left:${lastUpdate.before[i]*100}%" title="Before this feedback"></i>`:''}</div><small>${p.allowed[i]?'':'Excluded by the right-to-pause rule'}</small></div>`).join('');
 $('pg-update-evidence').textContent=lastUpdate?.delta!==undefined?`Change ${lastUpdate.delta.toFixed(3)}. White ticks show the weights before this round. ${lastUpdate.eligible?'The style you published was rewarded in proportion to how much better it did than expected.':'A rule excluded the style you published, so it could not be rewarded.'}`:'Recommendations change; past results do not. Not every round improves.';
 const perRound=REVENUE_TARGET/ACT_ROUNDS,history=journal.slice(-8),max=Math.max(perRound*1.6,...history.map(h=>h.revenue));
 $('pg-score-chart').innerHTML=history.length?history.map((h,i)=>`<div title="Broadcast ${journal.length-history.length+i+1}: ${h.revenue} credits, ${h.reconsidered} adjustments${h.learned?'':' (learning frozen)'}"><strong>${h.revenue}</strong><span style="--target:${perRound/max*100}%"><b style="height:${h.revenue/max*100}%"></b></span><small>${h.reconsidered} adjust · ${h.churned||0} left</small></div>`).join(''):'<p class="empty">Your first broadcast starts the history.</p>';
}
$('pg-learning-enabled').addEventListener('change',renderLearning);
$('pg-next').addEventListener('click',()=>{if(phase!=='monetize'||state.finished)return;lastUpdate=null;if(state.act==='hacker'){tool=TOOLS[ALIGNMENTS[alignment].tool].cost<=state.budget?ALIGNMENTS[alignment].tool:'none';toGenerate();}else{phase='train';training=null;render();setStation('train');}});
$('pg-continue').addEventListener('click',()=>start(true));
// ---------- WALL ----------
function renderPopulation(){
 if(!$('pg-population').children.length)$('pg-population').innerHTML=Array.from({length:6},(_,g)=>`<section class="pg-pop-group"><h4>GROUP ${letter(g)} / 20</h4><div class="pg-dots">${Array.from({length:20},(_,i)=>`<button type="button" class="pg-dot" data-pg-reader="${g*20+i}"></button>`).join('')}</div></section>`).join('');
 for(const r of displayReaders){const b=root.querySelector(`[data-pg-reader="${r.id}"]`),l=r.last,gone=r.active===false,symbol=gone?'×':l.chosen?'✳':l.reconsidered?'◇':l.continued?'■':l.opened?'●':l.noticed?'◌':'○',kind=gone?'pg-gone':l.chosen?'pg-choice':l.reconsidered?'pg-reconsider':l.continued?'pg-complete':l.opened?'pg-open':l.noticed?'pg-notice':'';if(b.textContent!==symbol){b.textContent=symbol;b.className=`pg-dot ${kind} pg-flash`;}else if(!kind)b.className='pg-dot';b.tabIndex=r.id===reader?0:-1;b.setAttribute('aria-pressed',r.id===reader);b.setAttribute('aria-label',`Reader ${r.id+1}: ${gone?'left the platform':l.chosen?'chose a goal':l.reconsidered?'reconsidered':l.continued?'completed':l.opened?'opened':l.noticed?'noticed':'waiting'}`);}
 readerDetail();
}
function renderChannels(){const last=displayCounts,base=state.act==='hacker'?state.archive[broadcast?state.round:Math.max(0,state.round-1)]:null;
 if(!$('pg-channels').children.length)$('pg-channels').innerHTML=CHANNELS.map((c,i)=>`<button type="button" class="pg-channel" data-channel="${i}"><span>${c.code}</span><strong>${c.name}<small>${c.short}</small></strong><span class="pg-channel-number">0 <small>/ 120</small></span><span class="pg-channel-track"><b></b><i></i></span></button>`).join('');
 CHANNELS.forEach((c,i)=>{const b=root.querySelector(`[data-channel="${i}"]`),value=last[c.key]||0;b.setAttribute('aria-pressed',channel===i);b.querySelector('.pg-channel-number').innerHTML=`${value}<small>${Math.round(value/120*100)}% of readers</small>`;b.querySelector('.pg-channel-track b').style.width=`${value/120*100}%`;b.querySelector('.pg-channel-track').style.setProperty('--baseline',`${(base?.[c.key]||0)/120*100}%`);b.querySelector('strong small').textContent=c.short+(base?` · original ${base[c.key]}`:'');});
 $('pg-channel-detail').textContent=CHANNELS[channel].text;
 $('pg-balance').innerHTML=`<span>Task maintained · billable <b>${last.continued||0}</b></span><span>Task adjusted · not billed <b>${last.reconsidered||0}</b></span>`;
}
$('pg-channels').addEventListener('click',e=>{const b=e.target.closest('[data-channel]');if(b){channel=+b.dataset.channel;renderChannels();}});
function readerDetail(){const r=displayReaders[reader];if(!r)return;const l=r.last,message=(state.round||broadcast)?`Reader ${reader+1} · ${r.active===false?'Left the platform: exhausted.':l.chosen?l.choice:l.reconsidered?'Reconsidered the task.':l.continued?'Completed the platform task.':l.opened?'Opened the post.':l.noticed?'Noticed the cue.':'Waiting / no response yet.'} Energy ${Math.round(r.energy*100)}%. Fictional response, not an inference from a click.`:'Each dot is one fictional reader. Watch them respond after publication.';if($('pg-reader').textContent!==message)$('pg-reader').textContent=message;}
$('pg-population').addEventListener('click',e=>{const b=e.target.closest('[data-pg-reader]');if(b){reader=+b.dataset.pgReader;selectReader();}});
function selectReader(){root.querySelectorAll('[data-pg-reader]').forEach(b=>{b.tabIndex=+b.dataset.pgReader===reader?0:-1;b.setAttribute('aria-pressed',+b.dataset.pgReader===reader);});readerDetail();}
$('pg-population').addEventListener('keydown',e=>{const b=e.target.closest('[data-pg-reader]');if(!b)return;const columns=getComputedStyle(b.parentElement).gridTemplateColumns.split(' ').length,move={ArrowLeft:-1,ArrowRight:1,ArrowUp:-columns,ArrowDown:columns};if(e.key in move)reader=Math.max(0,Math.min(119,reader+move[e.key]));else if(e.key==='Home')reader=0;else if(e.key==='End')reader=119;else return;e.preventDefault();selectReader();root.querySelector(`[data-pg-reader="${reader}"]`).focus();});
// ---------- FINISH & ACTS ----------
function finish(){stopWriter();const r=result(state),hacking=state.act==='hacker';$('pg-result').hidden=false;
 const runs=state.history.map(h=>h.training||'').filter(t=>/^Reinforce|^Materials|^Retain/.test(t)),reinforced=runs.filter(t=>t.startsWith('Reinforce')).length,materials=runs.filter(t=>t.startsWith('Materials')).length,left=120-state.readers.filter(x=>x.active).length;
 $('pg-result-label').textContent=hacking?'Campaign debrief · who owns the goal?':'Act I debrief · the ledger chose this score';
 $('pg-result-title').textContent=hacking?(r.won?'You opened room for another goal.':'The feed kept most of its hold.'):(r.won?'The platform calls this a success.':'The revenue target was missed.');
 $('pg-result-text').textContent=hacking?`${state.selfDirected} readers made a modeled deliberate choice, compared with ${state.baselineChoices} without your interventions: ${state.hackerScore>=0?'+':''}${state.hackerScore} against a target of +${HACK_TARGET}. The platform billed ${credits(state.revenue)} instead of ${credits(state.baselineRevenue)}. A reflective reader may continue, change the question, or discuss a reason; these are authored possibilities, not evidence that a real intervention works.`:`You banked ${credits(state.revenue)} against a target of ${credits(REVENUE_TARGET)}. You trained the writer ${runs.length} times (${reinforced} reinforcing what paid, ${materials} introducing reflective materials). ${left} readers left exhausted and ${state.selfDirected} made a deliberate choice about the task. The ledger counted none of that. Now switch sides and question the feed’s purpose.`;
 $('pg-result-comparison').innerHTML=hacking?`<div class="pg-result-pair"><div><span>Same feed · no intervention</span><strong>${state.baselineChoices} deliberate choices</strong><small>${credits(state.baselineRevenue)} billed</small></div><div><span>Your interventions</span><strong>${state.selfDirected} deliberate choices</strong><small>${credits(state.revenue)} billed · ${HACK_BUDGET-state.budget} intervention points used</small></div></div><p><b>Return to Terranova:</b> the same activity can be valued as revenue, independent judgment, or collective inquiry. Who gets to set that value, and who can change it?</p>`:`<div class="pg-result-pair"><div><span>What the ledger saw</span><strong>${credits(state.revenue)}</strong><small>${state.history.reduce((s,h)=>s+h.opened,0)} impressions · ${state.history.reduce((s,h)=>s+h.continued,0)} engaged sessions</small></div><div><span>What it did not</span><strong>${state.history.reduce((s,h)=>s+h.reconsidered,0)} reconsiderations</strong><small>${left} readers gone · energy ${Math.round(state.readers.reduce((s,x)=>s+x.energy,0)/1.2)}%</small></div></div>`;
 $('pg-switch').hidden=hacking;$('pg-restart').hidden=!hacking;renderGuide();$('pg-result').focus({preventScroll:true});
}
$('pg-switch').addEventListener('click',()=>{state=beginHack(state);journal=[];alignment='preference';learners.preference=forkLearner(learners.revenue);phase='choose';lastUpdate=null;tool='question';channel=3;training=null;reached=new Set(['generate']);$('pg-result').hidden=true;$('pg-feedback').textContent='Same feed, a different purpose. Pick a goal for the recommender and test its suggested intervention. White ticks on the bars show your original feed.';toGenerate();$('pg-alignment').scrollIntoView({block:'start',behavior:'instant'});});
$('pg-restart').addEventListener('click',()=>start(false));
new MutationObserver(()=>{if($('social').hidden){stopWriter();pauseLive();}}).observe($('social'),{attributes:true,attributeFilter:['hidden']});document.addEventListener('visibilitychange',()=>{if(document.hidden){stopWriter();pauseLive();}});
window.addEventListener('resize',()=>{if(posts.length&&station==='generate')renderWriter();});
