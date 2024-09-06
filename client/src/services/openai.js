import axios from 'axios';

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

const openai = axios.create({
  baseURL: OPENAI_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`
  }
});

export const analyzeMood = async (tracks) => {
  console.log('Analyzing mood for tracks:', tracks);
  
  const trackInfo = tracks.map(track => `${track.title} by ${track.artist}`).join(', ');
  
  const prompt = `Analyze the mood of this playlist: ${trackInfo}. Provide a concise summary (max 200 words) of the overall mood and emotional tone of these songs. Also, categorize each song into one of these moods: Happy, Sad, Energetic, Calm, Romantic, Angry.`;

  try {
    console.log('Sending request to OpenAI API');
    const response = await openai.post('', {
      model: "gpt-3.5-turbo",
      messages: [{"role": "user", "content": prompt}],
      max_tokens: 300 // make sure it diplay enough characters
    });

    const moodAnalysis = response.data.choices[0].message.content.trim();
    console.log('OpenAI mood analysis:', moodAnalysis);
    return moodAnalysis;
  } catch (error) {
    console.error('Error analyzing mood:', error);
    if (error.response) {
      console.error('OpenAI API response:', error.response.data);
      if (error.response.status === 429) {
        throw new Error('OpenAI API rate limit exceeded. Please try again later.');
      } else {
        throw new Error(`OpenAI API error: ${error.response.data.error.message}`);
      }
    }
    throw new Error('Failed to analyze mood. Please try again later.');
  }
};