'use strict';

module.exports = function(settings, event) {
  const { querySelector } = settings;

  if (event && event.nativeEvent && event.nativeEvent.srcElement) {
    const srcElement = event.nativeEvent.srcElement;
    const ancestor = srcElement.closest(querySelector);
    if (ancestor) {
      const algoliaData = {
        queryID: ancestor.dataset.get('insightsQueryId'),
        objectID: ancestor.dataset.get('insightsObjectId'),
        position: ancestor.dataset.get('insightsPosition')
      }
      turbine.logger.log(
        `Dataset Data Element', ${JSON.stringify(algoliaData)});).`
      );
      return algoliaData;
    }
  }
  return null;
};
