export default (initInfo) => {
  const { settings } = initInfo;
  const { storageStrategy = '' } = settings || {};

  return {
    storageStrategy
  };
};
