const express = require('express');
const router = express.Router();

// mock data
let mockTracks = [
  { id: '1', title: 'Test Track 1', artist: 'Test Artist 1' },
  { id: '2', title: 'Test Track 2', artist: 'Test Artist 2' },
];

const mockUsers = [
  { id: '1', username: 'testuser', password: 'password123' },
];

// middleware to check authentication
const checkAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    if (token === 'mock-token') {
      return next();
    }
  }
  res.status(401).json({ message: 'Unauthorized' });
};

// helper function to reset mock data
router.resetMockData = () => {
  mockTracks = [
    { id: '1', title: 'Test Track 1', artist: 'Test Artist 1' },
    { id: '2', title: 'Test Track 2', artist: 'Test Artist 2' },
  ];
};

// helper function to clear mock data
router.clearMockData = () => {
  mockTracks = [];
};

// GET /api/tracks
router.get('/api/tracks', checkAuth, (req, res) => {
  res.status(200).json(mockTracks);
});

// POST /api/playlist
router.post('/api/playlist', checkAuth, (req, res) => {
  const { name, tracks } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'Name is required' });
  }
  res.status(201).json({ id: '1', name, tracks });
});

// GET /api/mood-analysis
router.get('/api/mood-analysis', checkAuth, (req, res) => {
  const { tracks } = req.query;
  if (!tracks) {
    return res.status(400).json({ message: 'Tracks are required' });
  }
  res.status(200).json({ mood: 'Happy' });
});

// POST /api/register
router.post('/api/register', (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  res.status(201).json({ message: 'User registered successfully' });
});

// POST /api/login
router.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = mockUsers.find(u => u.username === username && u.password === password);
  if (user) {
    res.status(200).json({ token: 'mock-token' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

module.exports = router;