/* ═══════════════════════════════════════════
   NeuroNum.ai — Authentication Page Logic
   ═══════════════════════════════════════════
   Handles Cognito Hosted UI OAuth redirect
   and login button clicks.
   ═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
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

  // ── Check for Cognito redirect tokens in URL hash ──
  const tokens = parseHashTokens();
  if (tokens) {
    // Tokens received from Cognito — redirect to profile
    redirectAfterAuth();
    return;
  }

  // ── Already logged in? ──
  if (isAuthenticated()) {
    redirectAfterAuth();
    return;
  }

  // ── Google OAuth button ──
  document.getElementById('btnGoogle').addEventListener('click', () => {
    loginWithGoogle();
  });

  // ── Email sign-up/login button ──
  document.getElementById('btnEmail').addEventListener('click', () => {
    loginWithEmail();
  });
});

async function redirectAfterAuth() {
  // Check if profile already exists
  try {
    const res = await authFetch('/api/profile');
    if (res.ok) {
      // Profile exists — go to dashboard
      const data = await res.json();
      localStorage.setItem('neuronum_profile', JSON.stringify(data));
      window.location.href = 'dashboard.html';
      return;
    }
  } catch (e) {
    // Profile doesn't exist or API not reachable — go to profile form
  }
  window.location.href = 'profile.html';
}

function showMessage(text, type = 'error') {
  const card = document.getElementById('authCard');
  card.querySelectorAll('.auth-message').forEach(el => el.remove());
  const msg = document.createElement('div');
  msg.className = `auth-message auth-message--${type}`;
  msg.textContent = text;
  card.querySelector('.auth-header').after(msg);
  setTimeout(() => msg.remove(), 5000);
}
