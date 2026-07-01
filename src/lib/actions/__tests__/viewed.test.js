'use strict';

const mockAa = jest.fn();

jest.mock('@adobe/reactor-window', () => ({ aa: mockAa }));

const viewed = require('../viewed');

const baseExtensionSettings = {
  userTokenDataElement: 'user-abc',
  authenticatedUserTokenDataElement: '',
  indexName: 'default_index'
};

beforeEach(() => {
  mockAa.mockClear();
  turbine.logger.log.mockClear();
  turbine.getExtensionSettings.mockReset();
  turbine.getExtensionSettings.mockReturnValue(baseExtensionSettings);
});

describe('viewed action', () => {
  it('calls aa("viewedObjectIDs") when objectIDs are provided', () => {
    const settings = {
      eventName: 'Product Viewed',
      eventDetailsDataElement: {
        timestamp: 1000,
        indexName: 'my_index',
        objectIDs: ['obj1', 'obj2']
      }
    };

    const result = viewed(settings);

    expect(result).toBe(true);
    const viewCall = mockAa.mock.calls.find((c) => c[0] === 'viewedObjectIDs');
    expect(viewCall).toBeDefined();
    expect(viewCall[1].eventName).toBe('Product Viewed');
    expect(viewCall[1].objectIDs).toEqual(['obj1', 'obj2']);
    expect(viewCall[1].index).toBe('my_index');
    expect(viewCall[1].userToken).toBe('user-abc');
  });

  it('falls back to extension indexName when eventDetails has no indexName', () => {
    const settings = {
      eventName: 'Product Viewed',
      eventDetailsDataElement: {
        timestamp: 1000,
        indexName: '',
        objectIDs: ['obj1']
      }
    };

    viewed(settings);

    const viewCall = mockAa.mock.calls.find((c) => c[0] === 'viewedObjectIDs');
    expect(viewCall[1].index).toBe('default_index');
  });

  it('does not call aa("viewedObjectIDs") when objectIDs is empty', () => {
    const settings = {
      eventName: 'Product Viewed',
      eventDetailsDataElement: {
        timestamp: 1000,
        indexName: 'my_index',
        objectIDs: []
      }
    };

    viewed(settings);

    const viewCall = mockAa.mock.calls.find((c) => c[0] === 'viewedObjectIDs');
    expect(viewCall).toBeUndefined();
  });

  it('includes authenticatedUserToken when set in extensionSettings', () => {
    turbine.getExtensionSettings.mockReturnValue({
      ...baseExtensionSettings,
      authenticatedUserTokenDataElement: 'auth-token-xyz'
    });

    const settings = {
      eventName: 'Viewed',
      eventDetailsDataElement: {
        timestamp: 2000,
        indexName: 'idx',
        objectIDs: ['o1']
      }
    };

    viewed(settings);

    const viewCall = mockAa.mock.calls.find((c) => c[0] === 'viewedObjectIDs');
    expect(viewCall[1].authenticatedUserToken).toBe('auth-token-xyz');
  });
});
