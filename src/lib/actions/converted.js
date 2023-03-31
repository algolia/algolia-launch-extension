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
    userTokenDataElement,
    userToken: userTokenDataElement,
    eventName: eventName,
    index: extensionSettings.indexName,
    queryID: itemDataElement.get('queryID'),
    objectIDs: [itemDataElement.get('objectID')]
  };

  window.aa('convertedObjectIDsAfterSearch', payload);
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

