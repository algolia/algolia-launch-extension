'use strict';
const window = require('@adobe/reactor-window');
const { removeEventToStore } = require('../utils/storageManager');

function updatePayload(payload, objectData) {
  const updatedPayload = {
    ...payload,
    objectData
  };
  const value = objectData.reduce(function(accum, data) {
    return accum + Number(data.price) * Number(data.quantity);
  }, 0);
  if (value) {
    updatedPayload.value = value;
  }
  return updatedPayload;
}

module.exports = function(settings, event) {
  const extensionSettings = turbine.getExtensionSettings();
  const {
    eventDetailsDataElement: {
      timestamp,
      indexName,
      objectIDs,
      objectData
    },
    eventName,
    currency
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

  let isPurchasedWithQueryID = false;
  if (objectData && objectData.length > 0) {
    isPurchasedWithQueryID = objectData.find(data => data.queryID !== null);
  }

  if (isPurchasedWithQueryID) {
    const updatedPayload = updatePayload(payload, objectData);
    window.aa('purchasedObjectIDsAfterSearch', updatedPayload);
    turbine.logger.log(
      `Insights command: aa('purchasedObjectIDsAfterSearch', ${JSON.stringify(updatedPayload)});).`
    );
  } else {
    const updatedPayload = updatePayload(payload, objectData);
    window.aa('purchasedObjectIDs', updatedPayload);
    turbine.logger.log(
      `Insights command: aa('purchasedObjectIDs', ${JSON.stringify(updatedPayload)});).`
    );
  }
  return true;
};

