const document = require('@adobe/reactor-document');
const window = require('@adobe/reactor-window');

module.exports = function(settings) {
  const extensionSettings = turbine.getExtensionSettings();
  const {
    appId,
    apiKey,
    userTokenDataElement,
    authenticatedUserTokenDataElement
  } = extensionSettings;
  const {
    useUserTokenCookie = false,
    version = '2.13.0',
    userHasOptedOutDataElement = false,
    cookieDuration = 15552000000
  } = settings;
  const ALGOLIA_INSIGHTS_SRC = `https://cdn.jsdelivr.net/npm/search-insights@${ version }/dist/search-insights.min.js`;

  !function(e, a, t, n, s, i, c) {
    e.AlgoliaAnalyticsObject = s, e[s] = e[s] || function() {
      (e[s].queue = e[s].queue || []).push(arguments);
    }, e[s].version = (n.match(/@([^\/]+)\/?/) || [])[1], i = a.createElement(t), c = a.getElementsByTagName(t)[0],
      i.async = 1, i.src = n, c.parentNode.insertBefore(i, c);
  }(window, document, 'script', ALGOLIA_INSIGHTS_SRC, 'aa');

  window.aa('init', {
    appId: appId,
    apiKey: apiKey,
    useCookie: useUserTokenCookie,
    userHasOptedOut: userHasOptedOutDataElement,
    cookieDuration: cookieDuration
  });
  window.aa('addAlgoliaAgent', 'algolia-launch-extension (2.3.0-beta.2)');

  if (userTokenDataElement) {
    window.aa('setUserToken', userTokenDataElement);
  }

  if (authenticatedUserTokenDataElement) {
    window.aa('setAuthenticatedUserToken', authenticatedUserTokenDataElement);
  }

  turbine.logger.log(
    `Insights Library Loaded and initialized.`
  );
};
