'use strict';
const window = require('@adobe/reactor-window');

module.exports = function(settings) {
  const extensionSettings = turbine.getExtensionSettings();
  const {
    itemDataElement: {
      insightsObjectId
    },
    userTokenDataElement,
    indexDataElement,
    eventName
  } = settings;

  const payload = {
    userToken: userTokenDataElement,
    index: indexDataElement || extensionSettings.indexName,
    eventName: eventName,
    objectIDs: [insightsObjectId]
  };

  window.aa('clickedObjectIDs', payload);

  turbine.logger.log(
    `Insights command: aa('clickedObjectIDs', ${JSON.stringify(payload)});).`
  );
};
