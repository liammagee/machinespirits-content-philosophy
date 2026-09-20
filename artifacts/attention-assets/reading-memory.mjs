// Authored reading examples, not a model of memory capacity or neural storage.
// Petersen & Posner's control account motivates keeping a goal and adjusting
// activity; these sentence meanings are our application of that account.
const stories={
 cat:[
  [0,'The sentence is beginning.'],[1,'A cat.'],[2,'The cat sat.'],
  [5,'The cat sat on a mat.'],[6,'The cat sat on a mat; a reason is coming.'],
  [7,'The cat sat on a mat; “it” refers back to the cat.'],
  [8,'The cat sat on a mat; its state may explain why.']
 ],
 glass:[
  [0,'A reason is coming.'],[2,'The reason concerns a glass.'],
  [4,'The glass was fragile.'],[7,'The glass was fragile; a mover is involved.'],
  [8,'The mover wrapped the fragile glass.'],[9,'The mover wrapped the fragile glass; “it” refers to that glass.']
 ],
 machines:[
  [0,'The sentence concerns machines.'],[1,'Machines learn.'],
  [3,'The sentence is explaining how machines learn.'],
  [4,'Learning is linked to paying attention.'],[5,'Machines learn by paying attention; what to?']
 ]
};
const lengths={cat:9,glass:10,machines:6};
const clueWords={cat:'“cat” and “because”',glass:'“glass” and “fragile”',machines:'“learn” and “attention to”'};
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

export function readingMemory(key,index,{predictionPhase=-1}={}){
 const story=stories[key];
 if(!story||!Number.isInteger(index)||index<0||index>=lengths[key])throw new RangeError('Choose a word in a reading example');
 const [sourceIndex,gist]=story.filter(([at])=>at<=index).at(-1);
 const use=predictionPhase===0?'Use the recent meaning with learned language knowledge to consider endings.':predictionPhase===1?`Check a possible ending against the meaning you are holding; reread ${clueWords[key]} if needed.`:predictionPhase===2?'Use that meaning to choose a word, while keeping the task goal.':index===0?'Take in the first word while retaining the instruction.':`Relate the current word to the meaning held so far. You can look back if a clue needs refreshing.`;
 return{goal:'Predict the next word',gist,use,sourceIndex,index,mode:predictionPhase>0?'check':predictionPhase===0?'use':index===0?'hold':'update'};
}

export function humanMemoryScene(key,moment){
 const state=readingMemory(key,lengths[key]-1);
 return {...state,mode:['hold','update','refresh','hold','check'][moment],
  gist:moment===0?'The instruction is ready; sentence meaning has not yet been built.':state.gist,
  use:[
   'Retain the instruction as you get ready to read.',
   'Select useful words and build a temporary sense of what the sentence means.',
   `Return to ${clueWords[key]} to refresh the information you are using.`,
   'Keep the prediction goal active while the sentence meaning remains available. Keeping a goal is different from storing its words.',
   'Use the held meaning to check an ending; update your interpretation or guess if necessary.'
  ][moment]};
}

export function humanMemoryMarkup(state){
 return `<p class="memory-label">Short-term / working memory</p>
 <div class="memory-goal"><span>Keep the goal</span><strong>${esc(state.goal)}</strong></div>
 <div class="memory-held"><span>Hold recent meaning</span><p data-memory-gist>${esc(state.gist)}</p></div>
 <div class="memory-use"><span>${{hold:'Hold',update:'Update',refresh:'Refresh',use:'Use',check:'Check'}[state.mode]}</span><p>${esc(state.use)}</p></div>
 <p class="memory-caveat">Illustrative meaning, not a measured memory trace.</p>`;
}

export function machineMemoryMarkup(tokens,index,mixture){
 return `<p class="memory-label">Machine context · this inference</p>
 <div class="memory-goal"><span>Fixed task</span><strong>Predict the next token</strong></div>
 <div class="memory-held"><span>Available input</span><p>${index+1} of ${tokens.length} prefix positions</p>
 <div class="memory-positions" aria-label="${index+1} available positions; ${tokens.length-index-1} future positions masked">${tokens.map((word,i)=>`<span class="${i<=index?'available':'unavailable'} ${i===index?'current':''}" data-memory-position="${i}" title="${esc(word)}: ${i<=index?'available':'masked'}">${i+1}</span>`).join('')}</div></div>
 <div class="memory-use"><span>Read and combine</span><p>Attention uses available keys and values. Current mixture: <b>[${mixture.map(n=>n.toFixed(2)).join(', ')}]</b>.</p></div>
 <p class="memory-caveat">Activations change; weights stay fixed during inference. This is not biological working memory.</p>`;
}
