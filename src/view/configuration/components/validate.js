export default (values) => {
  const errors = {};

  // The authentication method determines which credentials are required. When
  // the proxy method is selected, the proxy is responsible for injecting the
  // Algolia credentials server-side, so the Application ID and Search API Key
  // are optional (and shouldn't be provided, to keep the key hidden). Fall back
  // to the presence of a proxy URL for configurations saved before the method
  // was made explicit.
  const usingProxy = values.credentialType
    ? values.credentialType === 'proxy'
    : Boolean(values.proxyUrlDataElement && values.proxyUrlDataElement.trim());

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

  const proxyUrl = values.proxyUrlDataElement;
  if (usingProxy && !(proxyUrl && proxyUrl.trim())) {
    errors.proxyUrlDataElement = {
      message: 'Please specify your Proxy URL',
      type: 'required'
    };
  } else if (proxyUrl && proxyUrl.trim()) {
    const isValidUrl = (url) => {
      try {
        return !!new URL(url);
      } catch {
        return false;
      }
    };
    // A data element token (e.g. %proxyUrl%) is resolved at runtime, so it
    // can't be validated as a URL here.
    const isDataElementToken = /^%[^%]+%$/.test(proxyUrl.trim());
    if (!isDataElementToken && !isValidUrl(proxyUrl)) {
      errors.proxyUrlDataElement = {
        message: 'Please enter a valid URL (e.g. https://proxy.example.com)',
        type: 'pattern'
      };
    }
  }

  return errors;
};
