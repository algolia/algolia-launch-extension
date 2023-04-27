export default (values) => {
  const errors = {};

  if (!values.storageStrategy) {
    errors.storageStrategy = {
      message: 'Please specify the Storage Strategy',
      type: 'required'
    };
  }

  return errors;
};
