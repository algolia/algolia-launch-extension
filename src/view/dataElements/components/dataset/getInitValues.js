export default (initInfo) => {
  const { settings } = initInfo;
  const {
    hitQuerySelector = '',
    indexNameQuerySelector = '',
    recordIDDataElement = '',
    queryIDDataElement = '',
    objectIDsDataElement = '',
    positionsDataElement = '',
    indexNameDataElement = '',
    priceDataElement,
    quantityDataElement,
    discountDataElement,
    currency
  } = settings || {};

  return {
    hitQuerySelector,
    indexNameQuerySelector,
    recordIDDataElement,
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
