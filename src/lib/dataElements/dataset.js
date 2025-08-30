'use strict';

const window = require('@adobe/reactor-window');
const { addEventToStore } = require('../utils/storageManager');
const getEventDetailsData = (srcElement, querySelector, queryIDDataElement, objectIDsDataElement, positionsDataElement) => {
  const ancestor = srcElement.closest(querySelector);
  if (ancestor && ancestor.dataset) {
    const dataset = ancestor.dataset;
    const algoliaData = {
      queryID: queryIDDataElement || dataset['insightsQueryId'],
      objectIDs: objectIDsDataElement || [ dataset['insightsObjectId'] ],
      positions: positionsDataElement || [ parseInt(dataset['insightsPosition']) ],
      raw: dataset
    };

    turbine.logger.log(
      `Dataset Data Element - Event Details Data: ', ${ JSON.stringify(algoliaData) });).`
    );
    return algoliaData;
  }
  return {};
};

const getIndexNameData = (srcElement, querySelector, indexNameDataElement) => {
  const ancestor = srcElement.closest(querySelector);
  if (ancestor && ancestor.dataset) {
    const dataset = ancestor.dataset;
    const indexNameData = {
      indexName: indexNameDataElement || dataset['indexname']
    };

    turbine.logger.log(
      `Dataset Data Element - Index Name Data: ', ${ JSON.stringify(indexNameData) });).`
    );
    return indexNameData;
  }
  return {};
};

const getCommerceData = (priceDataElement, quantityDataElement, discountDataElement, currency) => {
  const commerceData  =  {};
  if (priceDataElement) {
    const objectData = {};
    objectData.price = priceDataElement;
    if (quantityDataElement) {
      objectData.quantity = quantityDataElement;
    } else {
      objectData.quantity = 1;
    }
    if (discountDataElement) {
      objectData.discount = discountDataElement;
    }
    commerceData.objectData = [ objectData ];
    commerceData.currency = currency;
  }

  turbine.logger.log(
    `Dataset Data Element - Commerce Data: ', ${ JSON.stringify(commerceData) });).`
  );
  return commerceData;
}

const getRecordId = (srcElement, recordIDDataElement) => {
  if (recordIDDataElement) {
    return recordIDDataElement
  } else {
    const link = srcElement.closest('a').href;
    if (link.startsWith('/')) {
      return link;
    } else {
      const url = new URL(link);
      return url.pathname;
    }
  }
}

module.exports = function(settings, event) {
  const {
    hitQuerySelector,
    indexNameQuerySelector,
    recordIDDataElement,
    queryIDDataElement,
    objectIDsDataElement,
    positionsDataElement,
    indexNameDataElement,
    priceDataElement,
    quantityDataElement,
    discountDataElement,
    currency
  } = settings;

  if (event && event.nativeEvent && event.nativeEvent.target) {
    const srcElement = event.nativeEvent.target;
    const eventDetailsData = getEventDetailsData(srcElement, hitQuerySelector, queryIDDataElement, objectIDsDataElement, positionsDataElement);
    const indexNameData = getIndexNameData(srcElement, indexNameQuerySelector, indexNameDataElement);
    const commerceData = getCommerceData(priceDataElement, quantityDataElement, discountDataElement, currency);

    const recordID = getRecordId(srcElement, recordIDDataElement);
    const payload = {
      timestamp: new Date().getTime(),
      ...eventDetailsData,
      ...indexNameData,
      ...commerceData
    };
    addEventToStore(recordID, payload);

    return {
      ...payload,
      recordID
    };
  }
  return {};
};
