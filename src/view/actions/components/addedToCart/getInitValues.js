export default (initInfo) => {
  const { settings } = initInfo;
  const {
    eventDetailsDataElement = '',
    eventName = '',
    recordIdDataElement = ''
  } = settings || {};

  return {
    eventDetailsDataElement,
    eventName,
    recordIdDataElement
  };
};
