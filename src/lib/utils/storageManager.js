const window = require('@adobe/reactor-window');

const STORAGE_KEY = 'algolia';

const getAlgoliaData = () => {
  const localStorage = window.localStorage;
  let algolia = localStorage.getItem(STORAGE_KEY);
  if (!algolia) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({}));
    algolia = localStorage.getItem(STORAGE_KEY);
  }
  return JSON.parse(algolia);
}
const addEventToStore = (path, payload) => {
  const algolia = getAlgoliaData();

  // if payload has queryId, this means a new search was executed and we want to
  // tie the conversion to new search.
  // if algolia object does not have path, then we want to capture this record
  if (payload.queryID || algolia[path] == null) {
    algolia[path] = payload;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(algolia));
  }
}

const removeEventToStore = (path) => {
  const algolia = getAlgoliaData();
  delete algolia[path];
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(algolia));
}

const getEventToStore = (path) => {
  const algolia = getAlgoliaData();
  return algolia[path] || {};
}

const clearEventToStore = () => {
  window.localStorage.removeItem(STORAGE_KEY);
}

module.exports.addEventToStore = addEventToStore;
module.exports.removeEventToStore = removeEventToStore;
module.exports.getEventToStore = getEventToStore;
module.exports.clearEventToStore = clearEventToStore;
