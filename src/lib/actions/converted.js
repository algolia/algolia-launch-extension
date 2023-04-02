'use strict';

const window = require('@adobe/reactor-window');

module.exports = function(settings, event) {
  const extensionSettings = turbine.getExtensionSettings();
  const {
    itemDataElement: {
      queryID,
      objectID,
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

  if (queryID) {
    const updatedPayload = {
      ...payload,
      queryID
    };
    window.aa('convertedObjectIDsAfterSearch', updatedPayload);
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

