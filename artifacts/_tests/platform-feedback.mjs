import assert from 'node:assert/strict';import fs from 'node:fs';
import {candidates} from '../attention-assets/platform-generator.mjs';
import {createCampaign,playRound} from '../attention-assets/platform-game-engine.mjs';
import {ALIGNMENTS,createLearner,forkLearner,policy,learn,rewardFor,responseEvents,liveFrame,BROADCAST_MS} from '../attention-assets/platform-feedback.mjs';
const model=JSON.parse(fs.readFileSync(new URL('../attention-assets/platform-model.json',import.meta.url))),frozen=JSON.stringify(model),posts=candidates(model,'cat',0),learner=createLearner();
const initial=policy(learner,posts);assert.ok(Math.abs(initial.weights.reduce((a,b)=>a+b)-1)<1e-10);
const state=playRound(createCampaign(),posts[0]),h=state.history[0],u=learn(learner,posts,0,h);
assert.ok(u.record.delta>0);assert.ok(u.record.after[0]>u.record.before[0],'positive advantage reinforces the selected brief');assert.deepEqual(learner,createLearner(),'update is immutable');
const bad=learn(learner,posts,0,{...h,capture:0});assert.ok(bad.record.after[0]<bad.record.before[0],'a poor result reduces that recommendation');
const f=forkLearner(u.learner);assert.deepEqual(f.query,u.learner.query);assert.equal(f.updates,0);assert.deepEqual(f.history,[]);
const mask=policy(learner,posts,'principle');assert.equal(mask.weights[0],0);assert.equal(mask.weights[1],0);assert.equal(mask.weights[2]+mask.weights[3],1);
const protectedUpdate=learn(learner,posts,0,h,'principle');assert.equal(protectedUpdate.record.delta,0);assert.deepEqual(protectedUpdate.learner.query,learner.query);
const reflective={...h,chosen:20,reconsidered:30,continued:15,discussed:10};assert.notEqual(rewardFor(reflective,'capture'),rewardFor(reflective,'preference'));assert.ok(rewardFor(reflective,'collective')>rewardFor({...reflective,discussed:0},'collective'));
for(const id of Object.keys(ALIGNMENTS)){const a=learn(learner,posts,2,h,id);assert.ok(a.learner.query.every(Number.isFinite));assert.ok(Math.abs(a.record.after.reduce((a,b)=>a+b)-1)<1e-10);}
const events=responseEvents(state.readers);assert.ok(events.at(-1).at<BROADCAST_MS);assert.deepEqual(events,responseEvents(state.readers));const zero=liveFrame(state.readers,events,0);assert.equal(zero.counts.noticed,0);const middle=liveFrame(state.readers,events,1100);assert.ok(middle.counts.noticed>0&&middle.counts.noticed<h.noticed);const final=liveFrame(state.readers,events,BROADCAST_MS);for(const k of ['noticed','opened','continued','reconsidered','chosen'])assert.equal(final.counts[k],h[k]);assert.equal(final.capture,h.capture);assert.deepEqual(final.readers.map(r=>r.last),state.readers.map(r=>r.last));
assert.equal(JSON.stringify(model),frozen,'decoder never changes');
console.log(JSON.stringify({liveResponses:'staggered, deterministic, exact final outcome',learning:'positive and negative feedback change actual query weights',alignment:'different rewards, hard principle mask',decoder:'frozen',learner:'retained across shifts and isolated per objective'}));
