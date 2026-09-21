import assert from 'node:assert/strict';import fs from 'node:fs';
import {makeBatch,batchLoss,lossAndGradients,cloneModel,fineTune,planRun,runPlan,briefDrift,drift,OBJECTIVES,INTENSITY} from '../attention-assets/platform-trainer.mjs';
import {generatePost,candidates,FORMATS} from '../attention-assets/platform-generator.mjs';
const model=JSON.parse(fs.readFileSync(new URL('../attention-assets/platform-model.json',import.meta.url))),corpus=JSON.parse(fs.readFileSync(new URL('../attention-assets/platform-corpus.json',import.meta.url))),frozen=JSON.stringify(model);
// The browser forward pass reproduces the recorded final training loss.
const batch=makeBatch(model,corpus.map(r=>({prompt:r.prompt,tokens:r.tokens,weight:1})));
assert.ok(Math.abs(batchLoss(model,batch)-model.training.loss.at(-1).loss)<1e-9,'forward loss matches the Python training record');
// Analytic gradients agree with finite differences.
const {grads}=lossAndGradients(model,batch),eps=1e-4;
for(const [name,i,j] of [['W',5,7],['E',20,3],['Q',2,9],['K',11,4],['V',0,0],['O',7,7],['b',30,null]]){
 const up=cloneModel(model),down=cloneModel(model);if(j===null){up.parameters[name][i]+=eps;down.parameters[name][i]-=eps;}else{up.parameters[name][i][j]+=eps;down.parameters[name][i][j]-=eps;}
 const numeric=(batchLoss(up,batch)-batchLoss(down,batch))/(2*eps),analytic=j===null?grads[name][i]:grads[name][i][j];
 assert.ok(Math.abs(numeric-analytic)/(Math.abs(numeric)+Math.abs(analytic)+1e-9)<1e-4,`${name}[${i}${j===null?'':','+j}] gradient`);
}
// Training runs: retain keeps every brief; reinforce and materials change generation while posts still end.
const topic='cat',posts=candidates(model,topic,0);
const retain=runPlan(model,planRun({corpus,topic,objective:'retain',intensity:'light',posts}));
assert.ok(briefDrift(retain.model,corpus,topic).every(b=>b.unchanged),'retention training leaves the pretrained posts in place');
assert.throws(()=>planRun({corpus,topic,objective:'reinforce',posts}),/Publish/);
const history=[{round:1,revenue:120,post:posts[1]},{round:2,revenue:310,post:posts[0]}];
const reinforcePlan=planRun({corpus,topic,objective:'reinforce',intensity:'standard',history,posts});assert.equal(reinforcePlan.added,9);assert.match(reinforcePlan.summary,/Round 2/);
const reinforced=runPlan(model,reinforcePlan),rd=briefDrift(reinforced.model,corpus,topic);
assert.ok(rd.filter(b=>!b.unchanged).length>=1,'reinforcing the best-earning post changes at least one other brief');assert.ok(rd.every(b=>b.share>=0&&b.share<=1));assert.ok(reinforced.drift>0);
const matPlan=planRun({corpus,topic,objective:'materials',intensity:'standard',posts,targets:['streak']});assert.deepEqual(matPlan.retired,['streak']);assert.equal(matPlan.added,3);assert.equal(matPlan.retained,9);
const mats=runPlan(model,matPlan),md=briefDrift(mats.model,corpus,topic);
assert.ok(md.find(b=>b.format==='streak').unchanged===false,'introducing materials retrains the targeted brief');
for(const f of Object.keys(FORMATS))for(const v of [0,1,2]){const p=generatePost(mats.model,topic,f,v);assert.ok(p.ended,`${f} ${v} still ends`);assert.ok(p.words.length>3);}
assert.ok(md.find(b=>b.format==='streak').style==='reflect'||md.find(b=>b.format==='streak').style==='inquiry','the retrained brief reads as reflective');
// Deepening replaces the same examples with routine posts; the deepened brief writes one and carries a habit weight.
const habitPlan=planRun({corpus,topic,objective:'habit',intensity:'standard',posts,targets:['streak']});assert.deepEqual(habitPlan.retired,['streak']);assert.equal(habitPlan.added,3);assert.equal(habitPlan.retained,9);assert.match(habitPlan.summary,/routine/);
const deep=runPlan(model,habitPlan),dps=[0,1,2].map(v=>generatePost(deep.model,topic,'streak',v));dps.forEach(dp=>{assert.ok(dp.ended,'the deepened brief still ends');assert.equal(dp.style,'routine','the deepened brief reads as routine');});assert.ok(dps.some(dp=>dp.habit>.9)&&dps.every(dp=>dp.habit>.4),`the deepened posts carry a habit weight (${dps.map(dp=>dp.habit.toFixed(2))})`);
assert.equal(generatePost(model,topic,'streak',0).habit,0,'a pretrained post builds no habit');
// Intensities order steps; the shipped model is never modified.
for(const o of Object.keys(OBJECTIVES))assert.ok(INTENSITY.light.steps[o]<INTENSITY.standard.steps[o]&&INTENSITY.standard.steps[o]<INTENSITY.intensive.steps[o]);
assert.equal(JSON.stringify(model),frozen,'the pretrained model is never mutated');assert.ok(drift(model,model)===0);
const timed=Date.now();fineTune(model,makeBatch(model,reinforcePlan.records),{steps:INTENSITY.standard.steps.reinforce,lr:reinforcePlan.lr});const ms=Date.now()-timed;
console.log(JSON.stringify({forwardLossMatches:true,gradientChecks:7,retain:'unchanged',reinforceChanged:rd.filter(b=>!b.unchanged).map(b=>b.format),materialsStreak:md.find(b=>b.format==='streak').text,standardReinforceMs:ms,frozenBase:true}));
