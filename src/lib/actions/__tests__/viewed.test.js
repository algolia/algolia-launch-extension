'use strict';

const mockAa = jest.fn();
const mockWindow = { aa: mockAa };

jest.mock('@adobe/reactor-window', () => mockWindow);

const viewed = require('../viewed');

const baseExtensionSettings = {
  userTokenDataElement: 'user-abc',
  authenticatedUserTokenDataElement: '',
  indexName: 'default_index'
};

beforeEach(() => {
  mockWindow.aa = mockAa;
  mockAa.mockClear();
  turbine.logger.log.mockClear();
  turbine.logger.warn.mockClear();
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

  describe('batching', () => {
    const makeIDs = (count) =>
      Array.from({ length: count }, (_, i) => `obj${i + 1}`);
    const run = (objectIDs) =>
      viewed({
        eventName: 'Viewed',
        eventDetailsDataElement: {
          timestamp: 1000,
          indexName: 'idx',
          objectIDs
        }
      });
    const viewCalls = () =>
      mockAa.mock.calls.filter((c) => c[0] === 'viewedObjectIDs');

    it('sends one event for exactly 20 objectIDs', () => {
      run(makeIDs(20));

      expect(viewCalls()).toHaveLength(1);
      expect(viewCalls()[0][1].objectIDs).toHaveLength(20);
    });

    it('splits 21 objectIDs into two events', () => {
      run(makeIDs(21));

      const calls = viewCalls();
      expect(calls).toHaveLength(2);
      expect(calls[0][1].objectIDs).toHaveLength(20);
      expect(calls[1][1].objectIDs).toEqual(['obj21']);
    });

    it('splits 45 objectIDs into three events, preserving order and payload', () => {
      run(makeIDs(45));

      const calls = viewCalls();
      expect(calls.map((c) => c[1].objectIDs.length)).toEqual([20, 20, 5]);
      expect(calls.flatMap((c) => c[1].objectIDs)).toEqual(makeIDs(45));
      calls.forEach((c) => {
        expect(c[1].eventName).toBe('Viewed');
        expect(c[1].index).toBe('idx');
        expect(c[1].timestamp).toBe(1000);
        expect(c[1].userToken).toBe('user-abc');
      });
    });
  });

  describe('hardening', () => {
    it('does not throw when eventDetailsDataElement is missing', () => {
      expect(() => viewed({ eventName: 'Viewed' })).not.toThrow();
      expect(mockAa).not.toHaveBeenCalled();
    });

    it('does not throw when eventDetailsDataElement is null', () => {
      expect(() =>
        viewed({ eventName: 'Viewed', eventDetailsDataElement: null })
      ).not.toThrow();
      expect(mockAa).not.toHaveBeenCalled();
    });

    it('warns instead of throwing when window.aa is not loaded', () => {
      delete mockWindow.aa;

      expect(() =>
        viewed({
          eventName: 'Viewed',
          eventDetailsDataElement: { objectIDs: ['o1'] }
        })
      ).not.toThrow();
      expect(turbine.logger.warn).toHaveBeenCalledTimes(1);
    });
  });
});
