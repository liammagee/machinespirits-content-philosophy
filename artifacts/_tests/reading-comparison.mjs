import assert from 'node:assert/strict';
import {attentionAt,readingCue,projections} from '../attention-assets/reading-mechanisms.mjs';
const tokens='The cat sat on the mat because it was'.split(' ');
for(let i=0;i<tokens.length;i++){
 const a=attentionAt(tokens,i);
 assert.ok(Math.abs(a.weights.reduce((s,w)=>s+w,0)-1)<1e-12);
 assert.ok(a.weights.slice(i+1).every(w=>w===0));
 assert.ok(a.output.every(Number.isFinite));
 const future=tokens.map((t,j)=>j>i?'different':t);assert.deepEqual(attentionAt(future,i).output,a.output);
 for(let d=0;d<2;d++)assert.ok(Math.abs(a.output[d]-a.values.reduce((sum,v,j)=>sum+a.weights[j]*v[d],0))<1e-12);
 assert.deepEqual(attentionAt(tokens,i),a); // no training or stochastic update
}
const first=attentionAt(tokens,0);assert.equal(first.weights[0],1);assert.deepEqual(first.output,first.values[0]);
const before=JSON.stringify(projections);attentionAt(tokens,8);assert.equal(JSON.stringify(projections),before);
assert.equal(readingCue('cat',7).back,1);assert.equal(readingCue('glass',9).back,2);
assert.throws(()=>attentionAt(tokens,-1),RangeError);
console.log('Reading comparison: normalized causal weights, future-token independence, weighted values, fixed parameters, and authored return cues verified.');

const {predictNext,outputVocabulary,humanContinuation}=await import('../attention-assets/reading-mechanisms.mjs');
const cases={cat:'The cat sat on the mat because it was',glass:'Because the glass was fragile , the mover wrapped it',machines:'Machines learn by paying attention to'};
const parameters=JSON.stringify(outputVocabulary);
for(const [key,sentence] of Object.entries(cases)){
 const tokens=sentence.split(' '),attention=attentionAt(tokens,tokens.length-1),prediction=predictNext(attention);
 assert.equal(prediction.probabilities.length,6);
 assert.ok(Math.abs(prediction.probabilities.reduce((a,b)=>a+b,0)-1)<1e-12);
 assert.ok(prediction.probabilities.every(p=>Number.isFinite(p)&&p>0&&p<1));
 assert.deepEqual(prediction.representation,attention.x.map((x,i)=>x+attention.output[i]));
 for(let i=0;i<6;i++){
  const v=outputVocabulary[i],score=v.bias+v.weights[0]*prediction.representation[0]+v.weights[1]*prediction.representation[1];
  assert.ok(Math.abs(score-prediction.scores[i])<1e-12);
  const denominator=prediction.scores.reduce((sum,s)=>sum+Math.exp(s),0);
  assert.ok(Math.abs(Math.exp(score)/denominator-prediction.probabilities[i])<1e-12);
 }
 assert.equal(prediction.word,outputVocabulary[prediction.probabilities.indexOf(Math.max(...prediction.probabilities))].word);
 assert.equal(prediction.word,humanContinuation(key).choice); // authored examples, not an accuracy claim
 assert.deepEqual(predictNext(attention),prediction);
 const altered=predictNext({...attention,output:attention.output.map(x=>x+.5)});
 assert.notDeepEqual(altered.probabilities,prediction.probabilities); // causally uses attention output
 assert.ok(humanContinuation(key).clues.every(i=>i>=0&&i<tokens.length));
}
assert.equal(JSON.stringify(outputVocabulary),parameters);
console.log('Next-token output: residual input, fixed projection, vocabulary softmax, greedy choice, causal dependence on attention, and three human storyboards verified.');

const {readingMemory,humanMemoryScene}=await import('../attention-assets/reading-memory.mjs');
for(const [key,sentence] of Object.entries(cases)){
 const length=sentence.split(' ').length;
 for(let i=0;i<length;i++){
  const memory=readingMemory(key,i);
  assert.ok(memory.sourceIndex<=i,'memory illustration must not anticipate an unread clue');
  assert.equal(memory.goal,'Predict the next word');
 }
 const held=readingMemory(key,length-1).gist;
 for(let phase=0;phase<3;phase++)assert.equal(readingMemory(key,length-1,{predictionPhase:phase}).gist,held);
 assert.equal(humanMemoryScene(key,3).gist,held);
 assert.equal(humanMemoryScene(key,4).mode,'check');
}
assert.doesNotMatch(readingMemory('glass',3).gist,/fragile/);
assert.match(readingMemory('glass',4).gist,/fragile/);
assert.doesNotMatch(readingMemory('cat',0).gist,/cat/);
assert.match(readingMemory('cat',7).gist,/refers back/);
assert.notEqual(readingMemory('cat',8).gist,readingMemory('glass',9).gist);
console.log('Memory illustration: no future clues, a stable goal, context-specific meaning and prediction continuity verified.');
