'use strict';

module.exports = function(settings, event) {
  const { querySelector } = settings;

  if (event && event.nativeEvent && event.nativeEvent.srcElement) {
    const srcElement = event.nativeEvent.srcElement;
    const ancestor = srcElement.closest(querySelector);
    if (ancestor) {
      return ancestor.dataset;
    }
  }
  return null;
};
