export default (initInfo) => {
  const { settings } = initInfo;
  const {
    credentialType,
    appId = '',
    apiKey = '',
    indexName = '',
    userTokenDataElement = '',
    authenticatedUserTokenDataElement = '',
    currency = '',
    proxyUrl = ''
  } = settings || {};

  return {
    // Fall back to the presence of a proxy URL for configurations saved before
    // the authentication method was made explicit.
    credentialType: credentialType || (proxyUrl ? 'proxy' : 'credentials'),
    appId,
    apiKey,
    indexName,
    userTokenDataElement,
    authenticatedUserTokenDataElement,
    currency,
    proxyUrl
  };
};
