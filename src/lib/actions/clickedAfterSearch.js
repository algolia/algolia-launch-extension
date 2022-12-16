'use strict';
const window = require('@adobe/reactor-window');

module.exports = function(settings, event) {
  const extensionSettings = turbine.getExtensionSettings();
  const {
    itemDataElement: { insightsQueryId, insightsObjectId, insightsPosition },
    userTokenDataElement,
    eventName
  } = settings;

  const payload = {
    userTokenDataElement,
    index: extensionSettings.indexName,
    eventName: eventName,
    queryID: insightsQueryId,
    objectIDs: [insightsObjectId],
    positions: [parseInt(insightsPosition)]
  };

  window.aa('clickedObjectIDsAfterSearch', payload);

  turbine.logger.log(
    `Insights command: aa('clickedObjectIDsAfterSearch', ${JSON.stringify(payload)});).`
  );
};
