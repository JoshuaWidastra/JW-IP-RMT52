// const express = require('express');
// const cors = require('cors');
// const admin = require('./firebase');
// const spotifyService = require('./services/spotifyService');
// const openaiService = require('./services/openaiService');
// const geniusService = require('./services/geniusService');
// const playlistService = require('./services/playlistService');
// require('dotenv').config();

// const app = express();

// app.use(cors());
// app.use(express.json());

// const PORT = process.env.PORT || 3000;

// const authenticateUser = async (req, res, next) => {
//     const { authorization } = req.headers;

//     if (!authorization || !authorization.startsWith('Bearer ')) {
//         return res.status(401).json({ error: 'Unauthorized' });
//     }

//     const token = authorization.split('Bearer ')[1];

//     try {
//         const decodedToken = await admin.auth().verifyIdToken(token);
//         req.user = decodedToken;
//         next();
//     } catch (error) {
//         console.error('Error verifying Firebase ID token:', error);
//         return res.status(401).json({ error: 'Unauthorized' });
//     }
// };

// app.get('/', (req, res) => {
//     res.json({ message: 'Welcome to MoodMix API' });
// });

// app.get('/api/test', authenticateUser, (req, res) => {
//     res.json({ message: 'API is working correctly', user: req.user });
// });

// app.get('/api/spotify/auth-url', (req, res) => {
//     const authUrl = spotifyService.getAuthorizationUrl();
//     res.json({ authUrl });
// });

// app.get('/api/spotify/login', (req, res) => {
//     res.redirect(spotifyService.getAuthorizationUrl());
// });

// // app.get('/api/spotify/callback', async (req, res) => {
// //     try {
// //       const { code } = req.query;
// //       console.log('Received code:', code);  // check code
// //       const data = await spotifyService.handleCallback(code);
// //       res.json(data);
// //     } catch (error) {
// //       console.error('Detailed error in Spotify callback:', error);
// //       res.status(500).json({ error: 'Authentication failed', details: error.message });
// //     }
// //   });

// app.get('/api/spotify/callback', async (req, res) => {
//     try {
//         const { code } = req.query;
//         console.log('Received code in callback:', code);
//         const data = await spotifyService.handleCallback(code);
//         res.json(data);
//     } catch (error) {
//         console.error('Error in Spotify callback:', error.message);
//         res.status(500).json({ error: 'Authentication failed', details: error.message });
//     }
// });


// app.get('/api/spotify/search', async (req, res) => {
//     try {
//         const { query } = req.query;
//         const tracks = await spotifyService.searchTracks(query);
//         res.json(tracks);
//     } catch (error) {
//         console.error('Error searching tracks:', error);
//         res.status(500).json({ error: 'Failed to search tracks' });
//     }
// });

// app.post('/api/spotify/create-playlist', async (req, res) => {
//     try {
//         const { userId, name, description } = req.body;
//         const playlist = await spotifyService.createPlaylist(userId, name, description);
//         res.json(playlist);
//     } catch (error) {
//         console.error('Error creating playlist:', error);
//         res.status(500).json({ error: 'Failed to create playlist' });
//     }
// });

// app.post('/api/test-openai', authenticateUser, async (req, res) => {
//     try {
//         const { text } = req.body;
//         const analysis = await openaiService.analyzeText(text);
//         res.json({ analysis });
//     } catch (error) {
//         console.error('Error in OpenAI test:', error);
//         res.status(500).json({ error: 'Failed to analyze text' });
//     }
// });

// app.get('/api/test-genius', authenticateUser, async (req, res) => {
//     try {
//         const { title, artist } = req.query;
//         const songInfo = await geniusService.fetchSongInfo(title, artist);
//         const lyrics = await geniusService.fetchLyrics(title, artist);
//         res.json({ songInfo, lyrics });
//     } catch (error) {
//         console.error('Error in Genius test:', error);
//         res.status(500).json({ error: 'Failed to fetch song information' });
//     }
// });

// app.post('/api/generate-playlist', authenticateUser, async (req, res) => {
//     try {
//         const { mood, genres } = req.body;
//         const playlist = await playlistService.generatePlaylistForMood(mood, genres);
//         res.json(playlist);
//     } catch (error) {
//         console.error('Error generating playlist:', error);
//         res.status(500).json({ error: 'Failed to generate playlist' });
//     }
// });


// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

// module.exports = app;




// // add genius later -- debug spotify -- DONE 
// const express = require('express');
// const cors = require('cors');
// const spotifyService = require('./services/spotifyService');
// require('dotenv').config();

// const app = express();

// app.use(cors());
// app.use(express.json());

// const PORT = process.env.PORT || 3000;

// // simple cache to store recently used authorization codes
// const usedAuthCodes = new Set();

// app.get('/', (req, res) => {
//   res.json({ message: 'Welcome to MoodMix API' });
// });

// app.get('/api/spotify/auth-url', (req, res) => {
//   const authUrl = spotifyService.getAuthorizationUrl();
//   res.json({ authUrl });
// });

// app.get('/api/spotify/callback', async (req, res) => {
//   try {
//     const { code } = req.query;
//     console.log('Received code in callback:', code);

//     // check if the code has been used before
//     if (usedAuthCodes.has(code)) {
//       throw new Error('Authorization code has already been used');
//     }

//     // add the code to the set of used codes
//     usedAuthCodes.add(code);

//     const data = await spotifyService.handleCallback(code);

//     // optionally, remove old codes from the set to prevent it from growing indefinitely
//     setTimeout(() => usedAuthCodes.delete(code), 60000); // remove after 1 minute

//     res.json(data);
//   } catch (error) {
//     console.error('Error in Spotify callback:', error.message);
//     res.status(500).json({ error: 'Authentication failed', details: error.message });
//   }
// });

// app.get('/api/spotify/search', async (req, res) => {
//   try {
//     const { query } = req.query;
//     const tracks = await spotifyService.searchTracks(query);
//     res.json(tracks);
//   } catch (error) {
//     console.error('Error searching tracks:', error);
//     res.status(500).json({ error: 'Failed to search tracks' });
//   }
// });

// app.post('/api/spotify/create-playlist', async (req, res) => {
//   try {
//     const { userId, name, description } = req.body;
//     const playlist = await spotifyService.createPlaylist(userId, name, description);
//     res.json(playlist);
//   } catch (error) {
//     console.error('Error creating playlist:', error);
//     res.status(500).json({ error: 'Failed to create playlist' });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// module.exports = app;
// // add genius later -- debug spotify -- DONE 


// ////LATER////
// const express = require('express');
// const cors = require('cors');
// const spotifyService = require('./services/spotifyService');
// const openaiService = require('./services/openaiService');
// const geniusService = require('./services/geniusService');
// const playlistService = require('./services/playlistService');
// const moodJournalService = require('./services/moodJournalService.js');
// require('dotenv').config();

// const app = express();

// app.use(cors());
// app.use(express.json());

// const PORT = process.env.PORT || 3000;

// const authenticateUser = async (req, res, next) => {

// };

// app.get('/', (req, res) => {
//   res.json({ message: 'Welcome to MoodMix API' });
// });

// app.get('/', (req, res) => {
//     res.json({ message: 'Welcome to MoodMix API' });
// });

// app.get('/api/test', authenticateUser, (req, res) => {
//     res.json({ message: 'API is working correctly', user: req.user });
// });

// app.get('/api/spotify/auth-url', (req, res) => {
//   const authUrl = spotifyService.getAuthorizationUrl();
//   res.json({ authUrl });
// });

// app.get('/api/spotify/callback', async (req, res) => {
//   try {
//     const { code } = req.query;
//     const data = await spotifyService.handleCallback(code);
//     res.json(data);
//   } catch (error) {
//     console.error('Error in Spotify callback:', error);
//     res.status(500).json({ error: 'Authentication failed', details: error.message });
//   }
// });

// app.get('/api/spotify/search', async (req, res) => {
//   try {
//     const { query } = req.query;
//     const tracks = await spotifyService.searchTracks(query);
//     res.json(tracks);
//   } catch (error) {
//     console.error('Error searching tracks:', error);
//     res.status(500).json({ error: 'Failed to search tracks' });
//   }
// });

// app.post('/api/generate-playlist', authenticateUser, async (req, res) => {
//   try {
//     const { mood, genres } = req.body;
//     const playlist = await playlistService.generatePlaylistForMood(mood, genres);
//     res.json(playlist);
//   } catch (error) {
//     console.error('Error generating playlist:', error);
//     res.status(500).json({ error: 'Failed to generate playlist' });
//   }
// });

// app.post('/api/generate-temporary-playlist', async (req, res) => {
//   try {
//     const { mood } = req.body;
//     const temporaryPlaylist = await playlistService.generateTemporaryPlaylist(mood);
//     res.json(temporaryPlaylist);
//   } catch (error) {
//     console.error('Error generating temporary playlist:', error);
//     res.status(500).json({ error: 'Failed to generate temporary playlist' });
//   }
// });

// app.post('/api/analyze-mood', async (req, res) => {
//   try {
//     const { text } = req.body;
//     const analysis = await openaiService.analyzeMood(text);
//     res.json(analysis);
//   } catch (error) {
//     console.error('Error analyzing mood:', error);
//     res.status(500).json({ error: 'Failed to analyze mood' });
//   }
// });

// app.get('/api/song-info', async (req, res) => {
//   try {
//     const { title, artist } = req.query;
//     const songInfo = await geniusService.getSongInfo(title, artist);
//     res.json(songInfo);
//   } catch (error) {
//     console.error('Error fetching song info:', error);
//     res.status(500).json({ error: 'Failed to fetch song information' });
//   }
// });

// // Mood Journal CRUD operations
// app.get('/api/mood-journal', authenticateUser, async (req, res) => {
//   try {
//     const entries = await moodJournalService.getEntries(req.user.id);
//     res.json(entries);
//   } catch (error) {
//     console.error('Error fetching mood journal entries:', error);
//     res.status(500).json({ error: 'Failed to fetch mood journal entries' });
//   }
// });

// app.post('/api/mood-journal', authenticateUser, async (req, res) => {
//   try {
//     const { content } = req.body;
//     const entry = await moodJournalService.createEntry(req.user.id, content);
//     res.json(entry);
//   } catch (error) {
//     console.error('Error creating mood journal entry:', error);
//     res.status(500).json({ error: 'Failed to create mood journal entry' });
//   }
// });

// app.put('/api/mood-journal/:id', authenticateUser, async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { content } = req.body;
//     const updatedEntry = await moodJournalService.updateEntry(req.user.id, id, content);
//     res.json(updatedEntry);
//   } catch (error) {
//     console.error('Error updating mood journal entry:', error);
//     res.status(500).json({ error: 'Failed to update mood journal entry' });
//   }
// });

// app.delete('/api/mood-journal/:id', authenticateUser, async (req, res) => {
//   try {
//     const { id } = req.params;
//     await moodJournalService.deleteEntry(req.user.id, id);
//     res.json({ message: 'Entry deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting mood journal entry:', error);
//     res.status(500).json({ error: 'Failed to delete mood journal entry' });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// module.exports = app;
// //// LATER ////







// const express = require('express');
// const cors = require('cors');
// const spotifyService = require('./services/spotifyService');
// const openaiService = require('./services/openaiService');
// const geniusService = require('./services/geniusService');
// const playlistService = require('./services/playlistService');
// const moodJournalService = require('./services/moodJournalService.js');
// require('dotenv').config();

// const app = express();

// app.use(cors());
// app.use(express.json());

// const PORT = process.env.PORT || 3000;

// // Simple cache to store recently used authorization codes
// const usedAuthCodes = new Set();

// const authenticateUser = async (req, res, next) => {
//     // Implement your user authentication logic here
//     // For example:
//     const { authorization } = req.headers;
//     if (!authorization || !authorization.startsWith('Bearer ')) {
//         return res.status(401).json({ error: 'Unauthorized' });
//     }
//     const token = authorization.split('Bearer ')[1];
//     try {
//         const decodedToken = await verifyToken(token);
//         req.user = decodedToken;
//         next();
//     } catch (error) {
//         console.error('Error verifying token:', error);
//         return res.status(401).json({ error: 'Unauthorized' });
//     }
// };

// app.get('/', (req, res) => {
//     res.json({ message: 'Welcome to MoodMix API' });
// });

// app.get('/api/test', authenticateUser, (req, res) => {
//     res.json({ message: 'API is working correctly', user: req.user });
// });

// app.get('/api/spotify/auth-url', (req, res) => {
//     const authUrl = spotifyService.getAuthorizationUrl();
//     res.json({ authUrl });
// });

// // app.get('/api/spotify/callback', async (req, res) => {
// //   try {
// //     const { code } = req.query;
// //     console.log('Received code in callback:', code);

// //     // Check if the code has been used before
// //     if (usedAuthCodes.has(code)) {
// //       throw new Error('Authorization code has already been used');
// //     }

// //     // Add the code to the set of used codes
// //     usedAuthCodes.add(code);

// //     const data = await spotifyService.handleCallback(code);

// //     // Optionally, remove old codes from the set to prevent it from growing indefinitely
// //     setTimeout(() => usedAuthCodes.delete(code), 60000); // remove after 1 minute

// //     res.json(data);
// //   } catch (error) {
// //     console.error('Error in Spotify callback:', error);
// //     res.status(500).json({ error: 'Authentication failed', details: error.message });
// //   }
// // });

// app.get('/api/spotify/search', async (req, res) => {
//     try {
//         const { query } = req.query;
//         const tracks = await spotifyService.searchTracks(query);
//         res.json(tracks);
//     } catch (error) {
//         console.error('Error searching tracks:', error);
//         res.status(500).json({ error: 'Failed to search tracks' });
//     }
// });

// app.post('/api/spotify/create-playlist', async (req, res) => {
//     try {
//         const { userId, name, description } = req.body;
//         const playlist = await spotifyService.createPlaylist(userId, name, description);
//         res.json(playlist);
//     } catch (error) {
//         console.error('Error creating playlist:', error);
//         res.status(500).json({ error: 'Failed to create playlist' });
//     }
// });

// app.post('/api/generate-playlist', authenticateUser, async (req, res) => {
//     try {
//         const { mood, genres } = req.body;
//         const playlist = await playlistService.generatePlaylistForMood(mood, genres);
//         res.json(playlist);
//     } catch (error) {
//         console.error('Error generating playlist:', error);
//         res.status(500).json({ error: 'Failed to generate playlist' });
//     }
// });

// app.post('/api/generate-temporary-playlist', async (req, res) => {
//     try {
//         const { mood } = req.body;
//         const temporaryPlaylist = await playlistService.generateTemporaryPlaylist(mood);
//         res.json(temporaryPlaylist);
//     } catch (error) {
//         console.error('Error generating temporary playlist:', error);
//         res.status(500).json({ error: 'Failed to generate temporary playlist' });
//     }
// });

// app.post('/api/analyze-mood', async (req, res) => {
//     try {
//         const { text } = req.body;
//         const analysis = await openaiService.analyzeMood(text);
//         res.json(analysis);
//     } catch (error) {
//         console.error('Error analyzing mood:', error);
//         res.status(500).json({ error: 'Failed to analyze mood' });
//     }
// });

// app.get('/api/song-info', async (req, res) => {
//     try {
//         const { title, artist } = req.query;
//         const songInfo = await geniusService.getSongInfo(title, artist);
//         res.json(songInfo);
//     } catch (error) {
//         console.error('Error fetching song info:', error);
//         res.status(500).json({ error: 'Failed to fetch song information' });
//     }
// });

// // Mood Journal CRUD operations
// app.get('/api/mood-journal', authenticateUser, async (req, res) => {
//     try {
//         const entries = await moodJournalService.getEntries(req.user.id);
//         res.json(entries);
//     } catch (error) {
//         console.error('Error fetching mood journal entries:', error);
//         res.status(500).json({ error: 'Failed to fetch mood journal entries' });
//     }
// });

// app.post('/api/mood-journal', authenticateUser, async (req, res) => {
//     try {
//         const { content } = req.body;
//         const entry = await moodJournalService.createEntry(req.user.id, content);
//         res.json(entry);
//     } catch (error) {
//         console.error('Error creating mood journal entry:', error);
//         res.status(500).json({ error: 'Failed to create mood journal entry' });
//     }
// });

// app.put('/api/mood-journal/:id', authenticateUser, async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { content } = req.body;
//         const updatedEntry = await moodJournalService.updateEntry(req.user.id, id, content);
//         res.json(updatedEntry);
//     } catch (error) {
//         console.error('Error updating mood journal entry:', error);
//         res.status(500).json({ error: 'Failed to update mood journal entry' });
//     }
// });

// app.delete('/api/mood-journal/:id', authenticateUser, async (req, res) => {
//     try {
//         const { id } = req.params;
//         await moodJournalService.deleteEntry(req.user.id, id);
//         res.json({ message: 'Entry deleted successfully' });
//     } catch (error) {
//         console.error('Error deleting mood journal entry:', error);
//         res.status(500).json({ error: 'Failed to delete mood journal entry' });
//     }
// });

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

// module.exports = app;













//// THIS IS THE WORKING VER -- BUT NEED ADDITION MOOD ETC ////
// const express = require('express');
// const cors = require('cors');
// const admin = require('./firebase');  
// const spotifyService = require('./services/spotifyService');
// const openaiService = require('./services/openaiService');
// const geniusService = require('./services/geniusService');
// const playlistService = require('./services/playlistService');
// const moodJournalService = require('./services/moodJournalService');
// require('dotenv').config();

// const app = express();

// app.use(cors());
// app.use(express.json());

// const PORT = process.env.PORT || 3000;

// // Simple cache to store recently used authorization codes
// const usedAuthCodes = new Set();

// const authenticateUser = async (req, res, next) => {
//     const { authorization } = req.headers;

//     if (!authorization || !authorization.startsWith('Bearer ')) {
//         return res.status(401).json({ error: 'Unauthorized' });
//     }

//     const token = authorization.split('Bearer ')[1];

//     try {
//         const decodedToken = await admin.auth().verifyIdToken(token);
//         req.user = decodedToken;
//         next();
//     } catch (error) {
//         console.error('Error verifying Firebase ID token:', error);
//         return res.status(401).json({ error: 'Unauthorized' });
//     }
// };

// app.get('/', (req, res) => {
//     res.json({ message: 'Welcome to MoodMix API' });
// });

// app.get('/api/test', authenticateUser, (req, res) => {
//     res.json({ message: 'API is working correctly', user: req.user });
// });

// app.get('/api/spotify/auth-url', (req, res) => {
//     const authUrl = spotifyService.getAuthorizationUrl();
//     res.json({ authUrl });
// });

// app.get('/api/spotify/login', (req, res) => {
//     res.redirect(spotifyService.getAuthorizationUrl());
// });

// app.get('/api/spotify/callback', async (req, res) => {
//     try {
//         const { code } = req.query;
//         console.log('Received code in callback:', code);

//         if (usedAuthCodes.has(code)) {
//             throw new Error('Authorization code has already been used');
//         }

//         usedAuthCodes.add(code);

//         const data = await spotifyService.handleCallback(code);

//         setTimeout(() => usedAuthCodes.delete(code), 60000); // remove after 1 minute

//         res.json(data);
//     } catch (error) {
//         console.error('Error in Spotify callback:', error.message);
//         res.status(500).json({ error: 'Authentication failed', details: error.message });
//     }
// });

// app.get('/api/spotify/search', async (req, res) => {
//     try {
//         const { query } = req.query;
//         const tracks = await spotifyService.searchTracks(query);
//         res.json(tracks);
//     } catch (error) {
//         console.error('Error searching tracks:', error);
//         res.status(500).json({ error: 'Failed to search tracks' });
//     }
// });

// app.post('/api/spotify/create-playlist', async (req, res) => {
//     try {
//         const { userId, name, description } = req.body;
//         const playlist = await spotifyService.createPlaylist(userId, name, description);
//         res.json(playlist);
//     } catch (error) {
//         console.error('Error creating playlist:', error);
//         res.status(500).json({ error: 'Failed to create playlist' });
//     }
// });

// app.post('/api/test-openai', authenticateUser, async (req, res) => {
//     try {
//         const { text } = req.body;
//         const analysis = await openaiService.analyzeText(text);
//         res.json({ analysis });
//     } catch (error) {
//         console.error('Error in OpenAI test:', error);
//         res.status(500).json({ error: 'Failed to analyze text' });
//     }
// });

// app.get('/api/test-genius', authenticateUser, async (req, res) => {
//     try {
//         const { title, artist } = req.query;
//         const songInfo = await geniusService.fetchSongInfo(title, artist);
//         const lyrics = await geniusService.fetchLyrics(title, artist);
//         res.json({ songInfo, lyrics });
//     } catch (error) {
//         console.error('Error in Genius test:', error);
//         res.status(500).json({ error: 'Failed to fetch song information' });
//     }
// });

// app.post('/api/generate-playlist', authenticateUser, async (req, res) => {
//     try {
//         const { mood, genres } = req.body;
//         const playlist = await playlistService.generatePlaylistForMood(mood, genres);
//         res.json(playlist);
//     } catch (error) {
//         console.error('Error generating playlist:', error);
//         res.status(500).json({ error: 'Failed to generate playlist' });
//     }
// });

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

// module.exports = app;
/// THIS IS THE WORKING VER -- BUT NEED ADDITION MOOD ETC ////














// // File: server/app.js

// const express = require('express');
// const cors = require('cors');
// require('dotenv').config();

// const spotifyRoutes = require('./routes/spotifyRoutes');
// const openaiRoutes = require('./routes/openaiRoutes');
// const geniusRoutes = require('./routes/geniusRoutes');
// const playlistRoutes = require('./routes/playlistRoutes');
// const moodJournalRoutes = require('./routes/moodJournalRoutes');
// const testRoutes = require('./routes/testRoutes');  // Add this line

// const app = express();

// app.use(cors());
// app.use(express.json());

// const PORT = process.env.PORT || 3000;

// app.get('/', (req, res) => {
//   res.json({ message: 'Welcome to MoodMix API' });
// });

// app.use('/api/test', testRoutes);  
// app.use('/api/spotify', spotifyRoutes);
// app.use('/api/openai', openaiRoutes);
// app.use('/api/genius', geniusRoutes);
// app.use('/api/playlist', playlistRoutes);
// app.use('/api/mood-journal', moodJournalRoutes);

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// module.exports = app;

// const express = require('express');
// const cors = require('cors');
// require('dotenv').config();

// // Import route files
// const spotifyRoutes = require('./routes/spotifyRoutes');
// const openaiRoutes = require('./routes/openaiRoutes');
// const geniusRoutes = require('./routes/geniusRoutes');
// const playlistRoutes = require('./routes/playlistRoutes');
// const moodJournalRoutes = require('./routes/moodJournalRoutes');
// const testRoutes = require('./routes/testRoutes');

// // Initialize the app
// const app = express();

// app.use(cors());
// app.use(express.json());

// // Define port
// const PORT = process.env.PORT || 3000;

// // Home route
// app.get('/', (req, res) => {
//     res.json({ message: 'Welcome to MoodMix API' });
// });

// // Mount routes
// app.use('/api/test', testRoutes);  
// app.use('/api/spotify', spotifyRoutes);
// app.use('/api/openai', openaiRoutes);
// app.use('/api/genius', geniusRoutes);
// app.use('/api/playlist', playlistRoutes);
// app.use('/api/mood-journal', moodJournalRoutes);

// // Start the server
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

// module.exports = app;



//TEST//
const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Import route files
const spotifyRoutes = require('./routes/spotifyRoutes');
const openaiRoutes = require('./routes/openaiRoutes');
const geniusRoutes = require('./routes/geniusRoutes');
const playlistRoutes = require('./routes/playlistRoutes');
const moodJournalRoutes = require('./routes/moodJournalRoutes');
const testRoutes = require('./routes/testRoutes');  // Import your test routes

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to MoodMix API' });
});

// Mount routes
app.use('/api/test', testRoutes);  // Mount the test route
app.use('/api/spotify', spotifyRoutes);  // Mount Spotify routes
app.use('/api/openai', openaiRoutes);  // Mount OpenAI routes
app.use('/api/genius', geniusRoutes);  // Mount Genius routes
app.use('/api/playlist', playlistRoutes);  // Mount Playlist routes
app.use('/api/mood-journal', moodJournalRoutes);  // Mount Mood Journal routes

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
