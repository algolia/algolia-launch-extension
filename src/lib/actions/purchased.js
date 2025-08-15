'use strict';
const window = require('@adobe/reactor-window');
const { clearEventsToStore } = require('../utils/storageManager');
const { updatePayload } = require('../utils/dataPayload');

module.exports = function(settings, event) {
  const extensionSettings = turbine.getExtensionSettings();
  const {
    eventDetailsDataElement: {
      timestamp,
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

  let isPurchasedWithQueryID = false;
  if (objectData && objectData.length > 0) {
    isPurchasedWithQueryID = objectData.find(data => data.queryID !== null);
  }

  if (isPurchasedWithQueryID) {
    const updatedPayload = updatePayload(payload, objectData);
    window.aa('purchasedObjectIDsAfterSearch', updatedPayload);
    turbine.logger.log(
      `Insights command: aa('purchasedObjectIDsAfterSearch', ${ JSON.stringify(updatedPayload) });).`
    );
  } else {
    const updatedPayload = updatePayload(payload, objectData);
    window.aa('purchasedObjectIDs', updatedPayload);
    turbine.logger.log(
      `Insights command: aa('purchasedObjectIDs', ${ JSON.stringify(updatedPayload) });).`
    );
  }

  clearEventsToStore();
  return true;
};

