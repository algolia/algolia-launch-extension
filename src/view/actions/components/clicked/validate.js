export default (values) => {
  const errors = {};

  if (!values.eventDetailsDataElement) {
    errors.eventDetailsDataElement = {
      message: 'Please specify your Event Details Data Element',
      type: 'required'
    };
  }

  if (!values.userTokenDataElement) {
    errors.userTokenDataElement = {
      message: 'Please specify your User Token Data Element',
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
