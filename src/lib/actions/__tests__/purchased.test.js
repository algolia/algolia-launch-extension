'use strict';

const mockAa = jest.fn();
const mockWindow = { aa: mockAa };
const mockGetAllEventFromStore = jest.fn();
const mockRemoveEventFromStore = jest.fn();

jest.mock('@adobe/reactor-window', () => mockWindow);
jest.mock('../../utils/storageManager', () => ({
  getAllEventFromStore: (...args) => mockGetAllEventFromStore(...args),
  removeEventFromStore: (...args) => mockRemoveEventFromStore(...args)
}));

const purchased = require('../purchased');

const baseExtensionSettings = {
  userTokenDataElement: 'user-abc',
  authenticatedUserTokenDataElement: '',
  indexName: 'default_index',
  currency: 'USD'
};

const run = (purchasedItemsDataElement) =>
  purchased({ eventName: 'Purchased', purchasedItemsDataElement });

beforeEach(() => {
  mockWindow.aa = mockAa;
  mockAa.mockClear();
  mockGetAllEventFromStore.mockReset();
  mockRemoveEventFromStore.mockClear();
  turbine.logger.log.mockClear();
  turbine.getExtensionSettings.mockReset();
  turbine.getExtensionSettings.mockReturnValue(baseExtensionSettings);
});

describe('purchased action', () => {
  it('sends purchasedObjectIDsAfterSearch for stored items that were purchased', () => {
    mockGetAllEventFromStore.mockReturnValue({
      '/p/1': {
        queryID: 'q1',
        indexName: 'my_index',
        objectIDs: ['o1'],
        objectData: [{ price: 10, quantity: 2 }],
        currency: 'EUR'
      }
    });

    run(['o1']);

    expect(mockAa).toHaveBeenCalledTimes(1);
    const [command, payload] = mockAa.mock.calls[0];
    expect(command).toBe('purchasedObjectIDsAfterSearch');
    expect(payload).toMatchObject({
      eventName: 'Purchased',
      index: 'my_index',
      userToken: 'user-abc',
      objectIDs: ['o1'],
      currency: 'EUR',
      value: 20
    });
    expect(payload.objectData[0].queryID).toBe('q1');
    expect(payload.recordId).toBeUndefined();
    expect(mockRemoveEventFromStore).toHaveBeenCalledWith('/p/1');
  });

  it('sends purchasedObjectIDs when the stored item has no query ID', () => {
    mockGetAllEventFromStore.mockReturnValue({
      '/p/1': {
        queryID: null,
        indexName: 'my_index',
        objectIDs: ['o1'],
        objectData: [{ price: 10, quantity: 1 }]
      }
    });

    run(['o1']);

    const [command, payload] = mockAa.mock.calls[0];
    expect(command).toBe('purchasedObjectIDs');
    expect(payload.currency).toBe('USD');
    expect(payload.value).toBe(10);
  });

  it('ignores stored items that were not purchased', () => {
    mockGetAllEventFromStore.mockReturnValue({
      '/p/1': {
        queryID: 'q1',
        indexName: 'i',
        objectIDs: ['o1'],
        objectData: []
      }
    });

    run(['other']);

    expect(mockAa).not.toHaveBeenCalled();
    expect(mockRemoveEventFromStore).not.toHaveBeenCalled();
  });

  it('ignores stored items without objectIDs', () => {
    mockGetAllEventFromStore.mockReturnValue({
      '/p/1': { queryID: 'q1', indexName: 'i', objectIDs: [] },
      '/p/2': { queryID: 'q1', indexName: 'i' }
    });

    run(['o1']);

    expect(mockAa).not.toHaveBeenCalled();
  });

  it('merges items of the same index into a single event', () => {
    mockGetAllEventFromStore.mockReturnValue({
      '/p/1': {
        queryID: 'q1',
        indexName: 'my_index',
        objectIDs: ['o1'],
        objectData: [{ price: 10, quantity: 1 }]
      },
      '/p/2': {
        queryID: 'q2',
        indexName: 'my_index',
        objectIDs: ['o2'],
        objectData: [{ price: 5, quantity: 1 }]
      }
    });

    run(['o1', 'o2']);

    expect(mockAa).toHaveBeenCalledTimes(1);
    const payload = mockAa.mock.calls[0][1];
    expect(payload.objectIDs).toEqual(['o1', 'o2']);
    expect(payload.value).toBe(15);
  });

  it('sends one event per index', () => {
    mockGetAllEventFromStore.mockReturnValue({
      '/p/1': {
        queryID: 'q1',
        indexName: 'index_a',
        objectIDs: ['o1'],
        objectData: [{ price: 10, quantity: 1 }]
      },
      '/p/2': {
        queryID: 'q2',
        indexName: 'index_b',
        objectIDs: ['o2'],
        objectData: [{ price: 5, quantity: 1 }]
      }
    });

    run(['o1', 'o2']);

    expect(mockAa).toHaveBeenCalledTimes(2);
    expect(mockRemoveEventFromStore).toHaveBeenCalledTimes(2);
  });

  it('includes the authenticated user token when configured', () => {
    turbine.getExtensionSettings.mockReturnValue({
      ...baseExtensionSettings,
      authenticatedUserTokenDataElement: 'auth-user'
    });
    mockGetAllEventFromStore.mockReturnValue({
      '/p/1': {
        queryID: 'q1',
        indexName: 'i',
        objectIDs: ['o1'],
        objectData: [{ price: 1, quantity: 1 }]
      }
    });

    run(['o1']);

    expect(mockAa.mock.calls[0][1].authenticatedUserToken).toBe('auth-user');
  });
});
