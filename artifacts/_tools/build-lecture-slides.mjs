#!/usr/bin/env node
// Converts courses/479-fall-2026/lecture-4.md into attention-assets/lecture-4-slides.mjs
// so the lab can step through the lecture as an HTML deck. Slides are split on
// horizontal rules; ```notes blocks become lecturer notes; images referenced as
// /markdown/images/… are copied into attention-assets/slides/ so the deck works
// wherever the artifact directory is served. Re-run after editing the lecture.
import fs from 'node:fs';import path from 'node:path';
const root=path.resolve(new URL('..',import.meta.url).pathname,'..');
const source=path.join(root,'courses/479-fall-2026/lecture-4.md'),out=path.join(root,'artifacts/attention-assets/lecture-4-slides.mjs'),imageDir=path.join(root,'artifacts/attention-assets/slides');
// Which lab activity each slide title opens as a deep dive.
const DIVES=[
 [/^Human Attention$|^Functions and Networks$|^What about human attention/,{tab:'human',label:'Deep dive · the three attention systems on a cortical model'}],
 [/^Machine Attention$|^From linear to grid/,{tab:'machine',panel:'games',label:'Deep dive · play the six attention games'}],
 [/^Some general terminology|^Terminology continued|fancy statistics/,{tab:'machine',panel:'training',label:'Deep dive · training versus inference, live'}],
 [/Three Matrices/,{tab:'machine',panel:'query',label:'Deep dive · where a query comes from'}],
 [/^Thought Experiment|^Sympathy for the Machine|^From Attention to Context|^Iterated Context|^From Context to Prediction|^Executive Functions|^Questions on human attention/,{tab:'compare',label:'Deep dive · read and predict, human beside machine'}],
 [/Profit|Imitation|Proletariat|Design Problem/,{tab:'social',label:'Deep dive · run the feed and close the loop'}],
];
const md=fs.readFileSync(source,'utf8').replace(/^---[\s\S]*?\n---\n/,'');
const chunks=md.split(/\n---\s*\n/).map(c=>c.trim()).filter(Boolean);
const esc=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
function inline(text){
 return text.replace(/<!--[\s\S]*?-->/g,'').replace(/\s\[-@[^\]]+\]/g,'').replace(/\[-@[^\]]+\]/g,'')
  .replace(/!\[([^\]]*)\]\(([^)]+)\)/g,(m,alt,src)=>image(alt,src))
  .replace(/\[([^\]]+)\]\(([^)]+)\)/g,'<a href="$2" target="_blank" rel="noopener">$1</a>')
  .replace(/\*\*([^*]+)\*\*/g,'<b>$1</b>').replace(/(^|[^*])\*([^*\n]+)\*/g,'$1<em>$2</em>').replace(/`([^`]+)`/g,'<code>$1</code>');
}
const copied=new Set();
function image(alt,src){
 const name=path.basename(src),local=path.join(root,'assets/images',name);
 if(fs.existsSync(local)){fs.copyFileSync(local,path.join(imageDir,name));copied.add(name);return `<img src="attention-assets/slides/${name}" alt="${esc(alt||'')}" loading="lazy">`;}
 return `<span class="deck-missing">[figure: ${esc(name)}]</span>`;
}
function block(lines){
 const html=[];let i=0;
 while(i<lines.length){
  const line=lines[i];
  if(!line.trim()){i++;continue;}
  if(/^#{1,4}\s/.test(line)){const level=line.match(/^#+/)[0].length;html.push(`<h${Math.min(level+1,5)}>${inline(line.replace(/^#+\s*/,''))}</h${Math.min(level+1,5)}>`);i++;continue;}
  if(/^\$\$/.test(line)){const math=[];i++;while(i<lines.length&&!/^\$\$/.test(lines[i]))math.push(lines[i++]);i++;html.push(`<pre class="deck-math">${esc(math.join('\n').replace(/\\begin\{align\}|\\end\{align\}/g,'').trim())}</pre>`);continue;}
  if(/^```/.test(line)){const code=[];i++;while(i<lines.length&&!/^```/.test(lines[i]))code.push(lines[i++]);i++;html.push(`<pre class="deck-code">${esc(code.join('\n'))}</pre>`);continue;}
  if(/^>/.test(line)){const q=[];while(i<lines.length&&/^>/.test(lines[i]))q.push(lines[i++].replace(/^>\s?/,''));html.push(`<blockquote>${inline(q.join(' '))}</blockquote>`);continue;}
  if(/^\|/.test(line)){const rows=[];while(i<lines.length&&/^\|/.test(lines[i]))rows.push(lines[i++]);const cells=r=>r.replace(/^\||\|$/g,'').split('|').map(c=>inline(c.trim()));const head=cells(rows[0]),body=rows.slice(2).map(cells);const blank=head.every(h=>!h);html.push(`<table>${blank?'':`<thead><tr>${head.map(h=>`<th>${h}</th>`).join('')}</tr></thead>`}<tbody>${body.map(r=>`<tr>${r.map(c=>`<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table>`);continue;}
  if(/^\s*[-*]\s/.test(line)){const items=[];while(i<lines.length&&/^\s*[-*]\s/.test(lines[i]))items.push(lines[i++].replace(/^\s*[-*]\s*/,''));html.push(`<ul>${items.map(t=>`<li>${inline(t)}</li>`).join('')}</ul>`);continue;}
  if(/^\s*\d+\.\s/.test(line)){const items=[];while(i<lines.length&&/^\s*\d+\.\s/.test(lines[i]))items.push(lines[i++].replace(/^\s*\d+\.\s*/,''));html.push(`<ol>${items.map(t=>`<li>${inline(t)}</li>`).join('')}</ol>`);continue;}
  if(/^<span/.test(line)){const parts=[];while(i<lines.length&&!/^<\/span>/.test(lines[i]))parts.push(lines[i++]);i++;html.push(`<div class="deck-small">${block(parts.slice(1))}</div>`);continue;}
  if(/^<!--/.test(line)){while(i<lines.length&&!/-->/.test(lines[i]))i++;i++;continue;}
  const para=[];while(i<lines.length&&lines[i].trim()&&!/^(#{1,4}\s|\$\$|```|>|\||\s*[-*]\s|\s*\d+\.\s|<span|<!--)/.test(lines[i]))para.push(lines[i++]);
  if(para.length)html.push(`<p>${inline(para.join(' '))}</p>`);else i++;
 }
 return html.join('\n');
}
const slides=[];let section='Attention',lastTitle='';
for(const chunk of chunks){
 const notes=[];const body=chunk.replace(/```notes\n([\s\S]*?)```/g,(m,n)=>{notes.push(n.trim());return '';}).trim();
 const lines=body.split('\n');const titleLine=lines.find(l=>/^#{2,3}\s/.test(l));
 const title=titleLine?titleLine.replace(/^#+\s*/,'').trim():lastTitle?lastTitle+' (continued)':'Slide';
 const rest=titleLine?lines.filter(l=>l!==titleLine):lines;
 if(/Synthesizing/.test(title))section='Synthesis';else if(/Human Attention|What about human attention/.test(title))section='Human attention';else if(/Machine Attention/.test(title))section='Machine attention';else if(/Profit/.test(title))section='Attention economy';
 const dive=(DIVES.find(([re])=>re.test(title))||[])[1]||null;
 slides.push({index:slides.length,title,section,html:block(rest),notes:notes.map(n=>block(n.split('\n'))).join('\n'),dive});
 lastTitle=title.replace(/ \(continued\)$/,'');
}
const header=`// Generated from courses/479-fall-2026/lecture-4.md by artifacts/_tools/build-lecture-slides.mjs. Do not edit by hand.\n`;
fs.writeFileSync(out,header+`export const LECTURE={course:'EPOL 479',week:4,title:'Attention',source:'courses/479-fall-2026/lecture-4.md',generated:'${new Date().toISOString().slice(0,10)}'};\nexport const SLIDES=${JSON.stringify(slides,null,1)};\n`);
console.log(`${slides.length} slides → ${path.relative(root,out)}; ${copied.size} images copied; dives: ${slides.filter(s=>s.dive).length}`);
for(const s of slides)console.log(String(s.index).padStart(2),s.section.padEnd(18),s.title.slice(0,48).padEnd(50),s.dive?s.dive.tab:'');
