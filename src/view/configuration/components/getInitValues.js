export default (initInfo) => {
  const { settings } = initInfo;
  const {
    appId = '',
    apiKey = '',
    indexName = '',
    userTokenDataElement = '',
    authenticatedUserTokenDataElement = '',
    currency = ''
  } = settings || {};

  return {
    appId,
    apiKey,
    indexName,
    userTokenDataElement,
    authenticatedUserTokenDataElement,
    currency
  };
};
