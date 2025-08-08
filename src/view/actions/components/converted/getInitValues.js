export default (initInfo) => {
  const { settings } = initInfo;
  const {
    eventDetailsDataElement = '',
    recordIdDataElement = '',
    eventName = '',
    disableRemoveEventFromStore = false
  } = settings || {};

  return {
    eventDetailsDataElement,
    recordIdDataElement,
    eventName,
    disableRemoveEventFromStore
  };
};
