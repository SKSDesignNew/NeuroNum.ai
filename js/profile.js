/* ═══════════════════════════════════════════
   NeuroNum.ai — Multi-Step Profile Form
   ═══════════════════════════════════════════ */

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

  // ── DOM refs ──
  const form = document.getElementById('profileForm');
  const steps = document.querySelectorAll('.form-step');
  const progSteps = document.querySelectorAll('.progress-step');
  const progFill = document.getElementById('progressFill');
  let currentStep = 1;

  const stateSelect = document.getElementById('state');
  const gradeSelect = document.getElementById('grade');
  const schoolSearch = document.getElementById('schoolSearch');
  const schoolResults = document.getElementById('schoolResults');
  const hiddenSchool = document.getElementById('highSchool');
  const hiddenTownship = document.getElementById('township');
  const selectedSchoolEl = document.getElementById('selectedSchool');
  let searchTimeout = null;

  // ── Subject & topic selection state ──
  // { subjectId: Set([topicId, topicId, ...]) }
  const selectedTopics = {};

  // ── Modal refs ──
  const topicModal = document.getElementById('topicModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalTopics = document.getElementById('modalTopics');
  const modalCount = document.getElementById('modalCount');
  const modalClose = document.getElementById('modalClose');
  const modalDone = document.getElementById('modalDone');
  let activeModalSubject = null;

  // ══════════════════════════════════════
  //  STEP 1 — Personal Info
  // ══════════════════════════════════════

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

  // ══════════════════════════════════════
  //  STEP 2 — Subject & Topic Selection
  // ══════════════════════════════════════

  function renderSubjects() {
    const grade = parseInt(gradeSelect.value);
    if (!grade) return;

    const subjects = getSubjectsForGrade(grade);
    const scienceGrid = document.getElementById('scienceSubjects');
    const financeGrid = document.getElementById('financeSubjects');
    scienceGrid.innerHTML = '';
    financeGrid.innerHTML = '';

    document.getElementById('subjectsLegend').textContent = `Subjects — ${grade}th Grade`;

    subjects.forEach(subj => {
      const grid = subj.category === 'science' ? scienceGrid : financeGrid;
      const topicCount = (selectedTopics[subj.id] || new Set()).size;

      const card = document.createElement('div');
      card.className = `subject-card ${subj.category === 'finance' ? 'subject-card--finance' : ''}`;
      if (topicCount > 0) card.classList.add('has-topics');
      card.dataset.subject = subj.id;

      card.innerHTML = `
        <div class="subject-icon">${subj.icon}</div>
        <div class="subject-info">
          <h4>${subj.name}</h4>
          <p>${subj.desc}</p>
        </div>
        <div class="subject-badge ${topicCount > 0 ? 'visible' : ''}">${topicCount} topic${topicCount !== 1 ? 's' : ''}</div>
        <div class="subject-arrow">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        </div>
      `;

      card.addEventListener('click', () => openTopicModal(subj));
      grid.appendChild(card);
    });
  }

  // ══════════════════════════════════════
  //  Topic Modal
  // ══════════════════════════════════════

  function openTopicModal(subj) {
    activeModalSubject = subj;
    if (!selectedTopics[subj.id]) selectedTopics[subj.id] = new Set();
    const selected = selectedTopics[subj.id];

    modalTitle.textContent = subj.name;
    modalDesc.textContent = `Select the ${subj.name.toLowerCase()} topics you want AI-generated study notes for.`;
    modalTopics.innerHTML = '';

    subj.topics.forEach(topic => {
      const item = document.createElement('div');
      item.className = 'topic-card';
      if (selected.has(topic.id)) item.classList.add('selected');
      if (subj.category === 'finance') item.classList.add('finance-topic');

      item.innerHTML = `
        <div class="topic-check">
          <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <div class="topic-info">
          <h4>${topic.name}</h4>
          <p>${topic.desc}</p>
        </div>
      `;

      item.addEventListener('click', () => {
        if (selected.has(topic.id)) {
          selected.delete(topic.id);
          item.classList.remove('selected');
        } else {
          selected.add(topic.id);
          item.classList.add('selected');
        }
        updateModalCount();
      });

      modalTopics.appendChild(item);
    });

    updateModalCount();
    topicModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function updateModalCount() {
    if (!activeModalSubject) return;
    const count = (selectedTopics[activeModalSubject.id] || new Set()).size;
    modalCount.textContent = `${count} topic${count !== 1 ? 's' : ''} selected`;
  }

  function closeTopicModal() {
    topicModal.classList.remove('open');
    document.body.style.overflow = '';
    activeModalSubject = null;
    // Re-render subject cards to update badge counts
    renderSubjects();
  }

  modalClose.addEventListener('click', closeTopicModal);
  modalDone.addEventListener('click', closeTopicModal);
  topicModal.addEventListener('click', (e) => {
    if (e.target === topicModal) closeTopicModal();
  });

  // ══════════════════════════════════════
  //  Navigation & Validation
  // ══════════════════════════════════════

  function goToStep(step) {
    steps.forEach(s => s.classList.remove('active'));
    progSteps.forEach(s => {
      const n = parseInt(s.dataset.step);
      s.classList.remove('active', 'completed');
      if (n < step) s.classList.add('completed');
      if (n === step) s.classList.add('active');
    });
    document.getElementById(`step${step}`).classList.add('active');
    progFill.style.width = `${((step - 1) / 1) * 100}%`;
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
        if (!group.querySelector('.error-text')) {
          const err = document.createElement('div');
          err.className = 'error-text';
          err.textContent = 'This field is required';
          group.appendChild(err);
        }
        valid = false;
      } else {
        group.classList.remove('has-error');
        const err = group.querySelector('.error-text');
        if (err) err.remove();
      }
    });
    // Validate school selection
    if (!hiddenSchool.value) {
      const group = schoolSearch.closest('.form-group');
      group.classList.add('has-error');
      if (!group.querySelector('.error-text')) {
        const err = document.createElement('div');
        err.className = 'error-text';
        err.textContent = 'Please search and select your school';
        group.appendChild(err);
      }
      valid = false;
    } else {
      const group = schoolSearch.closest('.form-group');
      group.classList.remove('has-error');
      const err = group.querySelector('.error-text');
      if (err) err.remove();
    }
    return valid;
  }

  function getTotalSelectedTopics() {
    let total = 0;
    Object.values(selectedTopics).forEach(set => { total += set.size; });
    return total;
  }

  // ── Helper: build profile data from form ──
  function buildProfileData() {
    // Build a clean map: { subjectId: [topicId, ...] }
    const topics = {};
    Object.entries(selectedTopics).forEach(([subjId, topicSet]) => {
      if (topicSet.size > 0) topics[subjId] = Array.from(topicSet);
    });

    return {
      first_name: document.getElementById('firstName').value.trim(),
      last_name: document.getElementById('lastName').value.trim(),
      grade: parseInt(gradeSelect.value),
      state: stateSelect.value,
      township: hiddenTownship.value,
      high_school: hiddenSchool.value,
      selected_topics: topics,
      email: currentUser.email || '',
    };
  }

  // ── Save profile to DynamoDB ──
  async function saveProfileToDb(data) {
    try {
      const res = await authFetch('/api/profile', { method: 'PUT', body: JSON.stringify(data) });
      if (res.ok) {
        const result = await res.json();
        localStorage.setItem('neuronum_profile', JSON.stringify(result.profile || data));
        return true;
      }
    } catch (e) {
      console.warn('Profile save error (will retry on final step):', e);
    }
    // Save locally even if API fails
    localStorage.setItem('neuronum_profile', JSON.stringify(data));
    return false;
  }

  // ══════════════════════════════════════
  //  Button Handlers
  // ══════════════════════════════════════

  document.getElementById('toStep2').addEventListener('click', async () => {
    if (!validateStep1()) return;
    renderSubjects();
    // Save personal info to DB
    const data = buildProfileData();
    saveProfileToDb(data);
    goToStep(2);
  });

  document.getElementById('backToStep1').addEventListener('click', () => goToStep(1));

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (getTotalSelectedTopics() === 0) {
      alert('Please select at least one topic from any subject.');
      return;
    }

    const submitBtn = document.getElementById('submitProfile');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnSpinner = submitBtn.querySelector('.btn-spinner');
    submitBtn.disabled = true;
    btnText.textContent = 'Creating your study plan...';
    btnSpinner.classList.remove('hidden');

    const profileData = buildProfileData();

    try {
      const saved = await saveProfileToDb(profileData);
      if (!saved) console.warn('API save failed, but profile stored locally');
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
