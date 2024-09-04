import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

function MoodJournal() {
  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState('');
  const [mood, setMood] = useState('neutral');
  const user = useSelector(state => state.auth.user);

  useEffect(() => {
    // Fetch mood journal entries from the backend
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/mood-journal', {
        headers: {
          'Authorization': `Bearer ${user.token}`,
        },
      });
      const data = await response.json();
      setEntries(data);
    } catch (error) {
      console.error('Error fetching mood journal entries:', error);
    }
  };

  const addEntry = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/mood-journal', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: newEntry, mood }),
      });
      const data = await response.json();
      setEntries([...entries, data]);
      setNewEntry('');
      setMood('neutral');
    } catch (error) {
      console.error('Error adding mood journal entry:', error);
    }
  };

  return (
    <div>
      <h2>Mood Journal</h2>
      <div>
        <textarea
          value={newEntry}
          onChange={(e) => setNewEntry(e.target.value)}
          placeholder="How are you feeling today?"
        />
        <select value={mood} onChange={(e) => setMood(e.target.value)}>
          <option value="happy">Happy</option>
          <option value="sad">Sad</option>
          <option value="angry">Angry</option>
          <option value="neutral">Neutral</option>
        </select>
        <button onClick={addEntry}>Add Entry</button>
      </div>
      <div>
        {entries.map((entry, index) => (
          <div key={index}>
            <p>{entry.content}</p>
            <p>Mood: {entry.mood}</p>
            <p>Date: {new Date(entry.createdAt).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MoodJournal;