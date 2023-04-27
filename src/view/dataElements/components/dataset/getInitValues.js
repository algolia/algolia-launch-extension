export default (initInfo) => {
  const { settings } = initInfo;
  const { hitQuerySelector = '', indexNameQuerySelector = '' } = settings || {};

  return {
    hitQuerySelector,
    indexNameQuerySelector
  };
};
