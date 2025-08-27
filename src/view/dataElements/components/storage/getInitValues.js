export default (initInfo) => {
  const { settings } = initInfo;
  const {
    recordIDDataElement = '',
    priceDataElement,
    quantityDataElement,
    discountDataElement,
    currency
  } = settings || {};

  return {
    recordIDDataElement,
    priceDataElement,
    quantityDataElement,
    discountDataElement,
    currency
  };
};
