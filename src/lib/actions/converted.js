'use strict';
const window = require('@adobe/reactor-window');
const { removeEventToStore } = require('../utils/storageManager');

module.exports = function(settings, event) {
  const extensionSettings = turbine.getExtensionSettings();
  const {
    eventDetailsDataElement: {
      timestamp,
      queryID,
      indexName,
      objectIDs
    },
    recordIdDataElement,
    eventName,
    disableRemoveEventFromStore
  } = settings;

  const payload = {
    timestamp,
    eventName,
    index: indexName || extensionSettings.indexName,
    userToken: extensionSettings.userTokenDataElement,
    objectIDs
  };

  const recordId = (recordIdDataElement) ? recordIdDataElement : window.document.location.pathname;

  if (extensionSettings.authenticatedUserTokenDataElement) {
    payload.authenticatedUserToken = extensionSettings.authenticatedUserTokenDataElement;
  }

  if (queryID && objectIDs && objectIDs.length > 0) {
    const updatedPayload = {
      ...payload,
      queryID
    };
    window.aa('convertedObjectIDsAfterSearch', updatedPayload);

    turbine.logger.log(
      `Insights command: aa('convertedObjectIDsAfterSearch', ${ JSON.stringify(updatedPayload) });).`
    );
  } else if (objectIDs && objectIDs.length > 0) {
    window.aa('convertedObjectIDs', payload);
    turbine.logger.log(
      `Insights command: aa('convertedObjectIDs', ${ JSON.stringify(payload) });).`
    );
  }

  if (!disableRemoveEventFromStore) {
    removeEventToStore(recordId);
  }
  return true;
};

