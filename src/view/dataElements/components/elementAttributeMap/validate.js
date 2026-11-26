const isValidSelector = (selector) => {
  try {
    document.createDocumentFragment().querySelector(selector);
    return true;
  } catch (e) {
    return false;
  }
};

export default (values) => {
  const errors = {};
  const mappings = values.mappings || [];

  if (!mappings.length) {
    errors.mappings = {
      message: 'Add at least one attribute mapping.',
      type: 'required'
    };
    return errors;
  }

  const seenOutputKeys = new Set();

  const mappingErrors = mappings.map((mapping) => {
    const rowErrors = {};
    const selector = (mapping?.selector || '').trim();
    const attributeName = (mapping?.attributeName || '').trim();
    const outputKey = (mapping?.outputKey || '').trim() || attributeName;

    if (!selector) {
      rowErrors.selector = {
        message: 'Please specify a CSS selector (for example: html).',
        type: 'required'
      };
    } else if (!isValidSelector(selector)) {
      rowErrors.selector = {
        message: 'Please specify a valid CSS selector.',
        type: 'invalid'
      };
    }

    if (!attributeName) {
      rowErrors.attributeName = {
        message: 'Please specify the attribute name (for example: lang).',
        type: 'required'
      };
    }

    if (outputKey) {
      if (seenOutputKeys.has(outputKey)) {
        rowErrors.outputKey = {
          message: `Output key "${outputKey}" is already used by another mapping.`,
          type: 'duplicate'
        };
      }
      seenOutputKeys.add(outputKey);
    }

    return Object.keys(rowErrors).length ? rowErrors : undefined;
  });

  if (mappingErrors.some(Boolean)) {
    errors.mappings = mappingErrors;
  }

  return errors;
};
