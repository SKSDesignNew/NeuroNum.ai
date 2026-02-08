/* ═══════════════════════════════════════════
   NeuroNum.ai — Environment Configuration
   ═══════════════════════════════════════════
   This file is overwritten during Amplify build
   with actual environment variable values.
   For local development, edit the values below.
   ═══════════════════════════════════════════ */

window.__ENV__ = {
  SUPABASE_URL:  'https://your-project.supabase.co',
  SUPABASE_ANON: 'your-anon-key',
  API_BASE:      'http://localhost:3000',         // Local dev: Express server
  // API_BASE:   'https://your-api-id.execute-api.us-east-1.amazonaws.com/prod',  // Production: API Gateway
};
