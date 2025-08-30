export default (initInfo) => {
  const { settings } = initInfo;
  const { eventName = '', purchasedItemsDataElement } = settings || {};

  return {
    eventName,
    purchasedItemsDataElement
  };
};
