'use strict';
const window = require('@adobe/reactor-window');

module.exports = function(settings, event) {
  const extensionSettings = turbine.getExtensionSettings();
  const {
    itemDataElement: {
      insightsQueryId,
      insightsObjectId,
      insightsPosition
    },
    userTokenDataElement,
    indexDataElement,
    eventName
  } = settings;

  const payload = {
    userToken: userTokenDataElement,
    index: indexDataElement || extensionSettings.indexName,
    eventName: eventName,
    objectIDs: [insightsObjectId],
    queryID: insightsQueryId,
    positions: [parseInt(insightsPosition)],
  };

  window.aa('clickedObjectIDsAfterSearch', payload);

  turbine.logger.log(
    `Insights command: aa('clickedObjectIDsAfterSearch', ${JSON.stringify(payload)});).`
  );
};
