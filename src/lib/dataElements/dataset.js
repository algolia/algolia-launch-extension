'use strict';

const getEventDetailsData = (srcElement, querySelector) => {
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
  return {};
}

const getIndexNameData = (srcElement, querySelector) => {
  const ancestor = srcElement.closest(querySelector);
  if (ancestor && ancestor.dataset) {
    const dataset = ancestor.dataset;
    const algoliaData = {
      indexName: dataset.get('data-indexname')
    }
    turbine.logger.log(
      `Dataset Data Element', ${JSON.stringify(algoliaData)});).`
    );
    return algoliaData;
  }
  return {};
}

module.exports = function(settings, event) {
  const { hitQuerySelector, indexNameQuerySelector } = settings;

  if (event && event.nativeEvent && event.nativeEvent.srcElement) {
    const srcElement = event.nativeEvent.srcElement;
    return {
      ...getEventDetailsData(srcElement, hitQuerySelector),
      ...getIndexNameData(srcElement, indexNameQuerySelector)
    }
  }
  return {};
};
