'use strict';

const window = require('@adobe/reactor-window');
const {
  OBJECT_ID_ATTRIBUTE,
  collectObjectIDs,
  objectIDsInList,
  resolveIndexName
} = require('./helpers/hitsList');

const DEFAULT_LIST_SELECTOR =
  '.ais-AutocompleteIndexList, .aa-List, .ais-InfiniteHits-list, .ais-Hits-list';
const DEFAULT_INDEX_NAME_QUERY_SELECTOR =
  '[data-indexname], [data-insights-index]';
const DEFAULT_DEBOUNCE_MS = 150;

const textOrDefault = (value, defaultValue) =>
  (typeof value === 'string' && value.trim()) || defaultValue;

const parseDebounce = (value) => {
  const parsed = Number(value);
  return value !== '' &&
    value !== null &&
    value !== undefined &&
    Number.isFinite(parsed) &&
    parsed >= 0
    ? parsed
    : DEFAULT_DEBOUNCE_MS;
};

/**
 * Fires the rule when new hits are rendered into an InstantSearch /
 * Autocomplete hit list.
 *
 * Settings:
 *  - listSelector:            CSS selector(s) of the hit list elements
 *  - indexNameQuerySelector:  ancestor selector carrying data-indexname or
 *                             data-insights-index
 *  - debounceMs:              wait this long after the last change in a list
 *                             before firing (one trigger per list per window)
 *  - dedupe:                  skip objectIDs already reported for the same
 *                             index/list during this page view
 *
 * Trigger payload: { element, target, objectIDs, indexName, timestamp }.
 * Only newly added hits are reported (including reused hit elements whose
 * objectID attribute changed), plus hits already in the DOM at setup. Hits
 * removed before the debounce elapses, and lists detached from the document,
 * are not reported.
 */
module.exports = function (settings, trigger) {
  const options = settings || {};
  const listSelector = textOrDefault(
    options.listSelector,
    DEFAULT_LIST_SELECTOR
  );
  const indexNameQuerySelector = textOrDefault(
    options.indexNameQuerySelector,
    DEFAULT_INDEX_NAME_QUERY_SELECTOR
  );
  const debounceMs = parseDebounce(options.debounceMs);
  const dedupe = options.dedupe === true;

  if (typeof window.MutationObserver !== 'function') {
    turbine.logger.warn(
      'Hits List Changed Event - MutationObserver is not available in this browser.'
    );
    return;
  }

  const document = window.document;
  const pending = new Map(); // list element -> Set<objectID>
  const timers = new Map(); // list element -> timeout id
  const sentByKey = new Map(); // index/list key -> Set<objectID>
  const listKeys = new WeakMap();
  let listKeyCounter = 0;

  const sentKey = (list, indexName) => {
    if (indexName) {
      return `index:${indexName}`;
    }
    if (!listKeys.has(list)) {
      listKeyCounter += 1;
      listKeys.set(list, `list:${listKeyCounter}`);
    }
    return listKeys.get(list);
  };

  const flush = (list) => {
    timers.delete(list);
    const queued = pending.get(list);
    pending.delete(list);
    if (!queued || queued.size === 0 || !list.isConnected) {
      return;
    }

    const rendered = objectIDsInList(list);
    let objectIDs = Array.from(queued).filter((id) => rendered.has(id));
    if (objectIDs.length === 0) {
      return;
    }

    const indexName = resolveIndexName(list, indexNameQuerySelector);

    if (dedupe) {
      const key = sentKey(list, indexName);
      if (!sentByKey.has(key)) {
        sentByKey.set(key, new Set());
      }
      const sent = sentByKey.get(key);
      objectIDs = objectIDs.filter((id) => !sent.has(id));
      objectIDs.forEach((id) => sent.add(id));
    }

    if (objectIDs.length === 0) {
      return;
    }

    const payload = {
      element: list,
      target: list,
      objectIDs,
      indexName,
      timestamp: Date.now()
    };

    turbine.logger.log(
      `Hits List Changed Event - Triggering for ${objectIDs.length} hit(s) (index: ${indexName}).`
    );
    trigger(payload);
  };

  const enqueue = (collected) => {
    collected.forEach((ids, list) => {
      if (!pending.has(list)) {
        pending.set(list, new Set());
      }
      const queued = pending.get(list);
      ids.forEach((id) => queued.add(id));

      if (timers.has(list)) {
        clearTimeout(timers.get(list));
      }
      timers.set(
        list,
        setTimeout(() => flush(list), debounceMs)
      );
    });
  };

  const scan = (node) => {
    try {
      enqueue(collectObjectIDs(node, listSelector));
    } catch (e) {
      turbine.logger.error(
        `Hits List Changed Event - Invalid selector "${listSelector}": ${e.message}`
      );
      return false;
    }
    return true;
  };

  // Hits that were rendered before this event module ran (server-rendered
  // lists, or lists that mounted early).
  if (!scan(document.documentElement)) {
    return;
  }

  // A reused hit element (unkeyed re-render) only gets a new attribute value.
  const scanAttributeChange = (mutation) => {
    const element = mutation.target;
    const id = element.getAttribute(OBJECT_ID_ATTRIBUTE);
    if (!id || id === mutation.oldValue) {
      return;
    }
    const list = element.closest(listSelector);
    if (list) {
      enqueue(new Map([[list, [id]]]));
    }
  };

  const observer = new window.MutationObserver((mutations) => {
    Array.prototype.forEach.call(mutations, (mutation) => {
      if (mutation.type === 'attributes') {
        scanAttributeChange(mutation);
      } else {
        Array.prototype.forEach.call(mutation.addedNodes, scan);
      }
    });
  });

  // Observe the root element: this module can load in <head>, before <body>.
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeOldValue: true,
    attributeFilter: [OBJECT_ID_ATTRIBUTE]
  });
};
