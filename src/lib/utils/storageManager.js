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

const addEventToStore = (recordID, payload) => {
  const algolia = getAlgoliaData();

  // if payload has queryId, this means a new search was executed and we want to
  // tie the conversion to new search.
  // if algolia object does not have recordID, then we want to capture this record
  if (payload.queryID || algolia[recordID] == null) {
    algolia[recordID] = payload;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(algolia));
  }
};

const removeEventFromStore = (recordID) => {
  const algolia = getAlgoliaData();
  delete algolia[recordID];
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(algolia));
};

const removeEventsFromStore = (objectIDs) => {
  if (objectIDs) {
    const algoliaData = getAlgoliaData;
    if (algoliaData) {
      Object.keys(algoliaData).forEach(recordID => {
        console.debug(`${ recordID }: ${ algoliaData[recordID] }`);
        const item = algoliaData[recordID];
        if (item.objectIDs.length > 0) {
          if (objectIDs.includes(item.objectIDs[0])) {
            removeEventFromStore(recordID);
          }
        }
      });
    }
  }
};

const getEventFromStore = (recordID) => {
  const algolia = getAlgoliaData();
  return algolia[recordID] || {};
};

const getAllEventFromStore = () => {
  return getAlgoliaData();
};

const clearEventsToStore = () => {
  window.localStorage.removeItem(STORAGE_KEY);
};

module.exports.addEventToStore = addEventToStore;
module.exports.removeEventFromStore = removeEventFromStore;
module.exports.removeEventsFromStore = removeEventsFromStore;
module.exports.getEventFromStore = getEventFromStore;
module.exports.getAllEventFromStore = getAllEventFromStore;
module.exports.clearEventsToStore = clearEventsToStore;
