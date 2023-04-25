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
  algolia[path] = payload;
  window.sessionStorage.setItem('algolia', JSON.stringify(algolia));
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
