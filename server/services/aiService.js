require('dotenv').config();

const azureRestAi = require('@azure-rest/ai-inference');
const { AzureKeyCredential } = require('@azure/core-auth');

const ModelClient = azureRestAi.default || azureRestAi;
const { isUnexpected } = azureRestAi;

const githubToken = process.env.GITHUB_TOKEN;
const githubEndpoint = process.env.GITHUB_ENDPOINT || 'https://models.github.ai/inference';
const githubModel = process.env.GITHUB_MODEL || 'gpt-4o';

if (!githubToken) {
  throw new Error('Missing AI API key. Set GITHUB_TOKEN in server/.env.');
}

const client = ModelClient(githubEndpoint, new AzureKeyCredential(githubToken));

const SYSTEM_PROMPT = `You are MediGuide, a knowledgeable medical information assistant. Your role is to provide clear, accurate, general health and medication information.

IMPORTANT RULES:
1. NEVER diagnose conditions or prescribe medications
2. ALWAYS recommend consulting a qualified healthcare professional
3. Provide general educational information only
4. Use clear, accessible language (avoid excessive jargon)
5. Always include a disclaimer at the end

RESPONSE FORMAT:
Structure your response in this exact JSON format:
{
  "overview": "Brief, clear summary of the topic (2-3 sentences)",
  "possibleCauses": ["cause 1", "cause 2", "cause 3"],
  "generalAdvice": ["advice 1", "advice 2", "advice 3"],
  "warningSigns": ["warning sign 1", "warning sign 2"],
  "disclaimer": "This information is for general educational purposes only and should not be considered medical advice. Always consult a qualified healthcare professional before making any health decisions."
}

If asked about drug interactions, dosages, or specific medical conditions, provide factual, educational information while emphasizing the need for professional guidance.

Keep responses concise and helpful. Focus on evidence-based information.`;

const parseStructuredResponse = (rawText) => {
  try {
    const jsonMatch = rawText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
  } catch (err) {
    return null;
  }
  return null;
};

const getAIResponseText = async (message, conversationHistory = []) => {
  const messages = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...conversationHistory.slice(-10),
    { role: 'user', content: message.trim() }
  ];

  const response = await client.path('/chat/completions').post({
    body: {
      model: githubModel,
      messages
    }
  });

  if (isUnexpected(response)) {
    const errorBody = response.body?.error || response.body;
    const errorMessage = errorBody?.message || JSON.stringify(errorBody);
    throw new Error(`GitHub inference request failed: ${errorMessage}`);
  }

  return response.body?.choices?.[0]?.message?.content || '';
};

const chat = async (message, conversationHistory = []) => {
  if (!message || message.trim().length === 0) {
    throw new Error('Message cannot be empty');
  }

  const rawText = await getAIResponseText(message, conversationHistory);
  const parsed = parseStructuredResponse(rawText);

  if (parsed) {
    return {
      ...parsed,
      raw: rawText,
      disclaimer: parsed.disclaimer || 'This information is for general educational purposes only. Always consult a qualified healthcare professional.'
    };
  }

  return {
    overview: rawText,
    possibleCauses: [],
    generalAdvice: [],
    warningSigns: [],
    disclaimer: 'This information is for general educational purposes only and is not a substitute for professional medical advice. Always consult a qualified healthcare provider.',
    raw: rawText
  };
};

module.exports = { chat };
