'use strict';

global.turbine = {
  logger: {
    log: jest.fn(),
    warn: jest.fn(),
    error: jest.fn()
  },
  getExtensionSettings: jest.fn(() => ({}))
};
