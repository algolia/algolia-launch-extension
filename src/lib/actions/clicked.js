'use strict';
const window = require('@adobe/reactor-window');
const { addEventToStore, getEventToStore, removeEventToStore } = require("../utils/storageManager");

module.exports = function(settings, event) {
  const extensionSettings = turbine.getExtensionSettings();
  const {
    eventDetailsDataElement: {
      timestamp,
      queryID,
      indexName,
      objectID,
      position
    },
    userTokenDataElement,
    eventName
  } = settings;

  const payload = {
    timestamp,
    eventName,
    index: indexName || extensionSettings.indexName,
    userToken: userTokenDataElement,
    objectIDs: [objectID]
  };

  const path = event.nativeEvent.srcElement.closest('a').href;
  const url = new URL(path);

  if (queryID && objectID && position) {
    const updatedPayload = {
      ...payload,
      queryID,
      positions: [parseInt(position)]
    };
    window.aa('clickedObjectIDsAfterSearch', updatedPayload);

    addEventToStore(url.pathname, {
      timestamp,
      queryID,
      indexName,
      objectID,
      position
    });

    turbine.logger.log(
      `Insights command: aa('clickedObjectIDsAfterSearch', ${JSON.stringify(updatedPayload)});).`
    );
  } else if (objectID) {
    window.aa('clickedObjectIDs', payload);

    addEventToStore(url.pathname, {
      timestamp,
      indexName,
      objectID
    });

    turbine.logger.log(
      `Insights command: aa('clickedObjectIDs', ${JSON.stringify(payload)});).`
    );
  }
};

