export default (initInfo) => {
  const { settings } = initInfo;
  const { appId = '', apiKey = '', indexName = '', userTokenDataElement = '', authenticatedUserTokenDataElement = '', useUserTokenCookie = true, version = '2.2.3', userHasOptedOutDataElement = '', currency = '' } = settings || {};

  return {
    appId,
    apiKey,
    indexName,
    userTokenDataElement,
    authenticatedUserTokenDataElement,
    useUserTokenCookie,
    version,
    userHasOptedOutDataElement,
    currency
  };
};
