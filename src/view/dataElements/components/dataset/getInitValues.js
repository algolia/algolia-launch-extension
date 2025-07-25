export default (initInfo) => {
  const { settings } = initInfo;
  const {
    hitQuerySelector = '',
    indexNameQuerySelector = '',
    queryIDDataElement = '',
    objectIDsDataElement = '',
    positionsDataElement = '',
    indexNameDataElement = ''
  } = settings || {};

  return {
    hitQuerySelector,
    indexNameQuerySelector,
    queryIDDataElement,
    objectIDsDataElement,
    positionsDataElement,
    indexNameDataElement
  };
};
