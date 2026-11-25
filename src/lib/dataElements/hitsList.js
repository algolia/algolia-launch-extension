'use strict';

/**
 * Returns the event details for the "Hits List Changed" event so that it can
 * be used as the Event Details Data Element of the Viewed action:
 * { timestamp, indexName, objectIDs }.
 *
 * Returns an empty object (never undefined) when the rule was not fired by the
 * Hits List Changed event, so consumers can safely destructure the result.
 */
module.exports = function (settings, event) {
  if (!event || !Array.isArray(event.objectIDs) || !event.objectIDs.length) {
    return {};
  }

  const eventDetails = {
    timestamp: event.timestamp || Date.now(),
    indexName: event.indexName,
    objectIDs: event.objectIDs
  };

  turbine.logger.log(
    `Hits List Data Element - Event Details Data: ${JSON.stringify(
      eventDetails
    )}`
  );
  return eventDetails;
};
