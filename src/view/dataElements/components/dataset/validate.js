export default (values) => {
  const errors = {};

  if (!values.querySelector) {
    errors.querySelector = {
      message: 'Please specify the HTML Element with Algolia Data',
      type: 'required'
    };
  }

  return errors;
};
