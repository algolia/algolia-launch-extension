export default (initInfo) => {
  const { settings } = initInfo;
  const { eventDetailsDataElement = '', eventName = '', currency = '' } = settings || {};

  return {
    eventDetailsDataElement,
    eventName,
    currency
  };
};
