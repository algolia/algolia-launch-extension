'use strict';

const document = require('@adobe/reactor-document');
const window = require('@adobe/reactor-window');
const {
  normalizeProxyHeaders,
  createProxyRequestFn
} = require('../utils/proxyHeaders');

module.exports = function (settings) {
  const extensionSettings = turbine.getExtensionSettings();
  const {
    appId,
    apiKey,
    userTokenDataElement,
    authenticatedUserTokenDataElement,
    proxyUrlDataElement,
    proxyHeadersDataElement
  } = extensionSettings;
  const {
    useUserTokenCookie,
    version,
    userHasOptedOutDataElement,
    cookieDuration = 15552000000
  } = settings;
  const ALGOLIA_INSIGHTS_SRC = `https://cdn.jsdelivr.net/npm/search-insights@${version}/dist/search-insights.min.js`;

  // search-insights throws when sending events if appId/apiKey are `undefined`
  // and no per-event credentials are supplied. Coercing to empty strings keeps
  // its credential check satisfied so a credential-hiding proxy (which injects
  // the real credentials server-side) can be used without providing them here.
  const initOptions = {
    appId: appId || '',
    apiKey: apiKey || '',
    useCookie: useUserTokenCookie,
    userHasOptedOut:
      userHasOptedOutDataElement === null || userHasOptedOutDataElement === ''
        ? false
        : userHasOptedOutDataElement,
    cookieDuration
  };

  if (proxyUrlDataElement) {
    initOptions.host = proxyUrlDataElement;
  }

  const resolvedHeaders = normalizeProxyHeaders(proxyHeadersDataElement);

  if (resolvedHeaders) {
    // search-insights' default transport (sendBeacon) can't set HTTP headers,
    // so events go through a fetch-based client from createInsightsClient.
    // window.AlgoliaAnalyticsObject must stay unset until onload: the UMD's
    // default client drains window.aa.queue on parse whenever it is set, which
    // would run `init` on the sendBeacon client instead of ours.
    if (!window.aa) {
      window.aa = function () {
        (window.aa.queue = window.aa.queue || []).push(arguments);
      };
    }
    window.aa.version = version;

    window.aa('init', initOptions);
    window.aa('addAlgoliaAgent', 'algolia-launch-extension (3.2.1)');

    if (userTokenDataElement) {
      window.aa('setUserToken', userTokenDataElement);
    }

    if (authenticatedUserTokenDataElement) {
      window.aa('setAuthenticatedUserToken', authenticatedUserTokenDataElement);
    }

    const script = document.createElement('script');
    const firstScript = document.getElementsByTagName('script')[0];

    script.async = 1;
    script.src = ALGOLIA_INSIGHTS_SRC;
    script.onload = function () {
      // createInsightsClient binds to window[AlgoliaAnalyticsObject]: it drains
      // the queue and routes later aa(...) calls to the new client.
      window.AlgoliaAnalyticsObject = 'aa';

      if (
        window.AlgoliaAnalytics &&
        typeof window.AlgoliaAnalytics.createInsightsClient === 'function'
      ) {
        window.AlgoliaAnalytics.createInsightsClient(
          // getExtensionSettings re-resolves data elements on every call, so
          // each POST picks up the current header values.
          createProxyRequestFn(() =>
            normalizeProxyHeaders(
              turbine.getExtensionSettings().proxyHeadersDataElement
            )
          )
        );
      } else {
        turbine.logger.error(
          'search-insights does not expose createInsightsClient; ' +
            'custom proxy headers could not be applied. ' +
            'Events will not be sent to the proxy.'
        );
      }
    };

    firstScript.parentNode.insertBefore(script, firstScript);
  } else {
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

    window.aa('init', initOptions);
    window.aa('addAlgoliaAgent', 'algolia-launch-extension (3.2.1)');

    if (userTokenDataElement) {
      window.aa('setUserToken', userTokenDataElement);
    }

    if (authenticatedUserTokenDataElement) {
      window.aa('setAuthenticatedUserToken', authenticatedUserTokenDataElement);
    }
  }

  turbine.logger.log('Insights Library Loaded and initialized.');
};
