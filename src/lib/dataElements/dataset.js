'use strict';

module.exports = function(settings, event) {
  const { querySelector } = settings;

  if (event && event.nativeEvent && event.nativeEvent.srcElement) {
    const srcElement = event.nativeEvent.srcElement;
    const ancestor = srcElement.closest(querySelector);
    if (ancestor && ancestor.dataset) {
      const dataset = ancestor.dataset;
      const algoliaData = {
        queryID: dataset.get('insightsQueryId'),
        objectID: dataset.get('insightsObjectId'),
        position: dataset.get('insightsPosition')
      }
      turbine.logger.log(
        `Dataset Data Element', ${JSON.stringify(algoliaData)});).`
      );
      return algoliaData;
    }
  }
  return null;
};
