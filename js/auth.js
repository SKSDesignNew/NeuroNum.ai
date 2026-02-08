/* ═══════════════════════════════════════════
   NeuroNum.ai — Authentication Logic
   ═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', async () => {
  const sb = await initSupabase();
  const params = new URLSearchParams(window.location.search);
  const mode = params.get('mode') || 'signup';

  const titleEl    = document.getElementById('authTitle');
  const subtitleEl = document.getElementById('authSubtitle');
  const switchEl   = document.getElementById('authSwitch');

  if (mode === 'signup') {
    titleEl.textContent = 'Create Your Account';
    subtitleEl.textContent = 'Sign up to start your personalized learning journey';
    switchEl.innerHTML = 'Already have an account? <a href="auth.html">Log in</a>';
  } else {
    titleEl.textContent = 'Welcome Back';
    subtitleEl.textContent = 'Log in to continue your learning journey';
    switchEl.innerHTML = 'Don\'t have an account? <a href="auth.html?mode=signup">Sign up</a>';
  }

  // Check if already logged in
  const session = await getSession();
  if (session) {
    redirectAfterAuth();
    return;
  }

  // Listen for auth state changes (handles OAuth redirect)
  sb.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_IN' && session) {
      redirectAfterAuth();
    }
  });

  // ── Google OAuth ──
  document.getElementById('btnGoogle').addEventListener('click', async () => {
    const { error } = await sb.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin + '/profile.html'
      }
    });
    if (error) showMessage(error.message, 'error');
  });

  // ── Apple OAuth ──
  document.getElementById('btnApple').addEventListener('click', async () => {
    const { error } = await sb.auth.signInWithOAuth({
      provider: 'apple',
      options: {
        redirectTo: window.location.origin + '/profile.html'
      }
    });
    if (error) showMessage(error.message, 'error');
  });
});

function redirectAfterAuth() {
  // Check if profile exists, if not go to profile form
  window.location.href = 'profile.html';
}

function showMessage(text, type = 'error') {
  const card = document.getElementById('authCard');
  // Remove existing messages
  card.querySelectorAll('.auth-message').forEach(el => el.remove());

  const msg = document.createElement('div');
  msg.className = `auth-message auth-message--${type}`;
  msg.textContent = text;
  card.querySelector('.auth-header').after(msg);

  setTimeout(() => msg.remove(), 5000);
}
