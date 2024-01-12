export default (initInfo) => {
  const { settings } = initInfo;
  const { useUserTokenCookie = false, version = '2.13.0', userHasOptedOutDataElement = '' } = settings || {};

  return {
    useUserTokenCookie,
    version,
    userHasOptedOutDataElement
  };
};
