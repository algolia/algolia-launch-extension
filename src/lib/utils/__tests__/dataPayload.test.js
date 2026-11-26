'use strict';

const { getTotal, updatePayload } = require('../dataPayload');

describe('dataPayload', () => {
  describe('getTotal', () => {
    it('returns 0 when there is no object data', () => {
      expect(getTotal(undefined)).toBe(0);
      expect(getTotal([])).toBe(0);
    });

    it('multiplies price by quantity', () => {
      expect(getTotal([{ price: 10, quantity: 3 }])).toBe(30);
    });

    it('applies the discount as a fraction of the price', () => {
      expect(getTotal([{ price: 100, quantity: 2, discount: 0.1 }])).toBe(180);
    });

    it('sums all items and converts string values to numbers', () => {
      expect(
        getTotal([
          { price: '19.99', quantity: '1' },
          { price: 5.5, quantity: 2 }
        ])
      ).toBeCloseTo(30.99, 2);
    });

    it('rounds each item price to two decimals', () => {
      expect(getTotal([{ price: 10, quantity: 1, discount: 0.3333 }])).toBe(
        6.67
      );
    });
  });

  describe('updatePayload', () => {
    it('adds the total value when it is greater than zero', () => {
      const payload = { objectData: [{ price: 10, quantity: 2 }] };

      expect(updatePayload(payload)).toEqual({
        objectData: [{ price: 10, quantity: 2 }],
        value: 20
      });
    });

    it('does not mutate the input payload', () => {
      const payload = { objectData: [{ price: 10, quantity: 2 }] };

      updatePayload(payload);

      expect(payload.value).toBeUndefined();
    });

    it('does not add a value when the total is zero', () => {
      expect(updatePayload({ objectIDs: ['1'] })).toEqual({ objectIDs: ['1'] });
    });
  });
});
