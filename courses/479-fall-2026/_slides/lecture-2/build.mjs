import fs from 'node:fs/promises';
import path from 'node:path';
import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import {parseSource} from './source.mjs';
const req=createRequire(path.join(process.env.RUNTIME_NODE_MODULES,'artifact-loader.cjs'));
const {PresentationFile,FileBlob}=await import(req.resolve('@oai/artifact-tool'));
const sharp=req('sharp');
const HERE=path.dirname(fileURLToPath(import.meta.url));
const ROOT=process.env.LECTURE_REPO||'/Users/lmagee/Dev/machinespirits/machinespirits-content-philosophy';
const COURSE=path.join(ROOT,'courses/479-fall-2026');
const DIR=process.env.LECTURE_QA||path.join(HERE,'renders');
const SOURCE=process.env.LECTURE_SOURCE||path.join(COURSE,'lecture-2.md');
const OUT=process.env.LECTURE_OUTPUT||path.join(COURSE,'479-lecture-2.pptx');
const starterPptx=process.env.LECTURE_TEMPLATE||path.join(COURSE,'479-lecture-2.pptx');
const preserveImages=process.env.LECTURE_PRESERVE_IMAGES==='1';
const SERIF='Iowan Old Style';
const C={bg:'#121021',ink:'#ECE7F0',gold:'#F0C9A0',dim:'#A49DB8'};
const imageRatios=new WeakMap();
const imageRecords=new WeakMap();
const sha256=bytes=>createHash('sha256').update(bytes).digest('hex');
async function refreshImage(image,reference){
 let base;
 if(reference.source.startsWith('https://')){
  if(!reference.source.includes('1831_Schlesinger_Philosoph_Georg_Friedrich_Wilhelm_Hegel_anagoria.JPG'))throw new Error('Download the new remote image before building: '+reference.source);
  base=path.join(COURSE,'lecture-2-images/hegel-portrait.jpg');
 }else if(reference.source.startsWith('/markdown/images/'))base=path.join(ROOT,'assets/images',path.basename(reference.source));
 else base=path.resolve(COURSE,reference.source);
 // The Markdown reference is authoritative, including when PNG masters also exist.
 let bytes=await fs.readFile(base);
 const originalHash=sha256(bytes);
 const metadata=await sharp(bytes).metadata();
 let contentType=/\.jpe?g$/i.test(base)?'image/jpeg':'image/png';
 // Decode WebP losslessly to PNG for broad PowerPoint compatibility.
 if(base.endsWith('.webp'))bytes=await sharp(bytes).png().toBuffer();
 image.replace({blob:bytes,contentType,alt:reference.alt,fit:'contain'});
 imageRatios.set(image,metadata.width/metadata.height);
 imageRecords.set(image,{source:reference.source,file:base,source_sha256:originalHash,embedded_sha256:sha256(bytes),contentType,width:metadata.width,height:metadata.height});
}
const parsed=await parseSource(SOURCE);
const deck=await PresentationFile.importPptx(await FileBlob.load(starterPptx));
await fs.mkdir(DIR,{recursive:true});
const originals=[...deck.slides.items];
const inventory=[];
for(const [index,slide] of originals.entries()){
 const layout=JSON.parse(await (await slide.export({format:'layout'})).text());
 const title=layout.elements.find(e=>['title','source-title'].includes(e.name));
 if(!title)throw new Error('Missing inherited title on slide '+(index+1));
 inventory.push({slide,number:index+1,title:title.text,layout});
}
const titleKey=value=>value.normalize('NFKD').replace(/[‘’]/g,"'").toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
const findReference=title=>inventory.find(item=>titleKey(item.title)===titleKey(title));
// The original 20-slide deck predates source-faithful title names, while a
// rebuilt deck carries them. Keep stable slide-number fallbacks so either can
// serve as the template and the builder remains reproducible.
const generic=findReference('Lecture Overview')||inventory[1];
const segue=findReference('Segue: What is Our Experience of Experience?')||inventory[14]||generic;
const blank=findReference('First Experiment')||inventory[15]||segue;
if(!generic||!segue)throw new Error('The lecture template is missing its reusable layouts');
const mapped=parsed.slides.map((source,index)=>{
 const semanticReference=source.body.some(p=>p.kind==='quote')?inventory[15]:
  source.headings.length>1?inventory[9]:undefined;
 const reference=(preserveImages&&index<inventory.length?inventory[index]:(!source.image&&!source.body.length?blank:findReference(source.headings[0].text)))||semanticReference||generic;
 return {source,reference,slide:reference.slide.duplicate()};
});
for(const slide of originals)slide.delete();
mapped.forEach((item,index)=>item.slide.moveTo(index));
await fs.writeFile(DIR+'/template-frame-map.json',JSON.stringify({sourcePptx:starterPptx,slides:mapped.map((item,index)=>({outputSlide:index+1,sourceSlide:item.reference.number,sourceTitle:item.reference.title,outputTitle:item.source.headings[0].text,reuseMode:'duplicate-slide'}))},null,2));
await (await PresentationFile.exportPptx(deck)).save(DIR+'/template-starter.pptx');
function runsWithStyle(runs,extra={}){return runs.map(r=>({run:r.run,textStyle:{...r.textStyle,...extra},...(r.link?{link:r.link}:{})}));}
function setTextBox(shape,value,frame,size,color=C.ink,extra={}){
 shape.name=extra.name||shape.name;shape.position=frame;shape.fill='none';shape.line={fill:'none',width:0};
 shape.text.set(value);shape.text.style={typeface:SERIF,fontSize:size,color,wrap:'square',autoFit:'none',verticalAlignment:'top',insets:{top:0,right:0,bottom:0,left:0},...(extra.style||{})};
}
function paraValue(paras,gapPt=4){return paras.map(p=>({runs:runsWithStyle(p.runs,p.kind==='quote'?{italic:true,color:C.gold}:{}),...(p.kind==='bullet'?{bulletCharacter:'•',marginLeft:(26+p.level*30)*9525,indent:-16*9525}:{}),spaceAfter:p.kind==='quote'?0:gapPt*100}));}
function fitImage(image,slot){const f=image.frame;const ratio=imageRatios.get(image)||f.width/f.height;let width=slot.width,height=width/ratio;if(height>slot.height){height=slot.height;width=height*ratio;}image.frame={left:slot.left+(slot.width-width)/2,top:slot.top+(slot.height-height)/2,width,height};image.crop={left:0,top:0,right:0,bottom:0};image.fit='contain';}
const plan=[];
for(let i=0;i<mapped.length;i++){
 const {slide,source,reference}=mapped[i];
 // Layout identities are independent of slide numbers, so inserted slides are safe.
 const n=source.number===1?1:
  source.number===4?4:
  source.headings.length>1?10:
  source.body.some(p=>p.kind==='quote')?16:0;
 const title=slide.shapes.items.find(s=>s.name==='title'||s.name==='source-title');
 const secondary=n===10?slide.shapes.items.find(s=>s.name==='eyebrow'||s.name==='source-subheading'):null;
 const primary=n===1?null:(n===16?slide.shapes.items.find(s=>s.name==='quote'||s.name==='source-body'):slide.shapes.items.find(s=>['block-0-body','source-body','source-body-1'].includes(s.name)));
 const secondBody=n===4?slide.shapes.items.find(s=>s.name==='block-1-body'||s.name==='source-body-2'):null;
 if(!title||(source.body.length&&!primary))throw new Error('Missing inherited text element on slide '+(i+1));
 if(source.image){
  // Source-faithful rebuilds require one editable image object. Preserve mode
  // also supports layouts whose artwork was imported as a non-image shape.
  if(!preserveImages&&slide.images.items.length!==1)throw new Error('Missing inherited image on slide '+(i+1));
  if(!preserveImages)await refreshImage(slide.images.items[0],source.image);
 }else for(const image of [...slide.images.items])image.delete();
 if(!source.image&&!source.body.length){
  for(const shape of [...slide.shapes.items])if(shape!==title)shape.delete();
  if(!preserveImages)setTextBox(title,[source.headings[0].runs],{left:64,top:292,width:1152,height:110},44,C.ink,{name:'source-title'});
  slide.speakerNotes.textFrame.setText(source.notes);
  plan.push({slide:i+1,headings:source.headings.map(h=>h.text),body:[],notes:source.notes,image:null});
  continue;
 }
 if(!source.image){
  const keep=new Set([title,primary].filter(Boolean));
  for(const shape of [...slide.shapes.items])if(!keep.has(shape))shape.delete();
  const titleSize=source.headings[0].text.length>47?42:44;
  setTextBox(title,[source.headings[0].runs],{left:64,top:58,width:1152,height:105},titleSize,C.ink,{name:'source-title'});
  const words=source.body.reduce((k,p)=>k+p.text.split(/\s+/).length,0);
  setTextBox(primary,paraValue(source.body),{left:64,top:184,width:1152,height:472},words>115?24:28,C.ink,{name:'source-body'});
  slide.speakerNotes.textFrame.setText(source.notes);
  plan.push({slide:i+1,headings:source.headings.map(h=>h.text),body:source.body.map(p=>({kind:p.kind,level:p.level,text:p.text})),notes:source.notes,image:null});
  continue;
 }
 const keep=new Set([title,secondary,primary,secondBody].filter(Boolean));
 for(const shape of [...slide.shapes.items])if(!keep.has(shape))shape.delete();
 title.name='source-title';
 if(n===1)setTextBox(title,[source.headings[0].runs],{left:64,top:55,width:1152,height:166},52,C.ink,{name:'source-title'});
 else {
  const titleSize=source.headings[0].text.length>47?42:44;
  setTextBox(title,[source.headings[0].runs],{left:64,top:n===10?48:58,width:1152,height:n===10?68:n===4?80:105},titleSize,C.ink,{name:'source-title'});
 }
 if(n===1){if(!preserveImages)fitImage(slide.images.items[0],{left:260,top:244,width:760,height:434});}
 else if(n===4){
  const split=9;setTextBox(primary,paraValue(source.body.slice(0,split),2),{left:64,top:151,width:550,height:528},22.5,C.ink,{name:'source-body-1'});
  setTextBox(secondBody,paraValue(source.body.slice(split),2),{left:660,top:151,width:550,height:370},22.5,C.ink,{name:'source-body-2'});
  if(!preserveImages)fitImage(slide.images.items[0],{left:965,top:535,width:245,height:143});
 }else if(n===10){
  secondary.name='source-subheading';setTextBox(secondary,[source.headings[1].runs],{left:64,top:125,width:1100,height:45},30,C.gold,{name:'source-subheading'});
  setTextBox(primary,paraValue(source.body),{left:64,top:201,width:654,height:456},28,C.ink,{name:'source-body'});
  if(!preserveImages)fitImage(slide.images.items[0],{left:780,top:205,width:436,height:420});
 }else if(n===16){
  setTextBox(primary,paraValue(source.body),{left:64,top:172,width:790,height:480},25,C.ink,{name:'source-body'});
  if(!preserveImages)fitImage(slide.images.items[0],{left:884,top:210,width:332,height:380});
 }else{
  const words=source.body.reduce((k,p)=>k+p.text.split(/\s+/).length,0);
  const size=words>67?25:words>55?26:28;
  setTextBox(primary,paraValue(source.body),{left:64,top:184,width:654,height:472},size,C.ink,{name:'source-body'});
  if(!preserveImages)fitImage(slide.images.items[0],{left:780,top:186,width:436,height:456});
 }
 slide.speakerNotes.textFrame.setText(source.notes);
 plan.push({slide:i+1,headings:source.headings.map(h=>h.text),body:source.body.map(p=>({kind:p.kind,level:p.level,text:p.text})),notes:source.notes,image:source.image,embedded_image:imageRecords.get(slide.images.items[0])});
}
await fs.mkdir(DIR+'/author-renders',{recursive:true});await fs.mkdir(DIR+'/author-layouts',{recursive:true});
for(let i=0;i<mapped.length;i++){
 const slide=deck.slides.items[i],stem='slide-'+String(i+1).padStart(2,'0');
 const png=await slide.export({format:'png',scale:1});await fs.writeFile(DIR+'/author-renders/'+stem+'.png',new Uint8Array(await png.arrayBuffer()));
 const layout=await slide.export({format:'layout'});await fs.writeFile(DIR+'/author-layouts/'+stem+'.layout.json',await layout.text());
}
await fs.writeFile(DIR+'/source-plan.json',JSON.stringify({source_sha256:parsed.source_sha256,slides:plan},null,2));
await fs.writeFile(DIR+'/source-notes.txt','Authoritative source: '+SOURCE+'\nSHA-256: '+parsed.source_sha256+'\nNo external research or editorial changes were added. Notes are literal Markdown notes blocks. '+(preserveImages?'Images and image frames are preserved byte-for-byte from the input deck.':'Images come from the exact Markdown references; WebP files are decoded to PNG without pixel changes for compatibility.')+' Style and layouts are inherited from the prior lecture deck; style reference is dialectic.html.\n');
const out=await PresentationFile.exportPptx(deck);await out.save(OUT);
console.log('Saved verbatim '+mapped.length+'-slide PowerPoint.');
