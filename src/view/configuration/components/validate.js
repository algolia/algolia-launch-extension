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

  return errors;
};
