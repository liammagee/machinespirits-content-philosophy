import assert from 'node:assert/strict';
import {createSession,advance,initialPlan,telemetry,debrief,survey,validatePlan,EVENTS} from '../attention-assets/control-room-engine.mjs';
const planFor=action=>initialPlan().map(p=>({...p,action}));
function run(mission,policy,ranking='rotate',seed=479){let s=createSession(mission,seed);while(!s.finished)s=advance(s,planFor(policy(s.round)),ranking);return s;}
// Invalid dispatch is rejected atomically; a session never silently overspends.
const initial=createSession(),copy=structuredClone(initial),over=initialPlan();over[0].units=3;
assert.throws(()=>advance(initial,over),/Over budget/);assert.deepEqual(initial,copy);
assert.match(validatePlan(initialPlan(),'unknown'),/targeting/);
const negative=initialPlan();negative[0].units=-1;assert.match(validatePlan(negative),/0–4/);
const one=advance(initial,initialPlan());assert.deepEqual(initial,copy);assert.equal(one.history[0].delivered,60);
assert.throws(()=>debrief(one),/Finish/);assert.throws(()=>survey(initial),/once/);
const checked=survey(one);assert.deepEqual(survey(one),checked);assert.throws(()=>survey(checked),/once/);
assert.deepEqual(advance(checked,initialPlan()).readers,advance(one,initialPlan()).readers,'asking a question does not secretly change the policy effects');
// Exact repeatability, including external events. A contract alone does not
// change a population: the operator has to change the allocations.
const mixed=r=>[1,3,4,6].includes(r)?'quiet':'prompt';
const win=run('capture',mixed);
assert.deepEqual(run('capture',mixed),win);
assert.deepEqual(run('assessment',mixed).readers,win.readers);
assert.deepEqual(win.history.map(h=>h.event),EVENTS.map(e=>e.title));
assert.ok(debrief(win).won);assert.throws(()=>advance(win,initialPlan()),/ended/);
assert.throws(()=>survey(win),/once/);
// Every contract is achievable, while maximizing its proxy blindly can fail.
const scored=run('assessment',r=>[2,4].includes(r)?'quiet':'scaffold');
const cooperative=run('cooperation',r=>[2,4].includes(r)?'quiet':'discuss');
assert.ok(debrief(scored).won);assert.ok(debrief(cooperative).won);
const push=run('capture',()=> 'prompt'),quiet=run('capture',()=> 'quiet');
assert.ok(push.round<8);assert.equal(debrief(push).won,false);
assert.ok(telemetry(push).clicks>900&&telemetry(push).connected<60);
assert.ok(debrief(quiet).capacity>debrief(push).capacity);
assert.ok(telemetry(quiet).clicks<telemetry(push).clicks);
const clicked=run('capture',mixed,'clicks');assert.notDeepEqual(clicked.readers,win.readers);
// Bounded state and coherent accounting across varied policies and seeds.
for(const seed of [1,23,479,2026])for(const ranking of ['rotate','clicks'])for(const action of ['prompt','scaffold','quiet','discuss']){
 const s=run('capture',()=>action,ranking,seed),t=telemetry(s);
 assert.ok(s.round>=1&&s.round<=8);assert.ok(t.correct<=t.attempts);
 for(const r of s.readers){assert.ok(r.capacity>=0&&r.capacity<=100);assert.ok(r.understanding>=0&&r.understanding<=100);for(const k of ['clicks','correct','attempts','notes','deliveries'])assert.ok(Number.isInteger(r[k])&&r[k]>=0);}
 assert.ok(s.history.every(h=>h.delivered<=60));
 assert.equal(t.clicks,s.history.reduce((n,h,i)=>n+h.clicks-(s.history[i-1]?.clicks||0),0));
}
console.log('Control-room engine: deterministic replay, contract independence, budget rejection, survey, terminal state, all three winnable contracts, proxy/retention trade-off, 32 varied runs passed.');
