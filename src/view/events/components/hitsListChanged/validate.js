const isValidSelector = (selector) => {
  try {
    document.createDocumentFragment().querySelector(selector.trim());
    return true;
  } catch (e) {
    return false;
  }
};

const validateSelector = (errors, values, name, label) => {
  const value = values[name];
  if (!value || !value.trim()) {
    errors[name] = {
      message: `Please specify the ${label}.`,
      type: 'required'
    };
  } else if (!isValidSelector(value)) {
    errors[name] = {
      message: `Please specify a valid CSS selector for the ${label}.`,
      type: 'invalid'
    };
  }
};

export default (values) => {
  const errors = {};

  validateSelector(errors, values, 'listSelector', 'hit list selector');
  validateSelector(
    errors,
    values,
    'indexNameQuerySelector',
    'index name selector'
  );

  const debounce = String(
    values.debounceMs === undefined ? '' : values.debounceMs
  ).trim();
  if (!/^\d+$/.test(debounce)) {
    errors.debounceMs = {
      message: 'Please specify a debounce in milliseconds (0 or greater).',
      type: 'invalid'
    };
  }

  return errors;
};
