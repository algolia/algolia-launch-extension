export default (initInfo) => {
  const { settings } = initInfo;
  const { queryIDParamName = '', objectIDParamName = '', positionParamName = '' } = settings || {};

  return {
    queryIDParamName,
    objectIDParamName,
    positionParamName
  };
};
