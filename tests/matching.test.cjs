const test=require('node:test'),assert=require('node:assert/strict');
const D=require('../data.js'),M=require('../matching.js');
test('24 unique events with valid attendee profiles and sufficient capacity',()=>{
 assert.equal(D.events.length,24);assert.equal(new Set(D.events.map(e=>e.id)).size,24);
 for(const e of D.events){assert(e.attendeeIds.every(id=>D.attendees.some(p=>p.id===id)));assert.equal(new Set(e.attendeeIds).size,e.attendeeIds.length);assert(e.capacity>e.attendeeIds.length);}
});
test('all 10,368 profiles have sorted finite results that respect boundaries',()=>{
 let count=0;const winners=new Set();for(const p of M.combinations()){
  assert(M.valid(p));const r=M.recommend(p);assert(r.length>0);
  r.forEach((x,i)=>{assert(Number.isInteger(x.score)&&x.score>=0&&x.score<=100);assert(x.eligible);if(i)assert(r[i-1].score>=x.score);if(p.boundary==='quiet')assert.equal(x.event.noise,0);if(p.boundary==='free')assert.equal(x.event.price,0);if(p.boundary==='alcohol-free')assert.equal(x.event.alcohol,false);});
  winners.add(r[0].event.id);count++;
 }assert.equal(count,10368);assert(winners.size>=12);
});
test('changing only the attendee crowd changes event compatibility',()=>{
 const p=D.presets[1],e=D.events[4],people=[...D.attendees].sort((a,b)=>M.personFit(p,b)-M.personFit(p,a));
 const a=M.evaluate(p,{...e,attendeeIds:people.slice(0,8).map(x=>x.id)}),b=M.evaluate(p,{...e,attendeeIds:people.slice(-8).map(x=>x.id)});
 assert.equal(a.interest,b.interest);assert.equal(a.format,b.format);assert.equal(a.local,b.local);assert(a.people>b.people);assert(a.score>=b.score+20);
});
test('new gathering has explicit no-crowd fallback',()=>{const r=M.evaluate(D.presets[1],{...D.events[4],attendeeIds:[]});assert.equal(r.people,null);assert.equal(r.crowd.length,0);assert(r.reasons[0].includes('No attendee profiles'));assert(Number.isFinite(r.score));});
test('filters, invalid profiles, deterministic results and empty searches',()=>{
 const p=D.presets[0];assert(M.recommend(p,D.events,{category:'Creative',area:'Hauz Khas'}).every(r=>r.event.category==='Creative'&&r.event.area==='Hauz Khas'));
 assert.equal(M.recommend(p,D.events,{search:'no such event whatsoever'}).length,0);assert.deepEqual(M.recommend(p).map(x=>x.score),M.recommend(p).map(x=>x.score));assert(!M.valid(null));assert(!M.valid({...p,energy:99}));assert.throws(()=>M.recommend({...p,area:'Elsewhere'}));
});
test('the same interest mix produces different rankings for different social preferences',()=>{
 const p={...D.presets[0],boundary:'none'};assert.notEqual(M.recommend({...p,values:1,energy:0,depth:2,structure:2})[0].event.id,M.recommend({...p,values:3,energy:2,depth:0,structure:0})[0].event.id);
});
