export default (values) => {
  const errors = {};

  if (!values.selector || !values.selector.trim()) {
    errors.selector = {
      message: 'Please specify a CSS selector (for example: html).',
      type: 'required'
    };
  } else {
    try {
      document.createDocumentFragment().querySelector(values.selector.trim());
    } catch (e) {
      errors.selector = {
        message: 'Please specify a valid CSS selector.',
        type: 'invalid'
      };
    }
  }

  if (!values.attributeName || !values.attributeName.trim()) {
    errors.attributeName = {
      message: 'Please specify the attribute name (for example: lang).',
      type: 'required'
    };
  }

  return errors;
};
