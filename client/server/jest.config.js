module.exports = {
    testEnvironment: 'node',
    testMatch: ['**/__tests__/**/*.test.js'],
    setupFilesAfterEnv: ['<rootDir>/__tests__/setup.js'],
    transformIgnorePatterns: [
      'node_modules/(?!(axios)/)'
    ],
    moduleNameMapper: {
      '^axios$': require.resolve('axios')
    },
    globals: {
      TextEncoder: require('util').TextEncoder,
      TextDecoder: require('util').TextDecoder,
    },
    setupFiles: ['<rootDir>/jest.setup.js']
  };