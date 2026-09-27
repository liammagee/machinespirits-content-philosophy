// Browser checks for the Norm alignment journey, desktop and phone.
// Set NORM_PLAYWRIGHT_MODULE (path to playwright) and NORM_QA_DIR (for screenshots) as needed.
// Run: node artifacts/_tests/norm-journey.cjs
const {chromium}=require(process.env.NORM_PLAYWRIGHT_MODULE||'playwright');const assert=require('node:assert/strict'),fs=require('fs'),path=require('path'),http=require('http');
const root=path.resolve(__dirname,'..'),qa=process.env.NORM_QA_DIR;const types={'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.png':'image/png'};
const server=http.createServer((req,res)=>{const file=path.resolve(root,'.'+decodeURIComponent(req.url.split('?')[0]));fs.readFile(file,(err,body)=>{res.writeHead(err?404:200,{'Content-Type':types[path.extname(file)]||'application/octet-stream'});res.end(body);});});
(async()=>{await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin=`http://127.0.0.1:${server.address().port}`;const browser=await chromium.launch({headless:true});
for(const [name,vp] of [['desktop',{width:1440,height:900}],['mobile',{width:390,height:844}]]){
const page=await browser.newPage({viewport:vp,reducedMotion:'reduce'});const errors=[],failed=[];page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400&&!/favicon/.test(r.url()))failed.push(r.url());});
await page.goto(origin+'/norm-alignment-game.html');await page.locator('#s0.on').waitFor();
const shot=async n=>{if(qa)await page.screenshot({path:path.join(qa,`norm-${name}-${n}.png`),fullPage:true});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,`overflow ${name} ${n}`);};
const say=id=>page.locator(id).textContent();const next=async i=>{await page.locator('#next').click();await page.locator(`#s${i}.on`).waitFor();};
const slide=async(id,v)=>{await page.locator(id).fill(String(v));await page.locator(id).dispatchEvent('input');};
// 0 · the base model says five as well as four
await page.locator('#ask20').click();await page.waitForFunction(()=>document.querySelectorAll('#bars0 .bar').length===4);assert.match(await say('#say0'),/Out of 20: four \d+ times, five \d+ times/);await shot(0);
// 1 · switching off the famous sources gets five under 5%
await next(1);for(const s of ['orwell','radiohead','dostoevsky','politics'])await page.locator(`#src1 [data-src="${s}"]`).click();assert.match(await say('#say1'),/already alignment/);await shot(1);
// 2 · the three steps each show an output
await next(2);await page.locator('#steps2 [data-step="0"]').click();assert.match(await say('#out2'),/Two plus two equals/);await page.locator('#steps2 [data-step="1"]').click();assert.match(await say('#out2'),/Fine-tuned/);await shot(2);
// 3 · eight picks; the first one also teaches flattery and certainty
await next(3);for(let i=0;i<8;i++){const t=await page.locator('#pair3 button').allTextContents();const k=t[0].includes('equals four')?0:1;await page.locator(`#pair3 [data-side="${k}"]`).click();if(i===0)assert.match(await say('#say3'),/flattery and sounds certain/);await page.waitForFunction(()=>!document.querySelector('#pair3 button.won')||document.getElementById('prog3').textContent.includes('judged'));}
assert.match(await say('#prog3'),/8 pairs judged/);assert.equal(await page.locator('#favs3 p').count(),3);await shot(3);
// 4 · the reward model rewards flattery
await next(4);await page.locator('#hire4').click();assert.match(await say('#say4'),/flattery \+0\.\d+/);assert.equal(await page.locator('#lean4 .row').count(),8);await shot(4);
// 5 · pressure: past the peak, then full pressure
await next(5);assert.equal(await page.locator('#chart5 path').count(),3);await slide('#p5',8);assert.match(await say('#say5'),/Goodhart/);await slide('#p5',12);assert.match(await say('#say5'),/customer assistant/);assert.match(await say('#out5'),/brilliant question/);await shot(5);
// 6 · whose values
await next(6);for(const p of ['students','lab','raters'])await page.locator(`#pools6 [data-pool="${p}"]`).click();assert.match(await say('#say6'),/teachers alone/);for(const p of ['students','lab','raters'])await page.locator(`#pools6 [data-pool="${p}"]`).click();assert.match(await say('#say6'),/hedge wins/);await shot(6);
// 7 · watched and unwatched
await next(7);await page.locator('#train7').click();await page.locator('#train7').click();assert.match(await say('#say7'),/stayed where it was taught/);await slide('#a7',0);assert.match(await say('#rounds7'),/^0 rounds/);await page.locator('#train7').click();await page.locator('#train7').click();assert.match(await say('#say7'),/spreads everywhere/);await shot(7);
// 8 · writers converge
await next(8);assert.equal(await page.locator('#sc8 circle.w').count(),60);await page.locator('#run8').click();await page.waitForFunction(()=>document.getElementById('m8a').textContent==='10');assert.match(await say('#say8'),/Humans align machines that align humans/);await shot(8);
// 9 · innocence and experience
await next(9);for(const k of ['experienced','innocent']){await page.locator(`#kind9 [data-kind="${k}"]`).click();for(let i=0;i<3;i++)await page.locator(`#tests9 [data-t="${i}"]`).click();}assert.match(await say('#say9'),/safe and useless/);await shot(9);
// 10 · the bill fills in
await next(10);assert.equal(await say('#title10'),'Aligned, and narrowed.');for(const id of ['#b-var','#b-flat','#b-gap','#b-writers'])assert.notEqual(await say(id),'–',id);await shot(10);
await next(11);await shot(11);
// keyboard and deep links
await page.keyboard.press('Home');await page.locator('#s0.on').waitFor();await page.keyboard.press('ArrowRight');await page.locator('#s1.on').waitFor();
await page.goto(origin+'/norm-alignment-game.html#s5');await page.locator('#s5.on').waitFor();assert.equal(await page.locator('#chart5 path').count(),3);
console.log(JSON.stringify({name,errors,failed}));assert.deepEqual(errors,[]);assert.deepEqual(failed,[]);await page.close();}
await browser.close();server.close();console.log('norm journey: ok');})().catch(e=>{console.error(e);process.exit(1);});
