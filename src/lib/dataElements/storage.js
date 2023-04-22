'use strict';
const window = require('@adobe/reactor-window');

const { getEventToStore } = require("../utils/storage");
module.exports = function(settings) {
  return getEventToStore(window.document.location.pathname);
};
