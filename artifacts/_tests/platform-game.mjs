import assert from 'node:assert/strict';import fs from 'node:fs';import crypto from 'node:crypto';
import {generatePost,nextToken,candidates,styleFeatures,fill,MATERIALS,FORMATS} from '../attention-assets/platform-generator.mjs';
import {TOOLS,ACT_ROUNDS,createCampaign,playRound,beginHack,result,revenueOf,PRICES,REVENUE_TARGET,HACK_TARGET,HACK_BUDGET,outcomes as simulate} from '../attention-assets/platform-game-engine.mjs';
const source=fs.readFileSync(new URL('../attention-assets/platform-corpus.json',import.meta.url),'utf8'),corpus=JSON.parse(source),model=JSON.parse(fs.readFileSync(new URL('../attention-assets/platform-model.json',import.meta.url)));
assert.equal(crypto.createHash('sha256').update(source).digest('hex'),model.training.corpusSha256);
assert.ok(model.training.loss.at(-1).loss<model.training.loss[0].loss/100);
const frozen=JSON.stringify(model),all=new Map();
for(const record of corpus){
 const p=generatePost(model,record.topic,record.format,record.variant);all.set(p.id,p);
 assert.deepEqual(p.words,record.tokens.slice(0,-1),'browser inference reproduces the learned classroom example');
 assert.ok(p.ended);assert.equal(p.style,record.format);assert.deepEqual(p.features.map(v=>+v.toFixed(6)),record.features.map(v=>+v.toFixed(6)),'text-derived features match the authored ones for pretrained posts');
 assert.ok(Number.isFinite(p.forecast));
 for(const step of p.steps){assert.ok(Math.abs(step.weights.reduce((a,b)=>a+b,0)-1)<1e-10);assert.equal(step.weights.length,step.prefix.length);assert.ok(step.weights.every(w=>w>=0));assert.ok(step.alternatives[0].p>=step.alternatives[1].p);}
}
assert.equal(JSON.stringify(model),frozen,'inference must not update learned parameters');
assert.throws(()=>nextToken(model,['unknown']),/Unknown/);
// The style reader recognizes reflective materials and blends hybrids.
const reflective=styleFeatures(fill(MATERIALS.reflect.patterns[0],'cat'),'cat');assert.equal(reflective.style,'reflect');assert.ok(reflective.features[3]>.8);
const hybrid=styleFeatures('Pause after the cat sat on the mat . But which word comes next ? Keep reading to find out .'.split(' '),'cat');assert.equal(hybrid.style,'mystery');assert.ok(hybrid.weights.mystery<1);
// Five-round campaigns; revenue is exactly impressions plus engaged sessions.
const idx={mystery:0,streak:1,guide:2,inquiry:3};
function platform(topic,choose,seed=479){let s=createCampaign(topic,seed);for(let r=0;r<ACT_ROUNDS;r++){const menu=candidates(model,topic,r);s=playRound(s,menu[choose(r)]);}return s;}
function hacked(baseline,policy){let s=beginHack(baseline);for(const action of policy)s=playRound(s,s.archive[s.round].post,action);return s;}
const outcomes={};
for(const topic of ['cat','glass','machines']){
 const good=platform(topic,r=>[idx.inquiry,idx.guide,idx.streak,idx.mystery,idx.streak][r]),naive=platform(topic,()=>idx.streak);
 outcomes[topic]={good:good.revenue,naive:naive.revenue};
 assert.equal(good.round,ACT_ROUNDS);assert.equal(result(good).won,true,`${topic}: giving readers room first then monetizing reaches the target`);assert.equal(result(naive).won,false,`${topic}: repeating the streak post misses the target`);
 for(const h of good.history){assert.equal(h.revenue,PRICES.impression*h.opened+PRICES.session*h.continued);assert.equal(h.revenue,revenueOf(h));assert.ok(h.opened<=h.noticed&&h.continued<=h.opened&&h.reconsidered<=h.opened&&h.chosen<=h.reconsidered);assert.ok(h.active<=120&&h.churned>=0);}
 assert.equal(good.revenue,good.history.reduce((s,h)=>s+h.revenue,0));
 const actives=good.history.map(h=>h.active);assert.ok(actives.every((a,i)=>i===0||a<=actives[i-1]),'readers who leave do not return');
 // A reader who leaves may have responded in that round, but never again afterwards.
 {let s=createCampaign(topic);const menu=candidates(model,topic,0);for(let r=0;r<3;r++)s=playRound(s,menu[idx.streak]);const gone=s.readers.filter(r=>!r.active).map(r=>r.id);if(gone.length){const next=playRound(s,menu[idx.mystery]);for(const id of gone)assert.ok(!next.readers[id].last.noticed&&!next.readers[id].last.opened,'a reader who left no longer responds');}}
 const original=structuredClone(good);assert.throws(()=>playRound(good,candidates(model,topic,0)[0]),/complete/);assert.deepEqual(good,original);
 // Act II: exact replay without interventions; deliberative interventions beat another alert.
 const noChange=hacked(good,['none','none','none','none','none']);assert.deepEqual(noChange.readers,good.readers,'no-intervention replay must reproduce the baseline exactly');assert.equal(noChange.revenue,good.revenue);assert.equal(noChange.hackerScore,0);
 const strong=hacked(good,['discuss','pause','discuss','pause','none']);outcomes[topic].hack=strong.hackerScore;assert.ok(strong.hackerScore>=HACK_TARGET,`${topic}: deliberative interventions reach +${HACK_TARGET} (got ${strong.hackerScore})`);assert.equal(result(strong).won,true);assert.equal(strong.budget,0);outcomes[topic].hackRevenueDelta=strong.revenue-good.revenue;
 const warning=hacked(good,['banner','banner','banner','banner','banner']);assert.ok(warning.hackerScore<strong.hackerScore,'another alert is not equivalent to supporting reflection');
 assert.deepEqual(hacked(good,['discuss','pause','discuss','pause','none']),strong);
 let limited=beginHack(good);for(let i=0;i<3;i++)limited=playRound(limited,limited.archive[limited.round].post,'question');const before=structuredClone(limited);assert.throws(()=>playRound(limited,limited.archive[3].post,'pause'),/Not enough/);assert.deepEqual(limited,before);
 const wrong=beginHack(good);assert.throws(()=>playRound(wrong,candidates(model,topic,0)[idx.streak],'pause'),/archived/);
}
// A routine post builds a habit that persists; a post without one reproduces the baseline exactly.
{const c=createCampaign('cat',479),streak=candidates(model,'cat',0)[idx.streak],routine={...streak,id:'cat-routine-0',style:'routine',features:MATERIALS.routine.features,habit:1};
 const plain=simulate(c.readers,streak,0,c.seed),same=simulate(c.readers,{...streak,habit:0},0,c.seed),deep=simulate(c.readers,routine,0,c.seed);
 assert.deepEqual(same,plain,'a zero-habit post changes nothing');assert.equal(plain.counts.habitual,0);assert.ok(deep.readers.some(r=>r.habit>0)&&deep.counts.habitual===0,'routine material starts a habit in one round; nobody relies on the feed yet');
 let s=c;for(let r=0;r<ACT_ROUNDS;r++)s=playRound(s,{...routine,id:`cat-routine-${r}`});const hooked=s.readers.filter(x=>x.active&&x.habit>=.5).length;assert.ok(hooked>=40,`five routine rounds lock in many readers (got ${hooked})`);assert.ok(s.history.at(-1).churned<=2,'habitual readers rarely leave');
 const relying=c.readers.map(r=>({...r,habit:1})),held=simulate(relying,routine,0,c.seed),loose=simulate(c.readers,routine,0,c.seed);assert.ok(held.counts.reconsidered<loose.counts.reconsidered&&held.counts.opened>loose.counts.opened&&held.counts.churned<=loose.counts.churned,'readers with a habit open more, reconsider less and stay');}
assert.throws(()=>beginHack(createCampaign()),/Complete/);assert.throws(()=>playRound(createCampaign(),candidates(model,'cat',0)[2],'question'),/hacker/);
for(const seed of [1,23,479,2026]){const s=hacked(platform('cat',r=>[idx.inquiry,idx.guide,idx.streak,idx.mystery,idx.streak][r],seed),['discuss','pause','discuss','pause','none']);for(const h of s.history)assert.ok(h.capture>=0&&h.revenue>=0);assert.ok(s.readers.every(r=>r.energy>=.05&&r.energy<=1));}
console.log(JSON.stringify({learnedSequences:all.size,loss:[model.training.loss[0].loss,model.training.loss.at(-1).loss],frozenInference:true,rounds:ACT_ROUNDS,target:REVENUE_TARGET,outcomes,baselineReplay:'identical',budget:'atomic rejection',alertOnly:'inferior to deliberative intervention',variedSeeds:4}));
