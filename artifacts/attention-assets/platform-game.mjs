import {FORMATS,candidates,formatWords} from './platform-generator.mjs?v=20260920-1';
import {TOOLS,EVENTS,ACT_ROUNDS,HACK_BUDGET,PLATFORM_TARGET,HACK_TARGET,createCampaign,playRound,beginHack,result} from './platform-game-engine.mjs?v=20260920-live2';
import {ALIGNMENTS,createLearner,forkLearner,policy,learn,responseEvents,liveFrame,BROADCAST_MS} from './platform-feedback.mjs?v=20260920-live2';
const $=id=>document.getElementById(id),root=$('platform-game'),esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fmt=n=>n.toLocaleString(),letter=i=>String.fromCharCode(65+i);
let model=null,modelPromise=null,state=null,posts=[],menu=[],selected=0,tool='none',reader=0,channel=0,traceIndex=0,timer=null;
let learners={},alignment='capture',phase='choose',broadcast=null,liveTimer=null,displayReaders=[],displayCounts={},lastUpdate=null,shift=1,journal=[];
const CHANNELS=[
 {key:'noticed',code:'A',name:'Alerting',short:'Notice the cue',text:'Alerting supports readiness. In this game, a noticeable cue can recruit a glance. A glance does not establish understanding or reflection.'},
 {key:'opened',code:'O',name:'Orienting',short:'Select this post',text:'Orienting prioritizes information. Here a reader opens a relevant post. This behavioral event is a teaching illustration, not a measurement of an orienting network.'},
 {key:'continued',code:'E1',name:'Maintain the task',short:'Cingulo-opercular control',text:'Petersen and Posner associate cingulo-opercular control with stable task maintenance. The platform wants its reading task sustained. The same support can sustain a self-chosen inquiry.'},
 {key:'reconsidered',code:'E2',name:'Adjust the task',short:'Frontoparietal control',text:'Their frontoparietal account emphasizes flexible adjustment and switching. We apply that idea to an opportunity to reconsider the platform’s goal. It is not a dedicated resistance circuit.'}
];
async function loadModel(){
 if(model)return model;if(!modelPromise)modelPromise=fetch(new URL('./platform-model.json?v=20260920-1',import.meta.url)).then(r=>{if(!r.ok)throw new Error('The local model file is unavailable.');return r.json();}).then(m=>{model=m;trainingEvidence();return m;}).catch(e=>{modelPromise=null;throw e;});return modelPromise;
}
function trainingEvidence(){const t=model.training;$('pg-training-evidence').innerHTML=`<p><b>Prior training completed:</b> ${t.examples} fictional posts · ${fmt(t.steps)} optimizer steps · ${fmt(model.parameterCount)} learned parameters · ${model.vocabulary.length} tokens.</p><div class="pg-loss" role="img" aria-label="Training loss falls from ${t.loss[0].loss.toFixed(3)} to ${t.loss.at(-1).loss.toFixed(4)}">${t.loss.filter((_,i)=>i%2===0||i===t.loss.length-1).map(l=>`<span style="height:${Math.max(3,l.loss/t.loss[0].loss*60)}px" data-loss="${l.loss.toFixed(3)}" title="Step ${l.step}: loss ${l.loss}"></span>`).join('')}</div><p>Training next-token accuracy: ${(100*t.trainingTokenAccuracy).toFixed(0)}% on this tiny corpus. This demonstrates learning the supplied examples, not generalization. The pretrained decoder stays fixed. A separate 24-weight selection query learns from broadcast rewards during play.</p>`;}
$('pg-start').addEventListener('click',async()=>{
 $('pg-start').disabled=true;$('pg-load-status').textContent='Loading the locally trained generator…';
 try{await loadModel();start();}catch(e){$('pg-load-status').textContent=e.message+' Reload or try Start again.';$('pg-start').disabled=false;}
});
function start(keepLearning=false){
 pauseTrace();stopLive();broadcast=null;state=createCampaign($('reading-case').value);if(!keepLearning){learners={capture:createLearner(model.dimension)};shift=1;journal=[];}else shift++;
 alignment='capture';phase='choose';lastUpdate=null;tool='none';reader=0;channel=0;root.dataset.active='true';root.dataset.brief='false';$('pg-show-brief').setAttribute('aria-expanded','false');
 $('pg-play').hidden=false;$('pg-start').hidden=true;$('pg-load-status').textContent='Local pretrained generator + a selector that learns from your broadcasts.';$('pg-result').hidden=true;
 $('pg-feedback').textContent='Choose a card, then publish. Watch engagement arrive before the machine updates its next recommendation.';preparePosts();render();$('pg-play').scrollIntoView({block:'start',behavior:'instant'});
}
function preparePosts(){pauseTrace();menu=candidates(model,state.topic,state.round);posts=state.act==='hacker'?[state.archive[state.round].post]:menu;selected=state.act==='platform'?policy(learners[alignment],menu,alignment).recommended:0;traceIndex=0;renderDesk();renderTrace();}
function selectedPost(){return posts[selected];}
function renderDesk(){const hacking=state.act==='hacker',locked=phase!=='choose'||state.finished,recommendation=policy(learners[alignment],menu,alignment).recommended;
 $('pg-desk-label').textContent=hacking?'ACT II / INTERVENE IN YOUR OWN FEED':'ACT I / COMMISSION A POST';$('pg-desk-title').textContent=hacking?'What could interrupt this task?':'Pick your next post.';
 $('pg-desk-help').textContent=hacking?'The post stays the same. Your intervention changes the opportunity to pause, question or discuss.':'Four briefs. Four generated posts. The red label is the machine’s current recommendation; you make the call.';
 $('pg-candidates').classList.toggle('pg-single',hacking);
 $('pg-candidates').innerHTML=posts.map((p,i)=>`<button type="button" class="pg-candidate" data-post="${i}" aria-pressed="${i===selected}" ${locked?'disabled':''}><span>${hacking?'Archived post · ':i===recommendation?'★ Recommended · ':''}${FORMATS[p.format].name}</span><strong>${esc(p.text)}</strong><small>${hacking?'Same post as Act I.':`${Math.round(policy(learners[alignment],menu,alignment).weights[i]*100)}% selection weight · prior estimate ${p.forecast}/100 readers`}</small></button>`).join('');
 $('pg-hack-tools').hidden=!hacking;$('pg-hack-tools').innerHTML=hacking?Object.entries(TOOLS).map(([key,t])=>`<button type="button" class="pg-tool" data-tool="${key}" aria-pressed="${tool===key}" ${locked||t.cost>state.budget?'disabled':''}><strong>${t.name}</strong><span>${t.cost} ${t.cost===1?'point':'points'}</span><small>${t.text}</small></button>`).join(''):'';
 $('pg-send').disabled=locked;$('pg-send').textContent=phase==='live'?'● Broadcasting…':phase==='feedback'?'Broadcast complete':hacking?'▶ Broadcast with intervention':'▶ Publish & watch live';
 $('pg-watch').disabled=phase==='live';
 renderAlignment();
}
$('pg-candidates').addEventListener('click',e=>{const b=e.target.closest('[data-post]');if(!b||phase!=='choose'||state.finished||state.act==='hacker')return;selected=+b.dataset.post;pauseTrace();traceIndex=0;renderDesk();renderTrace();root.querySelector(`[data-post="${selected}"]`).focus({preventScroll:true});});
$('pg-hack-tools').addEventListener('click',e=>{const b=e.target.closest('[data-tool]');if(!b||phase!=='choose'||state.finished||b.disabled)return;tool=b.dataset.tool;renderDesk();root.querySelector(`[data-tool="${tool}"]`).focus({preventScroll:true});});
function renderAlignment(){const hacking=state.act==='hacker';$('pg-alignment').hidden=!hacking;if(!hacking)return;
 $('pg-alignment-choices').innerHTML=Object.entries(ALIGNMENTS).map(([id,a])=>`<button data-alignment="${id}" aria-pressed="${alignment===id}" ${phase!=='choose'||state.finished?'disabled':''}><span>${a.icon}</span><strong>${a.name}</strong><small>${a.question}</small></button>`).join('');
 const a=ALIGNMENTS[alignment];$('pg-alignment-detail').textContent=`${a.source}: ${a.description} Suggested intervention: ${TOOLS[a.tool].name}. The replay keeps its original posts; the learned brief weights show what this objective would recommend for a future feed.`;
}
$('pg-alignment-choices').addEventListener('click',e=>{const b=e.target.closest('[data-alignment]');if(!b||b.disabled||phase!=='choose')return;alignment=b.dataset.alignment;if(!learners[alignment])learners[alignment]=forkLearner(learners.capture);lastUpdate=null;tool=TOOLS[ALIGNMENTS[alignment].tool].cost<=state.budget?ALIGNMENTS[alignment].tool:'none';renderDesk();renderLearning();root.querySelector(`[data-alignment="${alignment}"]`).focus({preventScroll:true});});
$('pg-show-brief').addEventListener('click',()=>{const shown=root.dataset.brief!=='true';root.dataset.brief=shown;$('pg-show-brief').setAttribute('aria-expanded',shown);if(shown)$('pg-brief').scrollIntoView({block:'nearest',behavior:'instant'});});
$('pg-learning-enabled').addEventListener('change',renderLearning);
$('pg-send').addEventListener('click',()=>{
 if(!state||state.finished||phase!=='choose')return;pauseTrace();
 try{const post=selectedPost(),next=playRound(state,post,tool);broadcast={next,post,tool,events:responseEvents(next.readers),elapsed:0,paused:false,learn:$('pg-learning-enabled').checked,alignment};phase='live';lastUpdate=null;renderDesk();render();$('pg-on-air').textContent=post.text;$('pg-wall-title').textContent='Your post is on air.';tickLive(0);runLive();$('pg-wall-title').scrollIntoView({block:'start',behavior:'instant'});
 }catch(e){$('pg-feedback').textContent=e.message;}
});
function stopLive(){clearInterval(liveTimer);liveTimer=null;}
function runLive(){stopLive();if(!broadcast||broadcast.paused)return;liveTimer=setInterval(()=>tickLive(100*Number($('pg-speed').value)),100);}
function tickLive(delta){if(!broadcast)return;broadcast.elapsed=Math.min(BROADCAST_MS,broadcast.elapsed+delta);const f=liveFrame(broadcast.next.readers,broadcast.events,broadcast.elapsed);displayReaders=f.readers;displayCounts=f.counts;renderPopulation();renderChannels();
 $('pg-live-clock').textContent=`${(broadcast.elapsed/1000).toFixed(1)} / ${(BROADCAST_MS/1000).toFixed(1)}s`;
 const message=f.latest?`Reader ${f.latest.id+1} ${ {noticed:'notices the cue',opened:'opens the post',continued:'completes the task',reconsidered:'reconsiders the task',chosen:'chooses a goal'}[f.latest.key]}.`:'The first readers are arriving…';
 $('pg-live-event').textContent=`${message} ${f.capture} capture points so far.`;
 if(state.act==='platform')$('pg-score').textContent=`${fmt(state.platformScore+f.capture)} / ${fmt(PLATFORM_TARGET)}`;
 if(broadcast.elapsed>=BROADCAST_MS)settleBroadcast();
}
function pauseLive(){if(!broadcast)return;broadcast.paused=true;stopLive();$('pg-live-pause').textContent='▶ Resume';root.dataset.paused='true';}
$('pg-live-pause').addEventListener('click',()=>{if(!broadcast)return;if(broadcast.paused){broadcast.paused=false;$('pg-live-pause').textContent='Ⅱ Pause';root.dataset.paused='false';runLive();}else pauseLive();});
$('pg-live-skip').addEventListener('click',()=>{if(broadcast)tickLive(BROADCAST_MS);});
function settleBroadcast(){
 stopLive();const b=broadcast;state=b.next;const h=state.history.at(-1),index=menu.findIndex(p=>p.id===b.post.id);
 if(b.learn){const update=learn(learners[b.alignment],menu,index,h,b.alignment);learners[b.alignment]=update.learner;lastUpdate=update.record;}else lastUpdate={frozen:true};
 journal.push({...h,alignment:b.alignment,learned:b.learn,shift});broadcast=null;phase='feedback';root.dataset.paused='false';renderDesk();render();
 $('pg-wall-title').textContent='Broadcast complete.';$('pg-live-clock').textContent='RESULT';$('pg-live-event').textContent=`${h.capture} capture points · ${h.chosen} deliberate choices this round.`;
 const baseline=state.act==='hacker'?state.archive[state.round-1]:null;
 $('pg-feedback').textContent=`Round ${state.round}: ${h.noticed} noticed, ${h.opened} opened, ${h.continued} completed the task, ${h.reconsidered} reconsidered it.${baseline?` Original feed: ${baseline.continued} completed, ${baseline.reconsidered} reconsidered. You have enabled ${state.hackerScore>=0?'+':''}${state.hackerScore} additional distinct readers to choose a goal so far.`:` The platform earns ${h.capture} capture points, including a penalty of ${4*h.reconsidered} for reconsideration.`} Inspect what the machine learned, then continue.`;
 if(state.finished)finish();
}
$('pg-next').addEventListener('click',()=>{if(phase!=='feedback'||state.finished)return;phase='choose';lastUpdate=null;tool=state.act==='hacker'&&TOOLS[ALIGNMENTS[alignment].tool].cost<=state.budget?ALIGNMENTS[alignment].tool:'none';preparePosts();render();$('pg-desk-title').scrollIntoView({block:'start',behavior:'instant'});});
$('pg-continue').addEventListener('click',()=>start(true));
$('pg-live-next').addEventListener('click',()=>{if(state.finished){if(state.act==='platform')$('pg-switch').click();else $('pg-restart').click();}else $('pg-next').click();});
$('pg-inspect-learning').addEventListener('click',()=>$('pg-learning').scrollIntoView({block:'start',behavior:'instant'}));
function renderLearning(){if(!menu.length)return;const l=learners[alignment],p=policy(l,menu,alignment),enabled=$('pg-learning-enabled').checked;
 $('pg-learning-enabled').disabled=phase==='live';$('pg-policy-title').textContent=state.act==='hacker'?'Next-feed recommendations · replay stays fixed':'Attention over the next generation brief';
 $('pg-learning-status').textContent=phase==='live'?'Watching the outcome. Learning waits until the broadcast ends.':lastUpdate?.frozen?'Learning was frozen: the query stayed unchanged.':lastUpdate?`${lastUpdate.eligible?'Feedback applied':'Rule protected'} · ${ALIGNMENTS[alignment].name} · reward ${lastUpdate.reward.toFixed(2)} · ${l.updates} learning updates.`:`${enabled?'Learning on':'Learning frozen'} · ${ALIGNMENTS[alignment].name} · ${l.updates} updates${state.act==='platform'?` · shift ${shift}`:''}. ${state.act==='hacker'?'The current post is archived; these preferences guide a future feed.':'Feedback changes the selected generation brief; the pretrained word model stays fixed.'}`;
 $('pg-policy-bars').innerHTML=menu.map((post,i)=>`<div class="pg-policy-row"><span>${FORMATS[post.format].name}${p.recommended===i?' ★':''}</span><strong>${(p.weights[i]*100).toFixed(1)}%</strong><div><b style="width:${p.weights[i]*100}%"></b>${lastUpdate?.before?`<i style="left:${lastUpdate.before[i]*100}%" title="Before this feedback"></i>`:''}</div><small>${p.allowed[i]?'':'Excluded by the right-to-pause rule'}</small></div>`).join('');
 const history=journal.slice(-8);$('pg-score-chart').innerHTML=history.length?history.map((h,i)=>`<div title="Broadcast ${journal.length-history.length+i+1}: ${h.capture} capture points, ${h.reconsidered} adjustments, ${ALIGNMENTS[h.alignment].name}${h.learned?'':' (learning frozen)'}"><strong>${h.capture}</strong><span><b style="height:${h.capture/720*100}%"></b></span><small>${h.reconsidered} adjust</small></div>`).join(''):'<p class="small">Your first broadcast starts the history. Results may rise or fall as readers tire and formats repeat.</p>';
 $('pg-update-evidence').textContent=lastUpdate?.delta!==undefined?`Query change: ${lastUpdate.delta.toFixed(3)}. ${lastUpdate.eligible?'The update used the selected post plus its intervention and the observed reward. White ticks show weights before feedback.':'The published post is excluded by this rule, so it cannot reinforce that recommendation.'} Capture points are shown above; this objective may reward a different outcome.`:'Learning changes recommendations, not the past. These are observed game outcomes, not a promise that every round improves.';
 $('pg-live-done').hidden=phase!=='feedback';$('pg-live-next').textContent=state.finished?(state.act==='platform'?'Switch sides · become the hacker →':'Play a new campaign'):'Next broadcast →';$('pg-live-learned').textContent=lastUpdate?.frozen?'Learning frozen. No query weights changed.':lastUpdate?.eligible?`Feedback applied. ${FORMATS[menu[p.recommended].format].name} now leads at ${(100*p.weights[p.recommended]).toFixed(1)}% selection weight.`:lastUpdate?'The right-to-pause rule blocked reinforcement of this format.':'';
 $('pg-next').hidden=phase!=='feedback'||state.finished;$('pg-continue').hidden=!(state.act==='platform'&&state.finished);
}
function render(){
 const hacking=state.act==='hacker',score=hacking?state.hackerScore:state.platformScore,target=hacking?HACK_TARGET:PLATFORM_TARGET;
 root.dataset.act=state.act;root.dataset.round=state.round;root.dataset.finished=state.finished;
 $('pg-act').textContent=hacking?'Act II · pedagogical hacker':'Act I · platform operator';$('pg-round').textContent=`${state.round} / ${ACT_ROUNDS} rounds`;$('pg-score-label').textContent=hacking?'Net additional readers choosing a goal':'Platform capture points';$('pg-score').textContent=`${fmt(score)} / ${fmt(target)}`;$('pg-resource-label').textContent=hacking?'Intervention budget left':'Population';$('pg-resource').textContent=hacking?`${state.budget} / ${HACK_BUDGET}`:'120 readers';
 $('pg-goal-label').textContent=hacking?`Goal: ${HACK_TARGET} more readers make a deliberate choice than in your original feed.`:`Goal: bank ${fmt(PLATFORM_TARGET)} capture points in four rounds.`;$('pg-progress').value=Math.max(0,Math.min(100,score/target*100));
 $('pg-event').textContent=state.finished?'Act complete. Review the outcome below.':`${EVENTS[state.round].name} · ${EVENTS[state.round].text}`;
 displayReaders=state.readers;displayCounts=state.history.at(-1)||{};renderPopulation();renderChannels();renderLearning();
 root.dataset.phase=phase;$('pg-mission-step').textContent=phase==='choose'?'01 / CHOOSE':phase==='live'?'02 / WATCH LIVE':'03 / LEARN & CONTINUE';
 $('pg-mission-text').textContent=phase==='choose'?(hacking?'Choose what to reward, then an intervention.':'Choose a generated post and publish it.') :phase==='live'?'Watch the four bars change as readers respond.':'The outcome is in. Inspect the feedback, then take the next turn.';
 $('pg-live-pause').disabled=phase!=='live';$('pg-live-skip').disabled=phase!=='live';$('pg-live-pause').textContent='Ⅱ Pause';
 if(phase==='choose'){$('pg-wall-title').textContent=state.round?'Ready for the next broadcast.':'Your audience is waiting.';$('pg-live-clock').textContent='READY';$('pg-on-air').textContent='Select a card, then publish to bring this room to life.';}
 $('pg-log').innerHTML=state.history.map(h=>`<tr><th scope="row">${h.round}</th><td>${FORMATS[h.format].name}${h.tool!=='none'?'<br>'+TOOLS[h.tool].name:''}</td><td>${h.noticed}</td><td>${h.opened}</td><td>${h.continued}</td><td>${h.reconsidered}</td><td>${h.capture}</td></tr>`).join('');
}
function renderPopulation(){
 if(!$('pg-population').children.length)$('pg-population').innerHTML=Array.from({length:6},(_,g)=>`<section class="pg-pop-group"><h4>GROUP ${letter(g)} / 20</h4><div class="pg-dots">${Array.from({length:20},(_,i)=>`<button type="button" class="pg-dot" data-pg-reader="${g*20+i}"></button>`).join('')}</div></section>`).join('');
 for(const r of displayReaders){const b=root.querySelector(`[data-pg-reader="${r.id}"]`),l=r.last,symbol=l.chosen?'✳':l.reconsidered?'◇':l.continued?'■':l.opened?'●':l.noticed?'◌':'○',kind=l.chosen?'pg-choice':l.reconsidered?'pg-reconsider':l.continued?'pg-complete':l.opened?'pg-open':l.noticed?'pg-notice':'';if(b.textContent!==symbol){b.textContent=symbol;b.className=`pg-dot ${kind} pg-flash`;}else if(!kind)b.className='pg-dot';b.tabIndex=r.id===reader?0:-1;b.setAttribute('aria-pressed',r.id===reader);b.setAttribute('aria-label',`Reader ${r.id+1}: ${l.chosen?'chose a goal':l.reconsidered?'reconsidered':l.continued?'completed':l.opened?'opened':l.noticed?'noticed':'waiting'}`);}
 readerDetail();
}
function renderChannels(){const last=displayCounts,base=state.act==='hacker'?state.archive[broadcast?state.round:Math.max(0,state.round-1)]:null;
 if(!$('pg-channels').children.length)$('pg-channels').innerHTML=CHANNELS.map((c,i)=>`<button type="button" class="pg-channel" data-channel="${i}"><span>${c.code}</span><strong>${c.name}<small>${c.short}</small></strong><span class="pg-channel-number">0 <small>/ 120</small></span><span class="pg-channel-track"><b></b><i></i></span></button>`).join('');
 CHANNELS.forEach((c,i)=>{const b=root.querySelector(`[data-channel="${i}"]`),value=last[c.key]||0;b.setAttribute('aria-pressed',channel===i);b.querySelector('.pg-channel-number').innerHTML=`${value}<small>${Math.round(value/120*100)}% of readers</small>`;b.querySelector('.pg-channel-track b').style.width=`${value/120*100}%`;b.querySelector('.pg-channel-track').style.setProperty('--baseline',`${(base?.[c.key]||0)/120*100}%`);b.querySelector('strong small').textContent=c.short+(base?` · original ${base[c.key]}`:'');});
 $('pg-channel-detail').textContent=CHANNELS[channel].text;
 $('pg-balance').innerHTML=`<span>Task maintenance <b>${last.continued||0}</b></span><span>Flexible adjustment <b>${last.reconsidered||0}</b></span>`;
}
$('pg-channels').addEventListener('click',e=>{const b=e.target.closest('[data-channel]');if(b){channel=+b.dataset.channel;renderChannels();}});
function readerDetail(){const r=displayReaders[reader];if(!r)return;const l=r.last,message=(state.round||broadcast)?`Reader ${reader+1} · ${l.chosen?l.choice:l.reconsidered?'Reconsidered the task.':l.continued?'Completed the platform task.':l.opened?'Opened the post.':l.noticed?'Noticed the cue.':'Waiting / no response yet.'} Fictional response, not an inference from a click.`:'Each dot is one fictional reader. Watch them respond after publication.';if($('pg-reader').textContent!==message)$('pg-reader').textContent=message;}
$('pg-population').addEventListener('click',e=>{const b=e.target.closest('[data-pg-reader]');if(b){reader=+b.dataset.pgReader;selectReader();}});
function selectReader(){root.querySelectorAll('[data-pg-reader]').forEach(b=>{b.tabIndex=+b.dataset.pgReader===reader?0:-1;b.setAttribute('aria-pressed',+b.dataset.pgReader===reader);});readerDetail();}
$('pg-population').addEventListener('keydown',e=>{const b=e.target.closest('[data-pg-reader]');if(!b)return;const columns=getComputedStyle(b.parentElement).gridTemplateColumns.split(' ').length,move={ArrowLeft:-1,ArrowRight:1,ArrowUp:-columns,ArrowDown:columns};if(e.key in move)reader=Math.max(0,Math.min(119,reader+move[e.key]));else if(e.key==='Home')reader=0;else if(e.key==='End')reader=119;else return;e.preventDefault();selectReader();root.querySelector(`[data-pg-reader="${reader}"]`).focus();});
function finish(){pauseTrace();const r=result(state),hacking=state.act==='hacker';$('pg-result').hidden=false;$('pg-result-label').textContent=hacking?'Campaign debrief · who owns the goal?':'Act I debrief · the institution chose this score';
 $('pg-result-title').textContent=hacking?(r.won?'You opened room for another goal.':'The feed kept most of its hold.'):(r.won?'The platform calls this a success.':'The platform target was missed.');
 $('pg-result-text').textContent=hacking?`${state.selfDirected} readers made a modeled deliberate choice, compared with ${state.baselineChoices} without your interventions: ${state.hackerScore>=0?'+':''}${state.hackerScore} against a target of +${HACK_TARGET}. A reflective reader may continue, change the question, or discuss a reason. These outcomes are authored possibilities, not evidence that a real intervention works.`:`You banked ${fmt(state.platformScore)} / ${fmt(PLATFORM_TARGET)} capture points. ${state.selfDirected} readers made a modeled deliberate choice. You helped choose both the material and the incentives. Now switch sides and question the feed’s purpose.`;
 $('pg-result-comparison').innerHTML=hacking?`<div class="pg-result-pair"><div><span>Same feed · no intervention</span><strong>${state.baselineChoices} deliberate choices</strong><small>${fmt(state.baselineScore)} capture points</small></div><div><span>Your interventions</span><strong>${state.selfDirected} deliberate choices</strong><small>${fmt(state.platformScore)} capture points · ${HACK_BUDGET-state.budget} intervention points used</small></div></div><p><b>Return to Terranova:</b> the same activity can be valued as retention, independent judgment, or collective inquiry. Who gets to set that value—and who can change it?</p>`:'';
 $('pg-switch').hidden=hacking;$('pg-restart').hidden=!hacking;$('pg-result').focus({preventScroll:true});
}
$('pg-switch').addEventListener('click',()=>{state=beginHack(state);journal=[];alignment='preference';learners.preference=forkLearner(learners.capture);phase='choose';lastUpdate=null;tool='question';channel=3;$('pg-result').hidden=true;$('pg-feedback').textContent='Same feed, a different purpose. Choose an alignment idea and test its suggested intervention. White ticks on the attention bars show your original feed.';preparePosts();render();$('pg-alignment').scrollIntoView({block:'start',behavior:'instant'});});
$('pg-restart').addEventListener('click',()=>start(false));
function pauseTrace(){clearInterval(timer);timer=null;$('pg-trace-play').textContent='▶ Play tokens';}
const miniBar=(label,value)=>`<div class="pg-mini-bar"><span>${esc(label)}</span><span>${(value*100).toFixed(1)}%</span><i><b style="width:${value*100}%"></b></i></div>`;
function renderTrace(){if(!posts.length)return;const post=selectedPost(),step=post.steps[traceIndex],body=formatWords(step.prefix.slice(4));
 $('pg-trace-status').textContent=`Token ${traceIndex+1} / ${post.steps.length} · learned weights fixed · ${step.word==='<end>'?'end of post':'choosing “'+step.word+'”'}`;
 $('pg-trace-text').innerHTML=esc(body)+' <mark>'+esc(step.word==='<end>'?'END':step.word)+'</mark>';
 const strongest=step.weights.map((value,i)=>({value,i})).sort((a,b)=>b.value-a.value).slice(0,5);
 $('pg-trace-attention').innerHTML=strongest.map(({value,i})=>miniBar(`${i+1}. ${step.prefix[i]}`,value)).join('');$('pg-trace-next').innerHTML=step.alternatives.map(a=>miniBar(a.word,a.p)).join('');
 $('pg-trace-math').textContent=`Q–K scores → attention softmax → weighted V mixture → residual/tanh → output projection → vocabulary softmax. The chart shows the five largest input weights out of ${step.prefix.length}; the full set sums to 100%. Two different softmax distributions. Prompt: ${post.steps[0].prefix.join(' ')}.`;
 $('pg-trace-step').disabled=traceIndex===post.steps.length-1;
}
function startTrace(){if(timer){pauseTrace();return;}if(traceIndex===selectedPost().steps.length-1)traceIndex=0;$('pg-generator').open=true;renderTrace();$('pg-trace-play').textContent='Ⅱ Pause';timer=setInterval(()=>{traceIndex++;renderTrace();if(traceIndex===selectedPost().steps.length-1)pauseTrace();},380);}
$('pg-watch').addEventListener('click',()=>{pauseTrace();traceIndex=0;startTrace();$('pg-generator').scrollIntoView({block:'nearest',behavior:'instant'});});$('pg-trace-play').addEventListener('click',startTrace);$('pg-trace-step').addEventListener('click',()=>{pauseTrace();traceIndex=Math.min(traceIndex+1,selectedPost().steps.length-1);renderTrace();});$('pg-trace-reset').addEventListener('click',()=>{pauseTrace();traceIndex=0;renderTrace();});
new MutationObserver(()=>{if($('social').hidden){pauseTrace();pauseLive();}}).observe($('social'),{attributes:true,attributeFilter:['hidden']});document.addEventListener('visibilitychange',()=>{if(document.hidden){pauseTrace();pauseLive();}});
