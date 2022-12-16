export default (initInfo) => {
  const { settings } = initInfo;
  const { querySelector = '' } = settings || {};

  return {
    querySelector,
  };
};
