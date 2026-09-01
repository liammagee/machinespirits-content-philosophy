import fs from 'node:fs/promises';
import path from 'node:path';
import {createRequire} from 'node:module';
import {createHash} from 'node:crypto';
const req=createRequire(path.join(process.env.RUNTIME_NODE_MODULES,'artifact-loader.cjs'));
const {marked}=await import(req.resolve('marked'));
export function inline(md){
 const walk=(ts,style={})=>ts.flatMap(t=>{
  if(t.type==='strong')return walk(t.tokens,{...style,bold:true});
  if(t.type==='em')return walk(t.tokens,{...style,italic:true});
  if(t.type==='link')return walk(t.tokens,style).map(r=>({...r,link:{uri:t.href,isExternal:true}}));
  if(t.type==='image')return [];
  if(t.type==='br')return [{run:'\n',textStyle:style}];
  if(t.type==='text'||t.type==='escape'||t.type==='codespan')return [{run:(t.text??t.raw).replace(/\n/g,' '),textStyle:style}];
  if(t.tokens)return walk(t.tokens,style);
  throw new Error('Unsupported inline token '+t.type);
 });
 return walk(marked.Lexer.lexInline(md));
}
export async function parseSource(file){
 const bytes=await fs.readFile(file),source=bytes.toString('utf8');
 const pieces=source.split(/^---\s*$/m);
 const slides=pieces.map((raw,index)=>{
  const slide={number:index+1,headings:[],body:[],image:null,notes:'',raw};
  const flattenList=(t,level=0)=>{
   for(const item of t.items){
    let first=true;
    for(const child of item.tokens){
     if(child.type==='list'){flattenList(child,level+1);continue;}
     if(child.type==='space')continue;
     if(child.type!=='text'&&child.type!=='paragraph')throw new Error('Unsupported list child '+child.type);
     const runs=inline(child.text);
     slide.body.push({kind:first?'bullet':'paragraph',level,runs,text:runs.map(r=>r.run).join('')});first=false;
    }
   }
  };
  for(const t of marked.lexer(raw)){
   if(t.type==='space')continue;
   // Markdown comments are excluded from both slide text and speaker notes.
   if(t.type==='html'&&/^\s*<!--[\s\S]*?-->\s*$/.test(t.raw))continue;
   if(t.type==='heading'){const runs=inline(t.text);slide.headings.push({depth:t.depth,runs,text:runs.map(r=>r.run).join('')});}
   else if(t.type==='list')flattenList(t);
   else if(t.type==='code'&&t.lang==='notes'){
    if(slide.notes)throw new Error('Multiple notes blocks');
    // Preserve the notes block literally, including emphasis markers and blank lines.
    const match=raw.match(/^```notes[^\n]*\n([\s\S]*?)^```\s*$/m);
    if(!match)throw new Error('Notes fence not found');
    slide.notes=match[1];
   }
   else if(t.type==='code'&&!t.lang&&!t.text.trim())continue;
   else if(t.type==='blockquote'){
    for(const child of t.tokens){if(child.type==='space')continue;if(child.type!=='paragraph')throw new Error('Unsupported quotation structure');const runs=inline(child.text);slide.body.push({kind:'quote',level:0,runs,text:runs.map(r=>r.run).join('')});}
   }
   else if(t.type==='paragraph'){
    const images=t.tokens.filter(x=>x.type==='image');
    if(images.length){if(images.length!==1||slide.image)throw new Error('Unexpected image count');slide.image={source:images[0].href,alt:images[0].text};if(t.tokens.some(x=>x.type!=='image'&&(x.text||'').trim()))throw new Error('Mixed image paragraph');}
    else {const runs=inline(t.text);slide.body.push({kind:'paragraph',level:0,runs,text:runs.map(r=>r.run).join('')});}
   }else throw new Error('Unsupported source token '+t.type);
  }
  if(!slide.headings.length)throw new Error('Missing heading');
  return slide;
 });
 return {source_sha256:createHash('sha256').update(bytes).digest('hex'),slides};
}
