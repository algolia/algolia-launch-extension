'use strict';
const window = require('@adobe/reactor-window');
const { getEventToStore } = require('../utils/storageManager');

module.exports = function(settings) {
  const {
    recordIdDataElement
  } = settings;

  const recordId = (recordIdDataElement) ? recordIdDataElement : window.document.location.pathname;
  const algoliaData = getEventToStore(recordId);

  turbine.logger.log(
    `Storage Data Element', ${ JSON.stringify(algoliaData) });).`
  );

  return algoliaData;
};
