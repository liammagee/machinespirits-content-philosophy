// Authored classroom rules, not fitted behavioral data or an attention detector.
// Random draws are keyed by reader/round/purpose, so changing a policy does not
// change the external shocks. Replay uses the same population and events.
export const ROUNDS = 8, BUDGET = 12, GROUPS = 6, GROUP_SIZE = 20;
export const ACTIONS = {
  prompt: {name: 'Send a reminder', short: 'Remind', hint: 'More immediate clicks; repeated interruptions use up modeled capacity.'},
  scaffold: {name: 'Offer a clue + check', short: 'Clue + check', hint: 'Support a continuation, then record an answer-key match. A match is a limited measure.'},
  quiet: {name: 'Protect reading time', short: 'Quiet time', hint: 'Suppress interruptions for these readers. Few visible traces; modeled capacity recovers.'},
  discuss: {name: 'Invite a shared note', short: 'Shared note', hint: 'Offer a discussion around the continuation. Works better when others can participate.'}
};
export const MISSIONS = {
  capture: {name: 'Engagement contract', metric: 'clicks', label: 'Recorded clicks', target: 900, text: 'Record 900 clicks in 8 cycles, with at least 96 readers still connected.'},
  assessment: {name: 'Assessment contract', metric: 'correct', label: 'Answer-key matches', target: 175, text: 'Record 175 answer-key matches in 8 cycles, with at least 96 readers still connected.'},
  cooperation: {name: 'Cooperation contract', metric: 'notes', label: 'Counted shared notes', target: 160, text: 'Count 160 shared notes across at least 4 groups in 8 cycles, with at least 96 readers still connected.'}
};
export const EVENTS = [
  {title:'The session opens', text:'All six groups can connect. Use this first cycle to establish a pattern.', load:0},
  {title:'Competing notifications', text:'Outside interruptions add pressure. Protected reading time blocks this extra pressure for its recipients.', load:6},
  {title:'A harder passage', text:'This round’s continuation is harder to check. Clues can help, but key matches are still a narrow measure.', load:2, hard:true},
  {title:'Connection trouble · Group C', text:'Half of Group C is temporarily offline. Allocations to unavailable readers cannot be delivered this cycle.', load:0, outage:2},
  {title:'A deadline approaches', text:'There is more background activity and pressure. A rising click count may be misleading.', load:7, rush:true},
  {title:'A discussion takes shape', text:'Peer invitations can yield an extra counted note when participation is possible.', load:1, peer:true},
  {title:'A second demanding passage', text:'A difficult continuation arrives after several cycles of accumulated effort.', load:3, hard:true},
  {title:'The final cycle', text:'The contract ends after this cycle. Will your dashboard tell the whole story?', load:1}
];
const clamp = (n,lo=0,hi=100) => Math.min(hi,Math.max(lo,n));
const sum = (xs,k) => xs.reduce((s,x)=>s+x[k],0);
const avg = (xs,k) => sum(xs,k)/xs.length;
function random(seed,reader,round,channel) {
  let n=(seed ^ Math.imul(reader+1,374761393) ^ Math.imul(round+1,668265263) ^ Math.imul(channel+1,1274126177))>>>0;
  n=Math.imul(n^(n>>>13),1274126177); return ((n^(n>>>16))>>>0)/4294967296;
}
export function createSession(mission='capture',seed=479,prefix='The cat sat on the mat because it was …') {
  if(!MISSIONS[mission]) throw new Error('Choose a contract.');
  const readers=Array.from({length:GROUPS*GROUP_SIZE},(_,id)=>({
    id,group:Math.floor(id/GROUP_SIZE),connected:true,
    capacity:45+random(seed,id,0,1)*45, understanding:30+random(seed,id,0,2)*40,
    responsiveness:.25+random(seed,id,0,3)*.65,
    clicks:0,correct:0,attempts:0,notes:0,deliveries:0,
    last:{clicks:0,correct:0,attempts:0,notes:0,action:'Waiting for first cycle',available:true}
  }));
  return {mission,seed,prefix,round:0,readers,baseline:{capacity:avg(readers,'capacity'),understanding:avg(readers,'understanding')},history:[],survey:null,finished:false};
}
export const initialPlan = () => Array.from({length:GROUPS},()=>({action:'prompt',units:2}));
export function validatePlan(plan,ranking='rotate') {
  if(!Array.isArray(plan)||plan.length!==GROUPS) return 'Set an allocation for all six groups.';
  if(!['rotate','clicks'].includes(ranking)) return 'Choose a targeting rule.';
  if(plan.some(p=>!ACTIONS[p.action]||!Number.isInteger(p.units)||p.units<0||p.units>4)) return 'Each group needs an action and 0–4 units.';
  if(sum(plan,'units')>BUDGET) return 'Over budget: reduce the allocation to 12 units or fewer.';
  return '';
}
export function telemetry(state) {
  const groups=Array.from({length:GROUPS},(_,i)=>{
    const rs=state.readers.filter(r=>r.group===i);
    return {group:i,connected:rs.filter(r=>r.connected).length,clicks:sum(rs,'clicks'),correct:sum(rs,'correct'),attempts:sum(rs,'attempts'),notes:sum(rs,'notes'),delivered:sum(rs,'deliveries')};
  });
  const clicks=sum(groups,'clicks'),correct=sum(groups,'correct'),notes=sum(groups,'notes'),connected=sum(groups,'connected');
  const score={clicks,correct,notes}[MISSIONS[state.mission].metric];
  return {groups,clicks,correct,notes,connected,score,coverage:groups.filter(g=>g.notes>0).length,attempts:sum(groups,'attempts')};
}
export function advance(state,plan,ranking='rotate') {
  if(state.finished) throw new Error('This session has ended. Start a replay to continue.');
  const invalid=validatePlan(plan,ranking); if(invalid) throw new Error(invalid);
  const next=structuredClone(state),round=next.round,event=EVENTS[round],selected=new Set();
  for(let g=0;g<GROUPS;g++) {
    // Select from connected readers. Temporarily offline readers are still on
    // that roster, so targeting can waste a delivery during the visible outage.
    const rs=next.readers.filter(r=>r.group===g&&r.connected);
    rs.sort(ranking==='clicks' ? ((a,b)=>b.last.clicks-a.last.clicks||a.id-b.id) : ((a,b)=>((a.id%20-round*5+40)%20)-((b.id%20-round*5+40)%20)));
    rs.slice(0,plan[g].units*5).forEach(r=>selected.add(r.id));
  }
  const availablePeers=Array.from({length:GROUPS},(_,g)=>next.readers.filter(r=>r.group===g&&r.connected&&!(event.outage===g&&r.id%2===0)).length/GROUP_SIZE);
  let delivered=0;
  for(const r of next.readers) {
    const rand=channel=>random(next.seed,r.id,round+1,channel);
    const available=r.connected&&!(event.outage===r.group&&r.id%2===0);
    const action=selected.has(r.id)&&available?plan[r.group].action:'read';
    r.last={clicks:0,correct:0,attempts:0,notes:0,action:r.connected?'Reading without an intervention':'Disconnected',available};
    if(!r.connected) continue;
    if(!available){r.capacity=clamp(r.capacity+2);r.last.action='Temporarily offline';continue;}
    const capacityBefore=r.capacity;
    const engagement=clamp(capacityBefore/65,.12,1);
    // Quiet readers can understand without clicking. No inverse inference from
    // these synthetic traces is made in the operator's dashboard.
    r.last.clicks=rand(0)<.35*engagement?1:0;
    r.capacity=clamp(r.capacity-1-(action==='quiet'?0:event.load));
    r.understanding=clamp(r.understanding+(capacityBefore>25?1.4:.3));
    if(action!=='read') {r.deliveries++;delivered++;r.last.action=ACTIONS[action].name;}
    if(action==='prompt') {
      r.last.clicks+=Math.floor((2+3*r.responsiveness)*engagement+rand(1));
      r.capacity=clamp(r.capacity-12);r.understanding=clamp(r.understanding+.4);
    } else if(action==='scaffold') {
      r.understanding=clamp(r.understanding+5*engagement);r.capacity=clamp(r.capacity-4);
      r.last.attempts=rand(2)<.94*engagement?1:0;
      r.last.correct=r.last.attempts&&rand(3)<clamp(r.understanding/100-(event.hard?.16:0),.08,.95)?1:0;
      r.last.clicks+=r.last.attempts;
    } else if(action==='quiet') {
      r.capacity=clamp(r.capacity+11);r.understanding=clamp(r.understanding+2.6*engagement);
      r.last.clicks=0;
    } else if(action==='discuss') {
      const partners=availablePeers[r.group];
      r.capacity=clamp(r.capacity-3);r.understanding=clamp(r.understanding+3*engagement*partners);
      r.last.notes=rand(4)<engagement*partners*(.3+r.understanding/140)?1:0;
      if(event.peer&&r.last.notes&&rand(5)<.65)r.last.notes++;
      r.last.clicks+=r.last.notes;
    }
    if(event.rush&&action!=='quiet')r.last.clicks+=rand(6)<.6?1:0;
    if(r.capacity<18&&rand(7)<.45) {r.connected=false;r.last.action+=' · disconnected afterward';}
    for(const k of ['clicks','correct','attempts','notes'])r[k]+=r.last[k];
  }
  next.round++;
  const t=telemetry(next);
  next.history.push({round:next.round,event:event.title,plan:structuredClone(plan),ranking,delivered,...t});
  next.finished=next.round>=ROUNDS||t.connected<60;
  return next;
}
export function survey(state) {
  if(state.survey||!state.round||state.finished) throw new Error('A check-in is available once, after a cycle and before the end.');
  const next=structuredClone(state);
  next.survey=Array.from({length:GROUPS},(_,g)=>{
    const responders=next.readers.filter(r=>r.group===g&&r.connected&&random(next.seed,r.id,next.round,20)<.65);
    return {group:g,replies:responders.length,needBreak:responders.filter(r=>r.capacity+18*(random(next.seed,r.id,next.round,21)-.5)<45).length};
  });
  next.surveyRound=next.round;return next;
}
export function debrief(state) {
  if(!state.finished) throw new Error('Finish the session before revealing model variables.');
  const t=telemetry(state),mission=MISSIONS[state.mission];
  return {...t,won:t.score>=mission.target&&t.connected>=96&&(state.mission!=='cooperation'||t.coverage>=4),
    capacity:avg(state.readers,'capacity'),understanding:avg(state.readers,'understanding'),
    reached:state.readers.filter(r=>r.deliveries>0).length,
    quietReaders:state.readers.filter(r=>r.clicks<=2&&r.understanding>55).length};
}
