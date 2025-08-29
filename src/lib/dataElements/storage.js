'use strict';
const window = require('@adobe/reactor-window');
const { getEventFromStore, addEventToStore } = require('../utils/storageManager');

const updateCommerceData = (algoliaData, priceDataElement, quantityDataElement, discountDataElement, currency) => {
  if (!algoliaData.objectData) {
    algoliaData.objectData = [{}];
  }

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
  if (currency) {
    algoliaData.currency = currency;
  }
}

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

  updateCommerceData(algoliaData, priceDataElement, quantityDataElement, discountDataElement, currency);

  turbine.logger.log(
    `Storage Data Element', ${ JSON.stringify(algoliaData) });).`
  );

  addEventToStore(recordID, algoliaData);

  return {
    ...algoliaData,
    recordID
  };
};
