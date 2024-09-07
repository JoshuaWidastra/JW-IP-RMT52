const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../server');
const testRoutes = require('./testRoutes'); 

let mongoServer;
let server;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = await mongoServer.getUri();
  await mongoose.connect(mongoUri);

  app.use(testRoutes); 

  return new Promise((resolve) => {
    server = app.listen(0, () => {
      global.__TEST_PORT__ = server.address().port;
      console.log(`Test server running on port ${global.__TEST_PORT__}`);
      resolve();
    });
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
  await new Promise((resolve) => server.close(resolve));
});

global.getTestServerURL = () => `http://localhost:${global.__TEST_PORT__}`;