const express = require('express');
const router = express.Router();
const openaiService = require('../services/openaiService');

router.post('/analyze-mood', async (req, res) => {
  try {
    const { text } = req.body;
    const analysis = await openaiService.analyzeMood(text);
    res.json(analysis);
  } catch (error) {
    console.error('Error analyzing mood:', error);
    res.status(500).json({ error: 'Failed to analyze mood' });
  }
});

module.exports = router;