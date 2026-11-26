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

  coverageReporters: ['lcov', 'text', 'html'],

  // The runtime library is held to a high bar. Files matched by a path
  // threshold are excluded from "global", so "global" only gates the view layer,
  // which is mostly React field components exercised in the Tags UI. Its
  // thresholds are therefore lower; raise them as view tests are added.
  coverageThreshold: {
    global: {
      statements: 45,
      branches: 70,
      functions: 25,
      lines: 45
    },
    './src/lib/': {
      statements: 90,
      branches: 85,
      functions: 90,
      lines: 90
    }
  }
};
