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
    eventName
  } = settings;

  const payload = {
    timestamp,
    eventName,
    userToken: extensionSettings.userTokenDataElement,
    index: indexName || extensionSettings.indexName,
    objectIDs
  };

  if (extensionSettings.authenticatedUserTokenDataElement) {
    payload.authenticatedUserToken = extensionSettings.authenticatedUserTokenDataElement;
  }

  if (objectIDs && objectIDs.length > 0) {
    window.aa('viewedObjectIDs', payload);
  }

  turbine.logger.log(
    `Insights command: aa('viewedObjectIDs', ${JSON.stringify(payload)});).`
  );
  return true;
};
