const request = require('supertest');
const { Track, Playlist, User } = require('../models');
const testRoutes = require('./testRoutes');

describe('API Endpoints', () => {
  let authToken;

  beforeAll(async () => {
    const user = new User({ username: 'testuser', email: 'test@example.com', password: 'password123' });
    await user.save();
    const loginResponse = await request(global.getTestServerURL())
      .post('/api/login')
      .send({ username: 'testuser', password: 'password123' });
    authToken = loginResponse.body.token;
  });

  beforeEach(async () => {
    await Track.deleteMany({});
    await Playlist.deleteMany({});
    testRoutes.resetMockData();
  });

  describe('GET /api/tracks', () => {
    it('should return a list of tracks', async () => {
      const res = await request(global.getTestServerURL())
        .get('/api/tracks')
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBeTruthy();
      expect(res.body.length).toBe(2);
    });

    it('should return an empty array when no tracks exist', async () => {
      testRoutes.clearMockData();
      const res = await request(global.getTestServerURL())
        .get('/api/tracks')
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBeTruthy();
      expect(res.body.length).toBe(0);
    });

    it('should return 401 if not authenticated', async () => {
      const res = await request(global.getTestServerURL())
        .get('/api/tracks');

      expect(res.statusCode).toBe(401);
    });
  });

  describe('POST /api/playlist', () => {
    it('should create a new playlist', async () => {
      const res = await request(global.getTestServerURL())
        .post('/api/playlist')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          name: 'Test Playlist',
          tracks: ['track1', 'track2'],
        });

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('name', 'Test Playlist');
      expect(res.body.tracks).toHaveLength(2);
    });

    it('should return 400 if name is missing', async () => {
      const res = await request(global.getTestServerURL())
        .post('/api/playlist')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          tracks: ['track1', 'track2'],
        });

      expect(res.statusCode).toBe(400);
    });

    it('should return 401 if not authenticated', async () => {
      const res = await request(global.getTestServerURL())
        .post('/api/playlist')
        .send({
          name: 'Test Playlist',
          tracks: ['track1', 'track2'],
        });

      expect(res.statusCode).toBe(401);
    });
  });

  describe('GET /api/mood-analysis', () => {
    it('should return mood analysis for given tracks', async () => {
      const res = await request(global.getTestServerURL())
        .get('/api/mood-analysis')
        .set('Authorization', `Bearer ${authToken}`)
        .query({ tracks: 'track1,track2' });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('mood');
    });

    it('should return 400 if tracks are not provided', async () => {
      const res = await request(global.getTestServerURL())
        .get('/api/mood-analysis')
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.statusCode).toBe(400);
    });

    it('should return 401 if not authenticated', async () => {
      const res = await request(global.getTestServerURL())
        .get('/api/mood-analysis')
        .query({ tracks: 'track1,track2' });

      expect(res.statusCode).toBe(401);
    });
  });
});