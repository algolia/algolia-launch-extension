export default ({
  credentialType,
  appId,
  apiKey,
  indexName,
  userTokenDataElement,
  authenticatedUserTokenDataElement,
  currency,
  proxyUrlDataElement
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
    // Only persist the proxy URL when the proxy authentication method is
    // selected, so switching back to direct credentials doesn't leave a stale
    // host that would still route events through the proxy at runtime.
    proxyUrlDataElement: usingProxy ? proxyUrlDataElement : ''
  };
};
