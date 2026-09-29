state.filter='For you';
function setFilter(filter){state.filter=filter;render()}
function feed(){const filters=['For you','Hauz Khas','GK & Lajpat','CP','Outdoors','Creative'];const visible=events.filter(e=>state.filter==='For you'||(state.filter==='Hauz Khas'&&e.area.includes('Hauz'))||(state.filter==='GK & Lajpat'&&(e.area.includes('GK')||e.area.includes('Lajpat')))||(state.filter==='Outdoors'&&(e.id==='run'||e.id==='hike'))||(state.filter==='Creative'&&(e.id==='art'||e.id==='book'))||(state.filter==='CP'&&e.area.includes('CP')));return `<section class="screen"><div class="shell">${nav()}<div class="feed"><aside class="sidebar"><h3>Explore near you</h3>${filters.map(f=>`<button class="filter ${state.filter===f?'active':''}" onclick="setFilter('${f}')">${f}</button>`).join('')}</aside><div><div class="pagehead"><div><div class="eyebrow">YOUR WEEKEND, BETTER MATCHED</div><h1>Plans that feel like you.</h1><p>Based on creativity, small groups and your neighbourhood.</p></div><button class="secondary" onclick="go('profile')">Tune matches</button></div><div class="events">${visible.map(eventCard).join('')}${state.added&&state.filter==='For you'?eventCard({id:'new',title:'Coffee & Ideas Circle',area:'Hauz Khas Village',date:'Thu, 6:30 PM',people:'New listing',match:'91% match',cls:'run'}):''}</div>${visible.length===0?'<p class="meta">No events here just yet. Try another pocket of the city.</p>':''}</div></div>${bottom('feed')}</div></section>`}
function detail(){let e=events.find(x=>x.id===state.event)||events[1];return `<section class="screen"><div class="shell">${nav()}<div class="detail"><button class="secondary" onclick="go('feed')">← All events</button><div class="cover ${e.cls}"><span class="match">✦ ${e.match}</span></div><article><div class="eyebrow">${e.area}</div><h1>${e.title}</h1><div class="meta">${e.date} · ${e.people} · Hosted by Neighbourhood People</div><div class="why"><b>Why this matches you</b><br>${e.why}</div><p>This is a gentle, easy-going meet-up for people looking to share an interest and leave with a few familiar faces. Come as you are.</p><button class="primary" onclick="rsvp()">${state.rsvp?'You’re going ✓':'RSVP to this event'}</button></article></div>${bottom('feed')}${state.rsvp?'<div class="toast">Saved to My events — see you there ✦</div>':''}</div></section>`}
render();

// Vercel's security headers block inline onclick attributes. Delegate their
// intent here so the markup stays simple while interactions remain available.
document.addEventListener('click', event => {
  const target = event.target.closest('[onclick]');
  if (!target) return;
  const action = target.getAttribute('onclick') || '';
  event.preventDefault();
  const value = (pattern) => (action.match(pattern) || [])[1];
  if (action.startsWith('go(')) go(value(/go\('([^']+)'\)/));
  else if (action.startsWith('answer(')) answer(value(/answer\('([^']+)'\)/));
  else if (action.startsWith('openEvent(')) openEvent(value(/openEvent\('([^']+)'\)/));
  else if (action.startsWith('setFilter(')) setFilter(value(/setFilter\('([^']+)'\)/));
  else if (action.startsWith('setTab(')) setTab(value(/setTab\('([^']+)'\)/));
  else if (action.startsWith('nextQuiz')) nextQuiz();
  else if (action.startsWith('backQuiz')) backQuiz();
  else if (action.startsWith('rsvp')) rsvp();
  else if (action.startsWith('publish')) publish();
  else if (action.startsWith('this.textContent')) target.textContent = 'Connected ✓';
});
