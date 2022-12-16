'use strict';

const window = require('@adobe/reactor-window');

module.exports = function(settings, event) {
  const extensionSettings = turbine.getExtensionSettings();
  const {
    itemDataElement,
    userTokenDataElement,
    eventName
  } = settings;

  const payload = {
    userTokenDataElement,
    eventName: eventName,
    index: extensionSettings.indexName,
    queryID: itemDataElement.get('queryID'),
    objectIDs: [itemDataElement.get('objectID')]
  };

  window.aa('convertedObjectIDsAfterSearch', payload);

  turbine.logger.log(
    `Insights command: aa('convertedObjectIDsAfterSearch', ${JSON.stringify(payload)});).`
  );
};
