'use strict';

// Accepts the resolved Proxy Headers setting: an object returned by a data
// element, or a JSON object string. Returns a map of header names to string
// values, or null when there is nothing usable to send.
const normalizeProxyHeaders = (value) => {
  if (value == null || (typeof value === 'string' && !value.trim())) {
    return null;
  }

  let parsed = value;
  if (typeof value === 'string') {
    try {
      parsed = JSON.parse(value);
    } catch (e) {
      turbine.logger.error(
        'Proxy Headers could not be parsed as a JSON object and will be ignored.'
      );
      return null;
    }
  }

  if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
    turbine.logger.error(
      'Proxy Headers must be an object of header names to values and will be ignored.'
    );
    return null;
  }

  const headers = {};
  Object.keys(parsed).forEach((key) => {
    const headerValue = parsed[key];
    if (
      headerValue !== null &&
      headerValue !== undefined &&
      headerValue !== ''
    ) {
      headers[key] = String(headerValue);
    }
  });

  return Object.keys(headers).length > 0 ? headers : null;
};

// Matches search-insights' requestFn contract: resolves true only on HTTP 200.
const createProxyRequestFn = (getHeaders) => (url, data) =>
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: Object.assign(
      { 'Content-Type': 'application/json' },
      getHeaders() || {}
    ),
    keepalive: true
  }).then((response) => response.status === 200);

module.exports.normalizeProxyHeaders = normalizeProxyHeaders;
module.exports.createProxyRequestFn = createProxyRequestFn;
