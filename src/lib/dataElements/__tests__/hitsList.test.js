'use strict';

const hitsList = require('../hitsList');

describe('hitsList data element', () => {
  it('returns an empty object when there is no event', () => {
    expect(hitsList({})).toEqual({});
    expect(hitsList({}, undefined)).toEqual({});
    expect(hitsList({}, null)).toEqual({});
  });

  it('returns an empty object when objectIDs is missing or empty', () => {
    expect(hitsList({}, {})).toEqual({});
    expect(hitsList({}, { objectIDs: [] })).toEqual({});
    expect(hitsList({}, { objectIDs: 'a' })).toEqual({});
  });

  it('passes objectIDs, indexName and timestamp through', () => {
    expect(
      hitsList(
        {},
        { objectIDs: ['a', 'b'], indexName: 'products', timestamp: 1234 }
      )
    ).toEqual({
      objectIDs: ['a', 'b'],
      indexName: 'products',
      timestamp: 1234
    });
  });

  it('defaults the timestamp when the event has none', () => {
    const result = hitsList({}, { objectIDs: ['a'] });

    expect(result.objectIDs).toEqual(['a']);
    expect(result.indexName).toBeUndefined();
    expect(typeof result.timestamp).toBe('number');
  });
});
