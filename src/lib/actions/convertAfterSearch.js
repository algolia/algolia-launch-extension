'use strict';
const document = require('@adobe/reactor-document');
const algoliaInsights = require('./helpers/algoliaInsights');

module.exports = function(settings, event) {
  const extensionSettings = turbine.getExtensionSettings();
  const aa = algoliaInsights(extensionSettings);
  const data = getDataFromQuery();
  const userToken = getUserToken(aa);

  if (data) {
    const { objectID, queryID } = data;
    if (queryID && queryID !== '' && queryID !== 'item') {
      console.debug('convertedObjectIDsAfterSearch: event', {
        userToken,
        eventName: settings.eventName,
        index: extensionSettings.indexName,
        queryID,
        objectIDs: [objectID]
      });
      aa('convertedObjectIDsAfterSearch', {
        userToken,
        eventName: settings.eventName,
        index: extensionSettings.indexName,
        queryID,
        objectIDs: [objectID]
      });
    } else {
      console.debug('convertedObjectIDs: event', {
        userToken,
        index: extensionSettings.indexName,
        eventName: settings.eventName,
        objectIDs: [objectID],
      });
      aa('convertedObjectIDs', {
        userToken,
        index: extensionSettings.indexName,
        eventName: settings.eventName,
        objectIDs: [objectID],
      });
    }
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

const getDataFromQuery = function() {
  const urlParams = new URLSearchParams(document.location.search);
  return {
    objectID: urlParams.get('objectID'),
    queryID: urlParams.get('queryID')
  };
}