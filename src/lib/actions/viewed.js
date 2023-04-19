'use strict';

const window = require('@adobe/reactor-window');
module.exports = function(settings) {
  const extensionSettings = turbine.getExtensionSettings();
  const {
    eventDetailsDataElement: {
      objectID,
      indexName
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

  window.aa('viewedObjectIDs', payload);

  turbine.logger.log(
    `Insights command: aa('viewedObjectIDs', ${JSON.stringify(payload)});).`
  );
};
