export default (initInfo) => {
  const { settings } = initInfo;
  const { itemDataElement = '', userTokenDataElement = '', eventName = '' } = settings || {};

  return {
    itemDataElement,
    userTokenDataElement,
    eventName
  };
};
