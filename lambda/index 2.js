/* ═══════════════════════════════════════════
   NeuroNum.ai — Lambda Handler
   ═══════════════════════════════════════════
   Wraps the AI generation logic as an AWS
   Lambda function behind API Gateway.
   ═══════════════════════════════════════════ */

const agentConfig = require('./config/ai-agent.json');

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

// ── CORS headers ──
function corsHeaders(origin) {
  const allowed = process.env.ALLOWED_ORIGIN || '*';
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };
}

// ── Lambda handler ──
exports.handler = async (event) => {
  const headers = corsHeaders();

  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS' || event.requestContext?.http?.method === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    const body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
    const { topic, subject, grade, tutor } = body;

    // Validate
    if (!topic || !subject || !grade || !tutor) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing required fields: topic, subject, grade, tutor' }),
      };
    }

    if (!['alpha', 'beta'].includes(tutor)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'tutor must be "alpha" or "beta"' }),
      };
    }

    if (!['science', 'finance'].includes(subject)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'subject must be "science" or "finance"' }),
      };
    }

    const gradeNum = parseInt(grade);
    if (gradeNum < 9 || gradeNum > 12) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'grade must be between 9 and 12' }),
      };
    }

    // Build prompt and call the appropriate AI
    const { systemPrompt, userPrompt } = buildPrompt(topic, subject, gradeNum, tutor);

    let notes;
    if (tutor === 'alpha') {
      notes = await callClaude(systemPrompt, userPrompt);
    } else {
      notes = await callGemini(systemPrompt, userPrompt);
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ notes }),
    };

  } catch (err) {
    console.error('Lambda AI generation error:', err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to generate study notes. Please try again.' }),
    };
  }
};
