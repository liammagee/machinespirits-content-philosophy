import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFileSync } from 'node:fs';

const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
const code=html.match(/<script>([\s\S]*?)<\/script>/)[1];
const ids=new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(match=>match[1]));

// Deliberately a lightweight DOM stand-in, not a browser/layout test.
// It checks the shipped inline script and its native event handlers without dependencies.
function harness() {
  const nodes=new Map();
  const element=(id,dataset={})=>({id,dataset,hidden:false,disabled:false,textContent:'',innerHTML:'',attrs:{},events:{},style:{setProperty(key,value){this[key]=value;}},
    setAttribute(key,value){this.attrs[key]=value;},removeAttribute(key){delete this.attrs[key];},
    addEventListener(key,handler){this.events[key]=handler;},querySelector(){return null;},contains(){return true;},scrollIntoView(){this.scrolled=true;}});
  for(const id of ids) nodes.set(id,element(id));
  const markers=[0,1,2].map(n=>element(`moment-${n}`,{moment:String(n)}));
  const document={documentElement:element('root'),getElementById(id){assert.ok(nodes.has(id),`Unknown ID: ${id}`);return nodes.get(id);},querySelectorAll(selector){assert.equal(selector,'[data-moment]');return markers;}};
  const context=vm.createContext({document,window:{matchMedia(){return {matches:true};}}});
  vm.runInContext(code,context);
  const run=source=>vm.runInContext(source,context);
  const click=id=>nodes.get(id).events.click();
  const tool=(tool,value)=>nodes.get('scene-tools').events.click({target:{closest(){return {dataset:{tool,value}};}}});
  return {run,click,tool,nodes,markers};
}

function reachPerception(h) { for(let i=0;i<3;i++) h.click('primary'); }
function reachUnderstanding(h) {
  reachPerception(h);
  for(const value of ['color','material','shape','glow']) h.tool('feature',value);
  h.click('primary'); h.tool('room','day'); h.click('primary');
  h.tool('attribution','object'); h.tool('attribution','observer'); h.click('primary');
}

test('initial state is a lit lamp with later moments locked',()=>{
  const h=harness();
  assert.equal(h.run('state.step'),0);
  assert.equal(h.nodes.get('lamp-world').style['--lamp-on'],'1');
  assert.equal(h.nodes.get('saved-note').hidden,true);
  assert.equal(h.markers[1].disabled,true);
  assert.equal(h.nodes.get('back').disabled,true);
});

test('the saved statement persists while the light goes out',()=>{
  const h=harness(); h.click('primary');
  assert.equal(h.nodes.get('saved-note').hidden,false);
  h.click('primary');
  assert.equal(h.nodes.get('saved-note').hidden,false);
  assert.equal(h.nodes.get('lamp-world').style['--lamp-on'],'0');
  assert.match(h.nodes.get('reading-copy').textContent,/not a mistake/);
  h.click('back'); assert.equal(h.nodes.get('lamp-world').style['--lamp-on'],'1');
});

test('perception requires four distinct properties, not repeated clicks',()=>{
  const h=harness();reachPerception(h);
  assert.equal(h.run('state.step'),3);
  assert.equal(h.markers[1].disabled,false);
  assert.equal(h.nodes.get('primary').disabled,true);
  h.click('primary');assert.equal(h.run('state.step'),3);
  h.tool('feature','color');h.tool('feature','color');assert.equal(h.run('state.features.size'),1);
  for(const value of ['material','shape','glow']) h.tool('feature',value);
  assert.equal(h.nodes.get('primary').disabled,false);
  assert.match(h.nodes.get('scene-tools').innerHTML,/4 of 4 explored/);
});

test('room changes the context while output stays fixed',()=>{
  const h=harness();reachPerception(h);
  for(const value of ['color','material','shape','glow']) h.tool('feature',value);
  h.click('primary');assert.equal(h.nodes.get('primary').disabled,true);
  h.tool('room','day');
  assert.equal(h.nodes.get('lamp-world').style['--lamp-on'],'1');
  assert.equal(h.nodes.get('lamp-world').style['--daylight'],'.36');
  assert.equal(h.nodes.get('primary').disabled,false);
  h.tool('room','night');assert.equal(h.nodes.get('lamp-world').style['--daylight'],'0');
});

test('both pure attributions are explored before advancing',()=>{
  const h=harness();reachPerception(h);
  for(const value of ['color','material','shape','glow']) h.tool('feature',value);
  h.click('primary');h.tool('room','day');h.click('primary');
  h.tool('attribution','object');h.click('primary');assert.equal(h.run('state.step'),5);
  assert.match(h.nodes.get('scene-tools').innerHTML,/left out the surroundings/);
  h.tool('attribution','observer');assert.equal(h.nodes.get('primary').disabled,false);
  assert.match(h.nodes.get('scene-tools').innerHTML,/conditions constrain/);
});

test('all eight circuit configurations produce the correct light state',()=>{
  const h=harness();reachUnderstanding(h);
  for(let mask=0;mask<8;mask++) {
    h.run(`state.power=${!!(mask&1)};state.closed=${!!(mask&2)};state.bulb=${!!(mask&4)};render();`);
    assert.equal(h.run('isLit()'),mask===7,`mask ${mask}`);
    assert.equal(h.nodes.get('lamp-world').style['--lamp-on'],mask===7?'1':'0');
  }
});

test('circuit gate requires a disruption and complete restoration',()=>{
  const h=harness();reachUnderstanding(h);
  assert.equal(h.run('state.step'),6);assert.equal(h.nodes.get('primary').disabled,true);
  h.tool('circuit','power');h.tool('circuit','closed');h.tool('circuit','power');
  assert.equal(h.nodes.get('primary').disabled,true);
  h.tool('circuit','closed');assert.equal(h.nodes.get('primary').disabled,false);
  h.tool('circuit','bulb');assert.equal(h.nodes.get('primary').disabled,true);
  h.tool('circuit','bulb');assert.equal(h.nodes.get('primary').disabled,false);
});

test('renaming the glow is distinguished from a testable account',()=>{
  const h=harness();reachUnderstanding(h);
  h.tool('circuit','closed');h.tool('circuit','closed');h.click('primary');
  h.tool('explanation','power');h.click('primary');assert.equal(h.run('state.step'),7);
  assert.match(h.nodes.get('scene-tools').innerHTML,/merely repeats/);
  h.tool('explanation','relation');h.click('primary');assert.equal(h.run('state.step'),8);
  assert.equal(h.nodes.get('machine').hidden,false);
  assert.match(h.nodes.get('stage-name').textContent,/our reconstruction/);
  h.click('primary');assert.equal(h.nodes.get('machine').scrolled,true);
});

test('revisiting a moment retains explored evidence; restarting clears it',()=>{
  const h=harness();reachUnderstanding(h);
  h.markers[1].events.click();assert.equal(h.run('state.step'),3);
  assert.equal(h.run('state.features.size'),4);
  h.markers[2].events.click();assert.equal(h.run('state.step'),6);
  h.tool('circuit','power');h.click('reset');
  assert.equal(h.run('state.step'),0);assert.equal(h.run('state.features.size'),0);
  assert.equal(h.run('state.attributions.size'),0);assert.equal(h.run('state.roomSeen.size'),1);
  assert.equal(h.run('isLit()'),true);assert.equal(h.markers[1].disabled,true);
  assert.equal(h.nodes.get('machine').hidden,true);
});

test('invalid values and locked jumps cannot mutate the exercise',()=>{
  const h=harness();h.run('goTo(6);goTo(-1);goTo(99);goTo(1.5);');
  assert.equal(h.run('state.step'),0);
  h.tool('circuit','power');assert.equal(h.run('state.power'),true);
  h.markers[2].events.click();assert.equal(h.run('state.step'),0);
});

test('the active route has no coffee remnants and carries the reference palette',()=>{
  assert.doesNotMatch(html,/coffee|cup-stage|cup-wrap|One cup/i);
  assert.match(html,/--bg0:#121021/);assert.match(html,/--gold:#f0c9a0/);
  assert.match(html,/prefers-reduced-motion/);
  assert.match(html,/art\/lamp-on.webp/);assert.match(html,/art\/lamp-off.webp/);
  assert.match(html,/not a formal contradiction/);
  assert.match(html,/not a claim that sensors, classifiers, and causal models literally instantiate/);
});
