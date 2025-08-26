export default (initInfo) => {
  const { settings } = initInfo;
  const {
    eventDetailsDataElement = '',
    eventName = '',
    disableRemoveEventFromStore = false
  } = settings || {};

  return {
    eventDetailsDataElement,
    eventName,
    disableRemoveEventFromStore
  };
};
