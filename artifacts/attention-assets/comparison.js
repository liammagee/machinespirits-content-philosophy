import {readingMemory,humanMemoryMarkup,machineMemoryMarkup} from './reading-memory.mjs';
import {attentionAt,readingCue,projections,predictNext,outputVocabulary,humanContinuation} from './reading-mechanisms.mjs';
const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const vector=v=>'['+v.map(n=>n.toFixed(2)).join(', ')+']';
const curvePoint=(path,t)=>({x:(1-t)**2*path.a.x+2*(1-t)*t*path.b.x+t*t*path.c.x,y:(1-t)**2*path.a.y+2*(1-t)*t*path.b.y+t*t*path.c.y});
const curvePath=p=>`M${p.a.x},${p.a.y} Q${p.b.x},${p.b.y} ${p.c.x},${p.c.y}`;
export function createComparison({moments,emphasis,getContext,getPrediction,reduced,opacity=.5}) {
 const $=id=>document.getElementById(id),player=$('comparison-player'),compact=matchMedia('(max-width:700px)');
 let word=0,progress=0,phase=-1,playing=false,frame=0,lastTime=0,visible=false,brain=null,loading=false,done=false,calculation=null,paths=[],predicting=false,predictionPhase=0,prediction=null;
 const duration=()=>+$('comparison-speed').value;
 function tokenLine(human){const c=getContext(),cue=readingCue(c.key,word),back=human&&!predicting&&phase===1&&cue.back!==undefined?cue.back:-1,story=humanContinuation(c.key),emitted=predicting&&predictionPhase===2;
  return c.prefix.map((text,i)=>`<button type="button" data-reading-word="${i}" class="reading-token ${i===word&&!emitted?'reading-current':i>word?'reading-unread':'reading-past'} ${i===back||(human&&predicting&&predictionPhase<2&&story.clues.includes(i))?'reading-return':''}" ${i===word&&!emitted?'aria-current="step"':''} aria-label="Jump to word ${i+1}: ${escape(text)}">${escape(text)}</button>`).join(' ')+(emitted?` <strong class="predicted-token" aria-current="step" data-next-token="${human?'human':'machine'}">${escape(human?story.choice:prediction.word)}</strong>`:' <span class="blank">…</span>');
 }
 function diagram(){if(predicting){predictionDiagram();return;}const c=getContext(),small=compact.matches,n=c.prefix.length,W=small?180:560,H=small?400:390;
  const query={x:W/2,y:67},mix={x:W/2,y:small?351:325};
  const cells=c.prefix.map((text,i)=>({text:escape(text),x:small?44+(i%2)*90:30+i*(W-60)/Math.max(1,n-1),y:small?95+Math.floor(i/2)*47:157,w:small?80:Math.min(66,(W-22)/n-4),h:small?36:52}));
  paths=cells.map((cell,i)=>({index:i,match:{a:query,b:{x:cell.x,y:small?76:100},c:{x:cell.x,y:cell.y}},value:{a:{x:cell.x,y:cell.y+cell.h},b:{x:cell.x,y:mix.y-22},c:mix}}));
  const available=paths.slice(0,word+1),q=escape(c.prefix[word]);
  $('comparison-machine-diagram').innerHTML=`<svg id="reading-circuit-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="Computed attention at ${q}. Only positions 1 to ${word+1} are available.">
   <defs><pattern id="reading-mask" width="6" height="6" patternUnits="userSpaceOnUse"><path d="M0 6L6 0" class="mask-stroke"/></pattern></defs>
   ${available.map(p=>`<path class="reading-edge match-edge" data-source="${p.index}" d="${curvePath(p.match)}" style="--share:${calculation.weights[p.index]}"/><path class="reading-edge value-edge" data-source="${p.index}" d="${curvePath(p.value)}" style="--share:${calculation.weights[p.index]}"/>`).join('')}
   <rect class="query-node" x="${W/2-78}" y="18" width="156" height="49"/><text class="circuit-heading" x="${W/2}" y="36">Query for “${q}”</text><text class="circuit-number" x="${W/2}" y="54">q = ${vector(calculation.q)}</text>
   ${cells.map((p,i)=>`<g class="reading-key-node ${i>word?'is-masked':''} ${i===word?'is-current':''}" data-token-index="${i}" data-weight="${calculation.weights[i]}"><rect x="${p.x-p.w/2}" y="${p.y}" width="${p.w}" height="${p.h}"/><text x="${p.x}" y="${p.y+(small?14:20)}">${p.text}</text><text class="circuit-number" x="${p.x}" y="${p.y+(small?28:39)}">${i>word?'masked':(100*calculation.weights[i]).toFixed(1)+'%'}</text><title>${escape(c.prefix[i])}: ${i>word?'future position, weight zero':`score ${calculation.scores[i].toFixed(3)}, weight ${(100*calculation.weights[i]).toFixed(2)}%, value ${vector(calculation.values[i])}`}</title></g>`).join('')}
   <rect class="mixture-node" x="${W/2-86}" y="${mix.y}" width="172" height="43"/><text class="circuit-heading" x="${W/2}" y="${mix.y+17}">Weighted value mixture</text><text class="circuit-number" x="${W/2}" y="${mix.y+33}">${vector(calculation.output)}</text>
   ${available.map(p=>`<circle class="reading-packet" data-packet="${p.index}" r="${small?2.5:3+calculation.weights[p.index]*5}" cx="${query.x}" cy="${query.y}"/>`).join('')}
  </svg>`;
 }
 function updateWord(){const c=getContext();calculation=attentionAt(c.prefix,word);phase=-1;
  player.dataset.word=word;player.dataset.complete=String(done);player.dataset.predicting=String(predicting);player.dataset.predictionPhase=predicting?predictionPhase:-1;$('prediction-chapter').hidden=!predicting;$('human-prediction-process').hidden=!predicting;$('comparison-seek').max=c.index;$('comparison-seek').value=word;
  $('comparison-current-word').textContent=predicting?'Prefix complete · choose the next token':`${word+1} / ${c.prefix.length} · “${c.prefix[word]}”`;
  $('comparison-progress').textContent=done?'Next token chosen':predicting?`Predicting · step ${predictionPhase+1} of 3`:`Reading word ${word+1} of ${c.prefix.length}`;$('comparison-word-progress').setAttribute('aria-label',predicting?'Progress through this prediction step':'Progress through this word');
  $('comparison-prev').disabled=!predicting&&word===0;$('comparison-prev').textContent=predicting&&predictionPhase>0?'← Step':'← Word';$('comparison-prev').setAttribute('aria-label',predicting&&predictionPhase>0?'Previous prediction step':'Previous word');$('comparison-next').disabled=done;
  $('comparison-next').textContent=predicting?(predictionPhase===2?'Finish →':'Step →'):word===c.index?'Predict →':'Word →';$('comparison-next').setAttribute('aria-label',predicting?'Next prediction step':word===c.index?'Begin next-token prediction':'Next word');
  $('comparison-predict').disabled=predicting&&!done;
  player.querySelectorAll('[data-calculation-stage]').forEach((el,i)=>{el.textContent=(predicting?['1 · Score words','2 · Probabilities','3 · Choose a token']:['1 · Make Q/K/V','2 · Compare','3 · Weight & mix'])[i];});
  diagram();updatePhase();updateMotion();renderOutput();renderMemory();
  $('comparison-live-math').innerHTML=`<p><b>At “${escape(c.prefix[word])}”:</b> x = √2 × embedding + [sin(position), cos(position)] = ${vector(calculation.x)}. q = xW<sub>Q</sub> = ${vector(calculation.q)}.</p><p>Fixed matrices: W<sub>Q</sub> = ${projections.Q.map(vector).join(' · ')}; W<sub>K</sub> = ${projections.K.map(vector).join(' · ')}; W<sub>V</sub> = ${projections.V.map(vector).join(' · ')}. Score = q·k / √2. Softmax converts the available scores to weights that sum to 1; future positions receive zero. Mixture = Σ weight × value = ${vector(calculation.output)}.</p><div class="table-scroll"><table><thead><tr><th>Token</th><th>Q–K score</th><th>Attention</th><th>Value</th></tr></thead><tbody>${c.prefix.map((w,i)=>`<tr><td>${escape(w)}</td><td>${i>word?'masked':calculation.scores[i].toFixed(3)}</td><td>${(100*calculation.weights[i]).toFixed(1)}%</td><td>${vector(calculation.values[i])}</td></tr>`).join('')}</tbody></table></div>`;
 }
 function updatePhase(){if(predicting){updatePrediction();return;}const next=progress<.22?0:progress<.58?1:2;if(next===phase)return;phase=next;
  const c=getContext(),cue=readingCue(c.key,word),back=cue.back!==undefined,first=word===0;
  const focus=phase===0?(first?0:1):phase===1?(back?2:1):(word===c.index?4:3);
  const levels=phase===0?[first?1:.4,.85,.12,.3,.12]:phase===1?[.25,.55,back?1:.2,.55,.25]:[.2,.35,.2,.9,word===c.index?1:.4];
  player.dataset.phase=phase;player.dataset.humanFocus=focus;
  $('comparison-human-tokens').innerHTML=tokenLine(true);$('comparison-machine-tokens').innerHTML=tokenLine(false);
  $('comparison-human-title').textContent=phase===0?`Take in “${c.prefix[word]}”`:phase===1&&back?`Look back: “${c.prefix[word]}” → “${c.prefix[cue.back]}”`:phase===1?`Focus on “${c.prefix[word]}”`:`Keep “${c.prefix[word]}” in the sentence`;
  $('comparison-machine-title').textContent=phase===0?`“${c.prefix[word]}” → numbers → query`:phase===1?`Compare “${c.prefix[word]}” with available keys`:`Mix the values for “${c.prefix[word]}”`;
  $('comparison-system').textContent=focus===0?'A · Alerting':focus<3?'O · Orienting':'E · Executive control';
  $('comparison-human-text').textContent=phase===0?(first?'A starting cue raises readiness. Attention moves to the first word.':`Orienting brings “${c.prefix[word]}” into focus while the reading goal remains active.`):phase===1?cue.text:word===c.index?'Executive control helps check a possible ending against the text. Language knowledge and memory also contribute.':'Executive control helps keep the reading goal active. Working memory uses the meaning held so far to relate this word to what came before.';
  $('comparison-machine-text').textContent=phase===0?'A fixed learned transformation would produce Q, K and V. Here fixed teaching matrices do the same operations on small vectors.':phase===1?`The current query is compared with ${word+1} available ${word?'keys':'key'}. Future positions stay masked.`:'Softmax gives each available value a share. The moving signals bring those weighted contributions into a new representation.';
  $('comparison-regions').textContent=moments[focus].nodes.map(([name],i)=>`${i+1}. ${name}`).join(' · ');
  $('compare-brain').setAttribute('aria-label',`${moments[focus].family} while reading ${c.prefix[word]}. ${moments[focus].nodes.map(n=>n[0]).join(', ')}.`);
  $('comparison-machine-key').textContent=`One toy head · ${word+1} available ${word?'tokens':'token'} · shares total ${(calculation.weights.reduce((s,w)=>s+w,0)*100).toFixed(0)}% · learned parameters fixed`;
  const networkValues=[levels[0],Math.max(levels[1],levels[2]),Math.max(levels[3],levels[4])];
  $('comparison-network-levels').innerHTML=['Alerting','Orienting','Executive control'].map((name,i)=>`<div><span>${['A','O','E'][i]} · ${name}</span><i><b style="width:${networkValues[i]*100}%"></b></i></div>`).join('');
  $('comparison-network-levels').setAttribute('aria-label','Illustrative network emphasis: '+networkValues.map((v,i)=>`${['alerting','orienting','executive control'][i]} ${v>.7?'foreground':'supporting'}`).join(', '));
  player.querySelectorAll('[data-calculation-stage]').forEach(el=>el.classList.toggle('current',+el.dataset.calculationStage===phase));
  brain?.setActivity(levels,focus,playing);brain?.setVisible(visible);
 }
 function updateMotion(){player.dataset.progress=progress.toFixed(3);$('comparison-word-progress').value=progress;if(predicting){player.style.setProperty('--prediction-travel',`${reduced.matches?50:Math.min(100,progress*100)}%`);player.dataset.reducedMotion=String(reduced.matches);return;}
  const t=phase===1?(progress-.22)/.36:phase===2?(progress-.58)/.42:0;
  for(const path of paths.slice(0,word+1)){const dot=player.querySelector(`[data-packet="${path.index}"]`);if(!dot)continue;const point=curvePoint(phase===2?path.value:path.match,Math.min(1,Math.max(0,t)));dot.setAttribute('cx',point.x);dot.setAttribute('cy',point.y);dot.style.opacity=phase===0||reduced.matches?'0':String(.35+.65*Math.sqrt(calculation.weights[path.index]));}
 }
 function predictionDiagram(){
  const reveal=predictionPhase>0,chosen=predictionPhase===2;
  $('comparison-machine-diagram').innerHTML=`<div class="prediction-computation">
   <div class="prediction-representation"><span>Current input + attention mixture</span><small>${vector(calculation.x)} + ${vector(calculation.output)}</small><strong>h = ${vector(prediction.representation)}</strong><small>Simplified combined representation</small></div>
   <div class="prediction-flow" aria-hidden="true"><span>↓</span><i></i></div>
   <div class="prediction-operation">${predictionPhase===0?'Fixed output projection → word scores':predictionPhase===1?'Vocabulary softmax → probabilities':'Choose the highest probability'}</div>
   <div class="prediction-vocabulary" role="img" aria-label="${reveal?'Computed next-token probabilities':'Computed word scores'}. ${outputVocabulary.map((v,i)=>`${v.word}: ${reveal?(prediction.probabilities[i]*100).toFixed(1)+' percent':prediction.scores[i].toFixed(2)}`).join('; ')}">
   ${outputVocabulary.map((v,i)=>`<div class="vocabulary-row ${chosen&&i===prediction.winner?'vocabulary-winner':''}" data-vocabulary-word="${v.word}"><span>${v.word}</span><i class="vocabulary-track"><b style="width:${reveal?100*prediction.probabilities[i]:0}%"></b></i><strong>${reveal?(prediction.probabilities[i]*100).toFixed(1)+'%':prediction.scores[i].toFixed(2)}</strong></div>`).join('')}
   </div><div class="prediction-machine-choice">${chosen?`Append <b>“${escape(prediction.word)}”</b> to the prefix`:reveal?'These probabilities sum to 100%.':'A score can be negative. It is not a probability.'}</div><p>Six-word teaching vocabulary · fixed invented weights</p></div>`;
 }
 function updatePrediction(){if(phase===predictionPhase)return;phase=predictionPhase;
  const c=getContext(),story=humanContinuation(c.key),focus=predictionPhase===0?1:predictionPhase===1?4:3,levels=predictionPhase===0?[.25,.95,.25,.7,.5]:predictionPhase===1?[.25,.65,.4,.75,1]:[.2,.35,.2,1,.65];
  player.dataset.phase=phase;player.dataset.humanFocus=focus;
  $('prediction-chapter-title').textContent=['1 · Prepare a possible ending','2 · Evaluate the possibilities','3 · Choose and append a word'][predictionPhase];
  $('comparison-human-tokens').innerHTML=tokenLine(true);$('comparison-machine-tokens').innerHTML=tokenLine(false);
  $('comparison-human-title').textContent=['Recall clues; imagine an ending','Check possible words against the sentence',`Example reader chooses “${story.choice}”`][predictionPhase];
  $('comparison-machine-title').textContent=['Turn the representation into word scores','Turn word scores into probabilities',`Highest probability: “${prediction.word}”`][predictionPhase];
  $('human-prediction-process').innerHTML=`<span class="prediction-process-label">Language knowledge + held meaning</span><div class="human-candidates">${story.candidates.map(w=>`<span class="${predictionPhase>0&&w===story.choice?'candidate-selected':''}">${predictionPhase===2&&w===story.choice?'✓ ':''}${escape(w)}</span>`).join('')}</div><p>${predictionPhase===0?'Use held meaning and learned language knowledge to bring possible words to mind.':predictionPhase===1?'Keep the prediction goal; use the held meaning and reread the clues.':'Say or write the chosen word.'} No human probabilities are measured.</p>`;
  $('comparison-human-text').textContent=[story.consider,story.check,story.choose][predictionPhase];
  $('comparison-machine-text').textContent=['The attention mixture is added to the current input. A fixed output projection calculates one score for each word in this toy vocabulary.','This softmax is over possible next words. The earlier attention softmax was over positions in the input: two different distributions.','This demonstration chooses the largest probability (greedy selection) and appends that token. A real system can then compute the next step with a longer prefix.'][predictionPhase];
  $('comparison-system').textContent=predictionPhase===0?'O · Orient to clues':'E · Check and choose';
  $('compare-brain').setAttribute('aria-label',`${moments[focus].family} supports the example reader's prediction. ${moments[focus].nodes.map(n=>n[0]).join(', ')}. Language and memory also contribute.`);
  $('comparison-regions').textContent=moments[focus].nodes.map(([name],i)=>`${i+1}. ${name}`).join(' · ');
  $('comparison-machine-key').textContent='Inference · fixed parameters · simplified output layer · no training';
  const networkValues=[levels[0],Math.max(levels[1],levels[2]),Math.max(levels[3],levels[4])];
  $('comparison-network-levels').innerHTML=['Alerting','Orienting','Executive control'].map((name,i)=>`<div><span>${['A','O','E'][i]} · ${name}</span><i><b style="width:${networkValues[i]*100}%"></b></i></div>`).join('');
  $('comparison-network-levels').setAttribute('aria-label',`Illustrative network emphasis: ${predictionPhase===0?'orienting to clues':'executive control supporting the response'}. Language and memory are not localized by this overlay.`);
  player.querySelectorAll('[data-calculation-stage]').forEach(el=>el.classList.toggle('current',+el.dataset.calculationStage===predictionPhase));
  brain?.setActivity(levels,focus,playing&&!done);brain?.setVisible(visible);
 }
 function renderMemory(){const c=getContext(),state=readingMemory(c.key,word,{predictionPhase:predicting?predictionPhase:-1});
  $('comparison-human-memory').innerHTML=humanMemoryMarkup(state);$('comparison-human-memory').dataset.memoryMode=state.mode;$('comparison-human-memory').dataset.word=word;
  $('comparison-machine-memory').innerHTML=machineMemoryMarkup(c.prefix,word,calculation.output);$('comparison-machine-memory').dataset.available=word+1;
 }
 function renderOutput(){const c=getContext(),result=predictNext(attentionAt(c.prefix,c.index));$('comparison-output').hidden=!done;
  $('comparison-human-result').textContent=`“${humanContinuation(c.key).choice}”`;
  $('comparison-reader-answer').textContent=getPrediction()?`Your own proposed word: “${getPrediction()}”.`:'You can choose a different continuation in the activity below.';
  $('comparison-output-bars').innerHTML=outputVocabulary.map((v,i)=>`<div class="animation-probability" data-probability="${100*result.probabilities[i]}"><span>${escape(v.word)}</span><i><b style="width:${100*result.probabilities[i]}%"></b></i><span>${(100*result.probabilities[i]).toFixed(1)}%</span></div>`).join('');
  $('comparison-machine-result').textContent=`Selected “${result.word}” → appended to the prefix.`;
  $('comparison-prediction-math').innerHTML=`<p><b>Final toy output:</b> h = x + attention mixture = ${vector(result.representation)}. Score for word j = h · wⱼ + bⱼ. Next-token probability = exp(scoreⱼ) / Σ exp(score). Choose the largest probability.</p><div class="table-scroll"><table><thead><tr><th>Word</th><th>Fixed weights</th><th>Bias</th><th>Score</th><th>Probability</th></tr></thead><tbody>${outputVocabulary.map((v,i)=>`<tr><td>${v.word}</td><td>${vector(v.weights)}</td><td>${v.bias.toFixed(2)}</td><td>${result.scores[i].toFixed(3)}</td><td>${(100*result.probabilities[i]).toFixed(1)}%</td></tr>`).join('')}</tbody></table></div>`;
 }
 function tick(now){frame=0;if(!playing||!visible)return;
  if(lastTime)progress+=Math.min(250,now-lastTime)/duration();lastTime=now;
  if(progress>=1){
   if(predicting){if(predictionPhase<2){predictionPhase++;progress-=1;updateWord();}else{progress=1;done=true;pause();updateWord();return;}}
   else if(word<getContext().index){progress-=1;word++;updateWord();}
   else{predicting=true;predictionPhase=0;progress=0;prediction=predictNext(calculation);updateWord();}
  }
  updatePhase();updateMotion();frame=requestAnimationFrame(tick);
 }
 function pause(){playing=false;lastTime=0;cancelAnimationFrame(frame);frame=0;player.dataset.playing='false';$('comparison-play').textContent=done?'↻ Read again':predicting?'▶ Continue prediction':'▶ Read together';brain?.setPlaying(false);}
 function play(){playing=true;player.dataset.playing='true';$('comparison-play').textContent='Ⅱ Pause';lastTime=0;brain?.setPlaying(true);frame=requestAnimationFrame(tick);}
 function seek(index){done=false;predicting=false;predictionPhase=0;pause();word=Math.max(0,Math.min(getContext().index,index));progress=.4;updateWord();}
 function restart(){done=false;predicting=false;predictionPhase=0;pause();word=0;progress=0;updateWord();}
 function beginPrediction(auto=false){done=false;predicting=true;predictionPhase=0;pause();word=getContext().index;progress=0;calculation=attentionAt(getContext().prefix,word);prediction=predictNext(calculation);updateWord();if(auto)play();}
 $('comparison-play').addEventListener('click',()=>{if(playing){pause();return;}if(done)restart();play();});
 $('comparison-predict').addEventListener('click',()=>beginPrediction(true));
 $('comparison-prev').addEventListener('click',()=>{if(predicting&&predictionPhase>0){done=false;pause();predictionPhase--;progress=0;updateWord();}else seek(predicting?word:word-1);});
 $('comparison-next').addEventListener('click',()=>{if(predicting){pause();if(predictionPhase<2){predictionPhase++;progress=0;}else{done=true;progress=1;}updateWord();pause();}else if(word===getContext().index)beginPrediction();else seek(word+1);});
 $('comparison-reset').addEventListener('click',restart);$('comparison-seek').addEventListener('input',e=>seek(+e.target.value));
 player.addEventListener('click',e=>{const token=e.target.closest('[data-reading-word]');if(token){const line=token.parentElement,index=+token.dataset.readingWord;seek(index);line.querySelector(`[data-reading-word="${index}"]`)?.focus({preventScroll:true});}});
 compact.addEventListener('change',()=>{diagram();updateMotion();});
 function motionNote(){$('comparison-motion-note').textContent=reduced.matches?'Reduced motion: moving signals are off; Play still advances words and changes static network highlights. Both sides use an illustrative shared pace, not biological timing.':'Moving lights illustrate network coordination; the machine packets follow calculated attention weights. The shared pace is for comparison, not biological timing.';}
 reduced.addEventListener('change',()=>{brain?.setReducedMotion(reduced.matches);motionNote();updateMotion();});
 async function loadBrain(){if(loading||brain)return;loading=true;try{const {createBrain}=await import('./brain.js');brain=await createBrain({canvas:$('compare-brain'),labels:$('compare-brain-labels'),moments,emphasis,reduced:reduced.matches,flow:true,onError:()=>{$('compare-brain-fallback').hidden=false;}});brain.setOpacity(opacity);phase=-1;updatePhase();}catch(e){$('compare-brain-fallback').hidden=false;console.warn('Comparison brain unavailable:',e.message);}}
 motionNote();updateWord();
 return {pause,refresh:renderOutput,contextChanged:restart,setVisible(on){visible=on;if(!on)pause();else loadBrain();brain?.setVisible(on);},setOpacity(value){opacity=value;brain?.setOpacity(value);}};
}
