export default (values) => {
  const errors = {};

  if (!values.eventName) {
    errors.eventName = {
      message: 'Please specify your Event Name',
      type: 'required'
    };
  }

  return errors;
};
