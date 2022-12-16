export default (initInfo) => {
  const { settings } = initInfo;
  const { appId = '', apiKey = '', indexName = '', useUserTokenCookie = true, version = '2.2.3', userHasOptedOutDataElement = '' } = settings || {};

  return {
    appId,
    apiKey,
    indexName,
    useUserTokenCookie,
    version,
    userHasOptedOutDataElement
  };
};
