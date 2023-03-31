'use strict';

const window = require('@adobe/reactor-window');
module.exports = function(settings) {
  const extensionSettings = turbine.getExtensionSettings();
  const {
    itemDataElement: {
      insightsObjectId,
    },
    userTokenDataElement,
    indexDataElement,
    eventName
  } = settings;

  const payload = {
    userToken: userTokenDataElement,
    index: indexDataElement.get('index') || extensionSettings.indexName,
    eventName: eventName,
    objectIDs: [insightsObjectId]
  };

  window.aa('viewedObjectIDs', payload);

  turbine.logger.log(
    `Insights command: aa('viewedObjectIDs', ${JSON.stringify(payload)});).`
  );
};
