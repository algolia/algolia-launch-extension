'use strict';

// jest.config.js
module.exports = {
  projects: [
    {
      displayName: 'test views',
      testEnvironment: 'jsdom',
      setupFilesAfterEnv: ['./src/view/jest.setup.js'],
      moduleNameMapper: {
        '\\.(css|styl)$': '<rootDir>/src/view/__tests_helpers__/styleMock.js'
      },
      modulePathIgnorePatterns: ['<rootDir>/src/lib/'],
      transform: {
        '^.+\\.[t|j]sx?$': 'babel-jest'
      }
    },
    {
      displayName: 'test library modules',
      testEnvironment: 'node',
      setupFilesAfterEnv: ['<rootDir>/src/lib/actions/__tests__/setupTests.js'],
      modulePathIgnorePatterns: [
        '<rootDir>/src/view/',
        '<rootDir>/src/lib/actions/__tests__/setupTests.js'
      ]
    },
    {
      displayName: 'lint',
      runner: 'jest-runner-eslint',
      testMatch: ['<rootDir>/src/**'],
      testPathIgnorePatterns: ['/__tests__/', '/__tests_helpers__/']
    }
  ],

  collectCoverageFrom: [
    './src/**/*.{js,jsx}',
    '!**/node_modules/**',
    '!**/vendor/**',
    '!**/__tests__/**',
    '!**/__tests_helpers__/**'
  ],

  coverageReporters: ['lcov', 'text', 'html']
};