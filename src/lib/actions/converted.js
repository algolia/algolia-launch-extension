'use strict';

const window = require('@adobe/reactor-window');

module.exports = function(settings, event) {
  const extensionSettings = turbine.getExtensionSettings();
  const {
    itemDataElement,
    userTokenDataElement,
    indexDataElement,
    eventName
  } = settings;

  const payload = {
    userToken: userTokenDataElement,
    eventName: eventName,
    index: indexDataElement || extensionSettings.indexName,
    objectIDs: [itemDataElement.get('objectID')]
  };

  window.aa('convertedObjectIDs', payload);

  turbine.logger.log(
    `Insights command: aa('convertedObjectIDs', ${JSON.stringify(payload)});).`
  );
};
