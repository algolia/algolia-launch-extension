export default (initInfo) => {
  const { settings } = initInfo;
  const { appId = '', apiKey = '', indexName = '', useUserTokenCookie = false } = settings || {};

  return {
    appId,
    apiKey,
    indexName,
    useUserTokenCookie
  };
};
