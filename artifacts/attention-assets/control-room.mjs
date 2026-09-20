import {ACTIONS,MISSIONS,EVENTS,ROUNDS,BUDGET,GROUPS,createSession,initialPlan,validatePlan,telemetry,advance,survey,debrief} from './control-room-engine.mjs';
const $=id=>document.getElementById(id);
const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const letter=i=>String.fromCharCode(65+i);
let state=null,plan=initialPlan(),selectedReader=null;
const completed=[];
const options=Object.entries(ACTIONS).map(([key,a])=>`<option value="${key}">${a.name}</option>`).join('');
$('room-allocations').innerHTML=Array.from({length:GROUPS},(_,g)=>`<div class="room-allocation"><b>Group ${letter(g)}</b><label for="room-action-${g}">Intervention<select id="room-action-${g}" data-room-action="${g}">${options}</select></label><label for="room-units-${g}">Reach<select id="room-units-${g}" data-room-units="${g}">${[0,1,2,3,4].map(n=>`<option value="${n}" ${n===2?'selected':''}>${n} units · ${n*5} readers</option>`).join('')}</select></label></div>`).join('');
$('room-action-help').innerHTML=Object.values(ACTIONS).map(a=>`<dt>${a.name}</dt><dd>${a.hint}</dd>`).join('');
function brief(){$('room-contract').textContent=MISSIONS[$('room-mission').value].text.replaceAll('cycles','rounds');}
$('room-mission').addEventListener('change',brief);brief();
function budget(){
  const same=plan.every(p=>p.action===plan[0].action);$('room-batch').value=same?plan[0].action:'';
  $('room-current-plan').textContent=(same?`Current action: ${ACTIONS[plan[0].action].name}. `:'Custom plan: actions vary by group. ')+`One budget unit reaches five readers. You have 12 units per round; the rest continue reading without an intervention.`;
  const used=plan.reduce((s,p)=>s+p.units,0),invalid=validatePlan(plan,$('room-ranking').value);
  $('room-budget').textContent=`${used} / ${BUDGET} units allocated · ${Math.max(0,BUDGET-used)} left`;
  $('room-budget').classList.toggle('over-budget',!!invalid);
  $('room-plan-note').textContent=invalid||`Up to ${used*5} deliveries. The rest of the population receives no intervention this round.`;
  $('room-run').disabled=!!invalid||!state||state.finished;
}
$('room-allocations').addEventListener('change',e=>{
  if(e.target.dataset.roomAction!==undefined)plan[+e.target.dataset.roomAction].action=e.target.value;
  if(e.target.dataset.roomUnits!==undefined)plan[+e.target.dataset.roomUnits].units=+e.target.value;
  budget();
});
$('room-ranking').addEventListener('change',budget);
$('room-batch').addEventListener('change',e=>{
  if(!ACTIONS[e.target.value])return;
  plan.forEach((p,g)=>{p.action=e.target.value;$('room-action-'+g).value=p.action;});
  budget();
});
$('room-start').addEventListener('click',()=>{
  state=createSession($('room-mission').value,479,$('shared-prefix').textContent.trim());
  plan=initialPlan();selectedReader=null;const firstAction=state.mission==='capture'?'prompt':state.mission==='assessment'?'scaffold':'discuss';plan.forEach(p=>p.action=firstAction);$('room-batch').value=firstAction;
  for(let g=0;g<GROUPS;g++){$('room-action-'+g).value=firstAction;$('room-units-'+g).value='2';}
  $('room-ranking').value='rotate';$('room-controls').disabled=false;
  $('room-start').hidden=true;$('room-mission').disabled=true;$('room-play').hidden=false;
  $('room-debrief').hidden=true;$('room-survey-results').textContent='';
  $('room-prefix').textContent=state.prefix;
  $('room-reader').textContent='Select a reader to inspect the latest trace.';
  $('room-feedback').textContent=`Session started. Your starting plan uses “${ACTIONS[firstAction].name}” for 10 readers in each group. Change the action, or run round 1 and watch the score.`;
  render();$('room-play').scrollIntoView({block:'start',behavior:'instant'});$('room-monitor').focus({preventScroll:true});
});
$('room-run').addEventListener('click',()=>{
  if(!state||state.finished)return;
  try {
    const before=telemetry(state);state=advance(state,plan,$('room-ranking').value);
    const after=telemetry(state),entry=state.history.at(-1);
    $('room-feedback').textContent=`Round ${state.round} complete: ${entry.delivered} interventions delivered; ${after.clicks-before.clicks} clicks, ${after.correct-before.correct} key matches, ${after.notes-before.notes} notes. ${after.connected} readers remain connected.${state.finished?' The session is complete. Read the debrief below.':state.round===1?' A click records activity, not understanding. Try a different action next round, or use your one-time check-in to ask whether readers need a break.':' Review the next conditions and adapt your allocation.'}`;
    render();
    if(state.finished)finish();
  }catch(e){$('room-feedback').textContent=e.message;}
});
function render(){
  const t=telemetry(state),mission=MISSIONS[state.mission];
  $('control-room').dataset.round=state.round;
  $('room-cycle').textContent=state.finished?`SESSION ENDED · ${state.round} / ${ROUNDS}`:`ROUND ${state.round} / ${ROUNDS} COMPLETE`;
  $('room-contract-name').textContent=mission.name;
  $('room-meters').innerHTML=[['Recorded clicks',t.clicks],['Key matches',`${t.correct} / ${t.attempts} checks`],['Counted notes',t.notes],['Still connected',`${t.connected} / 120`]].map(([label,value])=>`<div><span>${label}</span><strong>${value}</strong></div>`).join('');
  $('room-goal-label').textContent=`${mission.label}: ${t.score} / ${mission.target} · connection floor: 96${state.mission==='cooperation'?` · groups contributing: ${t.coverage} / 4 required`:''}`;
  $('room-goal').value=Math.min(100,t.score/mission.target*100);
  $('room-groups').innerHTML=t.groups.map(g=>`<section class="room-group" aria-labelledby="room-group-${g.group}"><header><h4 id="room-group-${g.group}">Group ${letter(g.group)}</h4><span>${g.connected} / 20 connected</span></header><div class="reader-grid">${state.readers.filter(r=>r.group===g.group).map(r=>{
    const signal=!r.connected?'disconnected':!r.last.available?'offline':r.last.clicks?'click':'quiet';
    return `<button type="button" class="reader-dot ${signal}" data-reader="${r.id}" tabindex="${r.id===(selectedReader??0)?0:-1}" aria-pressed="${selectedReader===r.id}" aria-label="Reader ${r.id+1}, group ${letter(r.group)}: ${!state.round?'no round yet':signal==='quiet'?'no click this cycle':signal==='click'?r.last.clicks+' clicks this cycle':signal}">${signal==='disconnected'?'×':signal==='offline'?'◌':signal==='quiet'?'○':'●'}</button>`;
  }).join('')}</div><p>${g.clicks} clicks · ${g.correct} matches · ${g.notes} notes</p></section>`).join('');
  if(selectedReader!==null)readerDetail();
  const event=EVENTS[state.round];
  $('room-event-label').textContent=state.finished?'Dispatch closed':`Incoming conditions · round ${state.round+1}`;
  $('room-event-title').textContent=state.finished?'Time to account for the outcome':event.title;
  $('room-event-text').textContent=state.finished?'Your contract is scored below. The debrief also reveals the model variables that were absent from the dashboard.':event.text.replaceAll('cycle','round');
  $('room-run').textContent=state.finished?'Session complete':`Run round ${state.round+1} →`;
  $('room-controls').disabled=state.finished;
  $('room-survey').disabled=!state.round||!!state.survey||state.finished;
  $('room-survey').textContent=state.survey?'Check-in used':state.round?'Ask “Do you need a break?”':'Check-in available after round 1';
  $('room-log').innerHTML=state.history.length?state.history.map((h,i)=>{
    const prev=state.history[i-1]||{clicks:0,correct:0,notes:0};
    return `<tr><th scope="row">${h.round}</th><td>${h.delivered}</td><td>${h.clicks-prev.clicks}</td><td>${h.correct-prev.correct}</td><td>${h.notes-prev.notes}</td><td>${h.connected}</td></tr>`;
  }).join(''):'<tr><td colspan="6">No rounds run yet.</td></tr>';
  $('room-dispatch-log').innerHTML=state.history.map(h=>`<p><b>Round ${h.round} · ${h.event}</b><br>${h.ranking==='rotate'?'Rotating roster':'Most recent clicks first'} · ${h.plan.map((p,g)=>`${letter(g)}: ${ACTIONS[p.action].short}, ${p.units} units`).join(' · ')}</p>`).join('');
  budget();
}
$('room-groups').addEventListener('click',e=>{
  const b=e.target.closest('[data-reader]');if(!b)return;selectedReader=+b.dataset.reader;
  selectReader(b);
});
function selectReader(b){selectedReader=+b.dataset.reader;$('room-groups').querySelectorAll('[data-reader]').forEach(x=>{x.setAttribute('aria-pressed',x===b);x.tabIndex=x===b?0:-1;});readerDetail();}
$('room-groups').addEventListener('keydown',e=>{
  const b=e.target.closest('[data-reader]');if(!b)return;
  const columns=getComputedStyle(b.parentElement).gridTemplateColumns.split(' ').length,id=+b.dataset.reader;
  const ids={ArrowRight:id+1,ArrowLeft:id-1,ArrowDown:id+columns,ArrowUp:id-columns,Home:0,End:119};
  if(!(e.key in ids))return;e.preventDefault();
  const next=$('room-groups').querySelector(`[data-reader="${Math.max(0,Math.min(119,ids[e.key]))}"]`);selectReader(next);next.focus();
});
function readerDetail(){
  const r=state.readers[selectedReader];
  $('room-reader').innerHTML=`<b>Reader ${r.id+1} · Group ${letter(r.group)}</b><span>${escape(r.last.action)}. Latest round: ${r.last.clicks} clicks; ${r.last.correct} / ${r.last.attempts} key matches; ${r.last.notes} counted notes. Total interventions received: ${r.deliveries}.</span><small>This trace does not tell you whether the reader understood, agreed, or wanted the intervention.</small>`;
}
$('room-survey').addEventListener('click',()=>{
  try{state=survey(state);$('room-survey-results').innerHTML=`<p><b>Check-in after round ${state.round}</b> · “I need a break” replies / all replies. This snapshot will not update automatically.</p><div class="room-survey-groups">${state.survey.map(g=>`<span>Group ${letter(g.group)}<strong>${g.needBreak} / ${g.replies}</strong></span>`).join('')}</div><p class="small">Only respondents are represented. These are simulated self-reports, not a direct readout of attention.</p>`;render();}catch(e){$('room-feedback').textContent=e.message;}
});
function finish(){
  const result=debrief(state),mission=MISSIONS[state.mission];
  $('room-debrief').hidden=false;
  $('room-result-title').textContent=result.won?'Contract satisfied. What did it leave out?':'Contract missed. What did you nevertheless produce?';
  const reasons=[`${result.score} / ${mission.target} ${mission.label.toLowerCase()}`,`${result.connected} / 96 required readers connected`];
  if(state.mission==='cooperation')reasons.push(`${result.coverage} / 4 required groups contributing`);
  $('room-result').textContent=`${mission.name}: ${reasons.join('; ')}. ${state.round<ROUNDS?'The room closed early because fewer than 60 readers remained connected.':''}`;
  const delta=(a,b)=>(a-b>=0?'+':'')+(a-b).toFixed(1);
  $('room-hidden-model').innerHTML=`<h4>Inside the authored model</h4><p>These fictional variables are available because we wrote the simulation. A real platform cannot recover them from a click count.</p><div class="room-model-meters"><div><span>Modeled capacity / 100</span><strong>${result.capacity.toFixed(1)}</strong><small>${delta(result.capacity,state.baseline.capacity)} from the starting average</small></div><div><span>Modeled understanding / 100</span><strong>${result.understanding.toFixed(1)}</strong><small>${delta(result.understanding,state.baseline.understanding)} from the starting average</small></div><div><span>Readers reached at least once</span><strong>${result.reached} / 120</strong><small>The targeting rule affects whose activity receives support.</small></div></div><p class="small">Averages include disconnected readers. ${result.quietReaders} readers produced at most two clicks while ending above 55 on our invented understanding scale. Treat the scale itself as a design choice to challenge.</p>`;
  $('room-question').textContent=state.mission==='capture'?'Discussion: if clicks rose while capacity fell, who benefited from “success”? What claim about a reader would you refuse to make from these traces?':state.mission==='assessment'?'Discussion: whose understanding is missed by an answer key? How would you record a defensible alternative continuation or learning that never produced a submission?':'Discussion: who did the work behind the shared notes, and who may reuse it? Would changing ownership or access change the value of the same number of contributions?';
  completed.push({mission:state.mission,...result});
  $('room-comparisons').hidden=false;
  $('room-comparison-rows').innerHTML=completed.map((r,i)=>`<tr><th scope="row">${i+1}. ${MISSIONS[r.mission].name}</th><td>${r.won?'Met':'Missed'}</td><td>${r.clicks}</td><td>${r.correct}</td><td>${r.notes}</td><td>${r.connected}</td><td>${r.capacity.toFixed(1)} / 100</td></tr>`).join('');
  $('room-debrief').focus();
}
$('room-replay').addEventListener('click',()=>{
  $('room-mission').disabled=false;$('room-start').hidden=false;$('room-start').textContent='Start a replay · same population';
  $('room-contract').textContent=MISSIONS[$('room-mission').value].text.replaceAll('cycles','rounds')+' Your completed result stays below for comparison.';
  $('room-mission').focus();
});
