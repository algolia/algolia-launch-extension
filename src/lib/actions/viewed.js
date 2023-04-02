'use strict';

const window = require('@adobe/reactor-window');
module.exports = function(settings) {
  const extensionSettings = turbine.getExtensionSettings();
  const {
    itemDataElement: {
      objectID,
    },
    userTokenDataElement,
    indexDataElement,
    eventName
  } = settings;

  const payload = {
    userToken: userTokenDataElement,
    index: indexDataElement ?? extensionSettings.indexName,
    eventName: eventName,
    objectIDs: [objectID]
  };

  window.aa('viewedObjectIDs', payload);

  turbine.logger.log(
    `Insights command: aa('viewedObjectIDs', ${JSON.stringify(payload)});).`
  );
};
