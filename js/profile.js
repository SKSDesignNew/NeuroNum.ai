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

// ── US States + School Townships/Districts (representative sample) ──
const STATE_TOWNSHIPS = {
  'AL': { name: 'Alabama', townships: ['Birmingham City Schools','Huntsville City Schools','Mobile County Schools','Montgomery County Schools','Tuscaloosa City Schools','Jefferson County Schools'] },
  'AK': { name: 'Alaska', townships: ['Anchorage School District','Fairbanks North Star Borough','Matanuska-Susitna Borough','Juneau Borough Schools','Kenai Peninsula Borough'] },
  'AZ': { name: 'Arizona', townships: ['Mesa Unified','Chandler Unified','Gilbert Unified','Scottsdale Unified','Tucson Unified','Phoenix Union High School District','Tempe Union High School District'] },
  'AR': { name: 'Arkansas', townships: ['Little Rock School District','Bentonville Schools','Springdale School District','Rogers School District','Fort Smith Public Schools'] },
  'CA': { name: 'California', townships: ['Los Angeles Unified','San Diego Unified','San Francisco Unified','Fresno Unified','Long Beach Unified','Oakland Unified','Sacramento City Unified','San Jose Unified','Irvine Unified'] },
  'CO': { name: 'Colorado', townships: ['Denver Public Schools','Douglas County Schools','Jefferson County Schools','Cherry Creek Schools','Boulder Valley School District','Aurora Public Schools'] },
  'CT': { name: 'Connecticut', townships: ['Hartford Public Schools','New Haven Public Schools','Fairfield Public Schools','Stamford Public Schools','Greenwich Public Schools','Bridgeport Public Schools'] },
  'DE': { name: 'Delaware', townships: ['Christina School District','Red Clay Consolidated','Brandywine School District','Colonial School District','Cape Henlopen School District'] },
  'FL': { name: 'Florida', townships: ['Miami-Dade County Schools','Broward County Schools','Hillsborough County Schools','Orange County Schools','Palm Beach County Schools','Duval County Schools','Pinellas County Schools'] },
  'GA': { name: 'Georgia', townships: ['Atlanta Public Schools','Gwinnett County Schools','Cobb County Schools','DeKalb County Schools','Fulton County Schools','Cherokee County Schools'] },
  'HI': { name: 'Hawaii', townships: ['Hawaii Department of Education (Statewide)'] },
  'ID': { name: 'Idaho', townships: ['Boise Independent District','West Ada School District','Nampa School District','Idaho Falls District','Pocatello/Chubbuck District'] },
  'IL': { name: 'Illinois', townships: ['Chicago Public Schools','Naperville CUSD 203','Indian Prairie CUSD 204','Rockford Public Schools','Springfield District 186','Peoria Public Schools'] },
  'IN': { name: 'Indiana', townships: ['Indianapolis Public Schools','Fort Wayne Community Schools','Evansville-Vanderburgh Schools','Carmel Clay Schools','Hamilton Southeastern Schools'] },
  'IA': { name: 'Iowa', townships: ['Des Moines Public Schools','Cedar Rapids Community SD','Iowa City Community SD','Davenport Community SD','West Des Moines Community SD'] },
  'KS': { name: 'Kansas', townships: ['Wichita Public Schools','Shawnee Mission SD','Blue Valley Schools','Olathe Public Schools','Lawrence Public Schools'] },
  'KY': { name: 'Kentucky', townships: ['Jefferson County Public Schools','Fayette County Schools','Kenton County Schools','Boone County Schools','Hardin County Schools'] },
  'LA': { name: 'Louisiana', townships: ['East Baton Rouge Parish Schools','Jefferson Parish Schools','Orleans Parish Schools','St. Tammany Parish Schools','Caddo Parish Schools'] },
  'ME': { name: 'Maine', townships: ['Portland Public Schools','Lewiston Public Schools','Bangor School Department','South Portland Schools','Scarborough Schools'] },
  'MD': { name: 'Maryland', townships: ['Montgomery County Public Schools','Prince George\'s County Schools','Baltimore County Schools','Anne Arundel County Schools','Howard County Schools'] },
  'MA': { name: 'Massachusetts', townships: ['Boston Public Schools','Worcester Public Schools','Springfield Public Schools','Cambridge Public Schools','Newton Public Schools','Brookline Public Schools'] },
  'MI': { name: 'Michigan', townships: ['Detroit Public Schools','Ann Arbor Public Schools','Grand Rapids Public Schools','Dearborn Public Schools','Troy School District','Novi Community Schools'] },
  'MN': { name: 'Minnesota', townships: ['Minneapolis Public Schools','St. Paul Public Schools','Anoka-Hennepin Schools','Rosemount-Apple Valley-Eagan','Minnetonka Public Schools','Eden Prairie Schools'] },
  'MS': { name: 'Mississippi', townships: ['Jackson Public Schools','DeSoto County Schools','Rankin County Schools','Madison County Schools','Gulfport School District'] },
  'MO': { name: 'Missouri', townships: ['St. Louis Public Schools','Kansas City Public Schools','Springfield Public Schools','Columbia Public Schools','Rockwood R-VI School District'] },
  'MT': { name: 'Montana', townships: ['Billings Public Schools','Missoula County Schools','Great Falls Public Schools','Helena Public Schools','Bozeman Public Schools'] },
  'NE': { name: 'Nebraska', townships: ['Omaha Public Schools','Lincoln Public Schools','Millard Public Schools','Bellevue Public Schools','Elkhorn Public Schools'] },
  'NV': { name: 'Nevada', townships: ['Clark County School District','Washoe County School District','Carson City School District','Elko County School District'] },
  'NH': { name: 'New Hampshire', townships: ['Manchester School District','Nashua School District','Concord School District','Dover School District','Salem School District'] },
  'NJ': { name: 'New Jersey', townships: ['Newark Public Schools','Jersey City Public Schools','Edison Township Schools','Toms River Regional Schools','Cherry Hill Public Schools','Montclair Public Schools','Princeton Public Schools','Westfield Public Schools'] },
  'NM': { name: 'New Mexico', townships: ['Albuquerque Public Schools','Las Cruces Public Schools','Santa Fe Public Schools','Rio Rancho Public Schools','Gadsden Independent Schools'] },
  'NY': { name: 'New York', townships: ['New York City DOE','Buffalo Public Schools','Rochester City Schools','Yonkers Public Schools','Syracuse City Schools','Long Island Schools','Westchester County Schools'] },
  'NC': { name: 'North Carolina', townships: ['Charlotte-Mecklenburg Schools','Wake County Schools','Guilford County Schools','Durham Public Schools','Forsyth County Schools','Cumberland County Schools'] },
  'ND': { name: 'North Dakota', townships: ['Fargo Public Schools','Bismarck Public Schools','Grand Forks Public Schools','West Fargo Public Schools','Minot Public Schools'] },
  'OH': { name: 'Ohio', townships: ['Columbus City Schools','Cleveland Metropolitan SD','Cincinnati Public Schools','Dublin City Schools','Lakota Local Schools','Olentangy Local Schools'] },
  'OK': { name: 'Oklahoma', townships: ['Oklahoma City Public Schools','Tulsa Public Schools','Edmond Public Schools','Norman Public Schools','Broken Arrow Public Schools'] },
  'OR': { name: 'Oregon', townships: ['Portland Public Schools','Salem-Keizer School District','Beaverton School District','Eugene School District 4J','Hillsboro School District'] },
  'PA': { name: 'Pennsylvania', townships: ['Philadelphia City Schools','Pittsburgh Public Schools','Lower Merion School District','Central Bucks School District','North Penn School District','State College Area SD'] },
  'RI': { name: 'Rhode Island', townships: ['Providence Public Schools','Cranston Public Schools','Warwick Public Schools','East Greenwich Schools','Barrington Public Schools'] },
  'SC': { name: 'South Carolina', townships: ['Greenville County Schools','Charleston County Schools','Richland School District','Horry County Schools','Lexington County Schools'] },
  'SD': { name: 'South Dakota', townships: ['Sioux Falls School District','Rapid City Area Schools','Aberdeen School District','Brandon Valley School District','Harrisburg School District'] },
  'TN': { name: 'Tennessee', townships: ['Metro Nashville Public Schools','Shelby County Schools','Knox County Schools','Hamilton County Schools','Williamson County Schools','Rutherford County Schools'] },
  'TX': { name: 'Texas', townships: ['Houston ISD','Dallas ISD','Austin ISD','San Antonio ISD','Fort Worth ISD','Plano ISD','Frisco ISD','Katy ISD','Round Rock ISD'] },
  'UT': { name: 'Utah', townships: ['Granite School District','Davis School District','Jordan School District','Alpine School District','Canyons School District'] },
  'VT': { name: 'Vermont', townships: ['Burlington School District','Rutland City Schools','South Burlington Schools','Essex Westford School District','Brattleboro Schools'] },
  'VA': { name: 'Virginia', townships: ['Fairfax County Public Schools','Loudoun County Schools','Prince William County Schools','Virginia Beach City Schools','Henrico County Schools','Chesterfield County Schools'] },
  'WA': { name: 'Washington', townships: ['Seattle Public Schools','Spokane Public Schools','Tacoma Public Schools','Kent School District','Lake Washington School District','Bellevue School District'] },
  'WV': { name: 'West Virginia', townships: ['Kanawha County Schools','Cabell County Schools','Berkeley County Schools','Monongalia County Schools','Wood County Schools'] },
  'WI': { name: 'Wisconsin', townships: ['Milwaukee Public Schools','Madison Metropolitan SD','Green Bay Area Schools','Kenosha Unified SD','Racine Unified SD','Waukesha School District'] },
  'WY': { name: 'Wyoming', townships: ['Laramie County School District','Natrona County Schools','Sweetwater County SD','Fremont County School District','Campbell County Schools'] },
  'DC': { name: 'Washington D.C.', townships: ['DC Public Schools','DC Public Charter Schools'] },
};

// ═══════════════════════════════════════════
// Form logic
// ═══════════════════════════════════════════

document.addEventListener('DOMContentLoaded', async () => {
  // Check auth (allow bypass for dev)
  let currentUser = null;
  try {
    currentUser = await getUser();
  } catch (e) {
    console.warn('Supabase not configured — running in demo mode');
  }

  const form      = document.getElementById('profileForm');
  const steps     = document.querySelectorAll('.form-step');
  const progSteps = document.querySelectorAll('.progress-step');
  const progFill  = document.getElementById('progressFill');
  let currentStep = 1;

  // ── Populate state dropdown ──
  const stateSelect = document.getElementById('state');
  const townSelect  = document.getElementById('township');

  Object.entries(STATE_TOWNSHIPS)
    .sort((a, b) => a[1].name.localeCompare(b[1].name))
    .forEach(([code, data]) => {
      const opt = document.createElement('option');
      opt.value = code;
      opt.textContent = data.name;
      stateSelect.appendChild(opt);
    });

  // ── State → Township cascade ──
  stateSelect.addEventListener('change', () => {
    const code = stateSelect.value;
    townSelect.innerHTML = '<option value="">Select township / district</option>';
    if (code && STATE_TOWNSHIPS[code]) {
      townSelect.disabled = false;
      STATE_TOWNSHIPS[code].townships.forEach(t => {
        const opt = document.createElement('option');
        opt.value = t;
        opt.textContent = t;
        townSelect.appendChild(opt);
      });
    } else {
      townSelect.disabled = true;
    }
  });

  // ── Grade → Topics ──
  const gradeSelect     = document.getElementById('grade');
  const scienceGrid     = document.getElementById('scienceTopics');
  const financeGrid     = document.getElementById('financeTopics');
  const scienceLegend   = document.getElementById('scienceLegend');
  const financeLegend   = document.getElementById('financeLegend');

  let selectedScience = new Set();
  let selectedFinance = new Set();

  function renderTopics(grid, topics, selectedSet, cssClass = '') {
    grid.innerHTML = '';
    topics.forEach(topic => {
      const card = document.createElement('div');
      card.className = `topic-card ${cssClass}`;
      card.dataset.id = topic.id;
      if (selectedSet.has(topic.id)) card.classList.add('selected');

      card.innerHTML = `
        <div class="topic-check">
          <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <div class="topic-info">
          <h4>${topic.name}</h4>
          <p>${topic.desc}</p>
        </div>
      `;

      card.addEventListener('click', () => {
        if (selectedSet.has(topic.id)) {
          selectedSet.delete(topic.id);
          card.classList.remove('selected');
        } else {
          selectedSet.add(topic.id);
          card.classList.add('selected');
        }
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

  // ── Step navigation ──
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

  // Validate step 1
  function validateStep1() {
    const fields = ['firstName', 'lastName', 'grade', 'state', 'township', 'highSchool'];
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
    return valid;
  }

  document.getElementById('toStep2').addEventListener('click', () => {
    if (!validateStep1()) return;
    updateTopicsForGrade();
    goToStep(2);
  });

  document.getElementById('toStep3').addEventListener('click', () => {
    if (selectedScience.size === 0) {
      alert('Please select at least one science topic to improve on.');
      return;
    }
    goToStep(3);
  });

  document.getElementById('backToStep1').addEventListener('click', () => goToStep(1));
  document.getElementById('backToStep2').addEventListener('click', () => goToStep(2));

  // ── Submit ──
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (selectedFinance.size === 0) {
      alert('Please select at least one finance topic to improve on.');
      return;
    }

    const submitBtn  = document.getElementById('submitProfile');
    const btnText    = submitBtn.querySelector('.btn-text');
    const btnSpinner = submitBtn.querySelector('.btn-spinner');

    submitBtn.disabled = true;
    btnText.textContent = 'Creating your profile...';
    btnSpinner.classList.remove('hidden');

    const profile = {
      first_name:      document.getElementById('firstName').value.trim(),
      last_name:       document.getElementById('lastName').value.trim(),
      grade:           parseInt(gradeSelect.value),
      state:           stateSelect.value,
      township:        townSelect.value,
      high_school:     document.getElementById('highSchool').value.trim(),
      science_topics:  Array.from(selectedScience),
      finance_topics:  Array.from(selectedFinance),
    };

    try {
      const sb = await initSupabase();
      const user = await getUser();

      if (user) {
        // Save to Supabase
        const { error } = await sb
          .from('profiles')
          .upsert({
            id: user.id,
            email: user.email,
            ...profile,
            updated_at: new Date().toISOString(),
          });

        if (error) throw error;
      } else {
        // Demo mode: store in localStorage
        localStorage.setItem('neuronum_profile', JSON.stringify(profile));
      }

      // Redirect to dashboard
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
