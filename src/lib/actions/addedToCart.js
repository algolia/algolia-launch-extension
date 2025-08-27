'use strict';
const window = require('@adobe/reactor-window');
const { updatePayload } = require('../utils/dataPayload');

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
    objectIDs,
    objectData,
    currency: currency || extensionSettings.currency
  };

  if (extensionSettings.authenticatedUserTokenDataElement) {
    payload.authenticatedUserToken = extensionSettings.authenticatedUserTokenDataElement;
  }

  if (objectIDs && objectIDs.length > 0) {
    if (queryID) {
      const updatedPayload = {
        ...updatePayload(payload),
        queryID
      };
      window.aa('addedToCartObjectIDsAfterSearch', updatedPayload);
      turbine.logger.log(
        `Insights command: aa('addedToCartObjectIDsAfterSearch', ${ JSON.stringify(updatedPayload) });).`
      );
    } else {
      const updatedPayload = {
        ...updatePayload(payload)
      };
      window.aa('addedToCartObjectIDs', updatedPayload);
      turbine.logger.log(
        `Insights command: aa('addedToCartObjectIDs', ${ JSON.stringify(updatedPayload) });).`
      );
    }
  }

  return true;
};

