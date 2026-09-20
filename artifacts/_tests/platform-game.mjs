import assert from 'node:assert/strict';import fs from 'node:fs';import crypto from 'node:crypto';
import {generatePost,nextToken,FORMATS} from '../attention-assets/platform-generator.mjs';
import {TOOLS,createCampaign,playRound,beginHack,result,PLATFORM_TARGET,HACK_TARGET} from '../attention-assets/platform-game-engine.mjs';
const source=fs.readFileSync(new URL('../attention-assets/platform-corpus.json',import.meta.url),'utf8'),corpus=JSON.parse(source),model=JSON.parse(fs.readFileSync(new URL('../attention-assets/platform-model.json',import.meta.url)));
assert.equal(crypto.createHash('sha256').update(source).digest('hex'),model.training.corpusSha256);
assert.ok(model.training.loss.at(-1).loss<model.training.loss[0].loss/100);
const frozen=JSON.stringify(model),all=new Map();
for(const record of corpus){
 const p=generatePost(model,record.topic,record.format,record.variant);all.set(p.id,p);
 assert.deepEqual(p.words,record.tokens.slice(0,-1),'browser inference reproduces the learned classroom example');
 assert.ok(Number.isFinite(p.forecast));
 for(const step of p.steps){assert.ok(Math.abs(step.weights.reduce((a,b)=>a+b,0)-1)<1e-10);assert.equal(step.weights.length,step.prefix.length);assert.ok(step.weights.every(w=>w>=0));assert.ok(step.alternatives[0].p>=step.alternatives[1].p);}
}
assert.equal(JSON.stringify(model),frozen,'inference must not update learned parameters');
assert.throws(()=>nextToken(model,['unknown']),/Unknown/);
const post=(topic,format,r)=>all.get(`${topic}-${format}-${r%3}`);
function platform(topic,seed=479){let s=createCampaign(topic,seed);for(const [r,f] of ['mystery','streak','guide','mystery'].entries())s=playRound(s,post(topic,f,r));return s;}
function hacked(baseline,policy){let s=beginHack(baseline);for(const action of policy)s=playRound(s,s.archive[s.round].post,action);return s;}
for(const topic of ['cat','glass','machines']){
 const p=platform(topic);assert.equal(result(p).won,true);assert.ok(p.platformScore>=PLATFORM_TARGET);
 const original=structuredClone(p);assert.throws(()=>playRound(p,post(topic,'mystery',0)),/complete/);assert.deepEqual(p,original);
 const noChange=hacked(p,['none','none','none','none']);assert.deepEqual(noChange.readers,p.readers,'no-intervention replay must reproduce the baseline exactly');assert.equal(noChange.platformScore,p.platformScore);assert.equal(noChange.hackerScore,0);
 const strong=hacked(p,['discuss','pause','discuss','pause']);assert.ok(strong.hackerScore>=HACK_TARGET);assert.equal(result(strong).won,true);assert.equal(strong.budget,0);assert.ok(strong.platformScore<p.platformScore);
 const warning=hacked(p,['banner','banner','banner','banner']);assert.ok(warning.hackerScore<strong.hackerScore,'another alert is not equivalent to supporting reflection');
 assert.deepEqual(hacked(p,['discuss','pause','discuss','pause']),strong);
 let limited=beginHack(p);for(let i=0;i<3;i++)limited=playRound(limited,limited.archive[limited.round].post,'question');const before=structuredClone(limited);assert.throws(()=>playRound(limited,limited.archive[3].post,'pause'),/Not enough/);assert.deepEqual(limited,before);
 const wrong=beginHack(p);assert.throws(()=>playRound(wrong,post(topic,'inquiry',0),'pause'),/archived/);
}
assert.throws(()=>beginHack(createCampaign()),/Complete/);assert.throws(()=>playRound(createCampaign(),post('cat','guide',0),'question'),/hacker/);
for(const seed of [1,23,479,2026]){const s=hacked(platform('cat',seed),['discuss','pause','discuss','pause']);for(const h of s.history){assert.ok(h.opened<=h.noticed&&h.continued<=h.opened&&h.reconsidered<=h.opened&&h.chosen<=h.reconsidered);assert.ok(h.capture>=0);}assert.ok(s.readers.every(r=>r.energy>=.2&&r.energy<=1));}
console.log(JSON.stringify({learnedSequences:all.size,loss:[model.training.loss[0].loss,model.training.loss.at(-1).loss],frozenInference:true,baselineReplay:'identical',threeTopics:'both acts winnable',budget:'atomic rejection',alertOnly:'inferior to deliberative intervention',variedSeeds:4}));
