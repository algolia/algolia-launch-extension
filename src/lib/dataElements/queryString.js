'use strict';

module.exports = function(settings) {
  const { queryIDParamName, indexNameParamName, objectIDParamName, positionParamName } = settings;
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop)
  });
  const algoliaData = {
    timestamp: new Date().getTime(),
    queryID: params[queryIDParamName],
    indexName: params[indexNameParamName],
    objectIDs: [ params[objectIDParamName] ],
    positions: [ parseInt(params[positionParamName]) ],
    raw: params
  };

  turbine.logger.log(
    `QueryString Data Element', ${ JSON.stringify(algoliaData) });).`
  );

  return algoliaData;
};
