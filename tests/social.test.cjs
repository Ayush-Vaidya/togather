const test=require('node:test'),assert=require('node:assert/strict');
const {createStore}=require('../social.js');
function storage(){const map=new Map();return {getItem:k=>map.get(k)||null,setItem:(k,v)=>map.set(k,v),removeItem:k=>map.delete(k)};}
test('requests do not silently accept and chat requires a connection',()=>{
 const s=createStore(storage());s.request('person-7');s.request('person-7');
 assert.deepEqual(s.data.pending,['person-7']);assert.equal(s.data.friends.length,0);
 assert.throws(()=>s.send('person-7','Hello'));
 s.acceptDemo('person-7');assert.deepEqual(s.data.friends,['person-7']);assert.equal(s.data.pending.length,0);
 s.send('person-7','Hello');assert.equal(s.data.messages.length,1);assert.equal(s.data.messages[0].from,'me');
 assert.equal(s.data.messages.filter(m=>m.from==='sample').length,0);
 s.replyDemo('person-7');assert.equal(s.data.messages[1].from,'sample');assert(s.data.messages[1].text.includes('Simulated demo reply'));
});
test('profiles, posts, likes, relationships and messages persist across reload',()=>{
 const mem=storage(),a=createStore(mem);a.update('Ayush','Weekend stories','private');a.post('event-1','A lovely session');a.like('sample-1');a.request('person-7');a.acceptDemo('person-7');a.send('person-7','Another session?');
 const b=createStore(mem);assert.equal(b.data.name,'Ayush');assert.equal(b.data.visibility,'private');assert.equal(b.data.posts[0].text,'A lovely session');assert.deepEqual(b.data.likes,['sample-1']);assert.deepEqual(b.data.friends,['person-7']);assert.equal(b.data.messages[0].text,'Another session?');
});
test('blocking prevents requests and chat; unblock does not restore friendship',()=>{
 const s=createStore(storage());s.request('person-7');s.acceptDemo('person-7');s.block('person-7');s.request('person-7');
 assert.equal(s.data.friends.length,0);assert.equal(s.data.pending.length,0);assert.throws(()=>s.send('person-7','blocked'));
 s.unblock('person-7');assert.equal(s.data.blocked.length,0);assert.equal(s.data.friends.length,0);
});
test('data deletion clears social history and reset survives reload',()=>{
 const mem=storage(),s=createStore(mem);s.post('event-1','memory');s.update('Demo','bio','public');s.request('person-7');s.clear();
 const reset=createStore(mem);assert.equal(reset.data.name,'Your profile');assert.equal(reset.data.visibility,'friends');assert.equal(reset.data.posts.length,0);assert.equal(reset.data.pending.length,0);
});
test('malformed storage and unavailable persistence fail safely',()=>{
 const bad={getItem:()=>'{broken',setItem(){throw new Error('quota');},removeItem(){}};const s=createStore(bad);s.post('event-1','still works');assert.equal(s.data.posts.length,1);assert(s.storageFailed());assert.throws(()=>s.request('not-a-person'));
});
