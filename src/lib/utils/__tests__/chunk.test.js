'use strict';

const { chunk } = require('../chunk');

describe('chunk', () => {
  it('splits arrays into chunks of the given size', () => {
    expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
    expect(chunk([], 20)).toEqual([]);
    expect(chunk([1], 20)).toEqual([[1]]);
  });
});
