import getInitValues from '../getInitValues';
import getSettings from '../getSettings';
import validate from '../validate';

describe('hitsListChanged view helpers', () => {
  describe('getInitValues', () => {
    it('defaults for a new event', () => {
      expect(getInitValues({})).toEqual({
        listSelector:
          '.ais-AutocompleteIndexList, .aa-List, .ais-InfiniteHits-list, .ais-Hits-list',
        indexNameQuerySelector: '[data-indexname], [data-insights-index]',
        debounceMs: '150',
        dedupe: false
      });
    });

    it('maps saved settings', () => {
      expect(
        getInitValues({
          settings: {
            listSelector: '.my-list',
            indexNameQuerySelector: '[data-idx]',
            debounceMs: 0,
            dedupe: true
          }
        })
      ).toEqual({
        listSelector: '.my-list',
        indexNameQuerySelector: '[data-idx]',
        debounceMs: '0',
        dedupe: true
      });
    });
  });

  describe('getSettings', () => {
    it('trims, parses the debounce and falls back to defaults', () => {
      expect(
        getSettings({
          listSelector: ' .my-list ',
          indexNameQuerySelector: ' ',
          debounceMs: '250',
          dedupe: true
        })
      ).toEqual({
        listSelector: '.my-list',
        indexNameQuerySelector: '[data-indexname], [data-insights-index]',
        debounceMs: 250,
        dedupe: true
      });
    });

    it('falls back to the default debounce for invalid input', () => {
      expect(getSettings({ debounceMs: 'abc' }).debounceMs).toBe(150);
      expect(getSettings({ debounceMs: '-5' }).debounceMs).toBe(150);
      expect(getSettings({ debounceMs: '0' }).debounceMs).toBe(0);
    });
  });

  describe('validate', () => {
    const valid = {
      listSelector: '.ais-Hits-list',
      indexNameQuerySelector: '[data-indexname]',
      debounceMs: '150'
    };

    it('accepts valid values', () => {
      expect(validate(valid)).toEqual({});
      expect(validate({ ...valid, debounceMs: '0' })).toEqual({});
    });

    it('requires the selectors', () => {
      const errors = validate({
        ...valid,
        listSelector: ' ',
        indexNameQuerySelector: ''
      });

      expect(errors.listSelector.type).toBe('required');
      expect(errors.indexNameQuerySelector.type).toBe('required');
    });

    it('rejects invalid CSS selectors', () => {
      const errors = validate({ ...valid, listSelector: '[[invalid' });

      expect(errors.listSelector.type).toBe('invalid');
    });

    it('requires a non-negative integer debounce', () => {
      ['-1', '1.5', 'abc', ''].forEach((debounceMs) => {
        expect(validate({ ...valid, debounceMs }).debounceMs.type).toBe(
          'invalid'
        );
      });
    });
  });
});
