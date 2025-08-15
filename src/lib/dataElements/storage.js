'use strict';
const window = require('@adobe/reactor-window');
const { getEventFromStore } = require('../utils/storageManager');

module.exports = function(settings) {
  const {
    recordIdDataElement
  } = settings;

  const recordId = (recordIdDataElement) ? recordIdDataElement : window.document.location.pathname;
  const algoliaData = getEventFromStore(recordId);

  turbine.logger.log(
    `Storage Data Element', ${ JSON.stringify(algoliaData) });).`
  );

  return algoliaData;
};
