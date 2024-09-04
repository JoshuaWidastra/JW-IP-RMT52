const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const moodRoutes = require('./routes/moodRoutes');
const authMiddleware = require('./middleware/auth');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Public routes
app.use('/api/public', moodRoutes);

// Protected routes
app.use('/api/mood', authMiddleware, moodRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});