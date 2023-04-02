export default (values) => {
  const errors = {};

  if (!values.objectIDParamName) {
    errors.objectIDParamName = {
      message: 'Please specify the Object ID param name in the URL.',
      type: 'required'
    };
  }

  return errors;
};
