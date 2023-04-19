'use strict';

module.exports = function(settings) {
  const { queryIDParamName, indexNameParamName, objectIDParamName, positionParamName } = settings;
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  const algoliaData = {
    queryID: params[queryIDParamName],
    indexName: params[indexNameParamName],
    objectID: params[objectIDParamName],
    position: params[positionParamName]
  }
  turbine.logger.log(
    `QueryString Data Element', ${JSON.stringify(algoliaData)});).`
  );
  return algoliaData;
};
