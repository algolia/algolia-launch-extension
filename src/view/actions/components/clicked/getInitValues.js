export default (initInfo) => {
  const { settings } = initInfo;
  const { eventDetailsDataElement = '', userTokenDataElement = '', eventName = '' } = settings || {};

  return {
    eventDetailsDataElement,
    userTokenDataElement,
    eventName
  };
};
