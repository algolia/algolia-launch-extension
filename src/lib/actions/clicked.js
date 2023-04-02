'use strict';
const window = require('@adobe/reactor-window');

module.exports = function(settings, event) {
  const extensionSettings = turbine.getExtensionSettings();
  const {
    itemDataElement: {
      queryID,
      objectID,
      position
    },
    userTokenDataElement,
    eventName,
    indexDataElement
  } = settings;

  const payload = {
    userToken: userTokenDataElement,
    index: indexDataElement ?? extensionSettings.indexName,
    eventName: eventName,
    objectIDs: [objectID]
  };

  if (queryID && position) {
    const updatedPayload = {
      ...payload,
      queryID: queryID,
      positions: [parseInt(position)]
    };
    window.aa('clickedObjectIDsAfterSearch', updatedPayload);
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

