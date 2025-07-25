export default (initInfo) => {
  const { settings } = initInfo;
  const {
    eventDetailsDataElement = '',
    recordIdDataElement = '',
    eventName = ''
  } = settings || {};

  return {
    eventDetailsDataElement,
    recordIdDataElement,
    eventName
  };
};
