import getInitValues from '../getInitValues';
import getSettings from '../getSettings';
import validate from '../validate';

describe('configuration getInitValues', () => {
  it('returns defaults when settings is null', () => {
    const result = getInitValues({ settings: null });
    expect(result).toEqual({
      appId: '',
      apiKey: '',
      indexName: '',
      userTokenDataElement: '',
      authenticatedUserTokenDataElement: '',
      currency: '',
      proxyUrl: ''
    });
  });

  it('maps settings including proxyUrl', () => {
    const result = getInitValues({
      settings: {
        appId: 'APP',
        apiKey: 'KEY',
        indexName: 'my_index',
        userTokenDataElement: 'token',
        authenticatedUserTokenDataElement: 'auth-token',
        currency: 'USD',
        proxyUrl: 'https://proxy.example.com'
      }
    });
    expect(result.proxyUrl).toBe('https://proxy.example.com');
    expect(result.appId).toBe('APP');
  });

  it('defaults proxyUrl to empty string when not in settings', () => {
    const result = getInitValues({
      settings: { appId: 'APP', apiKey: 'KEY' }
    });
    expect(result.proxyUrl).toBe('');
  });
});

describe('configuration getSettings', () => {
  it('includes proxyUrl in returned settings', () => {
    const result = getSettings({
      appId: 'APP',
      apiKey: 'KEY',
      indexName: 'idx',
      userTokenDataElement: 'token',
      authenticatedUserTokenDataElement: '',
      currency: 'EUR',
      proxyUrl: 'https://proxy.example.com'
    });
    expect(result.proxyUrl).toBe('https://proxy.example.com');
  });

  it('includes empty proxyUrl when not set', () => {
    const result = getSettings({
      appId: 'APP',
      apiKey: 'KEY',
      indexName: 'idx',
      userTokenDataElement: 'token',
      authenticatedUserTokenDataElement: '',
      currency: 'USD',
      proxyUrl: ''
    });
    expect(result.proxyUrl).toBe('');
  });
});

describe('configuration validate', () => {
  const validValues = {
    appId: 'APP',
    apiKey: 'KEY',
    indexName: 'idx',
    userTokenDataElement: 'token',
    currency: 'USD',
    proxyUrl: ''
  };

  it('returns no errors for valid values with empty proxyUrl', () => {
    const errors = validate(validValues);
    expect(Object.keys(errors)).toHaveLength(0);
  });

  it('returns no errors when proxyUrl is a valid URL', () => {
    const errors = validate({ ...validValues, proxyUrl: 'https://proxy.example.com' });
    expect(errors.proxyUrl).toBeUndefined();
  });

  it('returns a proxyUrl error when proxyUrl is not a valid URL', () => {
    const errors = validate({ ...validValues, proxyUrl: 'not-a-url' });
    expect(errors.proxyUrl).toBeDefined();
    expect(errors.proxyUrl.type).toBe('pattern');
  });

  it('returns an appId error when appId is missing', () => {
    const errors = validate({ ...validValues, appId: '' });
    expect(errors.appId).toBeDefined();
  });

  it('returns an apiKey error when apiKey is missing', () => {
    const errors = validate({ ...validValues, apiKey: '' });
    expect(errors.apiKey).toBeDefined();
  });

  it('does not require appId or apiKey when a proxyUrl is set', () => {
    const errors = validate({
      ...validValues,
      appId: '',
      apiKey: '',
      proxyUrl: 'https://proxy.example.com'
    });
    expect(errors.appId).toBeUndefined();
    expect(errors.apiKey).toBeUndefined();
  });

  it('still validates the proxyUrl format when credentials are omitted', () => {
    const errors = validate({
      ...validValues,
      appId: '',
      apiKey: '',
      proxyUrl: 'not-a-url'
    });
    expect(errors.appId).toBeUndefined();
    expect(errors.apiKey).toBeUndefined();
    expect(errors.proxyUrl).toBeDefined();
    expect(errors.proxyUrl.type).toBe('pattern');
  });

  it('returns a currency error when currency is missing', () => {
    const errors = validate({ ...validValues, currency: '' });
    expect(errors.currency).toBeDefined();
  });
});
