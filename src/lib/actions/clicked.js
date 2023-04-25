'use strict';
const window = require('@adobe/reactor-window');
const { addEventToStore, getEventToStore, removeEventToStore } = require("../utils/storageManager");

module.exports = function(settings, event) {
  const extensionSettings = turbine.getExtensionSettings();
  const {
    eventDetailsDataElement: {
      queryID,
      indexName,
      objectID,
      position
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

  if (queryID && position) {
    const updatedPayload = {
      ...payload,
      queryID,
      positions: [position]
    };
    window.aa('clickedObjectIDsAfterSearch', updatedPayload);

    const path = event.nativeEvent.srcElement.closest('a').href;
    const url = new URL(path);
    addEventToStore(url.pathname, {
      queryID,
      indexName,
      objectID,
      position
    });
    turbine.logger.log(
      `Insights command: aa('clickedObjectIDsAfterSearch', ${JSON.stringify(updatedPayload)});).`
    );
  } else {
    window.aa('clickedObjectIDs', payload);
    turbine.logger.log(
      `Insights command: aa('clickedObjectIDs', ${JSON.stringify(payload)});).`
    );
  }


};

