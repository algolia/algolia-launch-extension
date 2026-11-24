export default (initInfo) => {
  const { settings } = initInfo || {};
  const {
    selector = 'html',
    attributeName = 'lang',
    outputKey = ''
  } = settings || {};

  return {
    selector,
    attributeName,
    outputKey
  };
};
