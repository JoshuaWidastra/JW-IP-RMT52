const express = require('express');
const moodController = require('../controllers/moodController');

const router = express.Router();

// Public routes
router.get('/analyze', moodController.analyzeMood);

// Protected routes
router.post('/journal', moodController.createJournalEntry);
router.get('/journal', moodController.getJournalEntries);
router.put('/journal/:id', moodController.updateJournalEntry);
router.delete('/journal/:id', moodController.deleteJournalEntry);

module.exports = router;