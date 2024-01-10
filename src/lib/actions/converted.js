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
      objectID,
    },
    eventName
  } = settings;

  const payload = {
    timestamp,
    userToken: extensionSettings.userTokenDataElement,
    index: indexName || extensionSettings.indexName,
    eventName,
    objectIDs: [objectID]
  };

  if (extensionSettings.authenticatedUserTokenDataElement) {
    payload.authenticatedUserToken = extensionSettings.authenticatedUserTokenDataElement;
  }

  if (queryID && objectID) {
    const updatedPayload = {
      ...payload,
      queryID
    };
    window.aa('convertedObjectIDsAfterSearch', updatedPayload);

    turbine.logger.log(
      `Insights command: aa('convertedObjectIDsAfterSearch', ${JSON.stringify(updatedPayload)});).`
    );
  } else if (objectID) {
    window.aa('convertedObjectIDs', payload);
    turbine.logger.log(
      `Insights command: aa('convertedObjectIDs', ${JSON.stringify(payload)});).`
    );
  }
  removeEventToStore(window.document.location.pathname);
};

