/* Explainable prototype recommender. Preference similarity, not a clinical test or trained AI. */
(function(root){
  'use strict';
  const D=typeof module!=='undefined'&&module.exports?require('./data.js'):root.TGData;
  const clamp=n=>Math.max(0,Math.min(1,n));
  const similar=(a,b)=>1-Math.abs(a-b)/2;
  const overlap=(a,b)=>a.length?a.filter(x=>b.includes(x)).length/a.length:0;
  function valid(p){return !!p&&D.questions.every(q=>q.options.some(o=>o.value===p[q.key]));}
  function personFit(p,other){
    const sharedValues=overlap(D.values[p.values].tags,D.values[other.values].tags);
    const sharedInterests=overlap(D.interests[p.interest].tags,D.interests[other.interest].tags);
    return clamp(.35*sharedValues+.2*similar(p.energy,other.energy)+.2*similar(p.depth,other.depth)+.15*similar(p.structure,other.structure)+.1*sharedInterests);
  }
  function allowed(p,e){return !(p.boundary==='free'&&e.price>0||p.boundary==='quiet'&&e.noise>0||p.boundary==='alcohol-free'&&e.alcohol);}
  function evaluate(p,e){
    if(!valid(p))throw new Error('Complete all seven profile answers first.');
    const crowd=e.attendeeIds.map(id=>D.attendees.find(a=>a.id===id)).filter(Boolean).map(person=>({person,fit:personFit(p,person)})).sort((a,b)=>b.fit-a.fit||a.person.id.localeCompare(b.person.id));
    const mean=list=>list.reduce((n,x)=>n+x.fit,0)/list.length;
    const people=crowd.length?.7*mean(crowd)+.3*mean(crowd.slice(0,3)):null;
    const interest=overlap(e.tags,D.interests[p.interest].tags);
    const format=(similar(p.energy,e.energy)+similar(p.depth,e.depth)+similar(p.structure,e.structure))/3;
    const local=e.area===p.area?1:.25;
    const total=people===null?(interest*.25+format*.1+local*.05)/.4:people*.6+interest*.25+format*.1+local*.05;
    const matches=crowd.filter(x=>x.fit>=.7);
    const reasons=[];
    if(crowd.length){const valuesCount=crowd.filter(x=>x.person.values===p.values).length;if(valuesCount)reasons.push(`${valuesCount} sample attendee${valuesCount===1?' shares':'s share'} your ${D.values[p.values].label.toLowerCase()} values`);if(matches.length)reasons.push(`${matches.length} sample attendee${matches.length===1?' has':'s have'} a people-fit score of 70 or above`);if(!valuesCount&&!matches.length)reasons.push('The sample crowd has a different mix of social preferences');}
    else reasons.push('No attendee profiles yet; this recommendation uses the event format');
    const shared=e.tags.filter(t=>D.interests[p.interest].tags.includes(t));
    if(shared.length)reasons.push(`Connect over ${shared.join(' and ')}`);
    if(p.energy===e.energy)reasons.push(['A gentler group energy','A balanced group energy','A lively group energy'][p.energy]);
    if(e.area===p.area)reasons.push('In your chosen neighbourhood');
    return {event:e,score:Math.round(total*100),people:people===null?null:Math.round(people*100),interest:Math.round(interest*100),format:Math.round(format*100),local:Math.round(local*100),crowd,compatible:matches.length,reasons,eligible:allowed(p,e)};
  }
  function recommend(p,events=D.events,filters={}){return events.filter(e=>allowed(p,e)&&(!filters.area||e.area===filters.area)&&(!filters.category||e.category===filters.category)&&(!filters.search||(e.title+' '+e.area+' '+e.tags.join(' ')).toLowerCase().includes(filters.search.toLowerCase()))).map(e=>evaluate(p,e)).sort((a,b)=>b.score-a.score||a.event.id.localeCompare(b.event.id));}
  function* combinations(){for(let interest=0;interest<4;interest++)for(let values=0;values<4;values++)for(let energy=0;energy<3;energy++)for(let depth=0;depth<3;depth++)for(let structure=0;structure<3;structure++)for(const area of D.areas)for(const boundary of ['none','alcohol-free','quiet','free'])yield {interest,values,energy,depth,structure,area,boundary};}
  const api={valid,personFit,allowed,evaluate,recommend,combinations};root.TGMatch=api;if(typeof module!=='undefined'&&module.exports)module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
