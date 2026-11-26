'use strict';

const mockAa = jest.fn();
const mockWindow = { aa: mockAa };

jest.mock('@adobe/reactor-window', () => mockWindow);

const clicked = require('../clicked');

const baseExtensionSettings = {
  userTokenDataElement: 'user-abc',
  authenticatedUserTokenDataElement: '',
  indexName: 'default_index',
  currency: 'USD'
};

const run = (eventDetailsDataElement, extra = {}) =>
  clicked({
    eventName: 'Product Clicked',
    eventDetailsDataElement,
    ...extra
  });

beforeEach(() => {
  mockWindow.aa = mockAa;
  mockAa.mockClear();
  turbine.logger.log.mockClear();
  turbine.getExtensionSettings.mockReset();
  turbine.getExtensionSettings.mockReturnValue(baseExtensionSettings);
});

describe('clicked action', () => {
  it('sends clickedObjectIDsAfterSearch when queryID, objectIDs and positions exist', () => {
    const result = run({
      timestamp: 1000,
      queryID: 'q1',
      indexName: 'my_index',
      objectIDs: ['o1'],
      positions: [3]
    });

    expect(result).toBe(true);
    expect(mockAa).toHaveBeenCalledTimes(1);
    const [command, payload] = mockAa.mock.calls[0];
    expect(command).toBe('clickedObjectIDsAfterSearch');
    expect(payload).toMatchObject({
      timestamp: 1000,
      eventName: 'Product Clicked',
      index: 'my_index',
      userToken: 'user-abc',
      objectIDs: ['o1'],
      queryID: 'q1',
      positions: [3]
    });
  });

  it('sends clickedObjectIDs when there is no queryID', () => {
    run({ timestamp: 1000, indexName: 'my_index', objectIDs: ['o1'] });

    const [command, payload] = mockAa.mock.calls[0];
    expect(command).toBe('clickedObjectIDs');
    expect(payload.objectIDs).toEqual(['o1']);
    expect(payload.queryID).toBeUndefined();
  });

  it('sends clickedObjectIDs when positions are missing', () => {
    run({ timestamp: 1000, queryID: 'q1', objectIDs: ['o1'] });

    expect(mockAa.mock.calls[0][0]).toBe('clickedObjectIDs');
  });

  it('does nothing when objectIDs are missing', () => {
    const result = run({ timestamp: 1000, queryID: 'q1' });

    expect(result).toBe(true);
    expect(mockAa).not.toHaveBeenCalled();
  });

  it('falls back to the extension indexName', () => {
    run({ timestamp: 1000, indexName: '', objectIDs: ['o1'] });

    expect(mockAa.mock.calls[0][1].index).toBe('default_index');
  });

  it('includes the authenticated user token when configured', () => {
    turbine.getExtensionSettings.mockReturnValue({
      ...baseExtensionSettings,
      authenticatedUserTokenDataElement: 'auth-user'
    });

    run({ timestamp: 1000, objectIDs: ['o1'] });

    expect(mockAa.mock.calls[0][1].authenticatedUserToken).toBe('auth-user');
  });

  it('passes commerce data from the event details through to the payload', () => {
    run({
      timestamp: 1000,
      objectIDs: ['o1'],
      price: 10,
      quantity: 2,
      discount: 0.1,
      objectData: [{ price: 10 }],
      currency: 'EUR'
    });

    const payload = mockAa.mock.calls[0][1];
    expect(payload.price).toBe(10);
    expect(payload.quantity).toBe(2);
    expect(payload.discount).toBe(0.1);
    expect(payload.objectData).toEqual([{ price: 10 }]);
    expect(payload.currency).toBe('EUR');
  });

  it('omits the currency when the event details do not include one', () => {
    run({ timestamp: 1000, objectIDs: ['o1'] });

    expect(mockAa.mock.calls[0][1].currency).toBeUndefined();
  });
});
