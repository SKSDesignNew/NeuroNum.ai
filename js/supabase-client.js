/* ═══════════════════════════════════════════
   NeuroNum.ai — Supabase Client
   ═══════════════════════════════════════════
   Loads the Supabase JS library from CDN and
   initializes the client with project credentials.
   ═══════════════════════════════════════════ */

const SUPABASE_URL  = window.__ENV__?.SUPABASE_URL  || 'https://your-project.supabase.co';
const SUPABASE_ANON = window.__ENV__?.SUPABASE_ANON || 'your-anon-key';

let supabase = null;

async function initSupabase() {
  if (supabase) return supabase;

  // Load Supabase JS from CDN if not already loaded
  if (!window.supabase?.createClient) {
    await new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js';
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON);
  return supabase;
}

async function getSession() {
  const sb = await initSupabase();
  const { data: { session } } = await sb.auth.getSession();
  return session;
}

async function getUser() {
  const session = await getSession();
  return session?.user ?? null;
}

async function requireAuth(redirectTo = 'auth.html') {
  const user = await getUser();
  if (!user) {
    window.location.href = redirectTo;
    return null;
  }
  return user;
}
