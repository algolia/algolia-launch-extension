export default (initInfo) => {
  const { settings } = initInfo;
  const {
    objectIDDataElement = '',
    priceDataElement,
    quantityDataElement,
    discountDataElement,
    currency
  } = settings || {};

  return {
    objectIDDataElement,
    priceDataElement,
    quantityDataElement,
    discountDataElement,
    currency
  };
};
