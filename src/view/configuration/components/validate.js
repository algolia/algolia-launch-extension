export default (values) => {
  const errors = {};

  // When a proxy URL is configured, the proxy is responsible for injecting the
  // Algolia credentials server-side, so the Application ID and Search API Key
  // no longer need to be provided (and shouldn't be, to keep the key hidden).
  const usingProxy = Boolean(values.proxyUrl && values.proxyUrl.trim());

  if (!usingProxy && !values.appId) {
    errors.appId = {
      message: 'Please specify your Application ID',
      type: 'required'
    };
  }

  if (!usingProxy && !values.apiKey) {
    errors.apiKey = {
      message: 'Please specify your Search API Key',
      type: 'required'
    };
  }

  if (!values.indexName) {
    errors.indexName = {
      message: 'Please specify your Search Index Name',
      type: 'required'
    };
  }

  if (!values.userTokenDataElement) {
    errors.userTokenDataElement = {
      message: 'Please specify the User Token Data Element',
      type: 'required'
    };
  }

  if (!values.currency) {
    errors.currency = {
      message: 'Please specify the Currency for the property',
      type: 'required'
    };
  }

  if (values.proxyUrl) {
    const isValidUrl = (url) => {
      try {
        return !!new URL(url);
      } catch {
        return false;
      }
    };
    // A data element token (e.g. %proxyUrl%) is resolved at runtime, so it
    // can't be validated as a URL here.
    const isDataElementToken = /^%[^%]+%$/.test(values.proxyUrl.trim());
    if (!isDataElementToken && !isValidUrl(values.proxyUrl)) {
      errors.proxyUrl = {
        message: 'Please enter a valid URL (e.g. https://proxy.example.com)',
        type: 'pattern'
      };
    }
  }

  return errors;
};
