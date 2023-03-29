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

  const queryID = itemDataElement.get('queryID');
  const payload = {
    userToken: userTokenDataElement,
    eventName: eventName,
    index: indexDataElement || extensionSettings.indexName,
    objectIDs: [itemDataElement.get('objectID')],
    queryID: queryID
  };

  window.aa('convertedObjectIDsAfterSearch', payload);

  turbine.logger.log(
    `Insights command: aa('convertedObjectIDsAfterSearch', ${JSON.stringify(payload)});).`
  );
};
