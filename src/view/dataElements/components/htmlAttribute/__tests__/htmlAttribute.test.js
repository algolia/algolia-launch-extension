import getInitValues from '../getInitValues';
import getSettings from '../getSettings';
import validate from '../validate';

describe('htmlAttribute view helpers', () => {
  describe('getInitValues', () => {
    it('defaults to html / lang for a new data element', () => {
      expect(getInitValues({})).toEqual({
        selector: 'html',
        attributeName: 'lang',
        outputKey: ''
      });
    });

    it('maps saved settings', () => {
      expect(
        getInitValues({
          settings: {
            selector: 'body',
            attributeName: 'data-locale',
            outputKey: 'locale'
          }
        })
      ).toEqual({
        selector: 'body',
        attributeName: 'data-locale',
        outputKey: 'locale'
      });
    });
  });

  describe('getSettings', () => {
    it('trims values', () => {
      expect(
        getSettings({
          selector: ' html ',
          attributeName: ' lang ',
          outputKey: ' '
        })
      ).toEqual({ selector: 'html', attributeName: 'lang', outputKey: '' });
    });
  });

  describe('validate', () => {
    it('passes with valid values', () => {
      expect(validate({ selector: 'html', attributeName: 'lang' })).toEqual({});
    });

    it('requires selector and attribute name', () => {
      const errors = validate({ selector: '', attributeName: '' });
      expect(errors.selector.type).toBe('required');
      expect(errors.attributeName.type).toBe('required');
    });

    it('rejects an invalid selector', () => {
      const errors = validate({ selector: '!!', attributeName: 'lang' });
      expect(errors.selector.type).toBe('invalid');
    });
  });
});
