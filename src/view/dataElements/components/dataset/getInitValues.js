export default (initInfo) => {
  const { settings } = initInfo;
  const {
    hitQuerySelector = '',
    indexNameQuerySelector = '',
    recordIdDataElement = '',
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
    recordIdDataElement,
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
