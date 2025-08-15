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
};
const addEventToStore = (recordId, payload) => {
  const algolia = getAlgoliaData();

  // if payload has queryId, this means a new search was executed and we want to
  // tie the conversion to new search.
  // if algolia object does not have recordId, then we want to capture this record
  if (payload.queryID || algolia[recordId] == null) {
    algolia[recordId] = payload;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(algolia));
  }
};

const removeEventToStore = (recordId) => {
  const algolia = getAlgoliaData();
  delete algolia[recordId];
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(algolia));
};

const getEventFromStore = (recordId) => {
  const algolia = getAlgoliaData();
  return algolia[recordId] || {};
};

const clearEventsToStore = () => {
  window.localStorage.removeItem(STORAGE_KEY);
};

module.exports.addEventToStore = addEventToStore;
module.exports.removeEventToStore = removeEventToStore;
module.exports.getEventFromStore = getEventFromStore;
module.exports.clearEventsToStore = clearEventsToStore;
