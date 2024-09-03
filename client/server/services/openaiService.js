const OpenAI = require('openai');
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function analyzeText(text) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant that analyzes the mood and sentiment of text." },
        { role: "user", content: `Analyze the mood and sentiment of the following text: "${text}"` }
      ],
      max_tokens: 150
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error analyzing text with OpenAI:', error);
    throw error;
  }
}

module.exports = {
  analyzeText
};