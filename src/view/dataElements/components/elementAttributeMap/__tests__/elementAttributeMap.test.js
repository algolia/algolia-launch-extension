import getInitValues from '../getInitValues';
import getSettings from '../getSettings';
import validate from '../validate';

describe('elementAttributeMap view helpers', () => {
  describe('getInitValues', () => {
    it('defaults to one html/lang mapping for a new data element', () => {
      expect(getInitValues({})).toEqual({
        mappings: [{ selector: 'html', attributeName: 'lang', outputKey: '' }]
      });
    });

    it('maps saved mappings settings', () => {
      expect(
        getInitValues({
          settings: {
            mappings: [
              {
                selector: 'body',
                attributeName: 'data-locale',
                outputKey: 'locale'
              }
            ]
          }
        })
      ).toEqual({
        mappings: [
          {
            selector: 'body',
            attributeName: 'data-locale',
            outputKey: 'locale'
          }
        ]
      });
    });

    it('migrates legacy single-mapping settings', () => {
      expect(
        getInitValues({
          settings: {
            selector: 'html',
            attributeName: 'lang',
            outputKey: 'Accept-Language'
          }
        })
      ).toEqual({
        mappings: [
          {
            selector: 'html',
            attributeName: 'lang',
            outputKey: 'Accept-Language'
          }
        ]
      });
    });
  });

  describe('getSettings', () => {
    it('trims mapping values', () => {
      expect(
        getSettings({
          mappings: [
            {
              selector: ' html ',
              attributeName: ' lang ',
              outputKey: ' '
            }
          ]
        })
      ).toEqual({
        mappings: [{ selector: 'html', attributeName: 'lang', outputKey: '' }]
      });
    });
  });

  describe('validate', () => {
    it('passes with valid mappings', () => {
      expect(
        validate({
          mappings: [{ selector: 'html', attributeName: 'lang' }]
        })
      ).toEqual({});
    });

    it('requires at least one mapping', () => {
      const errors = validate({ mappings: [] });
      expect(errors.mappings.type).toBe('required');
    });

    it('requires selector and attribute name per mapping', () => {
      const errors = validate({
        mappings: [{ selector: '', attributeName: '' }]
      });
      expect(errors.mappings[0].selector.type).toBe('required');
      expect(errors.mappings[0].attributeName.type).toBe('required');
    });

    it('rejects an invalid selector', () => {
      const errors = validate({
        mappings: [{ selector: '!!', attributeName: 'lang' }]
      });
      expect(errors.mappings[0].selector.type).toBe('invalid');
    });

    it('rejects duplicate output keys, including the attribute name fallback', () => {
      const errors = validate({
        mappings: [
          { selector: 'html', attributeName: 'lang', outputKey: '' },
          { selector: 'body', attributeName: 'data-x', outputKey: 'lang' }
        ]
      });
      expect(errors.mappings[0]).toBeUndefined();
      expect(errors.mappings[1].outputKey.type).toBe('duplicate');
    });

    it('allows distinct output keys for the same attribute', () => {
      expect(
        validate({
          mappings: [
            { selector: 'html', attributeName: 'lang', outputKey: 'a' },
            { selector: 'body', attributeName: 'lang', outputKey: 'b' }
          ]
        })
      ).toEqual({});
    });
  });
});
