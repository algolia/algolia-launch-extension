const document = require('@adobe/reactor-document');
const window = require('@adobe/reactor-window');

module.exports = function(settings) {
  const extensionSettings = turbine.getExtensionSettings();
  const { appId, apiKey, useUserTokenCookie } = extensionSettings;

  const ALGOLIA_INSIGHTS_SRC = "https://cdn.jsdelivr.net/npm/search-insights@2.2.1";
  !function(e,a,t,n,s,i,c){e.AlgoliaAnalyticsObject=s,e[s]=e[s]||function(){
    (e[s].queue=e[s].queue||[]).push(arguments)},i=a.createElement(t),c=a.getElementsByTagName(t)[0],
    i.async=1,i.src=n,c.parentNode.insertBefore(i,c)
  }(window,document,"script",ALGOLIA_INSIGHTS_SRC,"aa");

  window.aa('init', {
    appId: appId,
    apiKey: apiKey,
    useCookie: useUserTokenCookie,
  });

  turbine.logger.log(
    `Insights Library Loaded and initialized.`
  );
};
