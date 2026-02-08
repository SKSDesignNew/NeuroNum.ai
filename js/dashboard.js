/* ═══════════════════════════════════════════
   NeuroNum.ai — Dashboard + AI Study Notes
   ═══════════════════════════════════════════ */

// Re-use topic maps from profile.js (inline for standalone page)
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

const API_BASE = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? `http://${window.location.hostname}:3000`
  : '';

let profile = null;
let currentSubject = 'science';
let selectedTopic = null;

document.addEventListener('DOMContentLoaded', async () => {
  // ── Load profile ──
  try {
    const user = await getUser();
    if (user) {
      const sb = await initSupabase();
      const { data } = await sb.from('profiles').select('*').eq('id', user.id).single();
      if (data) profile = data;
    }
  } catch (e) {
    console.warn('Supabase not configured — trying localStorage');
  }

  if (!profile) {
    const stored = localStorage.getItem('neuronum_profile');
    if (stored) {
      profile = JSON.parse(stored);
    } else {
      // No profile found — redirect
      window.location.href = 'profile.html';
      return;
    }
  }

  // ── Update greeting ──
  document.getElementById('userGreeting').textContent = `Hi, ${profile.first_name || 'Student'}`;
  document.getElementById('notesGradeBadge').textContent = `Grade ${profile.grade}`;

  // ── Tab switching ──
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

  // ── Generate button ──
  document.getElementById('btnGenerate').addEventListener('click', () => {
    if (selectedTopic) generateNotes(selectedTopic);
  });

  // ── Back button ──
  document.getElementById('btnBack').addEventListener('click', showTopicSelector);

  // ── Logout ──
  document.getElementById('btnLogout').addEventListener('click', async () => {
    try {
      const sb = await initSupabase();
      await sb.auth.signOut();
    } catch (e) { /* ignore */ }
    localStorage.removeItem('neuronum_profile');
    window.location.href = '/';
  });

  // Initial render
  renderTopicChips();
});

function renderTopicChips() {
  const container = document.getElementById('topicChips');
  const heading   = document.getElementById('topicHeading');
  container.innerHTML = '';

  const topics = currentSubject === 'science' ? profile.science_topics : profile.finance_topics;
  const nameMap = currentSubject === 'science' ? SCIENCE_TOPIC_NAMES : FINANCE_TOPIC_NAMES;
  const cssClass = currentSubject === 'finance' ? 'finance-chip' : '';

  heading.textContent = currentSubject === 'science'
    ? 'Select a Science Topic to Study'
    : 'Select a Finance Topic to Study';

  if (!topics || topics.length === 0) {
    container.innerHTML = '<p style="color:var(--text-3)">No topics selected for this track. Update your profile to add topics.</p>';
    return;
  }

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

// ═══════════════════════════════════════════
// AI Note Generation
// ═══════════════════════════════════════════

async function generateNotes(topicId) {
  const nameMap = currentSubject === 'science' ? SCIENCE_TOPIC_NAMES : FINANCE_TOPIC_NAMES;
  const topicName = nameMap[topicId] || topicId;

  // Show notes container
  document.getElementById('topicSelector').classList.add('hidden');
  document.getElementById('notesContainer').classList.remove('hidden');
  document.getElementById('notesTopicTitle').textContent = topicName;

  const notesA = document.getElementById('notesA');
  const notesB = document.getElementById('notesB');

  // Show loading
  notesA.innerHTML = loadingHTML();
  notesB.innerHTML = loadingHTML();

  // Call both AI endpoints in parallel
  const payload = {
    topic: topicName,
    topicId,
    subject: currentSubject,
    grade: profile.grade,
  };

  const [resultA, resultB] = await Promise.allSettled([
    fetchAINotes('alpha', payload),
    fetchAINotes('beta', payload),
  ]);

  // Render Tutor Alpha (Claude)
  if (resultA.status === 'fulfilled') {
    notesA.innerHTML = markdownToHTML(resultA.value);
  } else {
    notesA.innerHTML = errorHTML('Tutor Alpha is temporarily unavailable. Please try again.');
  }

  // Render Tutor Beta (Gemini)
  if (resultB.status === 'fulfilled') {
    notesB.innerHTML = markdownToHTML(resultB.value);
  } else {
    notesB.innerHTML = errorHTML('Tutor Beta is temporarily unavailable. Please try again.');
  }
}

async function fetchAINotes(tutor, payload) {
  const res = await fetch(`${API_BASE}/api/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...payload, tutor }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to generate notes');
  }

  const data = await res.json();
  return data.notes;
}

// ── Simple Markdown → HTML ──
function markdownToHTML(md) {
  if (!md) return '<p>No content generated.</p>';

  let html = md
    // Code blocks
    .replace(/```(\w*)\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>')
    // Headers
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    // Bold & italic
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Inline code
    .replace(/`(.+?)`/g, '<code>$1</code>')
    // Blockquotes
    .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
    // Unordered lists
    .replace(/^[•\-\*] (.+)$/gm, '<li>$1</li>')
    // Ordered lists
    .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
    // Horizontal rules
    .replace(/^---$/gm, '<hr>')
    // Paragraphs
    .replace(/\n\n/g, '</p><p>')
    // Line breaks
    .replace(/\n/g, '<br>');

  // Wrap loose <li> in <ul>
  html = html.replace(/(<li>.*?<\/li>(?:<br>)?)+/g, (match) => {
    return '<ul>' + match.replace(/<br>/g, '') + '</ul>';
  });

  return '<p>' + html + '</p>';
}

function loadingHTML() {
  return `<div class="notes-placeholder">
    <div class="loading-dots"><span></span><span></span><span></span></div>
    <p>Generating study notes...</p>
  </div>`;
}

function errorHTML(message) {
  return `<div class="notes-error">
    <p>${message}</p>
    <button class="btn btn-outline btn-sm" onclick="document.getElementById('btnBack').click()">Back to Topics</button>
  </div>`;
}
