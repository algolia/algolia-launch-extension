'use strict';

const getEventDetailsData = (srcElement, querySelector) => {
  const ancestor = srcElement.closest(querySelector);
  if (ancestor && ancestor.dataset) {
    const dataset = ancestor.dataset;
    const algoliaData = {
      queryID: dataset['insightsQueryId'],
      objectIDs: [dataset['insightsObjectId']],
      positions: [parseInt(dataset['insightsPosition'])],
      raw: dataset
    };

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
      indexName: dataset['indexname']
    }

    turbine.logger.log(
      `Dataset Data Element', ${JSON.stringify(algoliaData)});).`
    );

    return algoliaData;
  }
  return {};
}

module.exports = function(settings, event) {
  const {
    hitQuerySelector,
    indexNameQuerySelector,
    queryIDDataElement,
    objectIDsDataElement,
    positionsDataElement,
    indexNameDataElement
  } = settings;

  if (event && event.nativeEvent && event.nativeEvent.target) {
    const srcElement = event.nativeEvent.target;
    const eventDetailsData = getEventDetailsData(srcElement, hitQuerySelector);
    if (queryIDDataElement) {
      eventDetailsData.queryID = queryIDDataElement;
    }

    if (objectIDsDataElement) {
      eventDetailsData.objectIDs = objectIDsDataElement;
    }

    if (positionsDataElement) {
      eventDetailsData.positions = positionsDataElement;
    }

    const indexNameData = getIndexNameData(srcElement, indexNameQuerySelector);
    if (indexNameDataElement) {
      eventDetailsData.indexName = indexNameDataElement;
    }

    return {
      timestamp: new Date().getTime(),
      ...eventDetailsData,
      ...indexNameData
    };
  }
  return {};
};
