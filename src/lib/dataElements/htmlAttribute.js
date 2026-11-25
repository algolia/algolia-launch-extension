'use strict';
const window = require('@adobe/reactor-window');

const DEFAULT_SELECTOR = 'html';
const DEFAULT_ATTRIBUTE_NAME = 'lang';

const isPrimitive = (value) =>
  ['string', 'number', 'boolean'].includes(typeof value);

const normalizeMapping = (mapping) => {
  const selector = (mapping.selector || '').trim() || DEFAULT_SELECTOR;
  const attributeName =
    (mapping.attributeName || '').trim() || DEFAULT_ATTRIBUTE_NAME;
  const outputKey = (mapping.outputKey || '').trim() || attributeName;

  return { selector, attributeName, outputKey };
};

const getMappings = (settings) => {
  if (
    settings &&
    Array.isArray(settings.mappings) &&
    settings.mappings.length
  ) {
    return settings.mappings.map(normalizeMapping);
  }

  // Legacy single-mapping settings shape from 3.4.0-beta.1.
  if (
    settings &&
    (settings.selector || settings.attributeName || settings.outputKey)
  ) {
    return [normalizeMapping(settings)];
  }

  return [normalizeMapping({})];
};

const readValue = (element, attributeName) => {
  let value = element.getAttribute(attributeName);
  if (value === null || value === undefined || value === '') {
    const propertyValue = element[attributeName];
    value =
      isPrimitive(propertyValue) && propertyValue !== '' ? propertyValue : null;
  }
  return value;
};

const readMapping = ({ selector, attributeName, outputKey }) => {
  let element = null;
  try {
    element = window.document.querySelector(selector);
  } catch (e) {
    turbine.logger.error(
      `HTML Attribute Data Element - Invalid selector "${selector}": ${e.message}`
    );
    return null;
  }

  if (!element) {
    turbine.logger.log(
      `HTML Attribute Data Element - No element found for selector "${selector}".`
    );
    return null;
  }

  const value = readValue(element, attributeName);
  if (value === null) {
    turbine.logger.log(
      `HTML Attribute Data Element - "${attributeName}" not found on "${selector}".`
    );
    return null;
  }

  return { [outputKey]: value };
};

/**
 * Reads one or more HTML attributes/properties and returns them as a single
 * JSON object. Each mapping contributes one key/value pair.
 *
 * Settings:
 *  - mappings: [{ selector, attributeName, outputKey }, ...]
 *
 * Defaults per mapping: selector "html", attributeName "lang",
 * outputKey = attributeName.
 *
 * Example:
 *  mappings: [
 *    { selector: "html", attributeName: "lang", outputKey: "Accept-Language" },
 *    { selector: "meta[name=countryCodeIso2]", attributeName: "content",
 *      outputKey: "X-Country" }
 *  ]
 *  -> { "Accept-Language": "en-US", "X-Country": "US" }
 *
 * Always returns an object (possibly empty) so it is safe to use as Proxy Headers.
 */
module.exports = function (settings) {
  const result = {};

  getMappings(settings).forEach((mapping) => {
    const entry = readMapping(mapping);
    if (entry) {
      Object.assign(result, entry);
    }
  });

  turbine.logger.log(`HTML Attribute Data Element - ${JSON.stringify(result)}`);

  return result;
};
