'use strict';
const window = require('@adobe/reactor-window');
const { removeEventToStore } = require("../utils/storageManager");

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
    userTokenDataElement,
    authenticatedUserTokenDataElement,
    eventName
  } = settings;

  const payload = {
    timestamp,
    eventName,
    index: indexName || extensionSettings.indexName,
    userToken: userTokenDataElement || extensionSettings.userToken,
    objectIDs: objectIDs,
    currency: currency || extensionSettings.currency
  };

  if (authenticatedUserTokenDataElement || extensionSettings.authenticatedUserToken) {
    payload.authenticatedUserToken = authenticatedUserTokenDataElement || extensionSettings.authenticatedUserToken;
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
      window.aa('addedToCartObjectIDsAfterSearch', updatedPayload);
      turbine.logger.log(
        `Insights command: aa('addedToCartObjectIDsAfterSearch', ${JSON.stringify(updatedPayload)});).`
      );
    } else {
      window.aa('addedToCartObjectIDs', payload);
      turbine.logger.log(
        `Insights command: aa('addedToCartObjectIDs', ${JSON.stringify(payload)});).`
      );
    }
  }
  removeEventToStore(window.document.location.pathname);
};

