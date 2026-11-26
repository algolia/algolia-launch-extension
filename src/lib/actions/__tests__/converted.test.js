'use strict';

const mockAa = jest.fn();
const mockWindow = { aa: mockAa };
const mockRemoveEventFromStore = jest.fn();

jest.mock('@adobe/reactor-window', () => mockWindow);
jest.mock('../../utils/storageManager', () => ({
  removeEventFromStore: (...args) => mockRemoveEventFromStore(...args)
}));

const converted = require('../converted');

const baseExtensionSettings = {
  userTokenDataElement: 'user-abc',
  authenticatedUserTokenDataElement: '',
  indexName: 'default_index'
};

const run = (eventDetailsDataElement, extra = {}) =>
  converted({
    eventName: 'Product Converted',
    eventDetailsDataElement,
    ...extra
  });

beforeEach(() => {
  mockWindow.aa = mockAa;
  mockAa.mockClear();
  mockRemoveEventFromStore.mockClear();
  turbine.logger.log.mockClear();
  turbine.getExtensionSettings.mockReset();
  turbine.getExtensionSettings.mockReturnValue(baseExtensionSettings);
});

describe('converted action', () => {
  it('sends convertedObjectIDsAfterSearch when a queryID exists', () => {
    const result = run({
      timestamp: 1000,
      queryID: 'q1',
      indexName: 'my_index',
      objectIDs: ['o1'],
      recordID: '/product/1'
    });

    expect(result).toBe(true);
    const [command, payload] = mockAa.mock.calls[0];
    expect(command).toBe('convertedObjectIDsAfterSearch');
    expect(payload).toMatchObject({
      timestamp: 1000,
      eventName: 'Product Converted',
      index: 'my_index',
      userToken: 'user-abc',
      objectIDs: ['o1'],
      queryID: 'q1'
    });
  });

  it('sends convertedObjectIDs when there is no queryID', () => {
    run({ timestamp: 1000, objectIDs: ['o1'], recordID: '/product/1' });

    const [command, payload] = mockAa.mock.calls[0];
    expect(command).toBe('convertedObjectIDs');
    expect(payload.queryID).toBeUndefined();
    expect(payload.index).toBe('default_index');
  });

  it('does not send an event when objectIDs are empty', () => {
    run({ timestamp: 1000, queryID: 'q1', objectIDs: [], recordID: '/p' });

    expect(mockAa).not.toHaveBeenCalled();
  });

  it('includes the authenticated user token when configured', () => {
    turbine.getExtensionSettings.mockReturnValue({
      ...baseExtensionSettings,
      authenticatedUserTokenDataElement: 'auth-user'
    });

    run({ timestamp: 1000, objectIDs: ['o1'], recordID: '/p' });

    expect(mockAa.mock.calls[0][1].authenticatedUserToken).toBe('auth-user');
  });

  it('removes the event from the store by default', () => {
    run({ timestamp: 1000, objectIDs: ['o1'], recordID: '/product/1' });

    expect(mockRemoveEventFromStore).toHaveBeenCalledWith('/product/1');
  });

  it('keeps the event in the store when removal is disabled', () => {
    run(
      { timestamp: 1000, objectIDs: ['o1'], recordID: '/product/1' },
      { disableRemoveEventFromStore: true }
    );

    expect(mockRemoveEventFromStore).not.toHaveBeenCalled();
  });
});
