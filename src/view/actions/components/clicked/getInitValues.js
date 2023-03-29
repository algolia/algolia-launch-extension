export default (initInfo) => {
  const { settings } = initInfo;
  const { itemDataElement = '', userTokenDataElement = '', indexDataElement = '', eventName = '' } = settings || {};

  return {
    itemDataElement,
    userTokenDataElement,
    indexDataElement,
    eventName
  };
};
