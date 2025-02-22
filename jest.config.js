module.exports = {
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./functions/src/setupTests.js'],
  testMatch: ['**/functions/src/**/*.test.ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest'
  }
};