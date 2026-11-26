'use strict';

const mockAddEventToStore = jest.fn();

jest.mock('@adobe/reactor-window', () => ({}));
jest.mock('../../utils/storageManager', () => ({
  addEventToStore: (...args) => mockAddEventToStore(...args)
}));

const dataset = require('../dataset');

const makeTarget = ({
  hitDataset,
  indexDataset,
  href = '/product/1'
} = {}) => ({
  closest: (selector) => {
    if (selector === 'a') {
      return { href };
    }
    if (selector === '.hit') {
      return hitDataset ? { dataset: hitDataset } : null;
    }
    if (selector === '.index') {
      return indexDataset ? { dataset: indexDataset } : null;
    }
    return null;
  }
});

const makeEvent = (target) => ({ nativeEvent: { target } });

const baseSettings = {
  hitQuerySelector: '.hit',
  indexNameQuerySelector: '.index'
};

beforeEach(() => {
  mockAddEventToStore.mockClear();
  turbine.logger.log.mockClear();
});

describe('dataset data element', () => {
  it('returns an empty object when there is no event', () => {
    expect(dataset(baseSettings)).toEqual({});
    expect(dataset(baseSettings, {})).toEqual({});
    expect(mockAddEventToStore).not.toHaveBeenCalled();
  });

  it('reads event details and index name from data attributes', () => {
    const hitDataset = {
      insightsQueryId: 'q1',
      insightsObjectId: 'o1',
      insightsPosition: '4'
    };
    const target = makeTarget({
      hitDataset,
      indexDataset: { indexname: 'my_index' }
    });

    const result = dataset(baseSettings, makeEvent(target));

    expect(result).toMatchObject({
      queryID: 'q1',
      objectIDs: ['o1'],
      positions: [4],
      indexName: 'my_index',
      recordID: '/product/1'
    });
    expect(result.raw).toBe(hitDataset);
    expect(typeof result.timestamp).toBe('number');
  });

  it('prefers values supplied by data elements over data attributes', () => {
    const target = makeTarget({
      hitDataset: {
        insightsQueryId: 'q1',
        insightsObjectId: 'o1',
        insightsPosition: '4'
      },
      indexDataset: { indexname: 'attr_index' }
    });

    const result = dataset(
      {
        ...baseSettings,
        queryIDDataElement: 'q-override',
        objectIDsDataElement: ['o-override'],
        positionsDataElement: [9],
        indexNameDataElement: 'override_index'
      },
      makeEvent(target)
    );

    expect(result).toMatchObject({
      queryID: 'q-override',
      objectIDs: ['o-override'],
      positions: [9],
      indexName: 'override_index'
    });
  });

  it('uses the record ID data element when provided', () => {
    const target = makeTarget({
      hitDataset: { insightsObjectId: 'o1', insightsPosition: '1' }
    });

    const result = dataset(
      { ...baseSettings, recordIDDataElement: 'custom-record' },
      makeEvent(target)
    );

    expect(result.recordID).toBe('custom-record');
    expect(mockAddEventToStore).toHaveBeenCalledWith(
      'custom-record',
      expect.objectContaining({ objectIDs: ['o1'] })
    );
  });

  it('uses the pathname of an absolute link as the record ID', () => {
    const target = makeTarget({
      hitDataset: { insightsObjectId: 'o1', insightsPosition: '1' },
      href: 'https://example.com/shop/item-7?x=1'
    });

    const result = dataset(baseSettings, makeEvent(target));

    expect(result.recordID).toBe('/shop/item-7');
  });

  it('includes commerce data when a price is provided', () => {
    const target = makeTarget({
      hitDataset: { insightsObjectId: 'o1', insightsPosition: '1' }
    });

    const result = dataset(
      {
        ...baseSettings,
        priceDataElement: 10,
        quantityDataElement: 3,
        discountDataElement: 0.2,
        currency: 'EUR'
      },
      makeEvent(target)
    );

    expect(result.objectData).toEqual([
      { price: 10, quantity: 3, discount: 0.2 }
    ]);
    expect(result.currency).toBe('EUR');
  });

  it('defaults the quantity to 1 and omits discount when not provided', () => {
    const target = makeTarget({
      hitDataset: { insightsObjectId: 'o1', insightsPosition: '1' }
    });

    const result = dataset(
      { ...baseSettings, priceDataElement: 10 },
      makeEvent(target)
    );

    expect(result.objectData).toEqual([{ price: 10, quantity: 1 }]);
  });

  it('omits commerce data when no price is provided', () => {
    const target = makeTarget({
      hitDataset: { insightsObjectId: 'o1', insightsPosition: '1' }
    });

    const result = dataset(baseSettings, makeEvent(target));

    expect(result.objectData).toBeUndefined();
  });

  it('stores the event keyed by record ID without the record ID in the payload', () => {
    const target = makeTarget({
      hitDataset: { insightsObjectId: 'o1', insightsPosition: '1' }
    });

    dataset(baseSettings, makeEvent(target));

    expect(mockAddEventToStore).toHaveBeenCalledTimes(1);
    const [recordID, payload] = mockAddEventToStore.mock.calls[0];
    expect(recordID).toBe('/product/1');
    expect(payload.recordID).toBeUndefined();
  });
});
