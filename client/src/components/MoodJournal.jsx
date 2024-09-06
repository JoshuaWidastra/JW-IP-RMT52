import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';

function MoodJournal() {
  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState({ mood: '', reflection: '' });
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchEntries();
      } else {
        setEntries([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchEntries = () => {
    const storedEntries = localStorage.getItem('moodEntries');
    if (storedEntries) {
      setEntries(JSON.parse(storedEntries));
    }
  };

  const saveEntries = (updatedEntries) => {
    localStorage.setItem('moodEntries', JSON.stringify(updatedEntries));
    setEntries(updatedEntries);
  };

  const addEntry = (e) => {
    e.preventDefault();
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('User not authenticated');

      const newEntryWithId = {
        id: Date.now().toString(),
        ...newEntry,
        userId: user.uid,
        createdAt: new Date().toISOString()
      };
      const updatedEntries = [...entries, newEntryWithId];
      saveEntries(updatedEntries);
      setNewEntry({ mood: '', reflection: '' });
    } catch (err) {
      console.error('Error adding entry:', err);
      setError('Failed to add entry. Please try again later.');
    }
  };

  const updateEntry = (id, updatedEntry) => {
    try {
      const updatedEntries = entries.map(entry => 
        entry.id === id ? { ...entry, ...updatedEntry } : entry
      );
      saveEntries(updatedEntries);
    } catch (err) {
      console.error('Error updating entry:', err);
      setError('Failed to update entry. Please try again later.');
    }
  };

  const deleteEntry = (id) => {
    try {
      const updatedEntries = entries.filter(entry => entry.id !== id);
      saveEntries(updatedEntries);
    } catch (err) {
      console.error('Error deleting entry:', err);
      setError('Failed to delete entry. Please try again later.');
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Mood Journal</h2>
      <form onSubmit={addEntry}>
        <input
          type="text"
          placeholder="Mood"
          value={newEntry.mood}
          onChange={(e) => setNewEntry({ ...newEntry, mood: e.target.value })}
        />
        <textarea
          placeholder="Reflection"
          value={newEntry.reflection}
          onChange={(e) => setNewEntry({ ...newEntry, reflection: e.target.value })}
        />
        <button type="submit">Add Entry</button>
      </form>
      <ul>
        {entries.map(entry => (
          <li key={entry.id}>
            <strong>{entry.mood}</strong>: {entry.reflection}
            <button onClick={() => updateEntry(entry.id, { ...entry, mood: 'Updated Mood' })}>Update</button>
            <button onClick={() => deleteEntry(entry.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MoodJournal;