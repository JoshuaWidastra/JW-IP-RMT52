import React, { useState } from 'react';

const MoodInput = ({ onMoodSubmit }) => {
  const [mood, setMood] = useState('');
  const [intensity, setIntensity] = useState(5);

  const handleSubmit = (e) => {
    e.preventDefault();
    onMoodSubmit({ mood, intensity });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>How are you feeling?</h2>
      <input
        type="text"
        value={mood}
        onChange={(e) => setMood(e.target.value)}
        placeholder="Enter your mood (e.g., happy, sad, excited)"
        required
      />
      <label>
        Intensity:
        <input
          type="range"
          min="1"
          max="10"
          value={intensity}
          onChange={(e) => setIntensity(Number(e.target.value))}
        />
        {intensity}
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default MoodInput;