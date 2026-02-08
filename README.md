# NeuroNum.ai

Adaptive AI tutoring platform for high school students (grades 9-12) focused on **Science** and **Financial Literacy**.

## Features

- **Adaptive Learning Pathways** — AI adjusts to each student's skill level
- **Dual AI Tutors** — Side-by-side study notes from two independent AI perspectives
- **SAT/ACT Prep** — Smart drills targeting weak spots
- **Parent & Teacher Dashboards** — Real-time progress tracking
- **Multi-step Profile** — Grade-appropriate topics for Science and Finance

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | HTML, CSS, Vanilla JS |
| Backend | Node.js, Express |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth (Google & Apple OAuth) |
| AI — Tutor Alpha | Anthropic Claude API |
| AI — Tutor Beta | Google Gemini Pro API |

## Project Structure

```
NeuroNum.ai/
├── index.html              # Landing page (split Science / Finance layout)
├── auth.html               # Authentication (Google & Apple OAuth)
├── profile.html            # Multi-step profile form
├── dashboard.html          # Study notes dashboard (dual AI side-by-side)
├── css/
│   ├── style.css           # Global styles + landing page
│   ├── auth.css            # Auth page styles
│   ├── profile.css         # Profile form styles
│   └── dashboard.css       # Dashboard styles
├── js/
│   ├── main.js             # Landing page interactions
│   ├── supabase-client.js  # Supabase initialization
│   ├── auth.js             # OAuth authentication logic
│   ├── profile.js          # Multi-step form + topic selection
│   └── dashboard.js        # Dashboard + AI note generation
├── server/
│   ├── server.js           # Express server
│   ├── routes/
│   │   └── ai.js           # AI generation endpoint
│   └── config/
│       └── ai-agent.json   # Configurable AI prompt templates
├── supabase/
│   └── schema.sql          # Database schema + RLS policies
├── package.json
├── .env.example
└── .gitignore
```

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy `.env.example` to `.env` and fill in your keys:

```bash
cp .env.example .env
```

Required keys:
- `SUPABASE_URL` — Your Supabase project URL
- `SUPABASE_ANON_KEY` — Supabase anon/public key
- `ANTHROPIC_API_KEY` — Anthropic API key (for Tutor Alpha)
- `GEMINI_API_KEY` — Google Gemini API key (for Tutor Beta)

### 3. Set up Supabase

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Run `supabase/schema.sql` in the SQL Editor to create tables
3. Enable Google and Apple OAuth in Authentication > Providers
4. Update `js/supabase-client.js` with your project URL and anon key (or inject via `window.__ENV__`)

### 4. Run the server

```bash
npm start
```

The app will be available at `http://localhost:3000`.

### Development mode (with auto-restart)

```bash
npm run dev
```

## AI Agent Configuration

Prompt templates are fully configurable via `server/config/ai-agent.json`. You can modify:

- **System prompts** — Controls the AI tutor's behavior and expertise
- **User prompts** — Template for the study note generation request
- **Tutor personas** — Alpha (analytical) vs Beta (creative) styles
- **Model settings** — Model names, temperature, max tokens
- **Subject context** — Additional context for science vs finance topics

## User Flow

1. **Landing Page** → Split layout showcasing Science and Finance tracks
2. **Create Account** → Google or Apple OAuth via Supabase
3. **Profile Form** → 3-step form: personal info, science topics, finance topics
4. **Dashboard** → Select a topic, generate study notes from two AI tutors side-by-side
