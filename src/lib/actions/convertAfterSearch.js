'use strict';

const window = require('@adobe/reactor-window');

module.exports = function(settings, event) {
  const extensionSettings = turbine.getExtensionSettings();
  const {
    itemDataElement,
    userTokenDataElement,
    eventName
  } = settings;

  const queryID = itemDataElement.get('queryID');
  const payload = {
    userToken: userTokenDataElement,
    eventName: eventName,
    index: extensionSettings.indexName,
    objectIDs: [itemDataElement.get('objectID')]
  };

  if (queryID) {
    payload.queryID = queryID;
    window.aa('convertedObjectIDsAfterSearch', payload);
  } else {
    window.aa('convertedObjectIDs', payload);
  }

  turbine.logger.log(
    `Insights command: aa('convertedObjectIDsAfterSearch', ${JSON.stringify(payload)});).`
  );
};
