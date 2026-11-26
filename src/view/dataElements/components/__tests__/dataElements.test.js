import datasetGetInitValues from '../dataset/getInitValues';
import datasetGetSettings from '../dataset/getSettings';
import datasetValidate from '../dataset/validate';
import queryStringGetInitValues from '../queryString/getInitValues';
import queryStringGetSettings from '../queryString/getSettings';
import queryStringValidate from '../queryString/validate';
import storageGetInitValues from '../storage/getInitValues';
import storageGetSettings from '../storage/getSettings';
import storageValidate from '../storage/validate';

describe('dataset view helpers', () => {
  const settings = {
    hitQuerySelector: '.hit',
    indexNameQuerySelector: '.index',
    recordIDDataElement: '%record%',
    queryIDDataElement: '%query%',
    objectIDsDataElement: '%objects%',
    positionsDataElement: '%positions%',
    indexNameDataElement: '%index%',
    priceDataElement: '%price%',
    quantityDataElement: '%quantity%',
    discountDataElement: '%discount%',
    currency: 'USD'
  };

  describe('getInitValues', () => {
    it('defaults the selectors to empty for a new data element', () => {
      const values = datasetGetInitValues({});

      expect(values.hitQuerySelector).toBe('');
      expect(values.indexNameQuerySelector).toBe('');
      expect(values.currency).toBeUndefined();
    });

    it('maps saved settings', () => {
      expect(datasetGetInitValues({ settings })).toEqual(settings);
    });
  });

  describe('getSettings', () => {
    it('returns only the supported settings', () => {
      expect(datasetGetSettings({ ...settings, extra: 1 })).toEqual(settings);
    });
  });

  describe('validate', () => {
    it('requires both selectors', () => {
      const errors = datasetValidate({});

      expect(errors.hitQuerySelector.type).toBe('required');
      expect(errors.indexNameQuerySelector.type).toBe('required');
    });

    it('passes when both selectors are present', () => {
      expect(
        datasetValidate({
          hitQuerySelector: '.hit',
          indexNameQuerySelector: '.index'
        })
      ).toEqual({});
    });
  });
});

describe('queryString view helpers', () => {
  const settings = {
    queryIDParamName: 'qid',
    objectIDParamName: 'oid',
    positionParamName: 'pos',
    indexNameParamName: 'idx'
  };

  describe('getInitValues', () => {
    it('defaults every param name to empty', () => {
      expect(queryStringGetInitValues({})).toEqual({
        queryIDParamName: '',
        objectIDParamName: '',
        positionParamName: '',
        indexNameParamName: ''
      });
    });

    it('maps saved settings', () => {
      expect(queryStringGetInitValues({ settings })).toEqual(settings);
    });
  });

  describe('getSettings', () => {
    it('returns only the supported settings', () => {
      expect(queryStringGetSettings({ ...settings, extra: 1 })).toEqual(
        settings
      );
    });
  });

  describe('validate', () => {
    it('requires the object ID param name', () => {
      expect(queryStringValidate({}).objectIDParamName.type).toBe('required');
    });

    it('passes when the object ID param name is present', () => {
      expect(queryStringValidate({ objectIDParamName: 'oid' })).toEqual({});
    });
  });
});

describe('storage view helpers', () => {
  const settings = {
    recordIDDataElement: '%record%',
    priceDataElement: '%price%',
    quantityDataElement: '%quantity%',
    discountDataElement: '%discount%',
    currency: 'EUR'
  };

  describe('getInitValues', () => {
    it('defaults the record ID to empty', () => {
      const values = storageGetInitValues({});

      expect(values.recordIDDataElement).toBe('');
      expect(values.priceDataElement).toBeUndefined();
    });

    it('maps saved settings', () => {
      expect(storageGetInitValues({ settings })).toEqual(settings);
    });
  });

  describe('getSettings', () => {
    it('returns only the supported settings', () => {
      expect(storageGetSettings({ ...settings, extra: 1 })).toEqual(settings);
    });
  });

  describe('validate', () => {
    it('has no required fields', () => {
      expect(storageValidate({})).toEqual({});
    });
  });
});
