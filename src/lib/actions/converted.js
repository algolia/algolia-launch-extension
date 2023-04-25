'use strict';
const window = require('@adobe/reactor-window');
const { removeEventToStore } = require("../utils/storageManager");

module.exports = function(settings, event) {
  const extensionSettings = turbine.getExtensionSettings();
  const {
    eventDetailsDataElement: {
      queryID,
      indexName,
      objectID,
    },
    userTokenDataElement,
    eventName
  } = settings;

  const payload = {
    eventName,
    indexName: indexName || extensionSettings.indexName,
    userToken: userTokenDataElement,
    objectIDs: [objectID]
  };

  if (queryID) {
    const updatedPayload = {
      ...payload,
      queryID
    };
    window.aa('convertedObjectIDsAfterSearch', updatedPayload);
    removeEventToStore(window.document.location.pathname);
    turbine.logger.log(
      `Insights command: aa('convertedObjectIDsAfterSearch', ${JSON.stringify(updatedPayload)});).`
    );
  } else {
    window.aa('convertedObjectIDs', payload);
    turbine.logger.log(
      `Insights command: aa('convertedObjectIDs', ${JSON.stringify(payload)});).`
    );
  }
};

