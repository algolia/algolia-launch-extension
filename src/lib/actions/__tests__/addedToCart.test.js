'use strict';

const mockAa = jest.fn();
const mockWindow = { aa: mockAa };

jest.mock('@adobe/reactor-window', () => mockWindow);

const addedToCart = require('../addedToCart');

const baseExtensionSettings = {
  userTokenDataElement: 'user-abc',
  authenticatedUserTokenDataElement: '',
  indexName: 'default_index',
  currency: 'USD'
};

const run = (eventDetailsDataElement) =>
  addedToCart({ eventName: 'Added To Cart', eventDetailsDataElement });

beforeEach(() => {
  mockWindow.aa = mockAa;
  mockAa.mockClear();
  turbine.logger.log.mockClear();
  turbine.getExtensionSettings.mockReset();
  turbine.getExtensionSettings.mockReturnValue(baseExtensionSettings);
});

describe('addedToCart action', () => {
  it('sends addedToCartObjectIDsAfterSearch when a queryID exists', () => {
    const result = run({
      timestamp: 1000,
      queryID: 'q1',
      indexName: 'my_index',
      objectIDs: ['o1'],
      objectData: [{ price: 10, quantity: 2 }],
      currency: 'EUR'
    });

    expect(result).toBe(true);
    const [command, payload] = mockAa.mock.calls[0];
    expect(command).toBe('addedToCartObjectIDsAfterSearch');
    expect(payload).toMatchObject({
      timestamp: 1000,
      eventName: 'Added To Cart',
      index: 'my_index',
      userToken: 'user-abc',
      objectIDs: ['o1'],
      queryID: 'q1',
      currency: 'EUR',
      value: 20
    });
  });

  it('sends addedToCartObjectIDs when there is no queryID', () => {
    run({
      timestamp: 1000,
      objectIDs: ['o1'],
      objectData: [{ price: 5, quantity: 1 }]
    });

    const [command, payload] = mockAa.mock.calls[0];
    expect(command).toBe('addedToCartObjectIDs');
    expect(payload.queryID).toBeUndefined();
    expect(payload.index).toBe('default_index');
    expect(payload.currency).toBe('USD');
    expect(payload.value).toBe(5);
  });

  it('does not send an event when objectIDs are missing or empty', () => {
    run({ timestamp: 1000, queryID: 'q1' });
    run({ timestamp: 1000, objectIDs: [] });

    expect(mockAa).not.toHaveBeenCalled();
  });

  it('omits value when there is no object data', () => {
    run({ timestamp: 1000, objectIDs: ['o1'] });

    expect(mockAa.mock.calls[0][1].value).toBeUndefined();
  });

  it('includes the authenticated user token when configured', () => {
    turbine.getExtensionSettings.mockReturnValue({
      ...baseExtensionSettings,
      authenticatedUserTokenDataElement: 'auth-user'
    });

    run({ timestamp: 1000, objectIDs: ['o1'] });

    expect(mockAa.mock.calls[0][1].authenticatedUserToken).toBe('auth-user');
  });
});
