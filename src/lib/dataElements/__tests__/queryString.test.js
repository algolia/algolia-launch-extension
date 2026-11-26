'use strict';

const queryString = require('../queryString');

const settings = {
  queryIDParamName: 'queryID',
  indexNameParamName: 'index',
  objectIDParamName: 'objectID',
  positionParamName: 'position'
};

beforeEach(() => {
  turbine.logger.log.mockClear();
});

afterEach(() => {
  delete global.window;
});

describe('queryString data element', () => {
  it('reads Algolia values from the query string', () => {
    global.window = {
      location: { search: '?queryID=q1&index=my_index&objectID=o1&position=5' }
    };

    const result = queryString(settings);

    expect(result).toMatchObject({
      queryID: 'q1',
      indexName: 'my_index',
      objectIDs: ['o1'],
      positions: [5]
    });
    expect(typeof result.timestamp).toBe('number');
  });

  it('exposes the raw query params', () => {
    global.window = { location: { search: '?queryID=q1&other=value' } };

    const result = queryString(settings);

    expect(result.raw.other).toBe('value');
  });

  it('returns null / NaN placeholders for missing params', () => {
    global.window = { location: { search: '' } };

    const result = queryString(settings);

    expect(result.queryID).toBeNull();
    expect(result.indexName).toBeNull();
    expect(result.objectIDs).toEqual([null]);
    expect(result.positions).toEqual([NaN]);
  });

  it('logs the data element output', () => {
    global.window = { location: { search: '' } };

    queryString(settings);

    expect(turbine.logger.log).toHaveBeenCalled();
  });
});
