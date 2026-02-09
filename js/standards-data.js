/* ═══════════════════════════════════════════
   NeuroNum.ai — Academic Standards Data
   ═══════════════════════════════════════════
   Curated from NGSS, Common Core, and
   Jump$tart / CEE financial literacy standards.
   Organized by subject → grade → topics.
   ═══════════════════════════════════════════ */

const STANDARDS = {
  science: [
    {
      id: 'biology',
      name: 'Biology',
      desc: 'Life science — cells, genetics, evolution, ecology',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22c4-3 8-6 8-11a8 8 0 1 0-16 0c0 5 4 8 8 11z"/><circle cx="12" cy="11" r="3"/></svg>',
      grades: [9, 10, 11, 12],
      topics: {
        9: [
          { id: 'bio_cells',       name: 'Cell Structure & Function',   desc: 'Organelles, cell membrane, prokaryotic vs eukaryotic cells' },
          { id: 'bio_genetics9',   name: 'Introduction to Genetics',    desc: 'DNA basics, Mendelian inheritance, Punnett squares' },
          { id: 'bio_ecology',     name: 'Ecology & Ecosystems',        desc: 'Food webs, energy flow, biomes, populations' },
          { id: 'bio_evolution9',  name: 'Evolution Basics',            desc: 'Natural selection, adaptation, fossil evidence' },
          { id: 'bio_body9',       name: 'Human Body Systems',          desc: 'Organ systems overview, homeostasis, nutrition' },
          { id: 'bio_scimethod',   name: 'Scientific Method',           desc: 'Hypothesis testing, variables, data analysis' },
        ],
        10: [
          { id: 'bio_molbio',      name: 'Molecular Biology',           desc: 'DNA replication, transcription, translation, protein synthesis' },
          { id: 'bio_genetics10',  name: 'Advanced Genetics',           desc: 'Gene expression, mutations, genetic engineering' },
          { id: 'bio_evolution10', name: 'Evolution & Biodiversity',    desc: 'Speciation, phylogenetics, evidence for evolution' },
          { id: 'bio_ecology10',   name: 'Population & Community Ecology', desc: 'Population dynamics, species interactions, succession' },
          { id: 'bio_cellresp',    name: 'Cellular Respiration & Photosynthesis', desc: 'ATP, glycolysis, Krebs cycle, light reactions' },
          { id: 'bio_micro',       name: 'Microbiology & Disease',      desc: 'Bacteria, viruses, immune system, pathogens' },
        ],
        11: [
          { id: 'bio_ap_cells',    name: 'AP Cell Biology',             desc: 'Cell signaling, membrane transport, cell cycle regulation' },
          { id: 'bio_ap_genetics', name: 'AP Genetics & Biotech',       desc: 'Gene regulation, biotechnology, genomics, CRISPR' },
          { id: 'bio_ap_evolution',name: 'AP Evolution',                desc: 'Hardy-Weinberg, phylogenetics, molecular evolution' },
          { id: 'bio_ap_ecology',  name: 'AP Ecology',                  desc: 'Ecosystem dynamics, conservation biology, global change' },
          { id: 'bio_anatomy',     name: 'Anatomy & Physiology',        desc: 'Detailed organ systems, muscular, nervous, endocrine' },
          { id: 'bio_biochem',     name: 'Biochemistry Foundations',    desc: 'Macromolecules, enzymes, metabolic pathways' },
        ],
        12: [
          { id: 'bio_biochem12',   name: 'Advanced Biochemistry',       desc: 'Protein folding, enzyme kinetics, metabolism regulation' },
          { id: 'bio_biotech',     name: 'Biotechnology & Genomics',    desc: 'PCR, gel electrophoresis, gene therapy, bioinformatics' },
          { id: 'bio_neuro',       name: 'Neuroscience',                desc: 'Brain structure, neural signaling, synaptic transmission' },
          { id: 'bio_immunology',  name: 'Immunology',                  desc: 'Adaptive & innate immunity, vaccines, autoimmune disorders' },
          { id: 'bio_research',    name: 'Biological Research Methods', desc: 'Experimental design, scientific writing, literature review' },
          { id: 'bio_bioethics',   name: 'Bioethics & Current Issues',  desc: 'Genetic ethics, stem cells, environmental impact' },
        ],
      },
    },
    {
      id: 'chemistry',
      name: 'Chemistry',
      desc: 'Matter, reactions, atomic structure, thermodynamics',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3h6v6l4 8H5l4-8V3z"/><path d="M8 3h8"/><circle cx="13" cy="15" r="1"/><circle cx="10" cy="14" r="1"/></svg>',
      grades: [9, 10, 11, 12],
      topics: {
        9: [
          { id: 'chem_matter',     name: 'States of Matter',            desc: 'Solids, liquids, gases, phase changes, kinetic theory' },
          { id: 'chem_atoms9',     name: 'Atomic Structure',            desc: 'Protons, neutrons, electrons, atomic number, mass number' },
          { id: 'chem_elements',   name: 'Elements & Periodic Table',   desc: 'Groups, periods, periodic trends, element properties' },
          { id: 'chem_bonds9',     name: 'Introduction to Bonding',     desc: 'Ionic, covalent, metallic bonds; Lewis dot structures' },
          { id: 'chem_reactions9', name: 'Chemical Reactions Basics',    desc: 'Types of reactions, balancing equations, conservation of mass' },
          { id: 'chem_mixtures',   name: 'Mixtures & Solutions',        desc: 'Homogeneous vs heterogeneous, solubility, separation techniques' },
        ],
        10: [
          { id: 'chem_stoich',     name: 'Stoichiometry',               desc: 'Mole concept, molar mass, limiting reagents, percent yield' },
          { id: 'chem_gaslaw',     name: 'Gas Laws',                    desc: 'Boyle\'s, Charles\'s, Avogadro\'s, ideal gas law, STP' },
          { id: 'chem_solutions',  name: 'Solutions & Concentration',   desc: 'Molarity, dilutions, colligative properties' },
          { id: 'chem_acidbase',   name: 'Acids & Bases',               desc: 'pH scale, neutralization, buffers, titrations' },
          { id: 'chem_redox',      name: 'Oxidation-Reduction',         desc: 'Oxidation states, redox reactions, electrochemistry basics' },
          { id: 'chem_organic9',   name: 'Intro to Organic Chemistry',  desc: 'Carbon compounds, hydrocarbons, functional groups' },
        ],
        11: [
          { id: 'chem_thermo',     name: 'Thermochemistry',             desc: 'Enthalpy, Hess\'s law, calorimetry, bond energies' },
          { id: 'chem_kinetics',   name: 'Chemical Kinetics',           desc: 'Reaction rates, rate laws, activation energy, catalysts' },
          { id: 'chem_equilib',    name: 'Chemical Equilibrium',        desc: 'Le Chatelier\'s principle, Kc, Kp, equilibrium calculations' },
          { id: 'chem_electrochem',name: 'Electrochemistry',            desc: 'Galvanic cells, electrolysis, standard reduction potentials' },
          { id: 'chem_nuclear',    name: 'Nuclear Chemistry',           desc: 'Radioactive decay, half-life, fission, fusion' },
          { id: 'chem_apquant',    name: 'Quantum & Electron Config',   desc: 'Quantum numbers, orbital diagrams, electron configurations' },
        ],
        12: [
          { id: 'chem_orgadv',     name: 'Advanced Organic Chemistry',  desc: 'Reaction mechanisms, polymers, biochemical molecules' },
          { id: 'chem_analytical', name: 'Analytical Chemistry',        desc: 'Spectroscopy, chromatography, quantitative analysis' },
          { id: 'chem_materials',  name: 'Materials Science',           desc: 'Crystalline structures, alloys, nanomaterials, polymers' },
          { id: 'chem_environ',    name: 'Environmental Chemistry',     desc: 'Atmospheric chemistry, water treatment, green chemistry' },
          { id: 'chem_labadv',     name: 'Advanced Lab Techniques',     desc: 'Titrations, synthesis, spectral analysis, error analysis' },
          { id: 'chem_research',   name: 'Chemistry Research Skills',   desc: 'Scientific writing, data analysis, capstone projects' },
        ],
      },
    },
    {
      id: 'physics',
      name: 'Physics',
      desc: 'Mechanics, energy, waves, electricity, modern physics',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="2"/><ellipse cx="12" cy="12" rx="10" ry="4"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/></svg>',
      grades: [9, 10, 11, 12],
      topics: {
        9: [
          { id: 'phys_motion9',    name: 'Motion & Speed',              desc: 'Distance, displacement, speed, velocity, acceleration' },
          { id: 'phys_forces9',    name: 'Forces & Newton\'s Laws',     desc: 'Balanced/unbalanced forces, inertia, F=ma, action-reaction' },
          { id: 'phys_energy9',    name: 'Energy Fundamentals',         desc: 'Kinetic, potential, conservation of energy, work, power' },
          { id: 'phys_waves9',     name: 'Waves & Sound',               desc: 'Wave properties, frequency, amplitude, sound, Doppler effect' },
          { id: 'phys_heat9',      name: 'Heat & Temperature',          desc: 'Thermal energy transfer, conduction, convection, radiation' },
          { id: 'phys_simple',     name: 'Simple Machines',             desc: 'Levers, pulleys, inclined planes, mechanical advantage' },
        ],
        10: [
          { id: 'phys_kinematics', name: 'Kinematics',                  desc: '1D & 2D motion, projectile motion, graphing motion' },
          { id: 'phys_dynamics',   name: 'Dynamics & Forces',           desc: 'Friction, tension, normal force, free-body diagrams' },
          { id: 'phys_momentum',   name: 'Momentum & Collisions',       desc: 'Impulse, conservation of momentum, elastic/inelastic collisions' },
          { id: 'phys_circular',   name: 'Circular & Rotational Motion',desc: 'Centripetal force, torque, angular velocity, gravity' },
          { id: 'phys_workenergy', name: 'Work, Energy & Power',        desc: 'Work-energy theorem, conservation, mechanical energy' },
          { id: 'phys_fluids',     name: 'Fluids & Pressure',           desc: 'Density, pressure, buoyancy, Bernoulli\'s principle' },
        ],
        11: [
          { id: 'phys_emwaves',    name: 'Electromagnetic Waves',       desc: 'EM spectrum, light, reflection, refraction, diffraction' },
          { id: 'phys_electricity',name: 'Electricity & Circuits',      desc: 'Ohm\'s law, series/parallel circuits, resistors, capacitors' },
          { id: 'phys_magnetism',  name: 'Magnetism & Electromagnetism',desc: 'Magnetic fields, solenoids, electromagnetic induction' },
          { id: 'phys_thermo11',   name: 'Thermodynamics',              desc: 'Laws of thermodynamics, heat engines, entropy' },
          { id: 'phys_oscillations',name: 'Oscillations & Waves',       desc: 'Simple harmonic motion, pendulums, standing waves, resonance' },
          { id: 'phys_optics',     name: 'Optics',                      desc: 'Mirrors, lenses, interference, polarization' },
        ],
        12: [
          { id: 'phys_modern',     name: 'Modern Physics',              desc: 'Special relativity, quantum mechanics, photons, wave-particle duality' },
          { id: 'phys_nuclear',    name: 'Nuclear & Particle Physics',  desc: 'Nuclear forces, radioactivity, particle model, quarks' },
          { id: 'phys_apem',       name: 'AP Electricity & Magnetism',  desc: 'Gauss\'s law, Faraday\'s law, Maxwell\'s equations' },
          { id: 'phys_apmech',     name: 'AP Mechanics',                desc: 'Lagrangian, rotational dynamics, gravitational fields' },
          { id: 'phys_astro',      name: 'Astrophysics',                desc: 'Stars, galaxies, cosmology, Hubble\'s law, dark matter' },
          { id: 'phys_engineering',name: 'Engineering Physics',          desc: 'Structural analysis, materials, circuits, design process' },
        ],
      },
    },
    {
      id: 'earth_science',
      name: 'Earth & Space Science',
      desc: 'Geology, weather, climate, astronomy, natural resources',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
      grades: [9, 10, 11, 12],
      topics: {
        9: [
          { id: 'earth_plate',     name: 'Plate Tectonics',             desc: 'Tectonic plates, earthquakes, volcanoes, continental drift' },
          { id: 'earth_rocks',     name: 'Rocks & Minerals',            desc: 'Rock cycle, igneous, sedimentary, metamorphic, mineral ID' },
          { id: 'earth_weather',   name: 'Weather & Atmosphere',        desc: 'Air pressure, fronts, clouds, storms, weather forecasting' },
          { id: 'earth_water',     name: 'Water Cycle & Oceans',        desc: 'Hydrologic cycle, ocean currents, groundwater, erosion' },
          { id: 'earth_solar',     name: 'Solar System & Space',        desc: 'Planets, moon phases, eclipses, seasons, space exploration' },
          { id: 'earth_resources', name: 'Natural Resources',           desc: 'Renewable vs nonrenewable, fossil fuels, conservation' },
        ],
        10: [
          { id: 'earth_climate10', name: 'Climate Science',             desc: 'Climate zones, climate change, greenhouse effect, ice cores' },
          { id: 'earth_geologic',  name: 'Geologic Time',               desc: 'Fossils, relative/absolute dating, mass extinctions, eras' },
          { id: 'earth_oceanog',   name: 'Oceanography',                desc: 'Ocean floor, tides, salinity, marine ecosystems' },
          { id: 'earth_atmos',     name: 'Atmospheric Science',         desc: 'Layers of atmosphere, ozone, air quality, wind patterns' },
          { id: 'earth_stars',     name: 'Stars & Galaxies',            desc: 'Star life cycle, HR diagram, galaxy types, Big Bang theory' },
          { id: 'earth_mapping',   name: 'Mapping & Remote Sensing',    desc: 'Topographic maps, GIS, satellites, GPS' },
        ],
        11: [
          { id: 'earth_envgeo',    name: 'Environmental Geology',       desc: 'Natural hazards, soil science, land use, geohazards' },
          { id: 'earth_climadv',   name: 'Advanced Climate Systems',    desc: 'Climate models, paleoclimatology, feedback loops' },
          { id: 'earth_hydro',     name: 'Hydrology',                   desc: 'Watershed management, water quality, aquifers, flooding' },
          { id: 'earth_astrobio',  name: 'Astrobiology',                desc: 'Habitable zones, exoplanets, origin of life, extremophiles' },
          { id: 'earth_energy',    name: 'Energy & Sustainability',     desc: 'Solar, wind, geothermal, nuclear energy, carbon footprint' },
          { id: 'earth_gis',       name: 'GIS & Data Analysis',         desc: 'Geographic information systems, spatial data, field methods' },
        ],
        12: [
          { id: 'earth_cosmology', name: 'Cosmology',                   desc: 'Origin of universe, dark energy, cosmic microwave background' },
          { id: 'earth_planetary', name: 'Planetary Science',           desc: 'Comparative planetology, atmospheres, moons, asteroids' },
          { id: 'earth_geophys',   name: 'Geophysics',                  desc: 'Seismology, Earth\'s magnetic field, gravity anomalies' },
          { id: 'earth_climact',   name: 'Climate Action & Policy',     desc: 'Mitigation strategies, international agreements, carbon markets' },
          { id: 'earth_fieldwork', name: 'Field Research Methods',      desc: 'Rock sampling, core drilling, field mapping, lab analysis' },
          { id: 'earth_capstone',  name: 'Earth Science Capstone',      desc: 'Independent research project, scientific presentation' },
        ],
      },
    },
    {
      id: 'env_science',
      name: 'Environmental Science',
      desc: 'Ecosystems, biodiversity, sustainability, human impact',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 8C8 10 5.9 16.17 3.82 21.34L2 21l.73-2.22C4.33 14.06 6 9.4 14 7l3 1z"/><path d="M17 8l4-2-2 4"/></svg>',
      grades: [9, 10, 11, 12],
      topics: {
        9: [
          { id: 'env_intro',       name: 'Intro to Environmental Science', desc: 'What is environmental science, interdisciplinary approach' },
          { id: 'env_ecosystems9', name: 'Ecosystems & Biomes',         desc: 'Terrestrial and aquatic biomes, biodiversity' },
          { id: 'env_population',  name: 'Human Population',            desc: 'Population growth, carrying capacity, demographic transition' },
          { id: 'env_resources9',  name: 'Land & Water Resources',      desc: 'Soil, forests, freshwater, resource management' },
          { id: 'env_pollution9',  name: 'Pollution Basics',            desc: 'Air, water, soil pollution, waste management' },
          { id: 'env_footprint',   name: 'Ecological Footprint',        desc: 'Personal impact, sustainability practices, carbon footprint' },
        ],
        10: [
          { id: 'env_biodiv',      name: 'Biodiversity & Conservation', desc: 'Species diversity, threats, protected areas, conservation biology' },
          { id: 'env_water',       name: 'Water Resources & Quality',   desc: 'Water treatment, pollution, watershed management, clean water act' },
          { id: 'env_air',         name: 'Air Quality & Atmosphere',    desc: 'Air pollutants, smog, acid rain, indoor air quality' },
          { id: 'env_energy10',    name: 'Energy Sources & Use',        desc: 'Fossil fuels, renewables, energy efficiency, grid systems' },
          { id: 'env_food',        name: 'Food & Agriculture',          desc: 'Farming practices, GMOs, organic, food security' },
          { id: 'env_waste',       name: 'Waste & Recycling',           desc: 'Solid waste, recycling, composting, e-waste, circular economy' },
        ],
        11: [
          { id: 'env_climate11',   name: 'Climate Change Science',      desc: 'Greenhouse gases, evidence, models, projections, IPCC' },
          { id: 'env_toxicology',  name: 'Toxicology & Human Health',   desc: 'Environmental toxins, dose-response, bioaccumulation, risk assessment' },
          { id: 'env_policy',      name: 'Environmental Policy & Law',  desc: 'EPA, Clean Air/Water Act, NEPA, international treaties' },
          { id: 'env_marine',      name: 'Marine & Aquatic Ecology',    desc: 'Coral reefs, ocean acidification, wetlands, fisheries' },
          { id: 'env_landuse',     name: 'Land Use & Urbanization',     desc: 'Urban sprawl, smart growth, deforestation, mining' },
          { id: 'env_research',    name: 'Environmental Research',      desc: 'Field studies, data collection, environmental monitoring' },
        ],
        12: [
          { id: 'env_sustain',     name: 'Sustainability Science',      desc: 'Sustainable development goals, systems thinking, resilience' },
          { id: 'env_solutions',   name: 'Environmental Solutions',     desc: 'Green technology, remediation, restoration ecology' },
          { id: 'env_economics',   name: 'Environmental Economics',     desc: 'Ecosystem services, cost-benefit, carbon pricing, green economy' },
          { id: 'env_justice',     name: 'Environmental Justice',       desc: 'Disproportionate impact, community health, equity' },
          { id: 'env_global',      name: 'Global Environmental Issues', desc: 'Ozone depletion, deforestation, ocean plastic, species extinction' },
          { id: 'env_capstone',    name: 'AP Environmental Capstone',   desc: 'FRQ practice, data analysis, lab investigations, exam prep' },
        ],
      },
    },
  ],

  finance: [
    {
      id: 'personal_finance',
      name: 'Personal Finance',
      desc: 'Budgeting, saving, banking, and everyday money skills',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 10h20"/><path d="M6 16h4"/></svg>',
      grades: [9, 10, 11, 12],
      topics: {
        9: [
          { id: 'fin_budget',      name: 'Budgeting Basics',            desc: 'Income vs expenses, tracking spending, creating a budget' },
          { id: 'fin_saving9',     name: 'Saving Fundamentals',         desc: 'Emergency funds, savings goals, compound interest basics' },
          { id: 'fin_banking',     name: 'Banking Basics',              desc: 'Checking & savings accounts, debit cards, online banking' },
          { id: 'fin_needs',       name: 'Needs vs Wants',              desc: 'Opportunity cost, delayed gratification, spending priorities' },
          { id: 'fin_earning',     name: 'Earning Income',              desc: 'Jobs, paychecks, gross vs net pay, pay stubs, W-4' },
          { id: 'fin_consumer',    name: 'Smart Consumer Skills',       desc: 'Comparing prices, advertising tactics, avoiding scams' },
        ],
        10: [
          { id: 'fin_credit',      name: 'Credit & Debt Management',    desc: 'Credit scores, credit cards, interest rates, responsible use' },
          { id: 'fin_taxes',       name: 'Introduction to Taxes',       desc: 'Tax brackets, W-2, filing basics, deductions, refunds' },
          { id: 'fin_insurance',   name: 'Insurance Fundamentals',      desc: 'Health, auto, renters insurance, premiums, deductibles' },
          { id: 'fin_goals',       name: 'Financial Goal Setting',      desc: 'Short/medium/long-term goals, SMART goals, action plans' },
          { id: 'fin_banking10',   name: 'Advanced Banking',            desc: 'Interest rates, loan types, account management, CDs' },
          { id: 'fin_identity',    name: 'Identity & Fraud Protection', desc: 'Identity theft, phishing, protecting personal information' },
        ],
        11: [
          { id: 'fin_invest',      name: 'Investing Fundamentals',      desc: 'Stocks, bonds, mutual funds, ETFs, risk vs return' },
          { id: 'fin_stock',       name: 'Stock Market Basics',         desc: 'How markets work, reading stock charts, market indices' },
          { id: 'fin_compound',    name: 'Compound Interest & Growth',  desc: 'Time value of money, Rule of 72, growth calculations' },
          { id: 'fin_retirement',  name: 'Retirement Planning',         desc: '401(k), IRA, Roth IRA, employer matching, early saving' },
          { id: 'fin_risk',        name: 'Risk Management',             desc: 'Diversification, asset allocation, risk tolerance' },
          { id: 'fin_satmath',     name: 'SAT Math — Finance Questions',desc: 'Percent, interest, data problems, financial word problems' },
        ],
        12: [
          { id: 'fin_college',     name: 'College Finance',             desc: 'FAFSA, scholarships, student loans, tuition planning' },
          { id: 'fin_taxadv',      name: 'Advanced Tax Planning',       desc: 'Tax credits, withholding, estimated taxes, W-4 strategy' },
          { id: 'fin_realestate',  name: 'Real Estate Basics',          desc: 'Renting vs buying, mortgages, closing costs, leases' },
          { id: 'fin_adulting',    name: 'Adulting Finance',            desc: 'First apartment costs, utilities, credit building, car buying' },
          { id: 'fin_crypto',      name: 'Crypto & Fintech',            desc: 'Digital assets, fintech tools, risks, blockchain basics' },
          { id: 'fin_planning',    name: 'Financial Life Plan',         desc: 'Net worth, estate basics, career income projections' },
        ],
      },
    },
    {
      id: 'economics',
      name: 'Economics',
      desc: 'Micro & macro economics, markets, policy',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',
      grades: [10, 11, 12],
      topics: {
        10: [
          { id: 'econ_supply',     name: 'Supply & Demand',             desc: 'Market equilibrium, price changes, elasticity basics' },
          { id: 'econ_market',     name: 'Market Structures',           desc: 'Competition, monopoly, oligopoly, market efficiency' },
          { id: 'econ_gdp',        name: 'GDP & Economic Indicators',   desc: 'GDP, unemployment rate, inflation, CPI' },
          { id: 'econ_money',      name: 'Money & Banking System',      desc: 'Federal Reserve, money supply, interest rates' },
          { id: 'econ_trade',      name: 'International Trade',         desc: 'Imports, exports, tariffs, comparative advantage' },
          { id: 'econ_government', name: 'Government & Economy',        desc: 'Fiscal policy, national debt, government spending' },
        ],
        11: [
          { id: 'econ_micro',      name: 'Microeconomics',              desc: 'Consumer choice, production costs, profit maximization' },
          { id: 'econ_macro',      name: 'Macroeconomics',              desc: 'Business cycles, aggregate demand/supply, economic growth' },
          { id: 'econ_monetary',   name: 'Monetary Policy',             desc: 'Fed tools, open market operations, reserve requirements' },
          { id: 'econ_fiscal',     name: 'Fiscal Policy',               desc: 'Taxation, government spending, budget deficits, multiplier' },
          { id: 'econ_labor',      name: 'Labor Economics',             desc: 'Wages, labor market, unions, minimum wage, human capital' },
          { id: 'econ_global',     name: 'Global Economics',            desc: 'Exchange rates, balance of payments, trade agreements' },
        ],
        12: [
          { id: 'econ_behavioral', name: 'Behavioral Economics',        desc: 'Decision biases, nudges, rational choice theory' },
          { id: 'econ_develop',    name: 'Economic Development',        desc: 'Developing nations, inequality, foreign aid, HDI' },
          { id: 'econ_finance',    name: 'Financial Markets',           desc: 'Capital markets, bond markets, derivatives, market regulation' },
          { id: 'econ_policy',     name: 'Economic Policy Analysis',    desc: 'Policy evaluation, cost-benefit, unintended consequences' },
          { id: 'econ_entrepren',  name: 'Entrepreneurship & Innovation',desc: 'Business models, startups, venture capital, disruption' },
          { id: 'econ_current',    name: 'Current Economic Issues',     desc: 'Inflation, recession, cryptocurrency, AI impact on economy' },
        ],
      },
    },
    {
      id: 'investing',
      name: 'Investing & Wealth Building',
      desc: 'Stocks, portfolio strategy, long-term wealth',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>',
      grades: [11, 12],
      topics: {
        11: [
          { id: 'inv_stockfund',   name: 'Stock Fundamentals',          desc: 'How stocks work, share price, dividends, market cap' },
          { id: 'inv_bonds',       name: 'Bonds & Fixed Income',        desc: 'Bond types, coupon rate, yield, credit ratings' },
          { id: 'inv_mutualfunds', name: 'Mutual Funds & ETFs',         desc: 'Index funds, expense ratios, NAV, diversification' },
          { id: 'inv_portfolio',   name: 'Portfolio Basics',            desc: 'Asset allocation, rebalancing, dollar-cost averaging' },
          { id: 'inv_reading',     name: 'Reading Financial Statements',desc: 'Income statement, balance sheet, cash flow, P/E ratio' },
          { id: 'inv_simulation',  name: 'Stock Market Simulation',     desc: 'Paper trading, mock portfolio, tracking performance' },
        ],
        12: [
          { id: 'inv_advanced',    name: 'Advanced Investing',          desc: 'Options basics, REITs, commodities, alternative investments' },
          { id: 'inv_analysis',    name: 'Fundamental Analysis',        desc: 'Company valuation, earnings, growth metrics, moat analysis' },
          { id: 'inv_technical',   name: 'Technical Analysis Intro',    desc: 'Charts, trends, moving averages, volume, support/resistance' },
          { id: 'inv_tax',         name: 'Investment Taxation',         desc: 'Capital gains, tax-loss harvesting, tax-advantaged accounts' },
          { id: 'inv_strategy',    name: 'Investment Strategy',         desc: 'Value vs growth, passive vs active, long-term compounding' },
          { id: 'inv_global',      name: 'Global Investing',            desc: 'International markets, emerging markets, currency risk, ADRs' },
        ],
      },
    },
    {
      id: 'entrepreneurship',
      name: 'Entrepreneurship',
      desc: 'Business planning, startups, revenue, leadership',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>',
      grades: [11, 12],
      topics: {
        11: [
          { id: 'ent_idea',        name: 'Business Ideas & Opportunity',desc: 'Identifying problems, market gaps, ideation, validation' },
          { id: 'ent_plan',        name: 'Business Plan Basics',        desc: 'Executive summary, market analysis, financial projections' },
          { id: 'ent_marketing',   name: 'Marketing Fundamentals',      desc: 'Target market, 4Ps, branding, social media marketing' },
          { id: 'ent_revenue',     name: 'Revenue & Pricing',           desc: 'Revenue models, pricing strategy, break-even analysis' },
          { id: 'ent_legal',       name: 'Business Structure & Legal',  desc: 'LLC, sole proprietorship, corporation, permits, IP basics' },
          { id: 'ent_pitch',       name: 'Pitching & Communication',    desc: 'Elevator pitch, presentation skills, storytelling' },
        ],
        12: [
          { id: 'ent_finance',     name: 'Startup Finance',             desc: 'Bootstrapping, angel investors, VC, crowdfunding' },
          { id: 'ent_operations',  name: 'Operations & Scaling',        desc: 'Supply chain, inventory, hiring, process optimization' },
          { id: 'ent_digital',     name: 'Digital Business & E-commerce',desc: 'Online business, SaaS, dropshipping, digital products' },
          { id: 'ent_leadership',  name: 'Leadership & Management',     desc: 'Team building, delegation, decision-making, culture' },
          { id: 'ent_accounting',  name: 'Accounting for Startups',     desc: 'Bookkeeping, P&L, cash flow management, tax obligations' },
          { id: 'ent_capstone',    name: 'Startup Capstone Project',    desc: 'Build a real or simulated business, present to judges' },
        ],
      },
    },
  ],
};

/**
 * Get all subjects available for a given grade, across both categories.
 * @param {number} grade — 9, 10, 11, or 12
 * @returns {Array<{id, name, desc, icon, category, topics}>}
 */
function getSubjectsForGrade(grade) {
  const subjects = [];
  ['science', 'finance'].forEach(category => {
    (STANDARDS[category] || []).forEach(subj => {
      if (subj.grades.includes(grade)) {
        subjects.push({
          id: subj.id,
          name: subj.name,
          desc: subj.desc,
          icon: subj.icon,
          category,
          topics: subj.topics[grade] || [],
        });
      }
    });
  });
  return subjects;
}
