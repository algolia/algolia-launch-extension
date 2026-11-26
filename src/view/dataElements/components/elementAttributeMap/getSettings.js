export default ({ mappings }) => ({
  mappings: (mappings || []).map(({ selector, attributeName, outputKey }) => ({
    selector: (selector || '').trim(),
    attributeName: (attributeName || '').trim(),
    outputKey: (outputKey || '').trim()
  }))
});
