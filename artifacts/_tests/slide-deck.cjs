// Browser checks for the HTML slide decks: every slide renders without a
// page error and fits the viewport on a 16:9 screen and a phone, and the
// notes, overview and deep-link controls work.
// Run: node artifacts/_tests/slide-deck.cjs   (set SLIDE_DECK_PLAYWRIGHT_MODULE if playwright is not on the module path)
const {chromium}=require(process.env.SLIDE_DECK_PLAYWRIGHT_MODULE||'playwright');const assert=require('node:assert/strict'),fs=require('fs'),path=require('path'),http=require('http');
const root=path.resolve(__dirname,'..');
const DECKS=[['hegels-revenge-seminar.html',31],['_templates/slide-deck-template.html',15]];
const server=http.createServer((req,res)=>{const f=path.resolve(root,'.'+decodeURIComponent(req.url.split('?')[0]));fs.readFile(f,(e,b)=>{res.writeHead(e?404:200,{'Content-Type':'text/html'});res.end(b);});});
(async()=>{await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin=`http://127.0.0.1:${server.address().port}/`;const browser=await chromium.launch();
for(const [file,count] of DECKS)for(const [name,vp] of [['desktop',{width:1440,height:810}],['mobile',{width:390,height:844}]]){
 const page=await browser.newPage({viewport:vp,reducedMotion:'reduce'});const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(origin+file);await page.locator('#s1.on').waitFor();
 assert.equal(await page.locator('.slide').count(),count,`${file} slide count`);
 for(let i=1;i<=count;i++){
  if(i>1)await page.keyboard.press('ArrowRight');await page.locator(`#s${i}.on`).waitFor();
  assert.equal(await page.locator('.slide.on').count(),1,`${file} ${name}: one slide on at ${i}`);
  const fit=await page.evaluate(()=>{const st=document.getElementById('stage');return {tall:st.scrollHeight>st.clientHeight+2,wide:document.documentElement.scrollWidth>innerWidth};});
  assert.equal(fit.wide,false,`${file} ${name}: slide ${i} scrolls sideways`);
  if(name==='desktop')assert.equal(fit.tall,false,`${file} ${name}: slide ${i} is taller than the screen`);
 }
 await page.keyboard.press('n');assert.equal(await page.locator('#notes').isVisible(),true);assert.match(await page.locator('#notes').textContent(),new RegExp(`slide ${count}`));
 await page.keyboard.press('o');assert.equal(await page.locator('#overview').isVisible(),true);await page.locator('#ov-list [data-i="2"]').click();await page.locator('#s3.on').waitFor();
 await page.goto(origin+file+'#s2');await page.locator('#s2.on').waitFor();
 assert.deepEqual(errors,[],`${file} ${name}: page errors`);await page.close();console.log('ok',file,name);}
await browser.close();server.close();})().catch(e=>{console.error(e);process.exit(1);});
