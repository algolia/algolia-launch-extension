'use strict';

const document = require('@adobe/reactor-document');
const window = require('@adobe/reactor-window');

module.exports = function (settings) {
  const extensionSettings = turbine.getExtensionSettings();
  const {
    appId,
    apiKey,
    userTokenDataElement,
    authenticatedUserTokenDataElement,
    proxyUrl
  } = extensionSettings;
  const {
    useUserTokenCookie,
    version,
    userHasOptedOutDataElement,
    cookieDuration = 15552000000
  } = settings;
  const ALGOLIA_INSIGHTS_SRC = `https://cdn.jsdelivr.net/npm/search-insights@${version}/dist/search-insights.min.js`;

  !(function (e, a, t, n, s, i, c) {
    (e.AlgoliaAnalyticsObject = s),
      (e[s] =
        e[s] ||
        function () {
          (e[s].queue = e[s].queue || []).push(arguments);
        }),
      (e[s].version = (n.match(/@([^\/]+)\/?/) || [])[1]),
      (i = a.createElement(t)),
      (c = a.getElementsByTagName(t)[0]),
      (i.async = 1),
      (i.src = n),
      c.parentNode.insertBefore(i, c);
  })(window, document, 'script', ALGOLIA_INSIGHTS_SRC, 'aa');

  const initOptions = {
    appId,
    apiKey,
    useCookie: useUserTokenCookie,
    userHasOptedOut:
      userHasOptedOutDataElement === null || userHasOptedOutDataElement === ''
        ? false
        : userHasOptedOutDataElement,
    cookieDuration
  };

  if (proxyUrl) {
    initOptions.host = proxyUrl;
  }

  window.aa('init', initOptions);
  window.aa('addAlgoliaAgent', 'algolia-launch-extension (3.0.0)');

  if (userTokenDataElement) {
    window.aa('setUserToken', userTokenDataElement);
  }

  if (authenticatedUserTokenDataElement) {
    window.aa('setAuthenticatedUserToken', authenticatedUserTokenDataElement);
  }

  turbine.logger.log('Insights Library Loaded and initialized.');
};
