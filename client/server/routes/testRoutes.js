const express = require('express');
const { authenticateUser } = require('../middleware/auth');
const router = express.Router();

// router.get('/', (req, res) => {
//     res.json({ message: 'API is working correctly without authentication' });
// });


router.get('/', authenticateUser, (req, res) => {
    res.json({ message: 'API is working correctly', user: req.user });
});

router.get('/test', authenticateUser, (req, res) => {
    res.json({ message: 'API is working correctly at /test', user: req.user });
});

module.exports = router;
