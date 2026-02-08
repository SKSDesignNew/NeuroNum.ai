/* ═══════════════════════════════════════════
   NeuroNum.ai — Dashboard + AI Study Notes
   ═══════════════════════════════════════════ */

const SCIENCE_TOPIC_NAMES = {
  bio_intro:'Introduction to Biology', earth_science:'Earth Science', physical_sci:'Physical Science',
  env_awareness:'Environmental Awareness', sci_method:'Scientific Method', human_body_9:'Human Body Basics',
  chemistry:'Chemistry', biology_2:'Biology II', organic_intro:'Intro to Organic Chemistry',
  genetics:'Genetics & DNA', lab_skills:'Lab Skills & Safety', sci_research:'Scientific Research',
  physics:'Physics', ap_chemistry:'AP Chemistry', ap_biology:'AP Biology',
  anatomy:'Anatomy & Physiology', sat_science:'SAT Science Prep', astro_intro:'Intro to Astronomy',
  ap_physics:'AP Physics', env_science_adv:'AP Environmental Science', biochem:'Biochemistry',
  engineering:'Engineering Principles', act_science:'ACT Science Prep', research_proj:'Research Project Skills',
};

const FINANCE_TOPIC_NAMES = {
  budgeting:'Budgeting Basics', saving_101:'Saving Fundamentals', money_mindset:'Money Mindset',
  banking_basics:'Banking Basics', earning_income:'Earning Income', smart_consumer:'Being a Smart Consumer',
  credit_intro:'Credit & Debt', banking_adv:'Advanced Banking', taxes_intro:'Introduction to Taxes',
  insurance_101:'Insurance Basics', financial_goals:'Financial Goal Setting', econ_basics:'Economics Basics',
  investing:'Investing Fundamentals', stock_market:'Stock Market', compound_int:'Compound Interest',
  retirement_101:'Retirement Planning', risk_mgmt:'Risk Management', sat_math_fin:'SAT Math — Finance Qs',
  college_finance:'College Finance', tax_planning:'Tax Planning', real_estate:'Real Estate Basics',
  entrepreneurship:'Entrepreneurship', crypto_fintech:'Crypto & Fintech', adulting_finance:'Adulting Finance',
};

let profile = null;
let currentSubject = 'science';
let selectedTopic = null;

document.addEventListener('DOMContentLoaded', async () => {
  const user = requireAuth();
  if (!user) return;

  const cached = localStorage.getItem('neuronum_profile');
  if (cached) profile = JSON.parse(cached);

  try {
    const res = await authFetch('/api/profile');
    if (res.ok) { profile = await res.json(); localStorage.setItem('neuronum_profile', JSON.stringify(profile)); }
    else if (!profile) { window.location.href = 'profile.html'; return; }
  } catch (e) { if (!profile) { window.location.href = 'profile.html'; return; } }

  document.getElementById('userGreeting').textContent = `Hi, ${profile.first_name || 'Student'}`;
  document.getElementById('notesGradeBadge').textContent = `Grade ${profile.grade}`;

  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentSubject = btn.dataset.subject;
      selectedTopic = null;
      document.getElementById('btnGenerate').disabled = true;
      showTopicSelector();
      renderTopicChips();
    });
  });

  document.getElementById('btnGenerate').addEventListener('click', () => { if (selectedTopic) generateNotes(selectedTopic); });
  document.getElementById('btnBack').addEventListener('click', showTopicSelector);
  document.getElementById('btnLogout').addEventListener('click', () => logout());
  renderTopicChips();
});

function renderTopicChips() {
  const container = document.getElementById('topicChips');
  const heading = document.getElementById('topicHeading');
  container.innerHTML = '';
  const topics = currentSubject === 'science' ? profile.science_topics : profile.finance_topics;
  const nameMap = currentSubject === 'science' ? SCIENCE_TOPIC_NAMES : FINANCE_TOPIC_NAMES;
  const cssClass = currentSubject === 'finance' ? 'finance-chip' : '';
  heading.textContent = currentSubject === 'science' ? 'Select a Science Topic to Study' : 'Select a Finance Topic to Study';
  if (!topics || topics.length === 0) { container.innerHTML = '<p style="color:var(--text-3)">No topics selected for this track.</p>'; return; }
  topics.forEach(id => {
    const chip = document.createElement('button');
    chip.className = `topic-chip ${cssClass}`;
    chip.textContent = nameMap[id] || id;
    chip.dataset.id = id;
    chip.addEventListener('click', () => {
      container.querySelectorAll('.topic-chip').forEach(c => c.classList.remove('selected'));
      chip.classList.add('selected');
      selectedTopic = id;
      document.getElementById('btnGenerate').disabled = false;
    });
    container.appendChild(chip);
  });
}

function showTopicSelector() {
  document.getElementById('topicSelector').classList.remove('hidden');
  document.getElementById('notesContainer').classList.add('hidden');
}

async function generateNotes(topicId) {
  const nameMap = currentSubject === 'science' ? SCIENCE_TOPIC_NAMES : FINANCE_TOPIC_NAMES;
  const topicName = nameMap[topicId] || topicId;
  document.getElementById('topicSelector').classList.add('hidden');
  document.getElementById('notesContainer').classList.remove('hidden');
  document.getElementById('notesTopicTitle').textContent = topicName;
  const notesA = document.getElementById('notesA');
  const notesB = document.getElementById('notesB');
  notesA.innerHTML = loadingHTML();
  notesB.innerHTML = loadingHTML();

  const payload = { topic: topicName, topicId, subject: currentSubject, grade: profile.grade };
  const [resultA, resultB] = await Promise.allSettled([fetchAINotes('alpha', payload), fetchAINotes('beta', payload)]);
  notesA.innerHTML = resultA.status === 'fulfilled' ? markdownToHTML(resultA.value) : errorHTML('Tutor Alpha is temporarily unavailable.');
  notesB.innerHTML = resultB.status === 'fulfilled' ? markdownToHTML(resultB.value) : errorHTML('Tutor Beta is temporarily unavailable.');
}

async function fetchAINotes(tutor, payload) {
  const res = await authFetch('/api/generate', { method: 'POST', body: JSON.stringify({ ...payload, tutor }) });
  if (!res.ok) { const err = await res.json().catch(() => ({})); throw new Error(err.error || 'Failed'); }
  return (await res.json()).notes;
}

function markdownToHTML(md) {
  if (!md) return '<p>No content generated.</p>';
  let html = md
    .replace(/```(\w*)\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>').replace(/^## (.+)$/gm, '<h2>$1</h2>').replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code>$1</code>').replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
    .replace(/^[•\-\*] (.+)$/gm, '<li>$1</li>').replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
    .replace(/^---$/gm, '<hr>').replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>');
  html = html.replace(/(<li>.*?<\/li>(?:<br>)?)+/g, m => '<ul>' + m.replace(/<br>/g, '') + '</ul>');
  return '<p>' + html + '</p>';
}

function loadingHTML() { return '<div class="notes-placeholder"><div class="loading-dots"><span></span><span></span><span></span></div><p>Generating study notes...</p></div>'; }
function errorHTML(msg) { return `<div class="notes-error"><p>${msg}</p><button class="btn btn-outline btn-sm" onclick="document.getElementById('btnBack').click()">Back to Topics</button></div>`; }
