export default (initInfo) => {
  const { settings } = initInfo;
  const {
    objectIDsDataElement = '',
    priceDataElement,
    quantityDataElement,
    discountDataElement,
    currency
  } = settings || {};

  return {
    objectIDsDataElement,
    priceDataElement,
    quantityDataElement,
    discountDataElement,
    currency
  };
};
