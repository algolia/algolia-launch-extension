'use strict';

const {
  normalizeProxyHeaders,
  createProxyRequestFn
} = require('../proxyHeaders');

beforeEach(() => {
  turbine.logger.error.mockClear();
});

// ---------------------------------------------------------------------------
// normalizeProxyHeaders
// ---------------------------------------------------------------------------

describe('normalizeProxyHeaders', () => {
  it('returns null for null', () => {
    expect(normalizeProxyHeaders(null)).toBeNull();
  });

  it('returns null for undefined', () => {
    expect(normalizeProxyHeaders(undefined)).toBeNull();
  });

  it('returns null for an empty string', () => {
    expect(normalizeProxyHeaders('')).toBeNull();
  });

  it('returns null for a whitespace-only string', () => {
    expect(normalizeProxyHeaders('   ')).toBeNull();
  });

  it('accepts a plain object directly', () => {
    const result = normalizeProxyHeaders({ Authorization: 'Bearer token' });
    expect(result).toEqual({ Authorization: 'Bearer token' });
  });

  it('accepts a JSON string encoding a plain object', () => {
    const result = normalizeProxyHeaders('{"Authorization":"Bearer token"}');
    expect(result).toEqual({ Authorization: 'Bearer token' });
  });

  it('coerces non-string values to strings', () => {
    const result = normalizeProxyHeaders({ 'X-Retry': 3 });
    expect(result).toEqual({ 'X-Retry': '3' });
  });

  it('skips null values', () => {
    const result = normalizeProxyHeaders({
      Authorization: 'Bearer token',
      'X-Empty': null
    });
    expect(result).toEqual({ Authorization: 'Bearer token' });
  });

  it('skips empty string values', () => {
    const result = normalizeProxyHeaders({
      Authorization: 'Bearer token',
      'X-Empty': ''
    });
    expect(result).toEqual({ Authorization: 'Bearer token' });
  });

  it('returns null when all values are empty or null', () => {
    expect(normalizeProxyHeaders({ A: null, B: '' })).toBeNull();
  });

  it('logs an error and returns null for invalid JSON', () => {
    const result = normalizeProxyHeaders('not-valid-json');
    expect(result).toBeNull();
    expect(turbine.logger.error).toHaveBeenCalledTimes(1);
  });

  it('does not log the raw value, which may contain secrets', () => {
    normalizeProxyHeaders('{"Authorization": "Bearer secret-token"');
    expect(turbine.logger.error.mock.calls[0][0]).not.toMatch(/secret-token/);
  });

  it('logs an error and returns null for a JSON array', () => {
    const result = normalizeProxyHeaders('["a","b"]');
    expect(result).toBeNull();
    expect(turbine.logger.error).toHaveBeenCalledTimes(1);
  });

  it('logs an error and returns null for a JSON primitive string', () => {
    const result = normalizeProxyHeaders('"just-a-string"');
    expect(result).toBeNull();
    expect(turbine.logger.error).toHaveBeenCalledTimes(1);
  });

  it('logs an error and returns null when the value is an array object', () => {
    const result = normalizeProxyHeaders(['Authorization', 'Bearer token']);
    expect(result).toBeNull();
    expect(turbine.logger.error).toHaveBeenCalledTimes(1);
  });

  it('handles multiple headers', () => {
    const result = normalizeProxyHeaders({
      Authorization: 'Bearer token',
      'X-Custom-Header': 'custom-value'
    });
    expect(result).toEqual({
      Authorization: 'Bearer token',
      'X-Custom-Header': 'custom-value'
    });
  });
});

// ---------------------------------------------------------------------------
// createProxyRequestFn
// ---------------------------------------------------------------------------

describe('createProxyRequestFn', () => {
  let mockFetch;

  beforeEach(() => {
    mockFetch = jest.fn();
    global.fetch = mockFetch;
  });

  afterEach(() => {
    delete global.fetch;
  });

  it('returns a function', () => {
    const fn = createProxyRequestFn(() => null);
    expect(typeof fn).toBe('function');
  });

  it('calls fetch with the correct URL, method, and Content-Type', async () => {
    mockFetch.mockResolvedValue({ status: 200 });
    const requestFn = createProxyRequestFn(() => null);

    await requestFn('https://proxy.example.com/1/events', { events: [] });

    expect(mockFetch).toHaveBeenCalledWith(
      'https://proxy.example.com/1/events',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'Content-Type': 'application/json'
        })
      })
    );
  });

  it('merges custom headers from getHeaders onto the request', async () => {
    mockFetch.mockResolvedValue({ status: 200 });
    const requestFn = createProxyRequestFn(() => ({
      Authorization: 'Bearer secret'
    }));

    await requestFn('https://proxy.example.com/1/events', { events: [] });

    const fetchCall = mockFetch.mock.calls[0];
    expect(fetchCall[1].headers).toMatchObject({
      'Content-Type': 'application/json',
      Authorization: 'Bearer secret'
    });
  });

  it('sends keepalive: true', async () => {
    mockFetch.mockResolvedValue({ status: 200 });
    const requestFn = createProxyRequestFn(() => null);

    await requestFn('https://proxy.example.com/1/events', { events: [] });

    expect(mockFetch.mock.calls[0][1]).toMatchObject({ keepalive: true });
  });

  it('serialises the data as JSON in the request body', async () => {
    mockFetch.mockResolvedValue({ status: 200 });
    const requestFn = createProxyRequestFn(() => null);
    const data = { events: [{ eventType: 'click' }] };

    await requestFn('https://proxy.example.com/1/events', data);

    expect(mockFetch.mock.calls[0][1].body).toBe(JSON.stringify(data));
  });

  it('resolves true when fetch responds with status 200', async () => {
    mockFetch.mockResolvedValue({ status: 200 });
    const requestFn = createProxyRequestFn(() => null);

    const result = await requestFn('https://proxy.example.com/1/events', {});
    expect(result).toBe(true);
  });

  it('resolves false when fetch responds with a non-200 status', async () => {
    mockFetch.mockResolvedValue({ status: 400 });
    const requestFn = createProxyRequestFn(() => null);

    const result = await requestFn('https://proxy.example.com/1/events', {});
    expect(result).toBe(false);
  });

  it('rejects when fetch rejects (network failure)', async () => {
    const networkError = new Error('Network error');
    mockFetch.mockRejectedValue(networkError);
    const requestFn = createProxyRequestFn(() => null);

    await expect(
      requestFn('https://proxy.example.com/1/events', {})
    ).rejects.toThrow('Network error');
  });

  it('calls getHeaders on every request', async () => {
    mockFetch.mockResolvedValue({ status: 200 });
    const getHeaders = jest.fn().mockReturnValue({ 'X-Count': '1' });
    const requestFn = createProxyRequestFn(getHeaders);

    await requestFn('https://proxy.example.com/1/events', {});
    await requestFn('https://proxy.example.com/1/events', {});

    expect(getHeaders).toHaveBeenCalledTimes(2);
  });

  it('falls back to only Content-Type when getHeaders returns null', async () => {
    mockFetch.mockResolvedValue({ status: 200 });
    const requestFn = createProxyRequestFn(() => null);

    await requestFn('https://proxy.example.com/1/events', {});

    expect(mockFetch.mock.calls[0][1].headers).toEqual({
      'Content-Type': 'application/json'
    });
  });
});
