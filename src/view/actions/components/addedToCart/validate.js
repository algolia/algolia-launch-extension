export default (values) => {
  const errors = {};

  if (!values.eventDetailsDataElement) {
    errors.eventDetailsDataElement = {
      message: 'Please specify your Event Details Data Element',
      type: 'required'
    };
  }

  if (!values.eventName) {
    errors.eventName = {
      message: 'Please specify your Event Name',
      type: 'required'
    };
  }

  return errors;
};
