'use strict';

const mockWindow = { document: { location: { pathname: '/current/page' } } };
const mockGetEventFromStore = jest.fn();
const mockAddEventToStore = jest.fn();

jest.mock('@adobe/reactor-window', () => mockWindow);
jest.mock('../../utils/storageManager', () => ({
  getEventFromStore: (...args) => mockGetEventFromStore(...args),
  addEventToStore: (...args) => mockAddEventToStore(...args)
}));

const storage = require('../storage');

beforeEach(() => {
  mockGetEventFromStore.mockReset();
  mockAddEventToStore.mockClear();
  turbine.logger.log.mockClear();
});

describe('storage data element', () => {
  it('uses the current pathname as the record ID by default', () => {
    mockGetEventFromStore.mockReturnValue({ objectIDs: ['o1'] });

    const result = storage({});

    expect(mockGetEventFromStore).toHaveBeenCalledWith('/current/page');
    expect(result.recordID).toBe('/current/page');
    expect(result.objectIDs).toEqual(['o1']);
  });

  it('uses the record ID data element when provided', () => {
    mockGetEventFromStore.mockReturnValue({});

    const result = storage({ recordIDDataElement: 'custom' });

    expect(mockGetEventFromStore).toHaveBeenCalledWith('custom');
    expect(result.recordID).toBe('custom');
  });

  it('adds price, quantity, discount and currency to the stored record', () => {
    mockGetEventFromStore.mockReturnValue({ objectIDs: ['o1'] });

    const result = storage({
      priceDataElement: 10,
      quantityDataElement: 2,
      discountDataElement: 0.1,
      currency: 'EUR'
    });

    expect(result.objectData).toEqual([
      { price: 10, quantity: 2, discount: 0.1 }
    ]);
    expect(result.currency).toBe('EUR');
  });

  it('keeps existing object data and only overrides provided fields', () => {
    mockGetEventFromStore.mockReturnValue({
      objectData: [{ price: 5, quantity: 3 }],
      currency: 'USD'
    });

    const result = storage({ priceDataElement: 8 });

    expect(result.objectData).toEqual([{ price: 8, quantity: 3 }]);
    expect(result.currency).toBe('USD');
  });

  it('creates an empty object data entry when nothing is provided', () => {
    mockGetEventFromStore.mockReturnValue({});

    const result = storage({});

    expect(result.objectData).toEqual([{}]);
  });

  it('persists the updated record', () => {
    mockGetEventFromStore.mockReturnValue({ objectIDs: ['o1'] });

    storage({ priceDataElement: 10 });

    expect(mockAddEventToStore).toHaveBeenCalledWith(
      '/current/page',
      expect.objectContaining({ objectIDs: ['o1'] })
    );
  });
});
