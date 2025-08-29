'use strict';
const window = require('@adobe/reactor-window');
const { getAllEventFromStore, removeEventFromStore } = require('../utils/storageManager');
const { updatePayload } = require('../utils/dataPayload');

module.exports = function(settings, event) {
  const extensionSettings = turbine.getExtensionSettings();
  const {
    eventName,
    purchasedItemsDataElement
  } = settings;
  const payload = {
    timestamp: new Date().getTime(),
    eventName,
    userToken: extensionSettings.userTokenDataElement,
  }

  // get all the events from the browser storage for processing.
  const events = getAllEventFromStore();
  const payloads = {};
  Object.keys(events).forEach(recordId => {
    const {
      queryID,
      indexName,
      objectIDs,
      objectData,
      currency
    } = events[recordId];

    // Check if the Object ID is part of the purchased item before sending the purchase event.
    if (objectIDs && objectIDs.length > 0 && purchasedItemsDataElement.includes(objectIDs[0])) {
      // Add Query ID to each objectData item for purchase event
      if (objectData) {
        objectData.forEach(item => {
          item.queryID = queryID;
        })
      }
      if (payloads[recordId]) {
        const payload = payloads[recordId];
        payload.objectIDs.push(...objectIDs);
        payload.objectData.push(...objectData);
      } else {
        const payload = {
          timestamp: Date.now(),
          eventName,
          index: indexName || extensionSettings.indexName,
          userToken: extensionSettings.userTokenDataElement,
          objectIDs,
          objectData,
          currency: currency || extensionSettings.currency
        }
        if (extensionSettings.authenticatedUserTokenDataElement) {
          payload.authenticatedUserToken = extensionSettings.authenticatedUserTokenDataElement;
        }
        payloads[recordId] = payload;
      }
    }
  });

  // Loop through all the payloads to send purchase event for each index
  Object.keys(payloads).forEach(recordId => {
    const payload = payloads[recordId];
    const objectData = payload.objectData;
    let isPurchasedWithQueryID = false;
    if (objectData && objectData.length > 0) {
      isPurchasedWithQueryID = objectData.find(data => data.queryID !== null);
    }

    if (isPurchasedWithQueryID) {
      const updatedPayload = updatePayload(payload);
      window.aa('purchasedObjectIDsAfterSearch', updatedPayload);
      turbine.logger.log(
        `Insights command: aa('purchasedObjectIDsAfterSearch', ${ JSON.stringify(updatedPayload) });).`
      );
    } else {
      const updatedPayload = updatePayload(payload);
      window.aa('purchasedObjectIDs', updatedPayload);
      turbine.logger.log(
        `Insights command: aa('purchasedObjectIDs', ${ JSON.stringify(updatedPayload) });).`
      );
    }

    // removing from local store since the item is purchased and no future events need to be sent for this object id.
    removeEventFromStore(recordId);
  });
};

