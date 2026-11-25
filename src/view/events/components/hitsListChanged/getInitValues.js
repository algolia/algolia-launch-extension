export const DEFAULT_LIST_SELECTOR =
  '.ais-AutocompleteIndexList, .aa-List, .ais-InfiniteHits-list, .ais-Hits-list';
export const DEFAULT_INDEX_NAME_QUERY_SELECTOR =
  '[data-indexname], [data-insights-index]';
export const DEFAULT_DEBOUNCE_MS = 150;

export default (initInfo) => {
  const { settings } = initInfo || {};
  const {
    listSelector = DEFAULT_LIST_SELECTOR,
    indexNameQuerySelector = DEFAULT_INDEX_NAME_QUERY_SELECTOR,
    debounceMs = DEFAULT_DEBOUNCE_MS,
    dedupe = false
  } = settings || {};

  return {
    listSelector,
    indexNameQuerySelector,
    debounceMs: String(debounceMs),
    dedupe
  };
};
