/* ═══════════════════════════════════════════
   NeuroNum.ai — AWS Cognito Auth Client
   ═══════════════════════════════════════════
   Handles Cognito Hosted UI OAuth flow,
   token storage, and authenticated API calls.
   ═══════════════════════════════════════════ */

const AUTH_CONFIG = {
  domain:      window.__ENV__?.COGNITO_DOMAIN      || 'neuronum.auth.us-east-1.amazoncognito.com',
  clientId:    window.__ENV__?.COGNITO_CLIENT_ID    || 'your-client-id',
  redirectUri: window.__ENV__?.COGNITO_REDIRECT_URI || (window.location.origin + '/auth.html'),
  logoutUri:   window.__ENV__?.COGNITO_LOGOUT_URI   || (window.location.origin + '/'),
  region:      window.__ENV__?.COGNITO_REGION       || 'us-east-1',
};

const API_BASE = window.__ENV__?.API_BASE
  || (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:3000' : '');

const TOKEN_KEY = 'neuronum_tokens';

// ── Token management ──

function storeTokens(idToken, accessToken, expiresIn) {
  const expiresAt = Date.now() + (parseInt(expiresIn) * 1000);
  const data = { idToken, accessToken, expiresAt };
  localStorage.setItem(TOKEN_KEY, JSON.stringify(data));
  return data;
}

function getTokens() {
  const raw = localStorage.getItem(TOKEN_KEY);
  if (!raw) return null;
  const tokens = JSON.parse(raw);
  // Check expiry (with 60s buffer)
  if (Date.now() > tokens.expiresAt - 60000) {
    localStorage.removeItem(TOKEN_KEY);
    return null;
  }
  return tokens;
}

function clearTokens() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem('neuronum_profile');
}

// ── Parse tokens from Cognito redirect ──

function parseHashTokens() {
  const hash = window.location.hash.substring(1);
  if (!hash) return null;
  const params = new URLSearchParams(hash);
  const idToken     = params.get('id_token');
  const accessToken = params.get('access_token');
  const expiresIn   = params.get('expires_in');
  if (idToken && accessToken) {
    // Clear hash from URL
    history.replaceState(null, '', window.location.pathname + window.location.search);
    return storeTokens(idToken, accessToken, expiresIn || '3600');
  }
  return null;
}

// ── Decode JWT payload (no verification — API Gateway handles that) ──

function decodeJwtPayload(token) {
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  const payload = parts[1].replace(/-/g, '+').replace(/_/g, '/');
  return JSON.parse(atob(payload));
}

// ── Get current user from ID token ──

function getUser() {
  const tokens = getTokens();
  if (!tokens) return null;
  const claims = decodeJwtPayload(tokens.idToken);
  if (!claims) return null;
  return {
    id: claims.sub,
    email: claims.email || '',
    name: claims.name || '',
  };
}

function isAuthenticated() {
  return getTokens() !== null;
}

function requireAuth(redirectTo = 'auth.html') {
  if (!isAuthenticated()) {
    window.location.href = redirectTo;
    return null;
  }
  return getUser();
}

// ── OAuth redirect URLs ──

function buildAuthUrl(provider) {
  const base = `https://${AUTH_CONFIG.domain}/oauth2/authorize`;
  const params = new URLSearchParams({
    response_type: 'token',
    client_id:     AUTH_CONFIG.clientId,
    redirect_uri:  AUTH_CONFIG.redirectUri,
    scope:         'openid email profile',
  });
  if (provider) {
    params.set('identity_provider', provider);
  }
  return `${base}?${params.toString()}`;
}

function loginWithGoogle() {
  window.location.href = buildAuthUrl('Google');
}

function loginWithApple() {
  window.location.href = buildAuthUrl('SignInWithApple');
}

function logout() {
  clearTokens();
  const logoutUrl = `https://${AUTH_CONFIG.domain}/logout?` +
    new URLSearchParams({
      client_id:  AUTH_CONFIG.clientId,
      logout_uri: AUTH_CONFIG.logoutUri,
    }).toString();
  window.location.href = logoutUrl;
}

// ── Authenticated API calls ──

async function authFetch(path, options = {}) {
  const tokens = getTokens();
  if (!tokens) {
    window.location.href = 'auth.html';
    throw new Error('Not authenticated');
  }
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${tokens.idToken}`,
    ...(options.headers || {}),
  };
  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  if (res.status === 401) {
    clearTokens();
    window.location.href = 'auth.html';
    throw new Error('Session expired');
  }
  return res;
}
