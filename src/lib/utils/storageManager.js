const window = require('@adobe/reactor-window');

const getAlgoliaData = () => {
  const sessionStorage = window.sessionStorage;
  let algolia = sessionStorage.getItem('algolia');
  if (!algolia) {
    sessionStorage.setItem('algolia', JSON.stringify({}));
    algolia = sessionStorage.getItem('algolia');
  }
  return JSON.parse(algolia);
}
const addEventToStore = (path, payload) => {
  const algolia = getAlgoliaData();

  // if payload has queryId, this means a new search was executed and we want
  // tie conversion to new search.
  // if algolia object does not have path, then we want to capture this record
  if (payload.queryID || algolia[path] == null) {
    algolia[path] = payload;
    window.sessionStorage.setItem('algolia', JSON.stringify(algolia));
  }
}

const removeEventToStore = (path) => {
  const algolia = getAlgoliaData();
  delete algolia[path];
  window.sessionStorage.setItem('algolia', JSON.stringify(algolia));
}

const getEventToStore = (path) => {
  const algolia = getAlgoliaData();
  return algolia[path] || {};
}

module.exports.addEventToStore = addEventToStore;
module.exports.removeEventToStore = removeEventToStore;
module.exports.getEventToStore = getEventToStore;
