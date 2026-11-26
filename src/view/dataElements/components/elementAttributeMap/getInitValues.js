const DEFAULT_MAPPING = {
  selector: 'html',
  attributeName: 'lang',
  outputKey: ''
};

const toMapping = ({
  selector = DEFAULT_MAPPING.selector,
  attributeName = DEFAULT_MAPPING.attributeName,
  outputKey = DEFAULT_MAPPING.outputKey
} = {}) => ({
  selector,
  attributeName,
  outputKey
});

export default (initInfo) => {
  const { settings } = initInfo || {};

  if (
    settings &&
    Array.isArray(settings.mappings) &&
    settings.mappings.length
  ) {
    return {
      mappings: settings.mappings.map((mapping) => toMapping(mapping))
    };
  }

  // Migrate legacy single-mapping settings into the mappings array.
  if (
    settings &&
    (settings.selector || settings.attributeName || settings.outputKey)
  ) {
    return { mappings: [toMapping(settings)] };
  }

  return { mappings: [toMapping()] };
};
