import axios from 'axios';

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
console.log('OpenAI API Key (first 5 chars):', apiKey.substring(0, 5));

const openai = axios.create({
  baseURL: OPENAI_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`
  }
});

export const analyzeMood = async (tracks) => {
  console.log('Analyzing mood for tracks:', tracks);
  
  const trackInfo = tracks.map(track => {
    const lyricsExcerpt = track.lyrics ? track.lyrics.substring(0, 200) + '...' : 'Lyrics not available';
    return `${track.title} by ${track.artist}. Lyrics excerpt: ${lyricsExcerpt}`;
  }).join('\n\n');
  
  const prompt = `Analyze the mood of this playlist, considering both the song titles and available lyrics:\n\n${trackInfo}\n\nProvide a concise summary (max 300 words) of the overall mood and emotional tone of these songs. Also, categorize each song into one of these moods: Happy, Sad, Energetic, Calm, Romantic, Angry.`;

  try {
    console.log('Sending request to OpenAI API');
    const response = await openai.post('', {
      model: "gpt-3.5-turbo",
      messages: [{"role": "user", "content": prompt}],
      max_tokens: 500  // increased limit to accommodate lyrics analysis
    });

    console.log('OpenAI response:', response.data);
    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error analyzing mood:', error);
    if (error.response) {
      console.error('OpenAI API response:', error.response.data);
      if (error.response.status === 401) {
        throw new Error('OpenAI API key is invalid. Please check your API key.');
      } else if (error.response.status === 429) {
        throw new Error('OpenAI API rate limit exceeded. Please try again later.');
      } else if (error.response.data && error.response.data.error) {
        throw new Error(`OpenAI API error: ${error.response.data.error.message}`);
      }
    }
    throw new Error('Failed to analyze mood. Please try again later.');
  }
};