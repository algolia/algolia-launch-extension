'use strict';

const mockQuerySelector = jest.fn();

jest.mock('@adobe/reactor-window', () => ({
  document: { querySelector: (...args) => mockQuerySelector(...args) }
}));

const elementAttributeMap = require('../elementAttributeMap');

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

describe('elementAttributeMap data element', () => {
  it('defaults to the lang attribute on the html tag', () => {
    mockQuerySelector.mockReturnValue(makeElement({ lang: 'en-US' }));

    const result = elementAttributeMap({});

    expect(mockQuerySelector).toHaveBeenCalledWith('html');
    expect(result).toEqual({ lang: 'en-US' });
  });

  it('works when settings are undefined', () => {
    mockQuerySelector.mockReturnValue(makeElement({ lang: 'fr' }));

    expect(elementAttributeMap()).toEqual({ lang: 'fr' });
  });

  it('supports legacy single-mapping settings', () => {
    mockQuerySelector.mockReturnValue(makeElement({ lang: 'en-US' }));

    const result = elementAttributeMap({ outputKey: 'Accept-Language' });

    expect(result).toEqual({ 'Accept-Language': 'en-US' });
  });

  it('merges multiple mappings into one object', () => {
    mockQuerySelector
      .mockReturnValueOnce(makeElement({ lang: 'en-US' }))
      .mockReturnValueOnce(makeElement({ content: 'US' }));

    const result = elementAttributeMap({
      mappings: [
        {
          selector: 'html',
          attributeName: 'lang',
          outputKey: 'Accept-Language'
        },
        {
          selector: 'meta[name="countryCodeIso2"]',
          attributeName: 'content',
          outputKey: 'X-Country'
        }
      ]
    });

    expect(mockQuerySelector).toHaveBeenNthCalledWith(1, 'html');
    expect(mockQuerySelector).toHaveBeenNthCalledWith(
      2,
      'meta[name="countryCodeIso2"]'
    );
    expect(result).toEqual({
      'Accept-Language': 'en-US',
      'X-Country': 'US'
    });
  });

  it('skips mappings that cannot be resolved and keeps the rest', () => {
    mockQuerySelector
      .mockReturnValueOnce(null)
      .mockReturnValueOnce(makeElement({ lang: 'en' }));

    const result = elementAttributeMap({
      mappings: [
        { selector: '#missing', attributeName: 'lang', outputKey: 'Missing' },
        {
          selector: 'html',
          attributeName: 'lang',
          outputKey: 'Accept-Language'
        }
      ]
    });

    expect(result).toEqual({ 'Accept-Language': 'en' });
  });

  it('trims whitespace from mapping settings', () => {
    mockQuerySelector.mockReturnValue(makeElement({ lang: 'en' }));

    const result = elementAttributeMap({
      mappings: [
        {
          selector: '  html ',
          attributeName: ' lang ',
          outputKey: ' locale '
        }
      ]
    });

    expect(mockQuerySelector).toHaveBeenCalledWith('html');
    expect(result).toEqual({ locale: 'en' });
  });

  it('falls back to a DOM property when the attribute is missing', () => {
    mockQuerySelector.mockReturnValue(makeElement({}, { title: 'Hello' }));

    const result = elementAttributeMap({
      mappings: [{ attributeName: 'title' }]
    });

    expect(result).toEqual({ title: 'Hello' });
  });

  it('returns an empty object when no mappings resolve', () => {
    mockQuerySelector.mockReturnValue(null);

    expect(
      elementAttributeMap({
        mappings: [{ selector: '#missing', attributeName: 'lang' }]
      })
    ).toEqual({});
  });

  it('returns an empty object and logs an error for an invalid selector', () => {
    mockQuerySelector.mockImplementation(() => {
      throw new Error('bad selector');
    });

    expect(
      elementAttributeMap({
        mappings: [{ selector: '!!', attributeName: 'lang' }]
      })
    ).toEqual({});
    expect(turbine.logger.error).toHaveBeenCalled();
  });
});
