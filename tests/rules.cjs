const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const source=fs.readFileSync('full-playtest.html','utf8');const context={window:{}};vm.createContext(context);vm.runInContext(source.slice(source.indexOf('class ChipRules'),source.indexOf('/* Procedural Foley')),context);const R=context.window.ChipRules;
const board=()=>Array.from({length:30},()=>[]);
for(const n of [9,10,13,15]){const b=board();b[0]=Array(n).fill(1);const e=[...R.resolve(b,0)];assert.equal(b[0].length,n<10?n:0);if(n>=10)assert.equal(e[0].count,n);}
for(const n of [10,13]){const b=board();b[0]=[0,0,0,...Array(n).fill(1)];const e=[...R.resolve(b,0)];assert.deepEqual(b[0],[0,0,0]);assert.equal(e[0].points,n*10);}
{const b=board();b[0]=[0,0,0,...Array(10).fill(1)];b[1]=Array(7).fill(0);const e=[...R.resolve(b,0)];assert.equal(e.filter(x=>x.type==='clear').length,2);assert(b.every(s=>!s.length));}
{const b=board();b[6]=Array(8).fill(1);b[1]=Array(6).fill(1);b[5]=Array(7).fill(1);assert.equal([...R.resolve(b,6)].find(e=>e.type==='clear').count,21);}
{const b=Array.from({length:30},(_,i)=>[i%6]);assert(R.over(b));b[0]=[];assert(!R.over(b));assert(!R.place(b,[[1]],1,0));}
let seed=7;const rng=()=>((seed=(Math.imul(seed,1664525)+1013904223)>>>0)/4294967296);
for(let k=0;k<200;k++){const b=board();for(let i=0;i<30;i++)if(rng()<.7)b[i]=Array.from({length:1+Math.floor(rng()*15)},()=>Math.floor(rng()*6));const before=b.flat().length;const events=[...R.resolve(b,Math.floor(rng()*30))];assert.equal(b.flat().length+events.filter(e=>e.type==='clear').reduce((s,e)=>s+e.count,0),before);}
console.log('PASS: threshold, buried layers, chains, gather-before-clear, game over, placement, 200 conservation fixtures');
