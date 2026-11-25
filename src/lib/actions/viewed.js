'use strict';
const window = require('@adobe/reactor-window');
const { chunk } = require('../events/helpers/hitsList');

// Algolia rejects viewedObjectIDs events with more than 20 objectIDs.
const MAX_OBJECT_IDS_PER_EVENT = 20;

module.exports = function (settings) {
  const extensionSettings = turbine.getExtensionSettings();
  const { eventDetailsDataElement, eventName } = settings;
  const { timestamp, indexName, objectIDs } = eventDetailsDataElement || {};

  if (!Array.isArray(objectIDs) || objectIDs.length === 0) {
    return true;
  }

  if (typeof window.aa !== 'function') {
    turbine.logger.warn(
      "Insights command: aa('viewedObjectIDs') skipped because Algolia " +
        'Insights (window.aa) is not loaded. Make sure the Load Insights ' +
        'action runs first.'
    );
    return true;
  }

  chunk(objectIDs, MAX_OBJECT_IDS_PER_EVENT).forEach((batch) => {
    const payload = {
      timestamp,
      eventName,
      userToken: extensionSettings.userTokenDataElement,
      index: indexName || extensionSettings.indexName,
      objectIDs: batch
    };

    if (extensionSettings.authenticatedUserTokenDataElement) {
      payload.authenticatedUserToken =
        extensionSettings.authenticatedUserTokenDataElement;
    }

    window.aa('viewedObjectIDs', payload);

    turbine.logger.log(
      `Insights command: aa('viewedObjectIDs', ${JSON.stringify(payload)});).`
    );
  });

  return true;
};
