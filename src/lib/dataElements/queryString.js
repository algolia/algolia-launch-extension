'use strict';

module.exports = function(settings) {
  const { queryIDParam, objectIDParam, positionParam } = settings;
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  const algoliaData = {
    queryID: params[queryIDParam],
    objectID: params[objectIDParam],
    position: params[positionParam]
  }
  turbine.logger.log(
    `QueryString Data Element', ${JSON.stringify(algoliaData)});).`
  );
  return algoliaData;
};
