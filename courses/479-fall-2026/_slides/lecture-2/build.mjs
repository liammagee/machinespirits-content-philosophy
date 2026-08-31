import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
if (!process.env.RUNTIME_NODE_MODULES) throw new Error('Set RUNTIME_NODE_MODULES to the bundled Node packages path returned by load_workspace_dependencies.');
const runtimeRequire = createRequire(path.join(process.env.RUNTIME_NODE_MODULES,'artifact-loader.cjs'));
const { Presentation, PresentationFile } = await import(runtimeRequire.resolve('@oai/artifact-tool'));

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = process.env.LECTURE_REPO || '/Users/lmagee/Dev/machinespirits/machinespirits-content-philosophy';
const COURSE = path.join(ROOT, 'courses/479-fall-2026');
const OUT = process.env.LECTURE_OUTPUT || path.join(COURSE, '479-lecture-2.pptx');
const QA = process.env.LECTURE_QA || path.join(HERE, 'renders');
const COLORS = {bg:'#121021', panel:'#1a1730', ink:'#ece7f0',dim:'#a49db8',gold:'#f0c9a0',coral:'#e08e9b',teal:'#8fd6c2',blue:'#a9bbe8',violet:'#c0aee6'};
const SERIF = 'Iowan Old Style';
const MONO = 'Menlo';
const PDF = path.join(COURSE, '_readings/Georg Wilhelm Friedrich Hegel - The Phenomenology of Spirit (Terry Pinkard Translation).pdf');
const RAG = 'https://arxiv.org/abs/2005.11401';
const PORTRAIT = 'https://commons.wikimedia.org/wiki/File:1831_Schlesinger_Philosoph_Georg_Friedrich_Wilhelm_Hegel_anagoria.JPG';

// Visible copy is deliberately shorter than the source. Every original slide,
// including its notes, is retained verbatim in the PowerPoint speaker notes.
const D = [
 {title:'Hegel and\nexperience',kicker:'EPOL 479  /  LECTURE 02',layout:'cover',subtitle:'Introducing the Phenomenology of Spirit',tag:'Erfahrung',ref:'INTRODUCTION §§84–87 · CONSCIOUSNESS §§90–165'},
 {title:'Three questions for today',kicker:'LECTURE OVERVIEW',layout:'left',blocks:[['Why Hegel?','A philosophy of learning and transformation.'],['What counts as experience?','Sense-certainty, perception, understanding.'],['What changes for machines?','Use the analogy; examine its limits.']],ref:'A SEQUENCE OF SHAPES, NOT A THREE-STEP RECIPE',note:'The source mentions thesis / antithesis / synthesis as reductive shorthand. This deck follows the movement of the specified passages rather than presenting that shorthand as Hegel’s universal method.'},
 {title:'Hegel in his historical world',kicker:'SOME NOTES ON HEGEL',layout:'portrait',blocks:[['After Kant','A German philosopher of the early nineteenth century.'],['A world in upheaval','The Enlightenment and French Revolution frame his work.'],['Freedom and modern life','Logic, history, art and politics belong to one philosophical project.']],ref:'HISTORICAL CONTEXT · PHENOMENOLOGY PUBLISHED 1807',note:'The source’s broad “End of History” claim is retained in the original text below, not presented as an uncontested historical fact in the visible copy.'},
 {title:'A legacy of arguments',kicker:'HEGEL’S INFLUENCE',layout:'right',blocks:[['Politics and social critique','Marx and Engels; the Frankfurt School.'],['Continental thought','Kojève, Lacan and French theory.'],['Contemporary philosophy','Brandom, Pippin, Pinkard; Žižek and AI.']],ref:'INFLUENCE INCLUDES DISAGREEMENT',note:'This is a selective teaching map drawn from the lecture, not a claim that every listed tradition follows directly from Hegel. The full list and its qualifications remain below.'},
 {title:'A book about learning to know',kicker:'PHENOMENOLOGY OF SPIRIT · 1807',layout:'left',blocks:[['A changing relation','Consciousness tests its knowing against what it takes to be true.'],['A difficult education','A shape of knowing can fail by its own standard.'],['The course question','What could this account illuminate about human and machine learning?']],ref:'INTRODUCTION §§84–87',note:'The human/machine comparison is the course’s contemporary interpretive extension, not a claim Hegel makes about AI.'},
 {title:'What does Geist name?',kicker:'MIND · SPIRIT · SHARED LIFE',layout:'right',blocks:[['Mind','Thinking and knowing, seemingly our own.'],['Spirit','The shared world in which thinking takes shape.'],['A translation problem','The English title changes what we expect the book to explain.']],ref:'PHÄNOMENOLOGIE DES GEISTES',note:'Mind and spirit are translation choices, not two independent substances. The source’s ghost / guest / host associations are classroom wordplay, not asserted etymological equivalents.'},
 {title:'How things appear',kicker:'PHENOMENOLOGY',layout:'left',blocks:[['Phenomena','What appears to us.'],['Kant’s challenge','How are appearances related to things as they are in themselves?'],['Hegel’s question','Can knowing examine that distinction through its own experience?']],ref:'THE LECTURE’S KANT-TO-HEGEL FRAMING · §§84–85',note:'The image is a teaching analogy about appearance and viewpoint; it does not depict a noumenal reality accessible from outside experience.'},
 {title:'Experience changes knowing',kicker:'ERFAHRUNG',layout:'right',blocks:[['A claim meets its limit','What I take the object to be no longer holds together.'],['The standard also changes','The test transforms what counts as the true object.'],['A new shape emerges','Experience changes both knowing and its object for consciousness.']],ref:'INTRODUCTION §§84–87 · ESPECIALLY §86',note:'These are interpretive paraphrases of Pinkard §§84–87. The point is not that an individual freely creates physical reality.'},
 {title:'More than receiving impressions',kicker:'HEGEL AND EMPIRICISM',layout:'left',blocks:[['The classroom contrast','An empty container receives facts; an inquirer tests a way of knowing.'],['Active, but constrained','Concepts shape experience and can be defeated within it.'],['For education','What changes when learning revises the frame of the problem?']],ref:'TEACHING CONTRAST · INTRODUCTION §§84–87',note:'The passive-reception characterization is a simplification of empiricism, not a complete account of Locke or empiricist traditions. The source’s Freire and machine-learning comparisons are analogies. Avoid equating Hegel with arbitrary world-construction.'},
 {title:'Consciousness in three shapes',kicker:'SCIENCE OF THE EXPERIENCE OF CONSCIOUSNESS',layout:'left',blocks:[['Sense-certainty','“This”, “here”, “now”: the claim of immediacy.'],['Perception','One thing with many properties.'],['Force and understanding','Relations, laws and the inner of appearance.']],ref:'§§90–110  /  §§111–131  /  §§132–165',note:'These are forms of object-directed knowing, not literal childhood stages, empirical brain modules or three levels of an AI architecture.'},
 {title:'Can the “now” stay immediate?',kicker:'SENSE-CERTAINTY',layout:'comic',accent:'gold',blocks:[['The claim','The singular “this” is immediately certain.'],['The experiment','Write down “The now is the night”; return at noon.'],['The difficulty','What survives is a universal “now”, not the intended singular instant.']],ref:'SENSE-CERTAINTY §§90–110 · THE EXPERIMENT IN §95',note:'Visible copy paraphrases the test in §95. The sentence in the experiment is normalized for classroom use rather than offered as a verbatim Pinkard quotation. The source’s assertions that qualia do not exist and that no memory is possible are not literal textual claims supported here. Retained comic is an illustrative analogy and includes properties that properly belong to the next shape.'},
 {title:'One thing, many properties',kicker:'PERCEPTION',layout:'comic',accent:'blue',blocks:[['The thing','This object is one.'],['Its qualities','It is also coloured, shaped, textured: many universals.'],['The difficulty','How do unity and multiplicity belong together without contradiction?']],ref:'PERCEPTION §§111–131',note:'The one / many tension is central to the chapter. Perception already involves universality; it is not simply a system incapable of categories. The source’s broad characterization of all present machine learning is retained below as original lecture material, not repeated as a current technical conclusion.'},
 {title:'Why do things appear this way?',kicker:'FORCE AND UNDERSTANDING',layout:'comic',accent:'coral',blocks:[['Beyond isolated properties','Understand a thing through relations and their expression.'],['Force and law','Seek the stable inner of changing appearances.'],['A further difficulty','The inner cannot remain a separate world hidden behind appearance.']],ref:'FORCE AND UNDERSTANDING §§132–165',note:'Newtonian physics motivates the lecture’s analogy, but the chapter does not stop at discovering causal laws. It tests the distinction between appearance and an independent supersensible inner. A contemporary world model is a comparison, not a proven Hegelian consciousness.'},
 {title:'What do we mean by experience?',kicker:'PAUSE FOR DISCUSSION',layout:'discussion',blocks:[['Think of one experience','Did you gain another fact—or change how you understood the situation?'],['Bring in another meaning','Blake, Hendrix, or an example from your own life.'],['Try the machine comparison','Which sense of “experience” would it need to have?']],ref:'DISCUSSION · NO SINGLE DEFINITION ASSUMED'},
 {title:'Where is your experience?',kicker:'A PHENOMENOLOGICAL EXPERIMENT',layout:'square',blocks:[['Close your eyes','Attend to your sense of being a subject.'],['Notice its orientation','Is experience located only “inside” your head?'],['Describe it to an AI','What would you say about attention, embodiment and the surrounding world?']],ref:'CONTEMPORARY CLASSROOM EXPERIMENT',note:'The exercise is introspective and exploratory, not a proof that consciousness is spatially distributed or that an AI system has subjectivity. The supplied illustration is retained unchanged.'},
 {title:'Who looks behind the curtain?',kicker:'BACK TO HEGEL · §165',layout:'quote',quote:'“there is nothing to be seen if we ourselves do not go behind it”',quoteRef:'HEGEL · §165 · PINKARD TRANSLATION',blocks:[['The movement matters','The knowing subject is implicated in what it seeks as the inner of the object.'],['A transition','This result opens a new question about self-consciousness.']],ref:'A SHORT EXCERPT · FULL PASSAGE IN SPEAKER NOTES',note:'Quotation is a contiguous excerpt checked against the local Pinkard PDF, printed paragraph 165, PDF page 148. The mirror and child are our illustration, not Hegel’s literal scene. Do not reduce the passage to “the world is invented by me” or treat it as a computational self-model specification. The full source passage is preserved below.'},
 {title:'What would a machine experience?',kicker:'MACHINES AND EXPERIENCE',layout:'left',blocks:[['Useful analogies','Sensing, classification and relational modelling.'],['A harder question','Could the system revise what it takes its object and standard to be?'],['Keep the distinction','Functional performance does not by itself settle the question of experience.']],ref:'COURSE ANALOGY · CONSCIOUSNESS §§90–165',note:'These questions extend the course discussion. They are not claims that Hegel prescribed a machine architecture or that an implemented capability establishes phenomenal consciousness.'},
 {title:'What changes after training?',kicker:'TRAINING · CONTEXT · MEMORY',layout:'right',blocks:[['Trained parameters','A learned store formed through training.'],['Information at use time','Prompts and retrieved information can add context.'],['Ask what changed','A different answer need not mean a change to the trained parameters.']],ref:'DISTINGUISH THE MODEL FROM THE SURROUNDING SYSTEM',note:'The visible slide replaces universal claims about present systems with a technical distinction. Lewis et al. (2020), Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks, distinguishes parametric and non-parametric memory. It is not evidence for phenomenal experience.',extraSource:RAG},
 {title:'Continuity remains a question',kicker:'LEARNING AND LIVED TIME',layout:'left',blocks:[['For the human','The lecture asks us to consider an ongoing stream of experience.'],['For the machine','What persists between interactions? What learns?'],['Different questions','Operation, learning and consciousness are distinct questions.']],ref:'A THOUGHT EXPERIMENT, NOT A DEPLOYMENT SURVEY',note:'The source states that no major deployed systems continuously learn and that machines are dormant between prompts. Those broad, time-sensitive assertions are not used as premises here. Evaluate a named system’s actual design; computation or memory alone does not decide consciousness.'},
 {title:'From experience to recognition',kicker:'NEXT: SELF-CONSCIOUSNESS',layout:'map',blocks:[['The machine anticipates us','An assistant’s question can simulate concern for what we want next.'],['A different relation','What changes when the other is a subject, not only an object of knowing?'],['For next time','Recognition and the master–servant dialectic.']],ref:'TODAY: EXPERIENCE · NEXT: RECOGNITION',note:'This is the source lecture’s closing segue. Do not import the later master–servant argument into the analysis of Part A, Consciousness. The course map has been redrawn in the dialectic lithograph style; its eight labels and circular order are preserved.'}
];

const lecture = await fs.readFile(path.join(COURSE, 'lecture-2.md'), 'utf8');
const parts = lecture.split(/^---\s*$/m);
if(parts.length!==20 || D.length!==20) throw new Error('Expected exactly twenty source and output slides.');
const promptFile = await fs.readFile(path.join(COURSE, 'lecture-2-image-prompts.md'), 'utf8');
const specs = [...promptFile.matchAll(/^## Slide (\d+) — ([^\n]+)\n([\s\S]*?)(?=^## |$(?![\s\S]))/gm)].map(m=>({n:Number(m[1]),body:m[3]}));
const altMap = new Map(specs.map(s=>[s.n,s.body.match(/- Alt text: ([^\n]+)/)?.[1]]));
const presentation = Presentation.create({slideSize:{width:1280,height:720}});
presentation.theme.colorScheme = {name:'Dialectic — night lithograph',themeColors:{accent1:COLORS.gold,accent2:COLORS.teal,accent3:COLORS.coral,accent4:COLORS.blue,accent5:COLORS.violet,accent6:COLORS.dim,bg1:COLORS.bg,bg2:COLORS.panel,tx1:COLORS.ink,tx2:COLORS.dim,dk1:COLORS.bg,dk2:COLORS.panel,lt1:COLORS.ink,lt2:COLORS.gold,hlink:COLORS.teal,folHlink:COLORS.violet}};
const bounds=[];
function text(slide,name,value,x,y,w,h,size=28,color=COLORS.ink,opts={}) {
 const shape=slide.shapes.add({name,geometry:'textbox',position:{left:x,top:y,width:w,height:h},fill:'none',line:{fill:'none',width:0}});
 shape.text=value;
 shape.text.style={typeface:opts.mono?MONO:SERIF,fontSize:size,color,wrap:'square',autoFit:'none',verticalAlignment:'top',insets:{top:0,right:0,bottom:0,left:0},...opts};
 bounds.push({slide:bounds.current,name,x,y,w,h,kind:'text'});
 return shape;
}
async function imageAt(slide,p,x,y,w,h,alt,fit='contain'){
 const bytes=await fs.readFile(p);
 const ext=path.extname(p).toLowerCase();
 slide.images.add({name:'slide-artwork',blob:bytes.buffer.slice(bytes.byteOffset,bytes.byteOffset+bytes.byteLength),contentType:ext==='.jpg'||ext==='.jpeg'?'image/jpeg':'image/png',alt,fit,position:{left:x,top:y,width:w,height:h}});
 bounds.push({slide:bounds.current,name:'artwork',x,y,w,h,kind:'image'});
}
function blocks(slide,rows,x,y,w,{bodySize=28,headingSize=26,gap=120}={}){
 rows.forEach(([heading,body],j)=>{
  text(slide,'block-'+j+'-heading',heading,x,y+j*gap,w,34,headingSize,COLORS.gold);
  text(slide,'block-'+j+'-body',body,x,y+j*gap+38,w,gap-42,bodySize,COLORS.ink);
 });
}
await fs.mkdir(QA,{recursive:true});
const provenance=[];
for(let i=0;i<D.length;i++){
 const d=D[i], n=i+1, slide=presentation.slides.add();
 bounds.current=n;
 slide.background.fill=COLORS.bg;
 const match=parts[i].match(/!\[([^\]]*)\]\(([^)]+)\)/);
 if(!match) throw new Error(`Slide ${n} has no image`);
 let source=match[2], imagePath;
 if(source.startsWith('https://')) imagePath=path.join(COURSE,'lecture-2-images/hegel-portrait.jpg');
 else if(source.startsWith('/markdown/images/')) imagePath=path.join(ROOT,'assets/images',source.split('/').at(-1));
 // the lecture markdown points at the .webp the web pages serve; the deck
 // embeds the lossless .png master beside it (imageAt only labels png/jpeg).
 else imagePath=path.join(COURSE,source).replace(/\.webp$/,'.png');
 const alt=altMap.get(n)||match[1];
 const accent=COLORS[d.accent]||COLORS.violet;
 text(slide,'eyebrow',d.kicker,64,43,1040,24,17,accent,{mono:true});
 text(slide,'page-number',String(n).padStart(2,'0'),1155,43,60,24,17,COLORS.dim,{mono:true,alignment:'right'});
 if(d.layout==='cover'){
  text(slide,'title',d.title,64,134,480,182,64,COLORS.ink);
  text(slide,'subtitle',d.subtitle,68,335,440,100,30,COLORS.dim);
  text(slide,'term',d.tag,68,497,410,80,44,COLORS.gold,{italic:true});
  await imageAt(slide,imagePath,584,272,632,356,alt);
 }else{
  text(slide,'title',d.title,64,95,d.layout==='comic'?690:1148,d.layout==='comic'?110:80,48,COLORS.ink);
  if(d.layout==='portrait'){
   blocks(slide,d.blocks,64,230,660,{gap:126,bodySize:30});
   await imageAt(slide,imagePath,827,180,355,460,alt);
  }else if(d.layout==='comic'){
   blocks(slide,d.blocks,64,230,658,{gap:126,bodySize:30});
   await imageAt(slide,imagePath,790,128,426,510,alt);
  }else if(d.layout==='square'||d.layout==='map'){
   blocks(slide,d.blocks,64,230,560,{gap:124,bodySize:28});
   if(d.layout==='map') await imageAt(slide,imagePath,730,181,476,476,alt);
   else await imageAt(slide,imagePath,708,203,508,428,alt);
  }else if(d.layout==='discussion'){
   await imageAt(slide,imagePath,64,221,650,367,alt);
   blocks(slide,d.blocks,760,213,456,{gap:128,bodySize:27});
  }else if(d.layout==='quote'){
   text(slide,'quote',d.quote,64,225,476,160,35,COLORS.gold,{italic:true});
   text(slide,'quote-attribution',d.quoteRef,64,390,476,42,15,COLORS.dim,{mono:true});
   text(slide,'gloss',d.blocks[0][1],64,448,476,102,28,COLORS.ink);
   text(slide,'transition',d.blocks[1][1],64,563,476,68,26,COLORS.dim);
   await imageAt(slide,imagePath,594,259,622,350,alt);
  }else if(d.layout==='left'){
   await imageAt(slide,imagePath,64,248,644,362,alt);
   blocks(slide,d.blocks,758,216,458,{gap:130,bodySize:27});
  }else{
   blocks(slide,d.blocks,64,216,462,{gap:130,bodySize:27});
   await imageAt(slide,imagePath,574,248,642,362,alt);
  }
 }
 text(slide,'reference',d.ref,64,665,1152,30,15,COLORS.dim,{mono:true});
 const sourceHeading=parts[i].match(/^#{2,3} ([^\n]+)/m)?.[1]||d.title;
 const original=parts[i].replace(/\n!\[[^\n]*\]\(lecture-2-images\/[^\n]+\)\n/g,'');
 const sourceLines=[`Lecture source: ${path.join(COURSE,'lecture-2.md')} — source slide ${n}, ${sourceHeading}.`,`Philosophical reading: ${PDF}.`,`Visual style: ${path.join(COURSE,'hegel-experience/dialectic.html')}; hegel-experience/art/litho/.`,`Image: ${imagePath}; ${n===3?PORTRAIT:((source.startsWith('lecture-2-images/')||source==='concept-relations.png')?'Generated with the built-in image tool; exact prompt in lecture-2-image-prompts.md.':'Existing course asset retained without alteration.')}`,d.extraSource?`Technical source: ${d.extraSource} — Lewis et al. (2020), parametric and non-parametric memory.`:''].filter(Boolean);
 slide.speakerNotes.textFrame.setText(`${d.note||'Visible copy condenses the supplied lecture; full source follows.'}\n\n[Sources]\n${sourceLines.join('\n')}\n[/Sources]\n\n[Original lecture slide — including original speaker notes]\n${original.trim()}\n[/Original lecture slide]`);
 provenance.push({slide:n,title:d.title,sourceHeading,image:imagePath,source,ref:d.ref});
}
const issues=[];
for(const b of bounds){if(b.x<0||b.y<0||b.x+b.w>1280.01||b.y+b.h>720.01)issues.push(`Out of bounds: ${b.slide} ${b.name}`);}
for(let i=0;i<bounds.length;i++)for(let j=i+1;j<bounds.length;j++){
 const a=bounds[i],b=bounds[j]; if(a.slide!==b.slide)continue;
 const w=Math.min(a.x+a.w,b.x+b.w)-Math.max(a.x,b.x);
 const h=Math.min(a.y+a.h,b.y+b.h)-Math.max(a.y,b.y);
 if(w>1&&h>1)issues.push(`Overlap: slide ${a.slide} ${a.name} / ${b.name} (${w}×${h})`);
}
await fs.writeFile(path.join(QA,'geometry-report.txt'),issues.length?issues.join('\n'):'No overlapping object bounds or off-slide elements.');
if(issues.length) console.warn(issues.join('\n'));
for(const [i,slide] of presentation.slides.items.entries()){
 const stem=`slide-${String(i+1).padStart(2,'0')}`;
 const blob=await presentation.export({slide,format:'png',scale:1});
 await fs.writeFile(path.join(QA,stem+'.png'),new Uint8Array(await blob.arrayBuffer()));
 const layout=await slide.export({format:'layout'});
 await fs.writeFile(path.join(QA,stem+'.json'),await layout.text());
 console.log('Rendered',i+1,D[i].title.replaceAll('\n',' '));
}
await fs.writeFile(path.join(QA,'source-notes.txt'),JSON.stringify(provenance,null,2));
const file=await PresentationFile.exportPptx(presentation);
await file.save(OUT);
console.log('Saved',OUT);
