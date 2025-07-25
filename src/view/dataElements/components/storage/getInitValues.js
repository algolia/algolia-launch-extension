export default (initInfo) => {
  const { settings } = initInfo;
  const { recordIdDataElement = '' } = settings || {};

  return {
    recordIdDataElement
  };
};
