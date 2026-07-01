export default (initInfo) => {
  const { settings } = initInfo;
  const {
    useUserTokenCookie = false,
    version = '2.17.3',
    userHasOptedOutDataElement = ''
  } = settings || {};

  return {
    useUserTokenCookie,
    version,
    userHasOptedOutDataElement
  };
};
