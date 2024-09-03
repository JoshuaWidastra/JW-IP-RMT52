import React, { useState } from 'react';

const moodToGenreMap = {
  'Happy': ['pop', 'dance', 'funk', 'disco'],
  'Sad': ['blues', 'acoustic', 'soul', 'ballad'],
  'Energetic': ['rock', 'electronic', 'punk', 'hardcore', 'drum and bass'],
  'Calm': ['classical', 'ambient', 'new age', 'instrumental jazz', 'instrumental'],
  'Angry': ['metal', 'punk', 'hard rock', 'industrial'],
  'Relaxed': ['jazz', 'lounge', 'bossa nova', 'smooth jazz', 'instrumental'],
  'Excited': ['edm', 'party', 'house', 'techno'],
  'Anxious': ['indie', 'alternative', 'post-rock', 'shoegaze'],
  'Confident': ['hip-hop', 'r-n-b', 'trap', 'rap'],
  'Melancholic': ['folk', 'indie', 'alt-country', 'slowcore'],
  'Romantic': ['love songs', 'soft rock', 'acoustic pop', 'smooth soul'],
  'Nostalgic': ['retro', 'vintage pop', 'classic rock', 'synthwave'],
  'Inspiring': ['epic', 'orchestral', 'anthemic pop', 'uplifting trance', 'cinematic instrumentals'],
  'Reflective': ['singer-songwriter', 'piano', 'neo-classical', 'ambient folk', 'instrumental'],
  'Determined': ['electronic rock', 'drumline', 'power metal', 'epic orchestral'],
  'Joyful': ['gospel', 'happy hardcore', 'calypso', 'reggae'],
  'Adventurous': ['world music', 'latin', 'afrobeat', 'ethnic fusion', 'instrumental rock'],
  'Playful': ['kids', 'novelty', 'chiptune', 'ska'],
  'Lonely': ['slow ballads', 'downtempo', 'lo-fi', 'dream pop', 'instrumental']
};

const MoodInput = ({ onMoodSubmit }) => {
  const [selectedMood, setSelectedMood] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedMood) {
      onMoodSubmit({ mood: selectedMood, genres: moodToGenreMap[selectedMood] });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>How are you feeling?</h2>
      <select 
        value={selectedMood} 
        onChange={(e) => setSelectedMood(e.target.value)}
        required
      >
        <option value="">Select a mood</option>
        {Object.keys(moodToGenreMap).map((mood) => (
          <option key={mood} value={mood}>{mood}</option>
        ))}
      </select>
      <button type="submit">Get Playlist</button>
    </form>
  );
};

export default MoodInput;