/* ═══════════════════════════════════════════
   NeuroNum.ai — Environment Configuration
   ═══════════════════════════════════════════
   Overwritten by Amplify build. Edit for local dev.
   ═══════════════════════════════════════════ */

window.__ENV__ = {
  COGNITO_DOMAIN:       'neuronum.auth.us-east-1.amazoncognito.com',
  COGNITO_CLIENT_ID:    'your-cognito-client-id',
  COGNITO_REDIRECT_URI: 'http://localhost:3000/auth.html',
  COGNITO_LOGOUT_URI:   'http://localhost:3000/',
  COGNITO_REGION:       'us-east-1',
  API_BASE:             'http://localhost:3000',
};
