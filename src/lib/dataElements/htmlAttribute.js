'use strict';
const window = require('@adobe/reactor-window');

const DEFAULT_SELECTOR = 'html';
const DEFAULT_ATTRIBUTE_NAME = 'lang';

const isPrimitive = (value) =>
  ['string', 'number', 'boolean'].includes(typeof value);

/**
 * Reads an attribute (or, as a fallback, a DOM property) from an HTML element
 * and returns it as a JSON object: { [outputKey]: value }.
 *
 * Settings:
 *  - selector:      CSS selector of the element to read (default: "html")
 *  - attributeName: attribute/property to read           (default: "lang")
 *  - outputKey:     key used in the returned object      (default: attributeName)
 *
 * Examples:
 *  <html lang="en-US"> with defaults          -> { "lang": "en-US" }
 *  attributeName "lang", outputKey "Accept-Language" -> { "Accept-Language": "en-US" }
 *
 * Returns an empty object when the element or value cannot be found, so the
 * result is always safe to use as an object (e.g. as Proxy Headers).
 */
module.exports = function (settings) {
  const {
    selector: selectorSetting,
    attributeName: attributeNameSetting,
    outputKey: outputKeySetting
  } = settings || {};

  const selector = (selectorSetting || '').trim() || DEFAULT_SELECTOR;
  const attributeName =
    (attributeNameSetting || '').trim() || DEFAULT_ATTRIBUTE_NAME;
  const outputKey = (outputKeySetting || '').trim() || attributeName;

  let element = null;
  try {
    element = window.document.querySelector(selector);
  } catch (e) {
    turbine.logger.error(
      `HTML Attribute Data Element - Invalid selector "${selector}": ${e.message}`
    );
    return {};
  }

  if (!element) {
    turbine.logger.log(
      `HTML Attribute Data Element - No element found for selector "${selector}".`
    );
    return {};
  }

  let value = element.getAttribute(attributeName);
  if (value === null || value === undefined || value === '') {
    // Fall back to the DOM property (e.g. "value", "title", "href").
    const propertyValue = element[attributeName];
    value =
      isPrimitive(propertyValue) && propertyValue !== '' ? propertyValue : null;
  }

  if (value === null) {
    turbine.logger.log(
      `HTML Attribute Data Element - "${attributeName}" not found on "${selector}".`
    );
    return {};
  }

  const result = { [outputKey]: value };

  turbine.logger.log(`HTML Attribute Data Element - ${JSON.stringify(result)}`);

  return result;
};
