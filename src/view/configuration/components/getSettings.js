export default ({
  credentialType,
  appId,
  apiKey,
  indexName,
  userTokenDataElement,
  authenticatedUserTokenDataElement,
  currency,
  proxyUrlDataElement,
  proxyHeadersDataElement
}) => {
  const resolvedCredentialType =
    credentialType || (proxyUrlDataElement ? 'proxy' : 'credentials');
  const usingProxy = resolvedCredentialType === 'proxy';

  return {
    credentialType: resolvedCredentialType,
    appId,
    apiKey,
    indexName,
    userTokenDataElement,
    authenticatedUserTokenDataElement,
    currency,
    // Only persist proxy fields when the proxy authentication method is
    // selected, so switching back to direct credentials doesn't leave stale
    // values that would still route events through the proxy at runtime.
    proxyUrlDataElement: usingProxy ? proxyUrlDataElement : '',
    proxyHeadersDataElement: usingProxy ? proxyHeadersDataElement : ''
  };
};
