// Lecture mode: the Week 4 slides as an overlay deck. Students can step through
// the whole lecture, open the contents to jump straight to a simulation, or take
// a deep dive from a slide into the matching lab activity and return.
import {SLIDES,LECTURE} from './lecture-4-slides.mjs?v=20260920-deck';
const $=(s,r=document)=>r.querySelector(s),esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const SIMS=[
 {tab:'machine',panel:'games',title:'Six attention games',text:'Budget, keys and queries, sharpness, heads, rules, two layers.'},
 {tab:'machine',panel:'query',title:'Where a query comes from',text:'Embedding plus position through a learned projection.'},
 {tab:'machine',panel:'training',title:'Training versus inference',text:'A real gradient step on a toy, then fixed weights.'},
 {tab:'human',title:'Human attention on a cortical model',text:'Alerting, orienting and executive control while reading.'},
 {tab:'compare',title:'Read and predict together',text:'The same sentence, human left and machine right.'},
 {tab:'social',title:'Run the feed: the attention loop',text:'Train, generate, broadcast, monetize, and back again.'}
];
let index=0,seen=new Set(),returnTo=null,opener=null;
const deck=document.createElement('div');deck.className='deck';deck.id='deck';deck.hidden=true;deck.setAttribute('role','dialog');deck.setAttribute('aria-modal','true');deck.setAttribute('aria-labelledby','deck-title');deck.dataset.notes='false';
deck.innerHTML=`<div class="deck-bar"><strong>Spotlight</strong><span>${esc(LECTURE.course)} · Week ${LECTURE.week} · ${esc(LECTURE.title)} · lecture slides</span><span class="deck-count" id="deck-count"></span><button type="button" id="deck-contents-toggle" aria-pressed="false" aria-controls="deck-contents">Contents</button><button type="button" id="deck-notes-toggle" aria-pressed="false">Notes</button><button type="button" id="deck-close">Close ✕</button></div>
<div class="deck-body"><div class="deck-slide" id="deck-slide" tabindex="-1"></div><aside class="deck-notes" id="deck-notes" aria-label="Lecturer notes"></aside>
<div class="deck-contents" id="deck-contents" hidden><div><h3>Contents</h3><ol class="deck-toc" id="deck-toc"></ol></div><div><h3>Go straight to a simulation</h3><p class="deck-hint" style="white-space:normal;margin-bottom:12px">Each opens the lab activity directly. A ▶ marker in the contents shows where the lecture reaches it.</p><div class="deck-sims" id="deck-sims"></div></div></div></div>
<div class="deck-foot"><button type="button" id="deck-prev">← Previous</button><div class="deck-progress" id="deck-progress" role="group" aria-label="Slides"></div><span class="deck-hint">← → to move · N for notes · Esc to close</span><button type="button" class="primary" id="deck-next">Next →</button></div>`;
document.body.appendChild(deck);
const chip=document.createElement('button');chip.type='button';chip.className='deck-return';chip.id='deck-return';chip.hidden=true;document.body.appendChild(chip);
function tabFor(name){return document.getElementById('tab-'+name);}
function select(tab,panel){const t=tabFor(tab);if(t)t.click();if(panel){const b=document.querySelector(`[data-machine="${panel}"]`);if(b)b.click();}}
export function openDeck(at=index,from=null){opener=from||document.activeElement;index=Math.max(0,Math.min(SLIDES.length-1,at));deck.hidden=false;document.body.style.overflow='hidden';chip.hidden=true;render();$('#deck-slide').focus({preventScroll:true});if(history.replaceState)history.replaceState(null,'',`#slide-${index+1}`);}
export function closeDeck(){deck.hidden=true;document.body.style.overflow='';$('#deck-contents').hidden=true;$('#deck-contents-toggle').setAttribute('aria-pressed','false');if(location.hash.startsWith('#slide')&&history.replaceState)history.replaceState(null,'',location.pathname+location.search);if(opener&&opener.focus)opener.focus({preventScroll:true});}
function dive(slide){const d=slide.dive;returnTo=slide.index;closeDeck();select(d.tab,d.panel);chip.innerHTML=`↩ Back to slide ${slide.index+1} <small>· ${esc(slide.title)}</small>`;chip.hidden=false;const target=document.getElementById(d.tab);if(target)target.scrollIntoView({block:'start',behavior:'instant'});}
function render(){
 const s=SLIDES[index];seen.add(index);deck.dataset.slide=index;
 $('#deck-count').textContent=`${index+1} / ${SLIDES.length}`;
 $('#deck-slide').innerHTML=`<p class="eyebrow">${esc(s.section)} · slide ${index+1}</p><h2 id="deck-title">${esc(s.title)}</h2><div class="deck-content">${s.html||'<p class="deck-missing">This slide has no content.</p>'}</div>${s.dive?`<div class="deck-dive"><span>Deep dive</span><strong>${esc(s.dive.label.replace(/^Deep dive · /,''))}</strong><button type="button" id="deck-dive">Open the simulation →</button></div>`:''}`;
 $('#deck-notes').innerHTML=`<p class="eyebrow">Lecturer notes</p>${s.notes||'<p class="deck-notes-empty">No notes for this slide.</p>'}`;
 $('#deck-prev').disabled=index===0;$('#deck-next').textContent=index===SLIDES.length-1?'Finish ✓':'Next →';
 $('#deck-progress').innerHTML=SLIDES.map((sl,i)=>`<button type="button" data-go-slide="${i}" class="${sl.dive?'dive':''} ${seen.has(i)?'seen':''}" ${i===index?'aria-current="step"':''} aria-label="Slide ${i+1}: ${esc(sl.title)}" title="${esc(sl.title)}"></button>`).join('');
 $('#deck-toc').innerHTML=SLIDES.map((sl,i)=>`<li><button type="button" data-go-slide="${i}" ${i===index?'aria-current="step"':''}><span class="n">${String(i+1).padStart(2,'0')}</span>${esc(sl.title)}${sl.dive?`<span class="sim">▶ ${esc(sl.dive.tab)}</span>`:''}</button></li>`).join('');
 $('#deck-sims').innerHTML=SIMS.map((sim,i)=>`<button type="button" data-go-sim="${i}"><small>Simulation</small><strong>${esc(sim.title)}</strong><span>${esc(sim.text)}</span></button>`).join('');
 $('#deck-slide').scrollTop=0;if(history.replaceState&&!deck.hidden)history.replaceState(null,'',`#slide-${index+1}`);
}
function go(i){index=Math.max(0,Math.min(SLIDES.length-1,i));$('#deck-contents').hidden=true;$('#deck-contents-toggle').setAttribute('aria-pressed','false');render();$('#deck-slide').focus({preventScroll:true});}
deck.addEventListener('click',e=>{
 const b=e.target.closest('button');if(!b)return;
 if(b.id==='deck-close')closeDeck();else if(b.id==='deck-prev')go(index-1);else if(b.id==='deck-next'){if(index===SLIDES.length-1)closeDeck();else go(index+1);}
 else if(b.id==='deck-dive')dive(SLIDES[index]);
 else if(b.id==='deck-notes-toggle'){const on=deck.dataset.notes!=='true';deck.dataset.notes=on;b.setAttribute('aria-pressed',on);}
 else if(b.id==='deck-contents-toggle'){const c=$('#deck-contents');c.hidden=!c.hidden;b.setAttribute('aria-pressed',!c.hidden);}
 else if(b.dataset.goSlide!==undefined)go(+b.dataset.goSlide);
 else if(b.dataset.goSim!==undefined){const sim=SIMS[+b.dataset.goSim];returnTo=index;closeDeck();select(sim.tab,sim.panel);chip.innerHTML=`↩ Back to slide ${index+1} <small>· ${esc(SLIDES[index].title)}</small>`;chip.hidden=false;const target=document.getElementById(sim.tab);if(target)target.scrollIntoView({block:'start',behavior:'instant'});}
});
document.addEventListener('keydown',e=>{if(deck.hidden)return;if(e.target.matches('input,textarea,select'))return;if(e.key==='ArrowRight'||e.key===' '||e.key==='PageDown'){e.preventDefault();go(index+1);}else if(e.key==='ArrowLeft'||e.key==='PageUp'){e.preventDefault();go(index-1);}else if(e.key==='Home'){e.preventDefault();go(0);}else if(e.key==='End'){e.preventDefault();go(SLIDES.length-1);}else if(e.key==='Escape'){closeDeck();}else if(e.key.toLowerCase()==='n'){$('#deck-notes-toggle').click();}else if(e.key.toLowerCase()==='c'){$('#deck-contents-toggle').click();}});
chip.addEventListener('click',()=>{openDeck(returnTo??index,chip);});
document.addEventListener('click',e=>{const b=e.target.closest('[data-open-deck]');if(!b)return;const at=b.dataset.openDeck===''?0:parseInt(b.dataset.openDeck,10)||0;openDeck(at,b);});
const m=location.hash.match(/^#slide-(\d+)$/);if(m)openDeck(+m[1]-1);else if(location.hash==='#slides')openDeck(0);
window.addEventListener('hashchange',()=>{const h=location.hash.match(/^#slide-(\d+)$/);if(h&&deck.hidden)openDeck(+h[1]-1);else if(location.hash==='#slides'&&deck.hidden)openDeck(0);});
