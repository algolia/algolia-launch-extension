export default (initInfo) => {
  const { settings } = initInfo;
  const {
    eventDetailsDataElement = '',
    eventName = ''
  } = settings || {};

  return {
    eventDetailsDataElement,
    eventName
  };
};
