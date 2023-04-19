export default (values) => {
  const errors = {};

  if (!values.hitQuerySelector) {
    errors.hitQuerySelector = {
      message: 'Please specify the Hit HTML Element with Algolia Data',
      type: 'required'
    };
  }

  if (!values.indexNameQuerySelector) {
    errors.indexNameQuerySelector = {
      message: 'Please specify the Index Name HTML Element with Algolia Data',
      type: 'required'
    };
  }

  return errors;
};
