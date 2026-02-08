/* ═══════════════════════════════════════════
   NeuroNum.ai — Express Server
   ═══════════════════════════════════════════ */

require('dotenv').config();

const express = require('express');
const cors    = require('cors');
const path    = require('path');
const aiRoute = require('./routes/ai');

const app  = express();
const PORT = process.env.PORT || 3000;

// ── Middleware ──
app.use(cors());
app.use(express.json());

// ── Static files (serve frontend) ──
app.use(express.static(path.join(__dirname, '..')));

// ── API Routes ──
app.use('/api', aiRoute);

// ── Health check ──
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ── Fallback to index.html for SPA-like behavior ──
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

// ── Start ──
app.listen(PORT, () => {
  console.log(`NeuroNum.ai server running on http://localhost:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
