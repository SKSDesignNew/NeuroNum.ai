/* ═══════════════════════════════════════════
   NeuroNum.ai — AI Generation Route
   ═══════════════════════════════════════════
   POST /api/generate
   Body: { topic, topicId, subject, grade, tutor: "alpha"|"beta" }
   Returns: { notes: "..." }
   ═══════════════════════════════════════════ */

const express = require('express');
const path    = require('path');
const router  = express.Router();

// Load configurable AI agent prompts
const agentConfig = require(path.join(__dirname, '..', 'config', 'ai-agent.json'));

// ── Build prompt from config templates ──
function buildPrompt(topic, subject, grade, tutorKey) {
  const persona = agentConfig.tutor_personas[tutorKey] || agentConfig.tutor_personas.alpha;
  const subjectCtx = agentConfig.subject_context[subject] || '';

  const systemPrompt = agentConfig.system_prompt_template
    .replace(/\{\{topic\}\}/g, topic)
    .replace(/\{\{subject\}\}/g, subject)
    .replace(/\{\{grade\}\}/g, grade)
    + '\n\n' + persona.instruction
    + '\n\n' + subjectCtx;

  const userPrompt = agentConfig.user_prompt_template
    .replace(/\{\{topic\}\}/g, topic)
    .replace(/\{\{subject\}\}/g, subject)
    .replace(/\{\{grade\}\}/g, grade);

  return { systemPrompt, userPrompt };
}

// ── Call Claude (Tutor Alpha) ──
async function callClaude(systemPrompt, userPrompt) {
  const Anthropic = require('@anthropic-ai/sdk');
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const modelConf = agentConfig.model_config.alpha;

  const response = await client.messages.create({
    model: modelConf.model,
    max_tokens: modelConf.max_tokens,
    temperature: modelConf.temperature,
    system: systemPrompt,
    messages: [{ role: 'user', content: userPrompt }],
  });

  // Extract text from the response
  const textBlock = response.content.find(b => b.type === 'text');
  return textBlock?.text || '';
}

// ── Call Gemini (Tutor Beta) ──
async function callGemini(systemPrompt, userPrompt) {
  const { GoogleGenerativeAI } = require('@google/generative-ai');
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

  const modelConf = agentConfig.model_config.beta;
  const model = genAI.getGenerativeModel({
    model: modelConf.model,
    systemInstruction: systemPrompt,
  });

  const result = await model.generateContent({
    contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
    generationConfig: {
      maxOutputTokens: modelConf.max_tokens,
      temperature: modelConf.temperature,
    },
  });

  return result.response.text();
}

// ── POST /api/generate ──
router.post('/generate', async (req, res) => {
  try {
    const { topic, subject, grade, tutor } = req.body;

    // Validate input
    if (!topic || !subject || !grade || !tutor) {
      return res.status(400).json({ error: 'Missing required fields: topic, subject, grade, tutor' });
    }

    if (!['alpha', 'beta'].includes(tutor)) {
      return res.status(400).json({ error: 'tutor must be "alpha" or "beta"' });
    }

    if (!['science', 'finance'].includes(subject)) {
      return res.status(400).json({ error: 'subject must be "science" or "finance"' });
    }

    const gradeNum = parseInt(grade);
    if (gradeNum < 9 || gradeNum > 12) {
      return res.status(400).json({ error: 'grade must be between 9 and 12' });
    }

    // Build prompt from config
    const { systemPrompt, userPrompt } = buildPrompt(topic, subject, gradeNum, tutor);

    // Route to the correct AI provider
    let notes;
    if (tutor === 'alpha') {
      notes = await callClaude(systemPrompt, userPrompt);
    } else {
      notes = await callGemini(systemPrompt, userPrompt);
    }

    res.json({ notes });

  } catch (err) {
    console.error(`AI generation error (${req.body?.tutor}):`, err.message);
    res.status(500).json({
      error: 'Failed to generate study notes. Please try again.',
      detail: process.env.NODE_ENV === 'development' ? err.message : undefined,
    });
  }
});

module.exports = router;
