'use strict';
const window = require('@adobe/reactor-window');
const { getEventFromStore, addEventToStore } = require('../utils/storageManager');

module.exports = function(settings) {
  const {
    recordIDDataElement,
    priceDataElement,
    quantityDataElement,
    discountDataElement,
    currency
  } = settings;

  const recordID = (recordIDDataElement) ? recordIDDataElement : window.document.location.pathname;
  const algoliaData = getEventFromStore(recordID);

  if (algoliaData.objectData && algoliaData.objectData.length > 0) {
    const dataItem = algoliaData.objectData[0];
    if (priceDataElement) {
      dataItem.price = priceDataElement;
    }
    if (quantityDataElement) {
      dataItem.quantity = quantityDataElement;
    }
    if (discountDataElement) {
      dataItem.discount = discountDataElement;
    }
  }

  if (currency) {
    algoliaData.currency = currency;
  }

  turbine.logger.log(
    `Storage Data Element', ${ JSON.stringify(algoliaData) });).`
  );

  return {
    ...algoliaData,
    recordID
  };
};
