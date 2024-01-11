'use strict';
const window = require('@adobe/reactor-window');
const { removeEventToStore } = require('../utils/storageManager');

module.exports = function(settings, event) {
  const extensionSettings = turbine.getExtensionSettings();
  const {
    eventDetailsDataElement: {
      timestamp,
      queryID,
      indexName,
      objectIDs,
      objectData,
      currency
    },
    eventName
  } = settings;

  const payload = {
    timestamp,
    eventName,
    index: indexName || extensionSettings.indexName,
    userToken: extensionSettings.userTokenDataElement,
    objectIDs: objectIDs,
    currency: currency || extensionSettings.currency
  };

  if (extensionSettings.authenticatedUserTokenDataElement) {
    payload.authenticatedUserToken = extensionSettings.authenticatedUserTokenDataElement;
  }

  let value;
  if (objectData && objectData.length > 0) {
    payload.objectData = objectData;
    value = objectData.reduce(function(accum, data) {
        return accum + Number(data.price);
      }, 0);
  }

  if (value) {
    payload.value = value;
  }

  if (objectIDs && objectIDs.length > 0) {
    if (queryID) {
      const updatedPayload = {
        ...payload,
        queryID
      };
      window.aa('purchasedObjectIDsAfterSearch', updatedPayload);
      turbine.logger.log(
        `Insights command: aa('purchasedObjectIDsAfterSearch', ${JSON.stringify(updatedPayload)});).`
      );
    } else {
      window.aa('purchasedObjectIDs', payload);
      turbine.logger.log(
        `Insights command: aa('purchasedObjectIDs', ${JSON.stringify(payload)});).`
      );
    }
  }
  removeEventToStore(window.document.location.pathname);
};

