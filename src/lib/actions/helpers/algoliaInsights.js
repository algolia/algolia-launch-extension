var document = require('@adobe/reactor-document');
var window = require('@adobe/reactor-window');

const ALGOLIA_INSIGHTS_SRC = 'https://cdn.jsdelivr.net/npm/search-insights@2.0.3';
!function (e, a, t, n, s, i, c) {
  e.AlgoliaAnalyticsObject = s, e[s] = e[s] || function () {
    (e[s].queue = e[s].queue || []).push(arguments);
  }, i = a.createElement(t), c = a.getElementsByTagName(t)[0],
    i.async = 1, i.src = n, c.parentNode.insertBefore(i, c);
}(window, document, 'script', ALGOLIA_INSIGHTS_SRC, 'aa');

module.exports = function(settings) {
  window.aa('init', {
    appId: settings.appId,
    apiKey: settings.apiKey,
  });
  return window.aa;
};