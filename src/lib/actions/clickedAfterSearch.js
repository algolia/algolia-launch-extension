'use strict';

const algoliaInsights = require('./helpers/algoliaInsights');

module.exports = function(settings, event) {
  const extensionSettings = turbine.getExtensionSettings();
  const aa = algoliaInsights(extensionSettings);
  const dataSet = getDataSet(settings.className, event);

  if (dataSet) {
    const { insightsQueryId, insightsObjectId, insightsPosition } = dataSet;
    const userToken = getUserToken(aa);
    console.debug('clickedObjectIDsAfterSearch: event', {
      userToken,
      index: extensionSettings.indexName,
      eventName: settings.eventName,
      queryID: insightsQueryId,
      objectIDs: [insightsObjectId],
      positions: [parseInt(insightsPosition)]
    });
    aa('clickedObjectIDsAfterSearch', {
      userToken,
      index: extensionSettings.indexName,
      eventName: settings.eventName,
      queryID: insightsQueryId,
      objectIDs: [insightsObjectId],
      positions: [parseInt(insightsPosition)]
    });
  }
};

const getUserToken = function(aa) {
  let userToken;
  aa('getUserToken', null, (err, newUserToken) => {
    if (err) {
      console.error(err);
      return;
    }
    userToken = newUserToken;
  });
  return userToken;
}

const getDataSet = function(className, event) {
  if (event.nativeEvent && event.nativeEvent.target) {
    const ancestor = event.nativeEvent.target.closest(className);
    if (ancestor) {
      return ancestor.dataset;
    }
  }
  return null;
}
