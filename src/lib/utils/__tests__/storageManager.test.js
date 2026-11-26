'use strict';

const mockStore = {};
const mockLocalStorage = {
  getItem: jest.fn((key) =>
    Object.prototype.hasOwnProperty.call(mockStore, key) ? mockStore[key] : null
  ),
  setItem: jest.fn((key, value) => {
    mockStore[key] = String(value);
  }),
  removeItem: jest.fn((key) => {
    delete mockStore[key];
  })
};

jest.mock('@adobe/reactor-window', () => ({ localStorage: mockLocalStorage }));

const {
  addEventToStore,
  removeEventFromStore,
  removeEventsFromStore,
  getEventFromStore,
  getAllEventFromStore,
  clearEventsToStore
} = require('../storageManager');

const readStore = () => JSON.parse(mockStore.algolia);

beforeEach(() => {
  Object.keys(mockStore).forEach((key) => delete mockStore[key]);
  jest.clearAllMocks();
});

describe('storageManager', () => {
  describe('getAllEventFromStore', () => {
    it('initializes an empty store when none exists', () => {
      expect(getAllEventFromStore()).toEqual({});
      expect(mockStore.algolia).toBe('{}');
    });

    it('returns previously stored events', () => {
      mockStore.algolia = JSON.stringify({ '/a': { objectIDs: ['1'] } });

      expect(getAllEventFromStore()).toEqual({ '/a': { objectIDs: ['1'] } });
    });
  });

  describe('addEventToStore', () => {
    it('stores a new record', () => {
      addEventToStore('/a', { objectIDs: ['1'] });

      expect(readStore()).toEqual({ '/a': { objectIDs: ['1'] } });
    });

    it('keeps the existing record when the payload has no queryID', () => {
      addEventToStore('/a', { objectIDs: ['1'] });
      addEventToStore('/a', { objectIDs: ['2'] });

      expect(readStore()['/a'].objectIDs).toEqual(['1']);
    });

    it('overwrites the existing record when the payload has a queryID', () => {
      addEventToStore('/a', { objectIDs: ['1'] });
      addEventToStore('/a', { objectIDs: ['2'], queryID: 'q1' });

      expect(readStore()['/a']).toEqual({ objectIDs: ['2'], queryID: 'q1' });
    });
  });

  describe('getEventFromStore', () => {
    it('returns the stored record', () => {
      addEventToStore('/a', { objectIDs: ['1'] });

      expect(getEventFromStore('/a')).toEqual({ objectIDs: ['1'] });
    });

    it('returns an empty object for an unknown record', () => {
      expect(getEventFromStore('/missing')).toEqual({});
    });
  });

  describe('removeEventFromStore', () => {
    it('removes only the requested record', () => {
      addEventToStore('/a', { objectIDs: ['1'] });
      addEventToStore('/b', { objectIDs: ['2'] });

      removeEventFromStore('/a');

      expect(readStore()).toEqual({ '/b': { objectIDs: ['2'] } });
    });
  });

  describe('removeEventsFromStore', () => {
    beforeEach(() => {
      addEventToStore('/a', { objectIDs: ['1'] });
      addEventToStore('/b', { objectIDs: ['2'] });
      addEventToStore('/c', { objectIDs: [] });
      addEventToStore('/d', { queryID: 'q' });
    });

    it('removes records whose first objectID is in the list', () => {
      removeEventsFromStore(['1', '2']);

      expect(Object.keys(readStore())).toEqual(['/c', '/d']);
    });

    it('leaves records that do not match', () => {
      removeEventsFromStore(['999']);

      expect(Object.keys(readStore())).toEqual(['/a', '/b', '/c', '/d']);
    });

    it('does nothing when no objectIDs are provided', () => {
      removeEventsFromStore(undefined);

      expect(Object.keys(readStore())).toEqual(['/a', '/b', '/c', '/d']);
    });
  });

  describe('clearEventsToStore', () => {
    it('removes the algolia storage key', () => {
      addEventToStore('/a', { objectIDs: ['1'] });

      clearEventsToStore();

      expect(mockStore.algolia).toBeUndefined();
    });
  });
});
