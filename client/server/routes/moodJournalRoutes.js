const express = require('express');
const router = express.Router();
const moodJournalService = require('../services/moodJournalService');
const { authenticateUser } = require('../middleware/auth');

router.get('/', authenticateUser, async (req, res) => {
  try {
    const entries = await moodJournalService.getEntries(req.user.id);
    res.json(entries);
  } catch (error) {
    console.error('Error fetching mood journal entries:', error);
    res.status(500).json({ error: 'Failed to fetch mood journal entries' });
  }
});

router.post('/', authenticateUser, async (req, res) => {
  try {
    const { content } = req.body;
    const entry = await moodJournalService.createEntry(req.user.id, content);
    res.json(entry);
  } catch (error) {
    console.error('Error creating mood journal entry:', error);
    res.status(500).json({ error: 'Failed to create mood journal entry' });
  }
});

router.put('/:id', authenticateUser, async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const updatedEntry = await moodJournalService.updateEntry(req.user.id, id, content);
    res.json(updatedEntry);
  } catch (error) {
    console.error('Error updating mood journal entry:', error);
    res.status(500).json({ error: 'Failed to update mood journal entry' });
  }
});

router.delete('/:id', authenticateUser, async (req, res) => {
  try {
    const { id } = req.params;
    await moodJournalService.deleteEntry(req.user.id, id);
    res.json({ message: 'Entry deleted successfully' });
  } catch (error) {
    console.error('Error deleting mood journal entry:', error);
    res.status(500).json({ error: 'Failed to delete mood journal entry' });
  }
});

module.exports = router;