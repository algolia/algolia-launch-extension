const window = require('@adobe/reactor-window');
export function addEventToStore(path, payload) {
  window.sessionStorage.setItem(path, JSON.stringify(payload));
}

export function removeEventToStore(path) {
  window.sessionStorage.removeItem(path);
}

export function getEventToStore(path) {
  const item = window.sessionStorage.getItem(path);
  if (item) {
    return JSON.parse(item);
  }
  return {};
}
