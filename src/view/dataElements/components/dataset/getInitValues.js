export default (initInfo) => {
  const { settings } = initInfo;
  const {
    hitQuerySelector = '',
    indexNameQuerySelector = '',
    queryIDDataElement = '',
    objectIDsDataElement = '',
    positionsDataElement = '',
    indexNameDataElement = '',
    priceDataElement = '',
    quantityDataElement= '',
    discountDataElement= '',
    currency
  } = settings || {};

  return {
    hitQuerySelector,
    indexNameQuerySelector,
    queryIDDataElement,
    objectIDsDataElement,
    positionsDataElement,
    indexNameDataElement,
    priceDataElement,
    quantityDataElement,
    discountDataElement,
    currency
  };
};
