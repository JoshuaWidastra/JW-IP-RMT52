const request = require('supertest');
const { User } = require('../models');
const { generateToken, verifyToken } = require('../utils/auth');

jest.mock('../utils/auth', () => ({
  generateToken: jest.fn(() => 'mock-token'),
  verifyToken: jest.fn(() => ({ userId: 'mock-user-id' }))
}));

describe('Authentication', () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  describe('POST /api/register', () => {
    it('should register a new user', async () => {
      const res = await request(global.getTestServerURL())
        .post('/api/register')
        .send({
          username: 'newuser',
          email: 'newuser@example.com',
          password: 'password123',
        });

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('message', 'User registered successfully');
    });
  });

  describe('POST /api/login', () => {
    beforeEach(async () => {
      await User.create({
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'password123',
      });
    });

    it('should return a token for valid credentials', async () => {
      const res = await request(global.getTestServerURL())
        .post('/api/login')
        .send({
          username: 'testuser',
          password: 'password123',
        });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('token');
    });

    it('should return 401 for invalid credentials', async () => {
      const res = await request(global.getTestServerURL())
        .post('/api/login')
        .send({
          username: 'testuser',
          password: 'wrongpassword',
        });

      expect(res.statusCode).toBe(401);
    });
  });
});