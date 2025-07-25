export default (initInfo) => {
  const { settings } = initInfo;
  const {
    queryIDParamName = '',
    objectIDParamName = '',
    positionParamName = '',
    indexNameParamName = ''
  } = settings || {};

  return {
    queryIDParamName,
    objectIDParamName,
    positionParamName,
    indexNameParamName
  };
};
