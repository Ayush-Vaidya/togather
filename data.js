/* Fictional events and attendees for the submission prototype. No real bookings. */
(function (root) {
  'use strict';
  const areas = ['Hauz Khas', 'GK & Lajpat', 'Connaught Place', 'Dwarka', 'Gurugram', 'Noida'];
  const interests = [
    {label:'Make & explore', tags:['art','craft','photography']},
    {label:'Read & reflect', tags:['books','film','writing']},
    {label:'Move & recharge', tags:['outdoors','fitness','nature']},
    {label:'Play & discover', tags:['games','food','music']}
  ];
  const values = [
    {label:'Curiosity & creativity', tags:['curiosity','creativity']},
    {label:'Kindness & community', tags:['kindness','community']},
    {label:'Growth & wellbeing', tags:['growth','wellbeing']},
    {label:'Adventure & openness', tags:['adventure','openness']}
  ];
  const questions = [
    {key:'interest',title:'What would you love to do more of?',hint:'Choose the mix that feels most like your weekends.',options:interests.map((v,i)=>({value:i,label:v.label,description:v.tags.join(', ')}))},
    {key:'values',title:'What draws you to a person?',hint:'Think about the people whose company feels easy.',options:values.map((v,i)=>({value:i,label:v.label,description:['People who ask questions and make things.','People who look out for each other.','People who encourage healthy, intentional routines.','People who welcome different experiences.'][i]}))},
    {key:'energy',title:'How do you like to enter a new group?',hint:'There is no better or worse answer.',options:[{value:0,label:'Let me settle in',description:'A few people and a gentle introduction.'},{value:1,label:'A little of both',description:'Some conversation, some space to do my own thing.'},{value:2,label:'Bring on the buzz',description:'An energetic room and lots of new faces.'}]},
    {key:'depth',title:'Which conversations do you enjoy?',hint:'Choose what you usually gravitate towards.',options:[{value:0,label:'Keep it light',description:'Stories, laughs and easy conversation.'},{value:1,label:'Let it unfold',description:'A mix of playful and thoughtful.'},{value:2,label:'Go a little deeper',description:'Ideas, experiences and what matters to us.'}]},
    {key:'structure',title:'What makes a gathering feel comfortable?',hint:'This helps us match the way a group spends time.',options:[{value:0,label:'Room to wander',description:'An open plan and spontaneous conversations.'},{value:1,label:'A gentle starting point',description:'An activity to break the ice, then see what happens.'},{value:2,label:'Give me a clear plan',description:'A hosted session with a predictable format.'}]},
    {key:'area',title:'Where should we start looking?',hint:'You can explore all Delhi-NCR or filter to this area later.',options:areas.map(area=>({value:area,label:area,description:'Delhi-NCR'}))},
    {key:'boundary',title:'Anything you want us to respect?',hint:'This is a hard filter. We will never trade it for a higher match score.',options:[{value:'none',label:'No extra preference',description:'Show all formats.'},{value:'alcohol-free',label:'Alcohol-free gatherings',description:'Hide events that involve alcohol.'},{value:'quiet',label:'Keep the volume gentle',description:'Hide loud or high-noise events.'},{value:'free',label:'Only free plans',description:'Hide events with an entry price.'}]}
  ];
  const photos={art:'photo-1549490349-8643362247b5',craft:'photo-1610701596007-11502861dcfa',books:'photo-1524995997946-a1c2e315a42f',outdoors:'photo-1464822759023-fed622ff2c3b',fitness:'photo-1552674605-db6ffd4facb5',nature:'photo-1416879595882-3373a0480b5b',food:'photo-1515003197210-e0cd71810b5f',film:'photo-1485846234645-a62644f84728',music:'photo-1516280440614-37939bbacd81',games:'photo-1610890716171-6b1bb98ffd09',photography:'photo-1452780212940-6f5c0d14d848',writing:'photo-1455390582262-044cdead277a'};
  // title, area, tags, category, interest cohort, values cohort, energy, depth, structure, fee, alcohol, noise
  const rows=[
    ['Clay, chai & a slow Sunday',0,['craft','art'],'Creative',0,1,0,2,2,450,false,0],
    ['Sketchbook social in the garden',1,['art','nature'],'Creative',0,0,0,1,1,0,false,0],
    ['Street frames: a photo walk',2,['photography','outdoors'],'Creative',0,3,1,1,0,0,false,1],
    ['Paint & pour after hours',4,['art','food'],'Creative',0,0,2,0,1,650,true,2],
    ['The quiet book circle',0,['books','writing'],'Culture',1,1,0,2,2,0,false,0],
    ['Stories over Sunday breakfast',1,['books','food'],'Culture',1,0,1,2,1,350,false,1],
    ['Cinema, chai & the conversation after',2,['film','books'],'Culture',1,0,1,2,2,200,false,1],
    ['Write a little, share a little',5,['writing','art'],'Culture',1,0,0,2,2,0,false,0],
    ['Lodhi sunrise run club',0,['fitness','outdoors'],'Outdoors',2,2,1,0,2,0,false,1],
    ['Aravalli beginner trail',4,['outdoors','nature'],'Outdoors',2,3,1,1,2,300,false,0],
    ['A gentle garden walk',1,['nature','outdoors'],'Outdoors',2,1,0,2,0,0,false,0],
    ['Weekend badminton doubles',3,['fitness','games'],'Outdoors',2,2,2,0,2,150,false,1],
    ['Board games for first-timers',0,['games','food'],'Play',3,1,1,0,2,250,false,1],
    ['Big table, small stories',2,['food','books'],'Food',3,1,0,2,1,550,false,0],
    ['Indie listening room',5,['music','film'],'Music',3,0,0,2,2,200,false,0],
    ['Open-mic friends night',4,['music','writing'],'Music',3,3,2,0,0,350,true,2],
    ['Coffee, cameras & new perspectives',5,['photography','food'],'Creative',0,0,1,2,1,250,false,1],
    ['Make a zine together',3,['art','writing'],'Creative',0,1,0,2,2,100,false,0],
    ['Poetry picnic',3,['writing','nature'],'Culture',1,1,0,2,1,0,false,0],
    ['The slightly nerdy quiz night',2,['games','books'],'Play',1,0,2,1,2,200,false,2],
    ['Plant swap & neighbourhood stories',5,['nature','craft'],'Outdoors',2,1,0,1,1,0,false,0],
    ['Cycle, pause, breakfast',3,['fitness','food'],'Outdoors',2,3,1,0,2,0,false,1],
    ['Cook a meal with new friends',1,['food','craft'],'Food',3,1,1,1,2,600,false,1],
    ['Acoustic courtyard jam',0,['music','games'],'Music',3,3,2,0,0,0,false,2]
  ];
  const names=['Aarav','Meera','Kabir','Isha','Dev','Tara','Rohan','Sana','Neel','Ananya','Arjun','Zoya','Vihaan','Diya','Rehan','Maya','Ishaan','Naina','Aditi','Kunal','Riya','Yash','Leela','Aman'];
  const attendees=Array.from({length:96},(_,i)=>{
    const cohort=Math.floor(i/24), v=Math.floor(i/6)%4;
    const surname=['Kapoor','Shah','Rao','Singh'][cohort];
    return {id:'person-'+i,name:names[i%24]+' '+surname,initials:names[i%24][0]+surname[0],interest:cohort,values:v,energy:Math.floor(i/2)%3,depth:Math.floor(i/3)%3,structure:i%3,area:areas[i%6]};
  });
  function peopleFor(interest,value,energy,depth,structure,index){
    return attendees.map(p=>({p,score:(p.interest===interest?4:0)+(p.values===value?3:0)+(2-Math.abs(p.energy-energy))+(2-Math.abs(p.depth-depth))+(2-Math.abs(p.structure-structure))+(Number(p.id.slice(7))%5===index%5?.25:0)})).sort((a,b)=>b.score-a.score||a.p.id.localeCompare(b.p.id)).slice(0,8+index%5).map(x=>x.p.id);
  }
  const events=rows.map((r,i)=>({id:'event-'+(i+1),title:r[0],area:areas[r[1]],tags:r[2],category:r[3],energy:r[6],depth:r[7],structure:r[8],price:r[9],alcohol:r[10],noise:r[11],capacity:18+i%4,offset:1+i%14,time:['10:00 AM','5:30 PM','8:00 AM','6:30 PM'][i%4],host:['The Neighbourhood Table','Sunday People','Small Circle Studio','Common Ground'][i%4],photo:photos[r[2][0]],attendeeIds:peopleFor(r[4],r[5],r[6],r[7],r[8],i),description:["An easy first visit, a shared activity and enough room to actually talk. Your host starts with a short introduction, so arriving on your own feels natural.","A small gathering for people who enjoy doing something together. You do not need experience or an existing group. Come curious and take the session at your own pace.","Spend a couple of hours with a new local circle. There is time for the activity and time for conversation, with a host around to help everyone settle in."][i%3]}));
  const presets=[
    {name:'The quiet maker',description:'Creative, considerate, a clear plan.',interest:0,values:1,energy:0,depth:2,structure:2,area:areas[0],boundary:'quiet'},
    {name:'The reflective reader',description:'Books, kindness and deeper conversation.',interest:1,values:1,energy:0,depth:2,structure:2,area:areas[0],boundary:'free'},
    {name:'The sunrise regular',description:'Movement, wellbeing and a shared routine.',interest:2,values:2,energy:1,depth:0,structure:2,area:areas[0],boundary:'alcohol-free'},
    {name:'The social spark',description:'Music, new experiences and an open plan.',interest:3,values:3,energy:2,depth:0,structure:0,area:areas[4],boundary:'none'},
    {name:'The gentle connector',description:'Food and games with a quieter crowd.',interest:3,values:1,energy:0,depth:2,structure:1,area:areas[2],boundary:'quiet'},
    {name:'The wandering creative',description:'Art, adventure and spontaneous plans.',interest:0,values:3,energy:1,depth:1,structure:0,area:areas[2],boundary:'free'},
    {name:'The curious conversationalist',description:'Stories and films in a lively group.',interest:1,values:0,energy:2,depth:1,structure:2,area:areas[2],boundary:'none'},
    {name:'The nature neighbour',description:'Nature, community and a gentle pace.',interest:2,values:1,energy:0,depth:2,structure:0,area:areas[1],boundary:'free'}
  ];
  const api={areas,interests,values,questions,attendees,events,presets};
  root.TGData=api;
  if(typeof module!=='undefined'&&module.exports)module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
