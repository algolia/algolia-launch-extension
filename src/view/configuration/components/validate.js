export default (values) => {
  const errors = {};

  if (!values.appId) {
    errors.appId = {
      message: 'Please specify your Application ID',
      type: 'required'
    };
  }

  if (!values.apiKey) {
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

  return errors;
};
