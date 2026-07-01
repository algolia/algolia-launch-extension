'use strict';

jest.mock('@adobe/reactor-document', () => {
  const scriptEl = { async: false, src: '' };
  const parentNode = { insertBefore: jest.fn() };
  return {
    createElement: jest.fn(() => scriptEl),
    getElementsByTagName: jest.fn(() => [{ parentNode }])
  };
});

const mockAa = jest.fn();

jest.mock('@adobe/reactor-window', () => {
  const win = {};
  win.aa = mockAa;
  return win;
});

const loadInsights = require('../loadInsights');

const baseSettings = {
  useUserTokenCookie: true,
  version: '2.17.3',
  userHasOptedOutDataElement: '',
  cookieDuration: 15552000000
};

beforeEach(() => {
  mockAa.mockClear();
  turbine.logger.log.mockClear();
  turbine.getExtensionSettings.mockReset();
});

describe('loadInsights - init options', () => {
  it('calls aa("init") with appId, apiKey and no host when proxyUrl is not set', () => {
    turbine.getExtensionSettings.mockReturnValue({
      appId: 'MY_APP_ID',
      apiKey: 'MY_API_KEY',
      userTokenDataElement: '',
      authenticatedUserTokenDataElement: '',
      proxyUrl: ''
    });

    loadInsights(baseSettings);

    const initCall = mockAa.mock.calls.find((c) => c[0] === 'init');
    expect(initCall).toBeDefined();
    const initOptions = initCall[1];
    expect(initOptions.appId).toBe('MY_APP_ID');
    expect(initOptions.apiKey).toBe('MY_API_KEY');
    expect(initOptions.host).toBeUndefined();
  });

  it('calls aa("init") with host set when proxyUrl is provided', () => {
    turbine.getExtensionSettings.mockReturnValue({
      appId: 'MY_APP_ID',
      apiKey: 'MY_API_KEY',
      userTokenDataElement: '',
      authenticatedUserTokenDataElement: '',
      proxyUrl: 'https://proxy.example.com'
    });

    loadInsights(baseSettings);

    const initCall = mockAa.mock.calls.find((c) => c[0] === 'init');
    expect(initCall).toBeDefined();
    expect(initCall[1].host).toBe('https://proxy.example.com');
    expect(initCall[1].appId).toBe('MY_APP_ID');
    expect(initCall[1].apiKey).toBe('MY_API_KEY');
  });

  it('coerces empty appId/apiKey to empty strings so the library accepts them (credential-hiding proxy)', () => {
    turbine.getExtensionSettings.mockReturnValue({
      appId: '',
      apiKey: '',
      userTokenDataElement: '',
      authenticatedUserTokenDataElement: '',
      proxyUrl: 'https://proxy.example.com'
    });

    loadInsights(baseSettings);

    const initCall = mockAa.mock.calls.find((c) => c[0] === 'init');
    expect(initCall).toBeDefined();
    expect(initCall[1].host).toBe('https://proxy.example.com');
    expect(initCall[1].appId).toBe('');
    expect(initCall[1].apiKey).toBe('');
  });

  it('coerces undefined appId/apiKey to empty strings', () => {
    turbine.getExtensionSettings.mockReturnValue({
      userTokenDataElement: '',
      authenticatedUserTokenDataElement: '',
      proxyUrl: 'https://proxy.example.com'
    });

    loadInsights(baseSettings);

    const initCall = mockAa.mock.calls.find((c) => c[0] === 'init');
    expect(initCall[1].appId).toBe('');
    expect(initCall[1].apiKey).toBe('');
  });

  it('does not set host when proxyUrl is undefined', () => {
    turbine.getExtensionSettings.mockReturnValue({
      appId: 'APP',
      apiKey: 'KEY',
      userTokenDataElement: '',
      authenticatedUserTokenDataElement: ''
    });

    loadInsights(baseSettings);

    const initCall = mockAa.mock.calls.find((c) => c[0] === 'init');
    expect(initCall[1].host).toBeUndefined();
  });
});

describe('loadInsights - addAlgoliaAgent', () => {
  it('calls aa("addAlgoliaAgent") with the extension version string', () => {
    turbine.getExtensionSettings.mockReturnValue({
      appId: 'APP',
      apiKey: 'KEY',
      userTokenDataElement: '',
      authenticatedUserTokenDataElement: ''
    });

    loadInsights(baseSettings);

    const agentCall = mockAa.mock.calls.find((c) => c[0] === 'addAlgoliaAgent');
    expect(agentCall).toBeDefined();
    expect(agentCall[1]).toMatch(/algolia-launch-extension/);
  });
});

describe('loadInsights - user tokens', () => {
  it('calls aa("setUserToken") when userTokenDataElement is set', () => {
    turbine.getExtensionSettings.mockReturnValue({
      appId: 'APP',
      apiKey: 'KEY',
      userTokenDataElement: 'user-token-123',
      authenticatedUserTokenDataElement: ''
    });

    loadInsights(baseSettings);

    const tokenCall = mockAa.mock.calls.find((c) => c[0] === 'setUserToken');
    expect(tokenCall).toBeDefined();
    expect(tokenCall[1]).toBe('user-token-123');
  });

  it('does not call aa("setUserToken") when userTokenDataElement is empty', () => {
    turbine.getExtensionSettings.mockReturnValue({
      appId: 'APP',
      apiKey: 'KEY',
      userTokenDataElement: '',
      authenticatedUserTokenDataElement: ''
    });

    loadInsights(baseSettings);

    const tokenCall = mockAa.mock.calls.find((c) => c[0] === 'setUserToken');
    expect(tokenCall).toBeUndefined();
  });

  it('calls aa("setAuthenticatedUserToken") when authenticatedUserTokenDataElement is set', () => {
    turbine.getExtensionSettings.mockReturnValue({
      appId: 'APP',
      apiKey: 'KEY',
      userTokenDataElement: '',
      authenticatedUserTokenDataElement: 'auth-token-456'
    });

    loadInsights(baseSettings);

    const authCall = mockAa.mock.calls.find((c) => c[0] === 'setAuthenticatedUserToken');
    expect(authCall).toBeDefined();
    expect(authCall[1]).toBe('auth-token-456');
  });
});

describe('loadInsights - userHasOptedOut', () => {
  it('sets userHasOptedOut to false when userHasOptedOutDataElement is empty string', () => {
    turbine.getExtensionSettings.mockReturnValue({
      appId: 'APP',
      apiKey: 'KEY',
      userTokenDataElement: '',
      authenticatedUserTokenDataElement: ''
    });

    loadInsights({ ...baseSettings, userHasOptedOutDataElement: '' });

    const initCall = mockAa.mock.calls.find((c) => c[0] === 'init');
    expect(initCall[1].userHasOptedOut).toBe(false);
  });

  it('passes userHasOptedOut value when data element is truthy', () => {
    turbine.getExtensionSettings.mockReturnValue({
      appId: 'APP',
      apiKey: 'KEY',
      userTokenDataElement: '',
      authenticatedUserTokenDataElement: ''
    });

    loadInsights({ ...baseSettings, userHasOptedOutDataElement: true });

    const initCall = mockAa.mock.calls.find((c) => c[0] === 'init');
    expect(initCall[1].userHasOptedOut).toBe(true);
  });
});
