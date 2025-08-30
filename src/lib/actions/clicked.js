'use strict';
const window = require('@adobe/reactor-window');

module.exports = function(settings, event) {
  const extensionSettings = turbine.getExtensionSettings();
  const {
    eventDetailsDataElement: {
      timestamp,
      queryID,
      indexName,
      objectIDs,
      objectData,
      positions,
      price,
      quantity,
      discount,
      currency
    },
    eventName
  } = settings;

  const commerceData = price ? { price, quantity, discount, objectData, currency: currency || extensionSettings.currency } : {};
  const payload = {
    timestamp,
    eventName,
    index: indexName || extensionSettings.indexName,
    userToken: extensionSettings.userTokenDataElement,
    objectIDs,
    price,
    quantity,
    discount,
    objectData,
    currency
  };

  if (extensionSettings.authenticatedUserTokenDataElement) {
    payload.authenticatedUserToken = extensionSettings.authenticatedUserTokenDataElement;
  }

  if (queryID && objectIDs && positions && objectIDs.length > 0 && positions.length > 0) {
    const updatedPayload = {
      ...payload,
      queryID,
      positions
    };
    window.aa('clickedObjectIDsAfterSearch', updatedPayload);

    turbine.logger.log(
      `Insights command: aa('clickedObjectIDsAfterSearch', ${ JSON.stringify(updatedPayload) });).`
    );
  } else if (objectIDs) {
    window.aa('clickedObjectIDs', payload);

    turbine.logger.log(
      `Insights command: aa('clickedObjectIDs', ${ JSON.stringify(payload) });).`
    );
  }
  return true;
};

