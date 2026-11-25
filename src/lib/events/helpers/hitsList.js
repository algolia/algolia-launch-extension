'use strict';

const OBJECT_ID_ATTRIBUTE = 'data-insights-object-id';
const OBJECT_ID_SELECTOR = `[${OBJECT_ID_ATTRIBUTE}]`;
const ELEMENT_NODE = 1;

const addIDs = (result, list, ids) => {
  if (!ids.length) {
    return;
  }
  if (!result.has(list)) {
    result.set(list, []);
  }
  const existing = result.get(list);
  ids.forEach((id) => {
    if (!existing.includes(id)) {
      existing.push(id);
    }
  });
};

const idsWithin = (root, includeSelf) => {
  const ids = [];
  const push = (element) => {
    const id = element.getAttribute(OBJECT_ID_ATTRIBUTE);
    if (id) {
      ids.push(id);
    }
  };

  if (includeSelf && root.matches(OBJECT_ID_SELECTOR)) {
    push(root);
  }
  Array.prototype.forEach.call(root.querySelectorAll(OBJECT_ID_SELECTOR), push);
  return ids;
};

/**
 * Collects the objectIDs (data-insights-object-id) that belong to a hit list
 * from a freshly added DOM node. Only hits that live inside an element
 * matching `listSelector` are returned, so unrelated widgets are ignored.
 *
 * Returns a Map<listElement, objectID[]> (unique IDs, DOM order).
 *  - node is, or is inside, a list: IDs on the node itself and its descendants
 *    are attributed to that list.
 *  - node contains one or more lists: IDs inside each contained list are
 *    attributed to that list.
 *  - Non-element nodes (text, comments) are ignored.
 */
const collectObjectIDs = (node, listSelector) => {
  const result = new Map();
  if (!node || node.nodeType !== ELEMENT_NODE) {
    return result;
  }

  const containingList = node.closest(listSelector);
  if (containingList) {
    addIDs(result, containingList, idsWithin(node, true));
    return result;
  }

  Array.prototype.forEach.call(node.querySelectorAll(listSelector), (list) => {
    addIDs(result, list, idsWithin(list, false));
  });
  return result;
};

/**
 * Resolves the index name for a list from the closest ancestor matching
 * `indexNameQuerySelector`, reading data-indexname or data-insights-index.
 * Returns undefined when nothing is found.
 */
const resolveIndexName = (list, indexNameQuerySelector) => {
  let holder = null;
  try {
    holder = list.closest(indexNameQuerySelector);
  } catch (e) {
    return undefined;
  }
  if (!holder || !holder.dataset) {
    return undefined;
  }
  return holder.dataset.indexname || holder.dataset.insightsIndex || undefined;
};

const chunk = (items, size) => {
  const chunks = [];
  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size));
  }
  return chunks;
};

module.exports = {
  OBJECT_ID_ATTRIBUTE,
  collectObjectIDs,
  resolveIndexName,
  chunk
};
