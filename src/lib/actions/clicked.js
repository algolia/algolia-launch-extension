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
    recordIdDataElement,
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

  const recordId = (() => {
    if (recordIdDataElement) {
      return recordIdDataElement
    } else {
      const path = event.nativeEvent.target.closest('a').href;
      const url = new URL(path);
      return url.pathname;
    }
  })();

  if (queryID && objectIDs && positions && objectIDs.length > 0 && positions.length > 0) {
    const updatedPayload = {
      ...payload,
      queryID,
      positions
    };
    window.aa('clickedObjectIDsAfterSearch', updatedPayload);

    addEventToStore(recordId, {
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

    addEventToStore(recordId, {
      timestamp,
      indexName,
      objectIDs
    });

    turbine.logger.log(
      `Insights command: aa('clickedObjectIDs', ${JSON.stringify(payload)});).`
    );
  }
  return true;
};

