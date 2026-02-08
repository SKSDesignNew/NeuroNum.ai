-- ═══════════════════════════════════════════
-- NeuroNum.ai — Supabase Database Schema
-- ═══════════════════════════════════════════
-- Run this in your Supabase SQL Editor to set up the database.

-- ── Profiles table ──
CREATE TABLE IF NOT EXISTS profiles (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email       TEXT,
  first_name  TEXT NOT NULL,
  last_name   TEXT NOT NULL,
  grade       SMALLINT NOT NULL CHECK (grade BETWEEN 9 AND 12),
  state       VARCHAR(2) NOT NULL,
  township    TEXT NOT NULL,
  high_school TEXT NOT NULL,
  science_topics TEXT[] NOT NULL DEFAULT '{}',
  finance_topics TEXT[] NOT NULL DEFAULT '{}',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ── Study sessions table (tracks AI note generations) ──
CREATE TABLE IF NOT EXISTS study_sessions (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  topic_id    TEXT NOT NULL,
  topic_name  TEXT NOT NULL,
  subject     TEXT NOT NULL CHECK (subject IN ('science', 'finance')),
  grade       SMALLINT NOT NULL,
  tutor       TEXT NOT NULL CHECK (tutor IN ('alpha', 'beta')),
  notes       TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ── Indexes ──
CREATE INDEX IF NOT EXISTS idx_profiles_grade ON profiles(grade);
CREATE INDEX IF NOT EXISTS idx_profiles_state ON profiles(state);
CREATE INDEX IF NOT EXISTS idx_sessions_user  ON study_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_topic ON study_sessions(topic_id);

-- ── Row Level Security ──
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE study_sessions ENABLE ROW LEVEL SECURITY;

-- Users can read and update their own profile
CREATE POLICY profiles_select ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY profiles_insert ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY profiles_update ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Users can manage their own study sessions
CREATE POLICY sessions_select ON study_sessions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY sessions_insert ON study_sessions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ── Updated_at trigger ──
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
