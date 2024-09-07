const mongoose = require('mongoose');
const { Track, Playlist, User } = require('../models');

describe('Database Models', () => {
  beforeEach(async () => {
    await Track.deleteMany({});
    await Playlist.deleteMany({});
    await User.deleteMany({});
  });

  describe('Track Model', () => {
    it('should create and save a Track successfully', async () => {
      const trackData = { title: 'Test Track', artist: 'Test Artist', url: 'http://test.com' };
      const track = new Track(trackData);
      const savedTrack = await track.save();
      expect(savedTrack._id).toBeDefined();
      expect(savedTrack.title).toBe(trackData.title);
    });

    it('should fail to save a Track without required fields', async () => {
      const track = new Track({});
      let err;
      try {
        await track.save();
      } catch (error) {
        err = error;
      }
      expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    });
  });

  describe('Playlist Model', () => {
    it('should create and save a Playlist successfully', async () => {
      const playlistData = { name: 'Test Playlist', tracks: [] };
      const playlist = new Playlist(playlistData);
      const savedPlaylist = await playlist.save();
      expect(savedPlaylist._id).toBeDefined();
      expect(savedPlaylist.name).toBe(playlistData.name);
    });

    it('should add tracks to a Playlist', async () => {
        const playlist = new Playlist({ name: 'Test Playlist' });
        const trackId1 = new mongoose.Types.ObjectId();
        const trackId2 = new mongoose.Types.ObjectId();
        playlist.tracks.push(trackId1, trackId2);
        const savedPlaylist = await playlist.save();
        expect(savedPlaylist.tracks).toHaveLength(2);
      });
  });

  describe('User Model', () => {
    it('should create and save a User successfully', async () => {
      const userData = { username: 'testuser', email: 'test@example.com', password: 'password123' };
      const user = new User(userData);
      const savedUser = await user.save();
      expect(savedUser._id).toBeDefined();
      expect(savedUser.username).toBe(userData.username);
    });

    it('should not save duplicate username', async () => {
      const userData = { username: 'testuser', email: 'test@example.com', password: 'password123' };
      await User.create(userData);
      const duplicateUser = new User(userData);
      let err;
      try {
        await duplicateUser.save();
      } catch (error) {
        err = error;
      }
      expect(err).toBeDefined();
      expect(err.code).toBe(11000); // for debugging MongoDB duplicate key error code
    });
  });
});