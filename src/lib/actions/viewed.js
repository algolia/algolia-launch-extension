'use strict';
const window = require('@adobe/reactor-window');
module.exports = function(settings) {
  const extensionSettings = turbine.getExtensionSettings();
  const {
    eventDetailsDataElement: {
      timestamp,
      indexName,
      objectIDs
    },
    userTokenDataElement,
    eventName
  } = settings;

  const payload = {
    timestamp,
    eventName,
    userToken: userTokenDataElement || extensionSettings.userTokenDataElement,
    index: indexName || extensionSettings.indexName,
    objectIDs
  };

  if (objectIDs && objectIDs.length > 0) {
    window.aa('viewedObjectIDs', payload);
  }

  turbine.logger.log(
    `Insights command: aa('viewedObjectIDs', ${JSON.stringify(payload)});).`
  );
};
