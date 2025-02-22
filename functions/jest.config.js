module.exports = {
  preset: 'ts-jest',
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./functions/src/setupTests.js'],
  testMatch: ['**/functions/src/**/*.test.ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['./functions/lcov', 'text-summary']
};