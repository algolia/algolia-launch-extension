import addedToCartGetInitValues from '../addedToCart/getInitValues';
import addedToCartGetSettings from '../addedToCart/getSettings';
import addedToCartValidate from '../addedToCart/validate';
import clickedGetInitValues from '../clicked/getInitValues';
import clickedGetSettings from '../clicked/getSettings';
import clickedValidate from '../clicked/validate';
import convertedGetInitValues from '../converted/getInitValues';
import convertedGetSettings from '../converted/getSettings';
import convertedValidate from '../converted/validate';
import loadInsightsGetInitValues from '../loadInsights/getInitValues';
import loadInsightsGetSettings from '../loadInsights/getSettings';
import loadInsightsValidate from '../loadInsights/validate';
import purchasedGetInitValues from '../purchased/getInitValues';
import purchasedGetSettings from '../purchased/getSettings';
import purchasedValidate from '../purchased/validate';
import viewedGetInitValues from '../viewed/getInitValues';
import viewedGetSettings from '../viewed/getSettings';
import viewedValidate from '../viewed/validate';

const eventDetailsActions = [
  [
    'addedToCart',
    addedToCartGetInitValues,
    addedToCartGetSettings,
    addedToCartValidate
  ],
  ['clicked', clickedGetInitValues, clickedGetSettings, clickedValidate],
  ['viewed', viewedGetInitValues, viewedGetSettings, viewedValidate]
];

describe.each(eventDetailsActions)(
  '%s view helpers',
  (name, getInitValues, getSettings, validate) => {
    describe('getInitValues', () => {
      it('defaults to empty values for a new action', () => {
        expect(getInitValues({})).toEqual({
          eventDetailsDataElement: '',
          eventName: ''
        });
      });

      it('maps saved settings', () => {
        expect(
          getInitValues({
            settings: {
              eventDetailsDataElement: '%details%',
              eventName: 'My Event'
            }
          })
        ).toEqual({
          eventDetailsDataElement: '%details%',
          eventName: 'My Event'
        });
      });
    });

    describe('getSettings', () => {
      it('returns only the supported settings', () => {
        expect(
          getSettings({
            eventDetailsDataElement: '%details%',
            eventName: 'My Event',
            somethingElse: true
          })
        ).toEqual({
          eventDetailsDataElement: '%details%',
          eventName: 'My Event'
        });
      });
    });

    describe('validate', () => {
      it('requires the event details data element and event name', () => {
        const errors = validate({});

        expect(errors.eventDetailsDataElement.type).toBe('required');
        expect(errors.eventName.type).toBe('required');
      });

      it('passes when all required values are present', () => {
        expect(
          validate({ eventDetailsDataElement: '%d%', eventName: 'Event' })
        ).toEqual({});
      });
    });
  }
);

describe('converted view helpers', () => {
  describe('getInitValues', () => {
    it('defaults to empty values and store removal enabled', () => {
      expect(convertedGetInitValues({})).toEqual({
        eventDetailsDataElement: '',
        eventName: '',
        disableRemoveEventFromStore: false
      });
    });

    it('maps saved settings', () => {
      expect(
        convertedGetInitValues({
          settings: {
            eventDetailsDataElement: '%d%',
            eventName: 'Converted',
            disableRemoveEventFromStore: true
          }
        })
      ).toEqual({
        eventDetailsDataElement: '%d%',
        eventName: 'Converted',
        disableRemoveEventFromStore: true
      });
    });
  });

  describe('getSettings', () => {
    it('returns the supported settings', () => {
      expect(
        convertedGetSettings({
          eventDetailsDataElement: '%d%',
          eventName: 'Converted',
          disableRemoveEventFromStore: true,
          extra: 1
        })
      ).toEqual({
        eventDetailsDataElement: '%d%',
        eventName: 'Converted',
        disableRemoveEventFromStore: true
      });
    });
  });

  describe('validate', () => {
    it('requires the event details data element and event name', () => {
      const errors = convertedValidate({});

      expect(errors.eventDetailsDataElement.type).toBe('required');
      expect(errors.eventName.type).toBe('required');
    });

    it('passes when all required values are present', () => {
      expect(
        convertedValidate({ eventDetailsDataElement: '%d%', eventName: 'E' })
      ).toEqual({});
    });
  });
});

describe('purchased view helpers', () => {
  describe('getInitValues', () => {
    it('defaults the event name to empty', () => {
      expect(purchasedGetInitValues({})).toEqual({
        eventName: '',
        purchasedItemsDataElement: undefined
      });
    });

    it('maps saved settings', () => {
      expect(
        purchasedGetInitValues({
          settings: { eventName: 'Purchased', purchasedItemsDataElement: '%p%' }
        })
      ).toEqual({ eventName: 'Purchased', purchasedItemsDataElement: '%p%' });
    });
  });

  describe('getSettings', () => {
    it('returns the supported settings', () => {
      expect(
        purchasedGetSettings({
          eventName: 'Purchased',
          purchasedItemsDataElement: '%p%',
          extra: 1
        })
      ).toEqual({ eventName: 'Purchased', purchasedItemsDataElement: '%p%' });
    });
  });

  describe('validate', () => {
    it('requires the event name', () => {
      expect(purchasedValidate({}).eventName.type).toBe('required');
    });

    it('passes when the event name is present', () => {
      expect(purchasedValidate({ eventName: 'Purchased' })).toEqual({});
    });
  });
});

describe('loadInsights view helpers', () => {
  describe('getInitValues', () => {
    it('defaults to the bundled insights version', () => {
      expect(loadInsightsGetInitValues({})).toEqual({
        useUserTokenCookie: false,
        version: '2.17.3',
        userHasOptedOutDataElement: ''
      });
    });

    it('maps saved settings', () => {
      expect(
        loadInsightsGetInitValues({
          settings: {
            useUserTokenCookie: true,
            version: '2.0.0',
            userHasOptedOutDataElement: '%optout%'
          }
        })
      ).toEqual({
        useUserTokenCookie: true,
        version: '2.0.0',
        userHasOptedOutDataElement: '%optout%'
      });
    });
  });

  describe('getSettings', () => {
    it('returns the supported settings', () => {
      expect(
        loadInsightsGetSettings({
          useUserTokenCookie: true,
          version: '2.0.0',
          userHasOptedOutDataElement: '%optout%',
          extra: 1
        })
      ).toEqual({
        useUserTokenCookie: true,
        version: '2.0.0',
        userHasOptedOutDataElement: '%optout%'
      });
    });
  });

  describe('validate', () => {
    it('has no required fields', () => {
      expect(loadInsightsValidate({})).toEqual({});
    });
  });
});
