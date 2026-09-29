const app = document.querySelector('#app');

const events = [
  { id: 1, title: 'Paint & pour: a very unserious evening', date: 'Sat, 5 Oct · 6:30 PM', place: 'Studio 31, Mumbai', type: 'Creative', people: '12 going', image: 'https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=900&q=80', about: 'No art experience needed. Bring your curious self, paint something unexpected, and meet people over music and small bites.' },
  { id: 2, title: 'Sunday ceramics club', date: 'Sun, 6 Oct · 11:00 AM', place: 'The Clay Room, Mumbai', type: 'Creative', people: '8 going', image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=900&q=80', about: 'A slow, tactile Sunday at the wheel. Beginners are warmly welcome and all materials are included.' },
  { id: 3, title: 'Sunset run by the sea', date: 'Wed, 9 Oct · 6:15 PM', place: 'Carter Road, Mumbai', type: 'Outdoors', people: '24 going', image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=900&q=80', about: 'A friendly five-kilometre coastal run at conversation pace, followed by coconut water.' },
  { id: 4, title: 'The dinner table: strangers welcome', date: 'Fri, 11 Oct · 8:00 PM', place: 'Colaba, Mumbai', type: 'Food', people: '10 going', image: 'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=900&q=80', about: 'One long table, good food, and an evening designed for conversations that do not begin with “so, what do you do?”' },
  { id: 5, title: 'Rooftop film club', date: 'Sat, 12 Oct · 7:30 PM', place: 'Bandra West, Mumbai', type: 'Culture', people: '18 going', image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=900&q=80', about: 'Watch a great film under the open sky, then stay for the post-credit debate.' },
  { id: 6, title: 'Community garden morning', date: 'Sun, 13 Oct · 8:00 AM', place: 'Five Gardens, Mumbai', type: 'Outdoors', people: '15 going', image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=900&q=80', about: 'Get your hands in the soil with neighbours and leave with a little more green in your week.' }
];

const questions = [
  ['Your ideal weekend starts with…', ['A slow coffee and a new recipe', 'Moving my body outside', 'Making something with my hands', 'A film, book, or exhibition']],
  ['When you meet new people, you prefer…', ['A small group with room to talk', 'Doing something together', 'A lively room with energy', 'One-to-one conversations']],
  ['Pick a tiny pleasure.', ['Fresh flowers', 'A long walk', 'Trying a new restaurant', 'Making a playlist']],
  ['How spontaneous are you?', ['Plans make me happy', 'A little surprise is nice', 'Text me and I am in', 'Depends on the people']],
  ['What are you looking for right now?', ['Friends who feel easy', 'A regular community', 'A fresh perspective', 'More reasons to leave the house']]
];

const state = { page: 'home', quizStep: 0, filter: 'All', selected: events[0], joined: new Set(), toast: '' };

function nav() {
  const links = [['home','Discover'], ['feed','Explore'], ['myevents','My events'], ['host','Host']];
  return `<header class="nav"><button class="brand" data-page="home">to<b>gather</b></button><nav class="nav-links">${links.map(([page,label]) => `<button class="nav-link ${state.page === page ? 'active' : ''}" data-page="${page}">${label}</button>`).join('')}<button class="avatar" data-page="profile" aria-label="Profile">AV</button></nav></header>`;
}

function bottom() {
  return `<nav class="bottom">${[['home','⌂','Home'],['feed','⌕','Explore'],['myevents','♡','My events'],['profile','◉','Profile']].map(([page,icon,label]) => `<button class="${state.page === page ? 'active' : ''}" data-page="${page}"><i>${icon}</i>${label}</button>`).join('')}</nav>`;
}

function eventCard(event) {
  return `<article class="event-card"><div class="event-photo" style="background-image:url('${event.image}')"></div><div class="event-body"><span class="event-meta">${event.date}</span><h3>${event.title}</h3><p>${event.place}</p><div class="event-foot"><span>${event.people}</span><button class="tag" data-event="${event.id}">View event</button></div></div></article>`;
}

function home() {
  return `<main class="page"><section class="hero"><div><span class="eyebrow">Mumbai, made more human</span><h1>Meet through <em>shared moments.</em></h1><p class="lead">Togather turns a city full of strangers into small rooms full of possibility. Find experiences that feel like you — and people who do too.</p><div class="hero-actions"><button class="primary" data-action="start-quiz">Find your people →</button><button class="secondary" data-page="feed">Explore events</button></div></div><div class="hero-art"><div class="art-card one"><div class="tiny">🎨</div><strong>Paint & pour</strong><span>12 people are making a mess of it.</span></div><div class="art-card two"><div class="tiny">🌅</div><strong>Sea-side run</strong><span>Tonight, 6:15 PM</span></div></div></section><section class="numbers"><div class="number"><b>1,200+</b><span>people finding their people</span></div><div class="number"><b>86</b><span>small gatherings this month</span></div><div class="number"><b>4.9/5</b><span>average “glad I went” score</span></div></section><section><div class="section-head"><div><span class="eyebrow">This week near you</span><h2>Plans worth leaving home for.</h2></div><button class="secondary" data-page="feed">See everything</button></div><div class="event-grid">${events.slice(0,3).map(eventCard).join('')}</div></section></main>`;
}

function quiz() {
  const [question, options] = questions[state.quizStep];
  const progress = ((state.quizStep + 1) / questions.length) * 100;
  return `<main class="page"><section class="quiz"><div class="progress"><div style="width:${progress}%"></div></div><span class="eyebrow">A little getting-to-know-you · ${state.quizStep + 1} of ${questions.length}</span><h1>${question}</h1><div class="options">${options.map((option, index) => `<button class="option" data-action="answer" data-answer="${index}">${option}</button>`).join('')}</div><p class="quiz-note">There are no wrong answers. This just helps us find the right rooms.</p></section></main>`;
}

function feed() {
  const types = ['All', 'Creative', 'Outdoors', 'Food', 'Culture'];
  const visible = state.filter === 'All' ? events : events.filter(event => event.type === state.filter);
  return `<main class="page"><section class="feed-top"><span class="eyebrow">Find your next yes</span><h1>Good things are happening.</h1><p class="lead">Little gatherings, one city, very few reasons to stay home.</p><div class="filters">${types.map(type => `<button class="pill ${state.filter === type ? 'selected' : ''}" data-filter="${type}">${type}</button>`).join('')}</div></section><section class="feed-grid">${visible.map(eventCard).join('')}</section></main>`;
}

function detail() {
  const e = state.selected;
  const joined = state.joined.has(e.id);
  return `<main class="page detail"><button class="back" data-page="feed">← Back to all events</button><section class="detail-hero" style="background-image:url('${e.image}')"><div><span class="eyebrow" style="color:#ffe5a0">${e.type}</span><h1>${e.title}</h1><p>${e.date} · ${e.place}</p></div></section><section class="detail-info"><div><span class="eyebrow">About this gathering</span><h2>${e.title}, but make it yours.</h2><p>${e.about}</p><p>Come solo, bring a friend, or arrive a little early to settle in. This is a welcoming, low-pressure space for real connection.</p></div><aside class="details-list"><div><span>WHEN</span>${e.date}</div><div><span>WHERE</span>${e.place}</div><div><span>WHO</span>${e.people}</div><button class="primary" data-action="join" data-event="${e.id}">${joined ? 'You are going ✓' : 'I am in →'}</button></aside></section></main>`;
}

function myEvents() {
  const joined = events.filter(event => state.joined.has(event.id));
  if (!joined.length) return `<main class="page empty"><span class="eyebrow">Your calendar is waiting</span><h1>Nothing here yet.</h1><p>The best plans often begin with a tiny yes.</p><button class="primary" data-page="feed">Explore gatherings →</button></main>`;
  return `<main class="page"><section class="feed-top"><span class="eyebrow">Your plans</span><h1>See you there.</h1></section><section class="feed-grid">${joined.map(eventCard).join('')}</section></main>`;
}

function host() {
  return `<main class="page host"><span class="eyebrow">Make a little room</span><h1>Host something people will remember.</h1><p class="lead">It can be a dinner, a walk, a sketchbook hour — anything that brings people together with intention.</p><form class="form" data-form="host"><label>What are you planning?<input required name="title" placeholder="e.g. Poetry and chai on Thursday" /></label><label>Where will it happen?<input required name="place" placeholder="Neighbourhood or venue" /></label><label>Tell people what to expect<textarea required name="about" placeholder="A few warm words go a long way."></textarea></label><button class="primary" type="submit">Send for review →</button></form></main>`;
}

function profile() {
  return `<main class="page profile"><section class="profile-top"><div class="profile-avatar">AV</div><div><h1>Ayush Vaidya</h1><p>Mumbai · here for good stories and better weekends</p></div></section><section class="profile-cards"><div><b>Your vibe</b><span>Creative, curious, outdoorsy</span></div><div><b>Your community</b><span>${state.joined.size} gathering${state.joined.size === 1 ? '' : 's'} joined</span></div><div><b>Small win</b><span>You are making your city feel smaller.</span></div><div><b>Need a reset?</b><button class="secondary" data-action="start-quiz">Retake your match quiz</button></div></section></main>`;
}

function render() {
  const pages = { home, quiz, feed, detail, myevents: myEvents, host, profile };
  app.innerHTML = `<div class="shell">${nav()}${pages[state.page]()}${bottom()}${state.toast ? `<div class="toast">${state.toast}</div>` : ''}</div>`;
  window.scrollTo(0, 0);
}

function showToast(message) {
  state.toast = message;
  render();
  window.setTimeout(() => { state.toast = ''; render(); }, 2300);
}

app.addEventListener('click', event => {
  const target = event.target.closest('button');
  if (!target) return;
  if (target.dataset.page) { state.page = target.dataset.page; render(); return; }
  if (target.dataset.event) { state.selected = events.find(item => item.id === Number(target.dataset.event)); state.page = 'detail'; render(); return; }
  if (target.dataset.filter) { state.filter = target.dataset.filter; render(); return; }
  if (target.dataset.action === 'start-quiz') { state.page = 'quiz'; state.quizStep = 0; render(); return; }
  if (target.dataset.action === 'answer') { if (state.quizStep < questions.length - 1) { state.quizStep += 1; render(); } else { state.page = 'feed'; state.filter = 'All'; showToast('Your matches are ready ✨'); } return; }
  if (target.dataset.action === 'join') { state.joined.add(Number(target.dataset.event)); showToast('You are on the list — see you there!'); return; }
});

app.addEventListener('submit', event => {
  if (!event.target.matches('[data-form="host"]')) return;
  event.preventDefault();
  event.target.reset();
  showToast('Sent! We will be in touch soon.');
});

render();
