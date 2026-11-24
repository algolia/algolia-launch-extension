'use strict';

const mockQuerySelector = jest.fn();

jest.mock('@adobe/reactor-window', () => ({
  document: { querySelector: (...args) => mockQuerySelector(...args) }
}));

const htmlAttribute = require('../htmlAttribute');

const makeElement = (attributes = {}, properties = {}) => ({
  getAttribute: (name) =>
    Object.prototype.hasOwnProperty.call(attributes, name)
      ? attributes[name]
      : null,
  ...properties
});

beforeEach(() => {
  mockQuerySelector.mockReset();
  turbine.logger.log.mockClear();
  turbine.logger.error.mockClear();
});

describe('htmlAttribute data element', () => {
  it('defaults to the lang attribute on the html tag', () => {
    mockQuerySelector.mockReturnValue(makeElement({ lang: 'en-US' }));

    const result = htmlAttribute({});

    expect(mockQuerySelector).toHaveBeenCalledWith('html');
    expect(result).toEqual({ lang: 'en-US' });
  });

  it('works when settings are undefined', () => {
    mockQuerySelector.mockReturnValue(makeElement({ lang: 'fr' }));

    expect(htmlAttribute()).toEqual({ lang: 'fr' });
  });

  it('overrides the attribute name', () => {
    mockQuerySelector.mockReturnValue(makeElement({ dir: 'rtl' }));

    const result = htmlAttribute({ attributeName: 'dir' });

    expect(result).toEqual({ dir: 'rtl' });
  });

  it('uses a custom selector for other elements', () => {
    mockQuerySelector.mockReturnValue(
      makeElement({ 'data-locale': 'de-DE' })
    );

    const result = htmlAttribute({
      selector: 'body',
      attributeName: 'data-locale'
    });

    expect(mockQuerySelector).toHaveBeenCalledWith('body');
    expect(result).toEqual({ 'data-locale': 'de-DE' });
  });

  it('uses the output key as the JSON key when provided', () => {
    mockQuerySelector.mockReturnValue(makeElement({ lang: 'en-US' }));

    const result = htmlAttribute({ outputKey: 'Accept-Language' });

    expect(result).toEqual({ 'Accept-Language': 'en-US' });
  });

  it('trims whitespace from settings', () => {
    mockQuerySelector.mockReturnValue(makeElement({ lang: 'en' }));

    const result = htmlAttribute({
      selector: '  html ',
      attributeName: ' lang ',
      outputKey: ' locale '
    });

    expect(mockQuerySelector).toHaveBeenCalledWith('html');
    expect(result).toEqual({ locale: 'en' });
  });

  it('falls back to a DOM property when the attribute is missing', () => {
    mockQuerySelector.mockReturnValue(makeElement({}, { title: 'Hello' }));

    const result = htmlAttribute({ attributeName: 'title' });

    expect(result).toEqual({ title: 'Hello' });
  });

  it('returns an empty object when the element is not found', () => {
    mockQuerySelector.mockReturnValue(null);

    expect(htmlAttribute({ selector: '#missing' })).toEqual({});
  });

  it('returns an empty object when the attribute is missing or empty', () => {
    mockQuerySelector.mockReturnValue(makeElement({ lang: '' }, { lang: '' }));

    expect(htmlAttribute({})).toEqual({});
  });

  it('returns an empty object and logs an error for an invalid selector', () => {
    mockQuerySelector.mockImplementation(() => {
      throw new Error('bad selector');
    });

    expect(htmlAttribute({ selector: '!!' })).toEqual({});
    expect(turbine.logger.error).toHaveBeenCalled();
  });
});
