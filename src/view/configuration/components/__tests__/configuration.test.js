import getInitValues from '../getInitValues';
import getSettings from '../getSettings';
import validate from '../validate';

describe('configuration getInitValues', () => {
  it('returns defaults when settings is null', () => {
    const result = getInitValues({ settings: null });
    expect(result).toEqual({
      credentialType: 'credentials',
      appId: '',
      apiKey: '',
      indexName: '',
      userTokenDataElement: '',
      authenticatedUserTokenDataElement: '',
      currency: '',
      proxyUrlDataElement: '',
      proxyHeadersDataElement: ''
    });
  });

  it('maps settings including proxyUrlDataElement', () => {
    const result = getInitValues({
      settings: {
        appId: 'APP',
        apiKey: 'KEY',
        indexName: 'my_index',
        userTokenDataElement: 'token',
        authenticatedUserTokenDataElement: 'auth-token',
        currency: 'USD',
        proxyUrlDataElement: 'https://proxy.example.com'
      }
    });
    expect(result.proxyUrlDataElement).toBe('https://proxy.example.com');
    expect(result.appId).toBe('APP');
  });

  it('defaults proxyUrlDataElement to empty string when not in settings', () => {
    const result = getInitValues({
      settings: { appId: 'APP', apiKey: 'KEY' }
    });
    expect(result.proxyUrlDataElement).toBe('');
  });

  it('uses the persisted credentialType when present', () => {
    const result = getInitValues({
      settings: { credentialType: 'proxy', proxyUrlDataElement: '%proxy%' }
    });
    expect(result.credentialType).toBe('proxy');
  });

  it('derives credentialType from a proxyUrlDataElement for legacy settings', () => {
    const result = getInitValues({
      settings: { proxyUrlDataElement: 'https://proxy.example.com' }
    });
    expect(result.credentialType).toBe('proxy');
  });

  it('derives the credentials credentialType when no proxyUrlDataElement is set', () => {
    const result = getInitValues({
      settings: { appId: 'APP', apiKey: 'KEY' }
    });
    expect(result.credentialType).toBe('credentials');
  });

  it('maps proxyHeadersDataElement from settings', () => {
    const result = getInitValues({
      settings: {
        credentialType: 'proxy',
        proxyUrlDataElement: 'https://proxy.example.com',
        proxyHeadersDataElement: '{"Authorization":"Bearer token"}'
      }
    });
    expect(result.proxyHeadersDataElement).toBe(
      '{"Authorization":"Bearer token"}'
    );
  });

  it('defaults proxyHeadersDataElement to empty string when not in settings', () => {
    const result = getInitValues({
      settings: { appId: 'APP', apiKey: 'KEY' }
    });
    expect(result.proxyHeadersDataElement).toBe('');
  });
});

describe('configuration getSettings', () => {
  it('includes proxyUrlDataElement in returned settings', () => {
    const result = getSettings({
      credentialType: 'proxy',
      appId: 'APP',
      apiKey: 'KEY',
      indexName: 'idx',
      userTokenDataElement: 'token',
      authenticatedUserTokenDataElement: '',
      currency: 'EUR',
      proxyUrlDataElement: 'https://proxy.example.com',
      proxyHeadersDataElement: ''
    });
    expect(result.credentialType).toBe('proxy');
    expect(result.proxyUrlDataElement).toBe('https://proxy.example.com');
  });

  it('includes empty proxyUrlDataElement when not set', () => {
    const result = getSettings({
      credentialType: 'credentials',
      appId: 'APP',
      apiKey: 'KEY',
      indexName: 'idx',
      userTokenDataElement: 'token',
      authenticatedUserTokenDataElement: '',
      currency: 'USD',
      proxyUrlDataElement: '',
      proxyHeadersDataElement: ''
    });
    expect(result.credentialType).toBe('credentials');
    expect(result.proxyUrlDataElement).toBe('');
  });

  it('clears the proxyUrlDataElement when the credentials method is selected', () => {
    const result = getSettings({
      credentialType: 'credentials',
      appId: 'APP',
      apiKey: 'KEY',
      indexName: 'idx',
      userTokenDataElement: 'token',
      authenticatedUserTokenDataElement: '',
      currency: 'USD',
      proxyUrlDataElement: 'https://proxy.example.com',
      proxyHeadersDataElement: '{"Authorization":"Bearer token"}'
    });
    expect(result.proxyUrlDataElement).toBe('');
  });

  it('includes proxyHeadersDataElement when proxy method is selected', () => {
    const result = getSettings({
      credentialType: 'proxy',
      appId: '',
      apiKey: '',
      indexName: 'idx',
      userTokenDataElement: 'token',
      authenticatedUserTokenDataElement: '',
      currency: '',
      proxyUrlDataElement: 'https://proxy.example.com',
      proxyHeadersDataElement: '{"Authorization":"Bearer token"}'
    });
    expect(result.proxyHeadersDataElement).toBe(
      '{"Authorization":"Bearer token"}'
    );
  });

  it('clears proxyHeadersDataElement when credentials method is selected', () => {
    const result = getSettings({
      credentialType: 'credentials',
      appId: 'APP',
      apiKey: 'KEY',
      indexName: 'idx',
      userTokenDataElement: 'token',
      authenticatedUserTokenDataElement: '',
      currency: '',
      proxyUrlDataElement: 'https://proxy.example.com',
      proxyHeadersDataElement: '{"Authorization":"Bearer token"}'
    });
    expect(result.proxyHeadersDataElement).toBe('');
  });

  it('preserves empty proxyHeadersDataElement when proxy method is selected', () => {
    const result = getSettings({
      credentialType: 'proxy',
      appId: '',
      apiKey: '',
      indexName: 'idx',
      userTokenDataElement: 'token',
      authenticatedUserTokenDataElement: '',
      currency: '',
      proxyUrlDataElement: 'https://proxy.example.com',
      proxyHeadersDataElement: ''
    });
    expect(result.proxyHeadersDataElement).toBe('');
  });
});

describe('configuration validate', () => {
  const validValues = {
    appId: 'APP',
    apiKey: 'KEY',
    indexName: 'idx',
    userTokenDataElement: 'token',
    currency: 'USD',
    proxyUrlDataElement: '',
    proxyHeadersDataElement: ''
  };

  it('returns no errors for valid values with empty proxyUrlDataElement', () => {
    const errors = validate(validValues);
    expect(Object.keys(errors)).toHaveLength(0);
  });

  it('returns no errors when proxyUrlDataElement is a valid URL', () => {
    const errors = validate({
      ...validValues,
      proxyUrlDataElement: 'https://proxy.example.com'
    });
    expect(errors.proxyUrlDataElement).toBeUndefined();
  });

  it('returns a proxyUrlDataElement error when it is not a valid URL', () => {
    const errors = validate({
      ...validValues,
      proxyUrlDataElement: 'not-a-url'
    });
    expect(errors.proxyUrlDataElement).toBeDefined();
    expect(errors.proxyUrlDataElement.type).toBe('pattern');
  });

  it('returns an appId error when appId is missing', () => {
    const errors = validate({ ...validValues, appId: '' });
    expect(errors.appId).toBeDefined();
  });

  it('returns an apiKey error when apiKey is missing', () => {
    const errors = validate({ ...validValues, apiKey: '' });
    expect(errors.apiKey).toBeDefined();
  });

  it('does not require appId or apiKey when a proxyUrlDataElement is set', () => {
    const errors = validate({
      ...validValues,
      appId: '',
      apiKey: '',
      proxyUrlDataElement: 'https://proxy.example.com'
    });
    expect(errors.appId).toBeUndefined();
    expect(errors.apiKey).toBeUndefined();
  });

  it('still validates the proxyUrlDataElement format when credentials are omitted', () => {
    const errors = validate({
      ...validValues,
      appId: '',
      apiKey: '',
      proxyUrlDataElement: 'not-a-url'
    });
    expect(errors.appId).toBeUndefined();
    expect(errors.apiKey).toBeUndefined();
    expect(errors.proxyUrlDataElement).toBeDefined();
    expect(errors.proxyUrlDataElement.type).toBe('pattern');
  });

  it('does not require currency', () => {
    const errors = validate({ ...validValues, currency: '' });
    expect(errors.currency).toBeUndefined();
  });

  it('requires appId and apiKey when the credentials method is selected', () => {
    const errors = validate({
      ...validValues,
      credentialType: 'credentials',
      appId: '',
      apiKey: ''
    });
    expect(errors.appId).toBeDefined();
    expect(errors.apiKey).toBeDefined();
  });

  it('requires a proxyUrlDataElement when the proxy method is selected', () => {
    const errors = validate({
      ...validValues,
      credentialType: 'proxy',
      appId: '',
      apiKey: '',
      proxyUrlDataElement: ''
    });
    expect(errors.appId).toBeUndefined();
    expect(errors.apiKey).toBeUndefined();
    expect(errors.proxyUrlDataElement).toBeDefined();
    expect(errors.proxyUrlDataElement.type).toBe('required');
  });

  it('accepts a data element token as the proxyUrlDataElement', () => {
    const errors = validate({
      ...validValues,
      credentialType: 'proxy',
      appId: '',
      apiKey: '',
      proxyUrlDataElement: '%myProxyUrl%'
    });
    expect(errors.proxyUrlDataElement).toBeUndefined();
  });

  it('ignores a stale invalid proxyUrlDataElement when the credentials method is selected', () => {
    const errors = validate({
      ...validValues,
      credentialType: 'credentials',
      proxyUrlDataElement: 'not-a-url'
    });
    expect(errors.proxyUrlDataElement).toBeUndefined();
  });

  describe('proxyHeadersDataElement', () => {
    const proxyValues = {
      ...validValues,
      credentialType: 'proxy',
      appId: '',
      apiKey: '',
      proxyUrlDataElement: 'https://proxy.example.com'
    };

    it('accepts an empty value', () => {
      const errors = validate({ ...proxyValues, proxyHeadersDataElement: '' });
      expect(errors.proxyHeadersDataElement).toBeUndefined();
    });

    it('accepts a single data element token', () => {
      const errors = validate({
        ...proxyValues,
        proxyHeadersDataElement: '%myHeaders%'
      });
      expect(errors.proxyHeadersDataElement).toBeUndefined();
    });

    it('accepts a JSON object', () => {
      const errors = validate({
        ...proxyValues,
        proxyHeadersDataElement: '{"Authorization":"Bearer token"}'
      });
      expect(errors.proxyHeadersDataElement).toBeUndefined();
    });

    it('accepts a JSON object with a data element token inside a value', () => {
      const errors = validate({
        ...proxyValues,
        proxyHeadersDataElement: '{"Authorization":"Bearer %myToken%"}'
      });
      expect(errors.proxyHeadersDataElement).toBeUndefined();
    });

    it('rejects a non-JSON string', () => {
      const errors = validate({
        ...proxyValues,
        proxyHeadersDataElement: 'not-json'
      });
      expect(errors.proxyHeadersDataElement).toBeDefined();
      expect(errors.proxyHeadersDataElement.type).toBe('pattern');
    });

    it('rejects a JSON array', () => {
      const errors = validate({
        ...proxyValues,
        proxyHeadersDataElement: '["Authorization","Bearer token"]'
      });
      expect(errors.proxyHeadersDataElement).toBeDefined();
      expect(errors.proxyHeadersDataElement.type).toBe('pattern');
    });

    it('rejects a JSON primitive', () => {
      const errors = validate({
        ...proxyValues,
        proxyHeadersDataElement: '"just-a-string"'
      });
      expect(errors.proxyHeadersDataElement).toBeDefined();
      expect(errors.proxyHeadersDataElement.type).toBe('pattern');
    });

    it('ignores a stale invalid value when the credentials method is selected', () => {
      const errors = validate({
        ...validValues,
        credentialType: 'credentials',
        proxyHeadersDataElement: 'not-json'
      });
      expect(errors.proxyHeadersDataElement).toBeUndefined();
    });
  });
});
