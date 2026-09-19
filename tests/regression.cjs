const { chromium }=require('playwright');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
 const page=await browser.newPage({viewport:{width:1100,height:950}});const errors=[];page.on('pageerror',e=>{errors.push(e.message);console.error('Browser error:',e.message)});
 await page.goto('http://127.0.0.1:8765/?test');
 const results=await page.evaluate(()=>{
 const R=window.ChipRules,out=[];const check=(name,fn)=>{if(!fn())throw Error(name);out.push(name)};
 for(const n of [9,10,13,15]){const b=Array.from({length:30},()=>[]);b[0]=Array(n).fill(1);const e=[...R.resolve(b,0)];check(`${n} threshold`,()=>n<10?b[0].length===9:e[0].count===n&&b[0].length===0);}
 for(const n of [10,13]){const b=Array.from({length:30},()=>[]);b[0]=[0,0,0,...Array(n).fill(1)];const e=[...R.resolve(b,0)];check(`preserve red under ${n}`,()=>b[0].join()==='0,0,0'&&e[0].count===n);}
 const b=Array.from({length:30},()=>[]);b[0]=[0,0,0,...Array(10).fill(1)];b[1]=Array(7).fill(0);const e=[...R.resolve(b,0)];check('revealed lower layer chains',()=>e.filter(x=>x.type==='clear').length===2&&b[0].length===0&&b[1].length===0);
 const d=window.ChipStackDebug;window.events=[];const play=ChipAudio.prototype.play;ChipAudio.prototype.play=function(k,o){window.events.push(k);return play.call(this,k,o)};
 d.game.board=Array.from({length:30},()=>[]);d.game.board[0]=[0,0,0,...Array(6).fill(1)];d.game.board[5]=Array(7).fill(0);d.game.tray=[[1,1,1,1],[2,2,2],[3,3,3]];d.syncUI();return out;
 });
 const rect=await page.locator('canvas').boundingBox();const pos=(x,y)=>({x:rect.x+x/450*rect.width,y:rect.y+y/800*rect.height});
 let a=pos(89,694),b=pos(149,231);await page.mouse.move(a.x,a.y);await page.mouse.down();await page.mouse.move(b.x,b.y,{steps:12});
 assert(await page.evaluate(()=>ChipStackDebug.game.drag.moving));await page.mouse.up();assert(await page.evaluate(()=>ChipStackDebug.game.flight?.type==='place'),'placement animation');await page.waitForFunction(()=>!ChipStackDebug.game.busy);
 assert.equal(await page.evaluate(()=>ChipStackDebug.game.score),225);
 const events=await page.evaluate(()=>window.events);for(const k of ['pick','place','merge','clear'])assert(events.includes(k),k);
 assert.equal(await page.evaluate(()=>ChipStackDebug.game.combo),2);
 await page.mouse.click(pos(225,694).x,pos(225,694).y);await page.mouse.click(pos(225,216).x,pos(225,216).y);await page.waitForFunction(()=>!ChipStackDebug.game.busy);
 assert.equal(await page.evaluate(()=>ChipStackDebug.game.board[2].length),3);
 await page.evaluate(()=>{const d=ChipStackDebug;d.game.board[11]=[0,0,2,2,2,1,1,1];d.game.board[17]=[3,3,3,0,0];});
 await page.screenshot({path:'/tmp/caps-desktop.png'});
 const mobile=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:2});const m=await mobile.newPage();await m.goto('http://127.0.0.1:8765/?test');
 const mr=await m.locator('canvas').boundingBox();const mp=(x,y)=>({x:mr.x+x/450*mr.width,y:mr.y+y/800*mr.height});const client=await mobile.newCDPSession(m);
 await client.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{...mp(89,694)}]});await client.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{...mp(73,231)}]});assert(await m.evaluate(()=>ChipStackDebug.game.drag.moving));await client.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await m.waitForFunction(()=>!ChipStackDebug.game.busy);assert((await m.evaluate(()=>ChipStackDebug.game.board[0].length))>0);
 await m.screenshot({path:'/tmp/caps-mobile.png'});assert.deepEqual(errors,[]);
 console.log(JSON.stringify({rules:results,mouseDrag:true,tap:true,touchDrag:true,chainScore:225,audio:events,pageErrors:errors},null,2));await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
