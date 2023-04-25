'use strict';
const window = require('@adobe/reactor-window');
module.exports = function(settings) {
  const extensionSettings = turbine.getExtensionSettings();
  const {
    eventDetailsDataElement: {
      indexName,
      objectID,
      position
    },
    userTokenDataElement,
    eventName
  } = settings;

  const payload = {
    index: indexName || extensionSettings.indexName,
    objectIDs: [objectID],
    positions: [position],
    userToken: userTokenDataElement,
    eventName
  };

  window.aa('viewedObjectIDs', payload);

  turbine.logger.log(
    `Insights command: aa('viewedObjectIDs', ${JSON.stringify(payload)});).`
  );
};
