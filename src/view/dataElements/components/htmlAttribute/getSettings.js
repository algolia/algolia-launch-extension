export default ({ selector, attributeName, outputKey }) => ({
  selector: (selector || '').trim(),
  attributeName: (attributeName || '').trim(),
  outputKey: (outputKey || '').trim()
});
