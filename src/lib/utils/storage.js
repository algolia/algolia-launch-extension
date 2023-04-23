const window = require('@adobe/reactor-window');
module.exports = function addEventToStore(path, payload) {
  window.sessionStorage.setItem(path, JSON.stringify(payload));
}

module.exports = function removeEventToStore(path) {
  window.sessionStorage.removeItem(path);
}

module.exports = function getEventToStore(path) {
  const item = window.sessionStorage.getItem(path);
  if (item) {
    return JSON.parse(item);
  }
  return {};
}
