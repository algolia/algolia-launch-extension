import {
  DEFAULT_DEBOUNCE_MS,
  DEFAULT_INDEX_NAME_QUERY_SELECTOR,
  DEFAULT_LIST_SELECTOR
} from './getInitValues';

const parseDebounce = (value) => {
  const parsed = parseInt(value, 10);
  return Number.isNaN(parsed) || parsed < 0 ? DEFAULT_DEBOUNCE_MS : parsed;
};

export default ({
  listSelector,
  indexNameQuerySelector,
  debounceMs,
  dedupe
}) => ({
  listSelector: (listSelector || '').trim() || DEFAULT_LIST_SELECTOR,
  indexNameQuerySelector:
    (indexNameQuerySelector || '').trim() || DEFAULT_INDEX_NAME_QUERY_SELECTOR,
  debounceMs: parseDebounce(debounceMs),
  dedupe: Boolean(dedupe)
});
