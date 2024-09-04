import axios from 'axios';

const OPENAI_API_URL = 'https://api.openai.com/v1/engines/davinci-codex/completions';

export const analyzeLyrics = async (tracks) => {
  const lyrics = tracks.map((track) => track.lyrics).join('\n');

  try {
    const response = await axios.post(
      OPENAI_API_URL,
      {
        prompt: `Analyze the mood of the following lyrics:\n${lyrics}\n\nMood:`,
        max_tokens: 10,
        n: 1,
        stop: null,
        temperature: 0.7,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );
    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error('Error analyzing lyrics:', error);
    return '';
  }
};