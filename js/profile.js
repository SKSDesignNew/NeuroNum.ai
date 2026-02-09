/* ═══════════════════════════════════════════
   NeuroNum.ai — Multi-Step Profile Form
   ═══════════════════════════════════════════ */

// ── Topic definitions by grade ──
const SCIENCE_TOPICS = {
  9: [
    { id: 'bio_intro',       name: 'Introduction to Biology', desc: 'Cell structure, genetics basics, ecosystems' },
    { id: 'earth_science',   name: 'Earth Science',           desc: 'Geology, weather, natural resources' },
    { id: 'physical_sci',    name: 'Physical Science',        desc: 'Motion, forces, energy fundamentals' },
    { id: 'env_awareness',   name: 'Environmental Awareness', desc: 'Climate, pollution, sustainability' },
    { id: 'sci_method',      name: 'Scientific Method',       desc: 'Hypothesis, experiments, data analysis' },
    { id: 'human_body_9',    name: 'Human Body Basics',       desc: 'Organ systems, nutrition, health' },
  ],
  10: [
    { id: 'chemistry',       name: 'Chemistry',               desc: 'Atoms, periodic table, chemical reactions' },
    { id: 'biology_2',       name: 'Biology II',              desc: 'Evolution, ecology, molecular biology' },
    { id: 'organic_intro',   name: 'Intro to Organic Chemistry', desc: 'Carbon compounds, hydrocarbons' },
    { id: 'genetics',        name: 'Genetics & DNA',          desc: 'Heredity, DNA replication, mutations' },
    { id: 'lab_skills',      name: 'Lab Skills & Safety',     desc: 'Lab techniques, measurements, safety' },
    { id: 'sci_research',    name: 'Scientific Research',     desc: 'Research design, peer review, data' },
  ],
  11: [
    { id: 'physics',         name: 'Physics',                 desc: 'Mechanics, waves, electricity, magnetism' },
    { id: 'ap_chemistry',    name: 'AP Chemistry',            desc: 'Thermodynamics, kinetics, equilibrium' },
    { id: 'ap_biology',      name: 'AP Biology',              desc: 'Advanced cell biology, biotechnology' },
    { id: 'anatomy',         name: 'Anatomy & Physiology',    desc: 'Detailed human body systems' },
    { id: 'sat_science',     name: 'SAT Science Prep',        desc: 'Data interpretation, experiment design' },
    { id: 'astro_intro',     name: 'Intro to Astronomy',      desc: 'Solar system, stars, galaxies, cosmology' },
  ],
  12: [
    { id: 'ap_physics',      name: 'AP Physics',              desc: 'Advanced mechanics, E&M, modern physics' },
    { id: 'env_science_adv', name: 'AP Environmental Science',desc: 'Ecosystems, biodiversity, sustainability' },
    { id: 'biochem',         name: 'Biochemistry',            desc: 'Proteins, enzymes, metabolism' },
    { id: 'engineering',     name: 'Engineering Principles',  desc: 'Design process, materials, structures' },
    { id: 'act_science',     name: 'ACT Science Prep',        desc: 'Passage analysis, conflicting viewpoints' },
    { id: 'research_proj',   name: 'Research Project Skills', desc: 'Capstone projects, scientific writing' },
  ],
};

const FINANCE_TOPICS = {
  9: [
    { id: 'budgeting',       name: 'Budgeting Basics',        desc: 'Income vs expenses, tracking spending' },
    { id: 'saving_101',      name: 'Saving Fundamentals',     desc: 'Emergency fund, savings goals, interest' },
    { id: 'money_mindset',   name: 'Money Mindset',           desc: 'Needs vs wants, delayed gratification' },
    { id: 'banking_basics',  name: 'Banking Basics',          desc: 'Checking, savings, debit cards' },
    { id: 'earning_income',  name: 'Earning Income',          desc: 'Jobs, entrepreneurship, paychecks' },
    { id: 'smart_consumer',  name: 'Being a Smart Consumer',  desc: 'Comparing prices, avoiding scams' },
  ],
  10: [
    { id: 'credit_intro',    name: 'Credit & Debt',           desc: 'Credit scores, cards, responsible use' },
    { id: 'banking_adv',     name: 'Advanced Banking',        desc: 'Interest rates, loans, account types' },
    { id: 'taxes_intro',     name: 'Introduction to Taxes',   desc: 'W-2s, tax brackets, filing basics' },
    { id: 'insurance_101',   name: 'Insurance Basics',        desc: 'Health, auto, types of coverage' },
    { id: 'financial_goals', name: 'Financial Goal Setting',  desc: 'Short-term and long-term planning' },
    { id: 'econ_basics',     name: 'Economics Basics',        desc: 'Supply & demand, inflation, GDP' },
  ],
  11: [
    { id: 'investing',       name: 'Investing Fundamentals',  desc: 'Stocks, bonds, mutual funds, ETFs' },
    { id: 'stock_market',    name: 'Stock Market',            desc: 'How markets work, reading charts' },
    { id: 'compound_int',    name: 'Compound Interest',       desc: 'Time value of money, growth calculations' },
    { id: 'retirement_101',  name: 'Retirement Planning',     desc: '401(k), IRA, Roth, employer matching' },
    { id: 'risk_mgmt',       name: 'Risk Management',         desc: 'Diversification, risk tolerance' },
    { id: 'sat_math_fin',    name: 'SAT Math — Finance Qs',   desc: 'Percent, interest, data problems' },
  ],
  12: [
    { id: 'college_finance', name: 'College Finance',         desc: 'FAFSA, scholarships, student loans' },
    { id: 'tax_planning',    name: 'Tax Planning',            desc: 'Deductions, credits, W-4 strategy' },
    { id: 'real_estate',     name: 'Real Estate Basics',      desc: 'Renting vs buying, mortgages' },
    { id: 'entrepreneurship',name: 'Entrepreneurship',        desc: 'Business plans, revenue, profit' },
    { id: 'crypto_fintech',  name: 'Crypto & Fintech',        desc: 'Digital assets, fintech tools, risks' },
    { id: 'adulting_finance',name: 'Adulting Finance',         desc: 'Apartment costs, bills, credit building' },
  ],
};

// ── SchoolDigger API config ──
const SCHOOL_API = {
  base: 'https://api.schooldigger.com/v2.0/schools',
  appID: '909dc541',
  appKey: '0e200e8a029b0eb577edce68b61de454',
};

const US_STATES = {
  AL:'Alabama',AK:'Alaska',AZ:'Arizona',AR:'Arkansas',CA:'California',CO:'Colorado',CT:'Connecticut',DE:'Delaware',FL:'Florida',GA:'Georgia',HI:'Hawaii',ID:'Idaho',IL:'Illinois',IN:'Indiana',IA:'Iowa',KS:'Kansas',KY:'Kentucky',LA:'Louisiana',ME:'Maine',MD:'Maryland',MA:'Massachusetts',MI:'Michigan',MN:'Minnesota',MS:'Mississippi',MO:'Missouri',MT:'Montana',NE:'Nebraska',NV:'Nevada',NH:'New Hampshire',NJ:'New Jersey',NM:'New Mexico',NY:'New York',NC:'North Carolina',ND:'North Dakota',OH:'Ohio',OK:'Oklahoma',OR:'Oregon',PA:'Pennsylvania',RI:'Rhode Island',SC:'South Carolina',SD:'South Dakota',TN:'Tennessee',TX:'Texas',UT:'Utah',VT:'Vermont',VA:'Virginia',WA:'Washington',WV:'West Virginia',WI:'Wisconsin',WY:'Wyoming',DC:'Washington D.C.'
};

document.addEventListener('DOMContentLoaded', () => {
  const currentUser = requireAuth();
  if (!currentUser) return;

  const form = document.getElementById('profileForm');
  const steps = document.querySelectorAll('.form-step');
  const progSteps = document.querySelectorAll('.progress-step');
  const progFill = document.getElementById('progressFill');
  let currentStep = 1;

  const stateSelect = document.getElementById('state');
  const schoolSearch = document.getElementById('schoolSearch');
  const schoolResults = document.getElementById('schoolResults');
  const hiddenSchool = document.getElementById('highSchool');
  const hiddenTownship = document.getElementById('township');
  const selectedSchoolEl = document.getElementById('selectedSchool');
  let searchTimeout = null;

  // Populate states
  Object.entries(US_STATES)
    .sort((a, b) => a[1].localeCompare(b[1]))
    .forEach(([code, name]) => {
      const opt = document.createElement('option');
      opt.value = code;
      opt.textContent = name;
      stateSelect.appendChild(opt);
    });

  stateSelect.addEventListener('change', () => {
    schoolSearch.disabled = !stateSelect.value;
    schoolSearch.value = '';
    hiddenSchool.value = '';
    hiddenTownship.value = '';
    selectedSchoolEl.classList.remove('visible');
    selectedSchoolEl.innerHTML = '';
    schoolResults.classList.remove('open');
    if (stateSelect.value) schoolSearch.placeholder = 'Start typing your school name...';
    else schoolSearch.placeholder = 'Select state first';
  });

  // School search with debounce
  schoolSearch.addEventListener('input', () => {
    clearTimeout(searchTimeout);
    const query = schoolSearch.value.trim();
    const st = stateSelect.value;
    if (query.length < 2 || !st) { schoolResults.classList.remove('open'); return; }
    schoolResults.innerHTML = '<div class="school-search-loading">Searching...</div>';
    schoolResults.classList.add('open');
    searchTimeout = setTimeout(() => fetchSchools(st, query), 350);
  });

  async function fetchSchools(st, query) {
    try {
      const params = new URLSearchParams({
        st, q: query, level: 'High', perPage: '15',
        appID: SCHOOL_API.appID, appKey: SCHOOL_API.appKey,
      });
      const res = await fetch(`${SCHOOL_API.base}?${params}`);
      if (!res.ok) throw new Error('API error');
      const data = await res.json();
      renderSchoolResults(data.schoolList || []);
    } catch (e) {
      schoolResults.innerHTML = '<div class="school-search-loading">Search unavailable. Please try again.</div>';
    }
  }

  function renderSchoolResults(schools) {
    if (schools.length === 0) {
      schoolResults.innerHTML = '<div class="school-search-loading">No high schools found. Try a different name.</div>';
      return;
    }
    schoolResults.innerHTML = '';
    schools.forEach(s => {
      const item = document.createElement('div');
      item.className = 'school-result-item';
      const addr = s.address || {};
      const district = s.district ? s.district.districtName : '';
      item.innerHTML = `<div class="school-name">${s.schoolName}</div><div class="school-detail">${addr.city || ''}, ${addr.state || ''} — ${district}</div>`;
      item.addEventListener('click', () => selectSchool(s));
      schoolResults.appendChild(item);
    });
  }

  function selectSchool(s) {
    const addr = s.address || {};
    const district = s.district ? s.district.districtName : '';
    hiddenSchool.value = s.schoolName;
    hiddenTownship.value = district;
    schoolSearch.value = s.schoolName;
    schoolResults.classList.remove('open');
    selectedSchoolEl.innerHTML = `<span>${s.schoolName} — ${district}, ${addr.city || ''}</span><span class="clear-school" id="clearSchool">✕ Change</span>`;
    selectedSchoolEl.classList.add('visible');
    document.getElementById('clearSchool').addEventListener('click', () => {
      hiddenSchool.value = '';
      hiddenTownship.value = '';
      schoolSearch.value = '';
      selectedSchoolEl.classList.remove('visible');
      schoolSearch.focus();
    });
  }

  // Close results on outside click
  document.addEventListener('click', (e) => {
    if (!e.target.closest('#schoolSearch') && !e.target.closest('#schoolResults')) {
      schoolResults.classList.remove('open');
    }
  });

  const gradeSelect = document.getElementById('grade');
  const scienceGrid = document.getElementById('scienceTopics');
  const financeGrid = document.getElementById('financeTopics');
  const scienceLegend = document.getElementById('scienceLegend');
  const financeLegend = document.getElementById('financeLegend');
  let selectedScience = new Set();
  let selectedFinance = new Set();

  function renderTopics(grid, topics, selectedSet, cssClass = '') {
    grid.innerHTML = '';
    topics.forEach(topic => {
      const card = document.createElement('div');
      card.className = `topic-card ${cssClass}`;
      card.dataset.id = topic.id;
      if (selectedSet.has(topic.id)) card.classList.add('selected');
      card.innerHTML = `<div class="topic-check"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div><div class="topic-info"><h4>${topic.name}</h4><p>${topic.desc}</p></div>`;
      card.addEventListener('click', () => {
        if (selectedSet.has(topic.id)) { selectedSet.delete(topic.id); card.classList.remove('selected'); }
        else { selectedSet.add(topic.id); card.classList.add('selected'); }
      });
      grid.appendChild(card);
    });
  }

  function updateTopicsForGrade() {
    const grade = gradeSelect.value;
    if (!grade) return;
    scienceLegend.textContent = `Science Topics — ${grade}th Grade`;
    financeLegend.textContent = `Finance Topics — ${grade}th Grade`;
    selectedScience.clear();
    selectedFinance.clear();
    renderTopics(scienceGrid, SCIENCE_TOPICS[grade] || [], selectedScience);
    renderTopics(financeGrid, FINANCE_TOPICS[grade] || [], selectedFinance, 'finance-topic');
  }

  gradeSelect.addEventListener('change', updateTopicsForGrade);

  function goToStep(step) {
    steps.forEach(s => s.classList.remove('active'));
    progSteps.forEach(s => {
      const n = parseInt(s.dataset.step);
      s.classList.remove('active', 'completed');
      if (n < step) s.classList.add('completed');
      if (n === step) s.classList.add('active');
    });
    document.getElementById(`step${step}`).classList.add('active');
    progFill.style.width = `${((step - 1) / 2) * 100}%`;
    currentStep = step;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function validateStep1() {
    const fields = ['firstName', 'lastName', 'grade', 'state'];
    let valid = true;
    fields.forEach(id => {
      const el = document.getElementById(id);
      const group = el.closest('.form-group');
      if (!el.value.trim()) {
        group.classList.add('has-error');
        if (!group.querySelector('.error-text')) { const err = document.createElement('div'); err.className = 'error-text'; err.textContent = 'This field is required'; group.appendChild(err); }
        valid = false;
      } else { group.classList.remove('has-error'); const err = group.querySelector('.error-text'); if (err) err.remove(); }
    });
    // Validate school selection
    if (!hiddenSchool.value) {
      const group = schoolSearch.closest('.form-group');
      group.classList.add('has-error');
      if (!group.querySelector('.error-text')) { const err = document.createElement('div'); err.className = 'error-text'; err.textContent = 'Please search and select your school'; group.appendChild(err); }
      valid = false;
    } else {
      const group = schoolSearch.closest('.form-group');
      group.classList.remove('has-error');
      const err = group.querySelector('.error-text'); if (err) err.remove();
    }
    return valid;
  }

  document.getElementById('toStep2').addEventListener('click', () => { if (!validateStep1()) return; updateTopicsForGrade(); goToStep(2); });
  document.getElementById('toStep3').addEventListener('click', () => { if (selectedScience.size === 0) { alert('Please select at least one science topic.'); return; } goToStep(3); });
  document.getElementById('backToStep1').addEventListener('click', () => goToStep(1));
  document.getElementById('backToStep2').addEventListener('click', () => goToStep(2));

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (selectedFinance.size === 0) { alert('Please select at least one finance topic.'); return; }

    const submitBtn = document.getElementById('submitProfile');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnSpinner = submitBtn.querySelector('.btn-spinner');
    submitBtn.disabled = true;
    btnText.textContent = 'Creating your profile...';
    btnSpinner.classList.remove('hidden');

    const profileData = {
      first_name: document.getElementById('firstName').value.trim(),
      last_name: document.getElementById('lastName').value.trim(),
      grade: parseInt(gradeSelect.value),
      state: stateSelect.value,
      township: townSelect.value,
      high_school: document.getElementById('highSchool').value.trim(),
      science_topics: Array.from(selectedScience),
      finance_topics: Array.from(selectedFinance),
      email: currentUser.email || '',
    };

    try {
      const res = await authFetch('/api/profile', { method: 'PUT', body: JSON.stringify(profileData) });
      if (!res.ok) { const err = await res.json().catch(() => ({})); throw new Error(err.error || 'Failed to save'); }
      const result = await res.json();
      localStorage.setItem('neuronum_profile', JSON.stringify(result.profile || profileData));
      window.location.href = 'dashboard.html';
    } catch (err) {
      console.error('Profile save error:', err);
      alert('Failed to save profile. Please try again.');
      submitBtn.disabled = false;
      btnText.textContent = 'Create My Study Plan';
      btnSpinner.classList.add('hidden');
    }
  });
});
