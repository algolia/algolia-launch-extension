'use strict';
const window = require('@adobe/reactor-window');
const { addEventToStore } = require("../utils/storage");

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
    userToken: userTokenDataElement,
    index: indexName || extensionSettings.indexName,
    eventName,
    objectIDs: [objectID]
  };

  if (queryID && position) {
    const updatedPayload = {
      ...payload,
      queryID,
      positions: [parseInt(position)]
    };
    window.aa('clickedObjectIDsAfterSearch', updatedPayload);
    addEventToStore(window.document.location.pathname, updatedPayload);
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

