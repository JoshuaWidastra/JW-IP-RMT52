const axios = require('axios');
const { getLyrics, getSong } = require('genius-lyrics-api');

const analyzeMood = async (req, res) => {
  try {
    const { artist, title } = req.query;

    if (!artist || !title) {
      return res.status(400).json({ error: 'Artist and title are required' });
    }


    const options = {
      apiKey: process.env.GENIUS_API_KEY,
      title: title,
      artist: artist,
      optimizeQuery: true
    };

    const lyrics = await getLyrics(options);

    if (!lyrics) {
      return res.status(404).json({ error: 'Lyrics not found' });
    }


    res.status(200).json({ mood: 'neutral', confidence: 0.7, lyrics: lyrics });
  } catch (error) {
    console.error('Error analyzing mood:', error);
    res.status(500).json({ error: 'An error occurred while analyzing mood' });
  }
};

const createJournalEntry = async (req, res) => {
  try {

    res.status(201).json({ message: 'Journal entry created successfully', id: 'placeholder-id' });
  } catch (error) {
    console.error('Error creating journal entry:', error);
    res.status(500).json({ error: 'An error occurred while creating the journal entry' });
  }
};

const getJournalEntries = async (req, res) => {
  try {

    res.status(200).json([
      { id: 'entry-1', mood: 'happy', date: new Date().toISOString() },
      { id: 'entry-2', mood: 'sad', date: new Date(Date.now() - 86400000).toISOString() },
    ]);
  } catch (error) {
    console.error('Error fetching journal entries:', error);
    res.status(500).json({ error: 'An error occurred while fetching journal entries' });
  }
};

const updateJournalEntry = async (req, res) => {
  try {

    res.status(200).json({ message: 'Journal entry updated successfully', id: req.params.id });
  } catch (error) {
    console.error('Error updating journal entry:', error);
    res.status(500).json({ error: 'An error occurred while updating the journal entry' });
  }
};

const deleteJournalEntry = async (req, res) => {
  try {
    res.status(200).json({ message: 'Journal entry deleted successfully', id: req.params.id });
  } catch (error) {
    console.error('Error deleting journal entry:', error);
    res.status(500).json({ error: 'An error occurred while deleting the journal entry' });
  }
};

module.exports = {
  analyzeMood,
  createJournalEntry,
  getJournalEntries,
  updateJournalEntry,
  deleteJournalEntry,
};