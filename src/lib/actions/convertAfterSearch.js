'use strict';

const window = require('@adobe/reactor-window');

module.exports = function(settings, event) {
  const extensionSettings = turbine.getExtensionSettings();
  const {
    itemDataElement: { objectID, queryID },
    userTokenDataElement,
    eventName
  } = settings;

  const payload = {
    userTokenDataElement,
    eventName: eventName,
    index: extensionSettings.indexName,
    queryID,
    objectIDs: [objectID]
  };

  window.aa('convertedObjectIDsAfterSearch', payload);

  turbine.logger.log(
    `Insights command: aa('convertedObjectIDsAfterSearch', ${JSON.stringify(payload)});).`
  );
};
