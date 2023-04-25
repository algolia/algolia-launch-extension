'use strict';
const window = require('@adobe/reactor-window');
const { getEventToStore } = require("../utils/storageManager");

module.exports = function(settings) {
  const algoliaData = getEventToStore(window.document.location.pathname);
  turbine.logger.log(
    `Storage Data Element', ${JSON.stringify(algoliaData)});).`
  );
  return algoliaData;
};
