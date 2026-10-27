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

const window = require('@adobe/reactor-window');
const document = require('@adobe/reactor-document');

beforeEach(() => {
  mockAa.mockClear();
  turbine.logger.log.mockClear();
  turbine.logger.error.mockClear();
  turbine.getExtensionSettings.mockReset();

  // Clean up any state written onto the window mock by the custom-transport path.
  delete window.AlgoliaAnalyticsObject;
  delete window.AlgoliaAnalytics;

  // Reset document mock call tracking.
  document.createElement.mockClear();
  document.getElementsByTagName.mockClear();
  document.getElementsByTagName.mockReturnValue([
    { parentNode: { insertBefore: jest.fn() } }
  ]);

  // Clear any onload handler from a previous test.
  const scriptEl = document.createElement();
  scriptEl.onload = undefined;
  scriptEl.src = '';
  scriptEl.async = false;
  document.createElement.mockClear();
});

describe('loadInsights - init options (default transport)', () => {
  it('calls aa("init") with appId, apiKey and no host when proxyUrlDataElement is not set', () => {
    turbine.getExtensionSettings.mockReturnValue({
      appId: 'MY_APP_ID',
      apiKey: 'MY_API_KEY',
      userTokenDataElement: '',
      authenticatedUserTokenDataElement: '',
      proxyUrlDataElement: '',
      proxyHeadersDataElement: ''
    });

    loadInsights(baseSettings);

    const initCall = mockAa.mock.calls.find((c) => c[0] === 'init');
    expect(initCall).toBeDefined();
    const initOptions = initCall[1];
    expect(initOptions.appId).toBe('MY_APP_ID');
    expect(initOptions.apiKey).toBe('MY_API_KEY');
    expect(initOptions.host).toBeUndefined();
  });

  it('calls aa("init") with host set when proxyUrlDataElement is provided', () => {
    turbine.getExtensionSettings.mockReturnValue({
      appId: 'MY_APP_ID',
      apiKey: 'MY_API_KEY',
      userTokenDataElement: '',
      authenticatedUserTokenDataElement: '',
      proxyUrlDataElement: 'https://proxy.example.com',
      proxyHeadersDataElement: ''
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
      proxyUrlDataElement: 'https://proxy.example.com',
      proxyHeadersDataElement: ''
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
      proxyUrlDataElement: 'https://proxy.example.com',
      proxyHeadersDataElement: ''
    });

    loadInsights(baseSettings);

    const initCall = mockAa.mock.calls.find((c) => c[0] === 'init');
    expect(initCall[1].appId).toBe('');
    expect(initCall[1].apiKey).toBe('');
  });

  it('does not set host when proxyUrlDataElement is undefined', () => {
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

  it('does not use createInsightsClient when proxyHeadersDataElement is empty', () => {
    turbine.getExtensionSettings.mockReturnValue({
      appId: 'APP',
      apiKey: 'KEY',
      userTokenDataElement: '',
      authenticatedUserTokenDataElement: '',
      proxyHeadersDataElement: ''
    });

    loadInsights(baseSettings);

    // The custom path does not set AlgoliaAnalyticsObject via onload; the IIFE
    // sets it synchronously instead.
    expect(window.AlgoliaAnalyticsObject).toBe('aa');
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

    const authCall = mockAa.mock.calls.find(
      (c) => c[0] === 'setAuthenticatedUserToken'
    );
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

describe('loadInsights - custom transport (proxyHeadersDataElement)', () => {
  // Helper: get the scriptEl created during loadInsights (reusing the shared
  // mock object returned by document.createElement).
  function getScriptEl() {
    // The document mock always returns the same object. After loadInsights
    // calls createElement, the onload property will be set on it.
    return document.createElement.mock.results[0].value;
  }

  it('does not set window.AlgoliaAnalyticsObject synchronously when headers are set', () => {
    turbine.getExtensionSettings.mockReturnValue({
      appId: '',
      apiKey: '',
      userTokenDataElement: '',
      authenticatedUserTokenDataElement: '',
      proxyUrlDataElement: 'https://proxy.example.com',
      proxyHeadersDataElement: { Authorization: 'Bearer secret' }
    });

    loadInsights(baseSettings);

    // AlgoliaAnalyticsObject must not be set yet — it is set in onload.
    expect(window.AlgoliaAnalyticsObject).toBeUndefined();
  });

  it('queues init, addAlgoliaAgent before the script is inserted', () => {
    turbine.getExtensionSettings.mockReturnValue({
      appId: 'APP',
      apiKey: 'KEY',
      userTokenDataElement: '',
      authenticatedUserTokenDataElement: '',
      proxyUrlDataElement: 'https://proxy.example.com',
      proxyHeadersDataElement: { Authorization: 'Bearer secret' }
    });

    loadInsights(baseSettings);

    const initCall = mockAa.mock.calls.find((c) => c[0] === 'init');
    const agentCall = mockAa.mock.calls.find((c) => c[0] === 'addAlgoliaAgent');

    expect(initCall).toBeDefined();
    expect(initCall[1].host).toBe('https://proxy.example.com');
    expect(agentCall).toBeDefined();
    expect(agentCall[1]).toMatch(/algolia-launch-extension/);
  });

  it('queues user tokens when set in the custom transport path', () => {
    turbine.getExtensionSettings.mockReturnValue({
      appId: 'APP',
      apiKey: 'KEY',
      userTokenDataElement: 'u-token',
      authenticatedUserTokenDataElement: 'a-token',
      proxyUrlDataElement: 'https://proxy.example.com',
      proxyHeadersDataElement: { Authorization: 'Bearer secret' }
    });

    loadInsights(baseSettings);

    const userTokenCall = mockAa.mock.calls.find(
      (c) => c[0] === 'setUserToken'
    );
    const authTokenCall = mockAa.mock.calls.find(
      (c) => c[0] === 'setAuthenticatedUserToken'
    );

    expect(userTokenCall).toBeDefined();
    expect(userTokenCall[1]).toBe('u-token');
    expect(authTokenCall).toBeDefined();
    expect(authTokenCall[1]).toBe('a-token');
  });

  it('inserts a script element with an onload handler', () => {
    turbine.getExtensionSettings.mockReturnValue({
      appId: '',
      apiKey: '',
      userTokenDataElement: '',
      authenticatedUserTokenDataElement: '',
      proxyUrlDataElement: 'https://proxy.example.com',
      proxyHeadersDataElement: { Authorization: 'Bearer secret' }
    });

    loadInsights(baseSettings);

    const scriptEl = getScriptEl();
    expect(typeof scriptEl.onload).toBe('function');
    expect(scriptEl.src).toMatch(/search-insights/);
  });

  it('sets AlgoliaAnalyticsObject and calls createInsightsClient on onload', () => {
    turbine.getExtensionSettings.mockReturnValue({
      appId: '',
      apiKey: '',
      userTokenDataElement: '',
      authenticatedUserTokenDataElement: '',
      proxyUrlDataElement: 'https://proxy.example.com',
      proxyHeadersDataElement: { Authorization: 'Bearer secret' }
    });

    loadInsights(baseSettings);

    // Simulate the UMD script having loaded and exposed createInsightsClient.
    const mockCreateInsightsClient = jest.fn();
    window.AlgoliaAnalytics = {
      createInsightsClient: mockCreateInsightsClient
    };

    const scriptEl = getScriptEl();
    scriptEl.onload();

    expect(window.AlgoliaAnalyticsObject).toBe('aa');
    expect(mockCreateInsightsClient).toHaveBeenCalledWith(expect.any(Function));
  });

  it('logs an error and does not throw when createInsightsClient is unavailable', () => {
    turbine.getExtensionSettings.mockReturnValue({
      appId: '',
      apiKey: '',
      userTokenDataElement: '',
      authenticatedUserTokenDataElement: '',
      proxyUrlDataElement: 'https://proxy.example.com',
      proxyHeadersDataElement: { Authorization: 'Bearer secret' }
    });

    loadInsights(baseSettings);

    // Simulate UMD loaded without createInsightsClient.
    window.AlgoliaAnalytics = {};

    const scriptEl = getScriptEl();
    expect(() => scriptEl.onload()).not.toThrow();
    expect(turbine.logger.error).toHaveBeenCalledTimes(1);
  });

  it('installs a queue stub with init first when window.aa does not exist yet', () => {
    turbine.getExtensionSettings.mockReturnValue({
      appId: '',
      apiKey: '',
      userTokenDataElement: 'u-token',
      authenticatedUserTokenDataElement: '',
      proxyUrlDataElement: 'https://proxy.example.com',
      proxyHeadersDataElement: { Authorization: 'Bearer secret' }
    });
    delete window.aa;

    try {
      loadInsights(baseSettings);

      expect(window.aa).not.toBe(mockAa);
      expect(window.aa.version).toBe('2.17.3');
      expect(window.AlgoliaAnalyticsObject).toBeUndefined();
      const queuedMethods = window.aa.queue.map((args) => args[0]);
      expect(queuedMethods).toEqual([
        'init',
        'addAlgoliaAgent',
        'setUserToken'
      ]);
      expect(window.aa.queue[0][1].host).toBe('https://proxy.example.com');
    } finally {
      window.aa = mockAa;
    }
  });

  it('passes a request function that reads the current header values on each call', async () => {
    turbine.getExtensionSettings.mockReturnValue({
      appId: '',
      apiKey: '',
      userTokenDataElement: '',
      authenticatedUserTokenDataElement: '',
      proxyUrlDataElement: 'https://proxy.example.com',
      proxyHeadersDataElement: { Authorization: 'Bearer first' }
    });

    loadInsights(baseSettings);

    const mockCreateInsightsClient = jest.fn();
    window.AlgoliaAnalytics = {
      createInsightsClient: mockCreateInsightsClient
    };
    getScriptEl().onload();
    const requestFn = mockCreateInsightsClient.mock.calls[0][0];

    turbine.getExtensionSettings.mockReturnValue({
      proxyHeadersDataElement: { Authorization: 'Bearer second' }
    });
    global.fetch = jest.fn().mockResolvedValue({ status: 200 });

    try {
      await expect(
        requestFn('https://proxy.example.com/1/events', { events: [] })
      ).resolves.toBe(true);
      expect(global.fetch.mock.calls[0][1].headers).toEqual({
        'Content-Type': 'application/json',
        Authorization: 'Bearer second'
      });
    } finally {
      delete global.fetch;
    }
  });

  it('falls back to the default IIFE path when proxyHeadersDataElement is invalid JSON', () => {
    turbine.getExtensionSettings.mockReturnValue({
      appId: 'APP',
      apiKey: 'KEY',
      userTokenDataElement: '',
      authenticatedUserTokenDataElement: '',
      proxyHeadersDataElement: 'not-valid-json'
    });

    loadInsights(baseSettings);

    // normalizeProxyHeaders logs the error and returns null, so we take the
    // default IIFE path and AlgoliaAnalyticsObject is set synchronously.
    expect(window.AlgoliaAnalyticsObject).toBe('aa');
    expect(turbine.logger.error).toHaveBeenCalledTimes(1);
  });
});
