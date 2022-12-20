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
    userToken: userTokenDataElement,
    index: extensionSettings.indexName,
    eventName: eventName,
    objectIDs: [insightsObjectId]
  };

  if (insightsQueryId && insightsPosition) {
    payload.queryID = insightsQueryId;
    payload.positions = [parseInt(insightsPosition)];
    window.aa('clickedObjectIDsAfterSearch', payload);
  } else {
    window.aa('clickedObjectIDs', payload);
  }

  turbine.logger.log(
    `Insights command: aa('clickedObjectIDsAfterSearch', ${JSON.stringify(payload)});).`
  );
};
