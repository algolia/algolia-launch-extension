'use strict';
const document = require('@adobe/reactor-document');

module.exports = function(settings) {
  return  new URLSearchParams(document.location.search);
};
