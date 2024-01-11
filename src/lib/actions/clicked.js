'use strict';
const window = require('@adobe/reactor-window');
const { addEventToStore, getEventToStore, removeEventToStore } = require('../utils/storageManager');

module.exports = function(settings, event) {
  const extensionSettings = turbine.getExtensionSettings();
  const {
    eventDetailsDataElement: {
      timestamp,
      queryID,
      indexName,
      objectIDs,
      positions
    },
    eventName
  } = settings;

  const payload = {
    timestamp,
    eventName,
    index: indexName || extensionSettings.indexName,
    userToken: extensionSettings.userTokenDataElement,
    objectIDs
  };

  if (extensionSettings.authenticatedUserTokenDataElement) {
    payload.authenticatedUserToken = extensionSettings.authenticatedUserTokenDataElement;
  }

  const path = event.nativeEvent.srcElement.closest('a').href;
  const url = new URL(path);

  if (queryID && objectIDs && positions && objectIDs.length > 0 && positions.length > 0) {
    const updatedPayload = {
      ...payload,
      queryID,
      positions
    };
    window.aa('clickedObjectIDsAfterSearch', updatedPayload);

    addEventToStore(url.pathname, {
      timestamp,
      queryID,
      indexName,
      objectIDs,
      positions
    });

    turbine.logger.log(
      `Insights command: aa('clickedObjectIDsAfterSearch', ${JSON.stringify(updatedPayload)});).`
    );
  } else if (objectIDs) {
    window.aa('clickedObjectIDs', payload);

    addEventToStore(url.pathname, {
      timestamp,
      indexName,
      objectIDs
    });

    turbine.logger.log(
      `Insights command: aa('clickedObjectIDs', ${JSON.stringify(payload)});).`
    );
  }
};

