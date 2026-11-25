/**
 * @jest-environment jsdom
 */
'use strict';

jest.mock('@adobe/reactor-window', () => global.window);

const hitsListChanged = require('../hitsListChanged');

const DEBOUNCE_MS = 150;

const hitHTML = (id) => `<li data-insights-object-id="${id}">${id}</li>`;

const setBody = (html) => {
  document.body.innerHTML = html;
};

const hitList = (ids, { className = 'ais-Hits-list' } = {}) => `
  <ul class="${className}">${ids.map(hitHTML).join('')}</ul>`;

// MutationObserver callbacks are microtasks; flush them, then run timers.
const flushMutations = () => Promise.resolve();
const advance = async (ms = DEBOUNCE_MS) => {
  await flushMutations();
  jest.advanceTimersByTime(ms);
};

const appendHTML = (parent, html) => {
  parent.insertAdjacentHTML('beforeend', html);
};

let trigger;

const setup = (settings = {}) => {
  trigger = jest.fn();
  hitsListChanged({ debounceMs: DEBOUNCE_MS, ...settings }, trigger);
};

beforeEach(() => {
  jest.useFakeTimers();
  document.body.innerHTML = '';
  turbine.logger.log.mockClear();
  turbine.logger.warn.mockClear();
  turbine.logger.error.mockClear();
});

afterEach(() => {
  jest.useRealTimers();
});

describe('hitsListChanged event', () => {
  it('fires for hits already in the DOM at setup time', async () => {
    setBody(hitList(['a', 'b']));

    setup();
    await advance();

    expect(trigger).toHaveBeenCalledTimes(1);
    const payload = trigger.mock.calls[0][0];
    expect(payload.objectIDs).toEqual(['a', 'b']);
    expect(payload.element).toBe(document.querySelector('.ais-Hits-list'));
    expect(payload.target).toBe(payload.element);
    expect(typeof payload.timestamp).toBe('number');
  });

  it('fires with only the newly appended hits (InfiniteHits)', async () => {
    setBody(hitList(['a', 'b'], { className: 'ais-InfiniteHits-list' }));
    setup();
    await advance();
    trigger.mockClear();

    appendHTML(
      document.querySelector('.ais-InfiniteHits-list'),
      hitHTML('c') + hitHTML('d')
    );
    await advance();

    expect(trigger).toHaveBeenCalledTimes(1);
    expect(trigger.mock.calls[0][0].objectIDs).toEqual(['c', 'd']);
  });

  it('fires when a whole list is rendered later', async () => {
    setup();
    await advance();
    expect(trigger).not.toHaveBeenCalled();

    appendHTML(document.body, hitList(['x', 'y']));
    await advance();

    expect(trigger).toHaveBeenCalledTimes(1);
    expect(trigger.mock.calls[0][0].objectIDs).toEqual(['x', 'y']);
  });

  it('fires when a wrapper containing a list is rendered later', async () => {
    setup();

    appendHTML(
      document.body,
      `<div id="widget">${hitList(['x'], {
        className: 'ais-AutocompleteIndexList'
      })}</div>`
    );
    await advance();

    expect(trigger).toHaveBeenCalledTimes(1);
    expect(trigger.mock.calls[0][0].objectIDs).toEqual(['x']);
  });

  it('supports Autocomplete.js lists (aa-List)', async () => {
    setup();

    appendHTML(document.body, hitList(['x'], { className: 'aa-List' }));
    await advance();

    expect(trigger).toHaveBeenCalledTimes(1);
  });

  it('does not fire when hits are only removed', async () => {
    setBody(hitList(['a', 'b']));
    setup();
    await advance();
    trigger.mockClear();

    document.querySelector('li').remove();
    await advance();

    expect(trigger).not.toHaveBeenCalled();
  });

  it('ignores text nodes, comments and elements without an object ID', async () => {
    setBody(hitList([]));
    setup();
    const list = document.querySelector('.ais-Hits-list');

    list.appendChild(document.createTextNode('hello'));
    list.appendChild(document.createComment('comment'));
    appendHTML(
      list,
      '<li>no object id</li><li data-insights-object-id="">x</li>'
    );
    await advance();

    expect(trigger).not.toHaveBeenCalled();
  });

  it('ignores hits outside of a matching list', async () => {
    setup();

    appendHTML(document.body, `<ul class="other-list">${hitHTML('z')}</ul>`);
    await advance();

    expect(trigger).not.toHaveBeenCalled();
  });

  it('produces a single trigger for a burst of mutations', async () => {
    setBody(hitList([]));
    setup();
    const list = document.querySelector('.ais-Hits-list');

    appendHTML(list, hitHTML('a'));
    await flushMutations();
    jest.advanceTimersByTime(DEBOUNCE_MS - 50);
    appendHTML(list, hitHTML('b'));
    await flushMutations();
    jest.advanceTimersByTime(DEBOUNCE_MS - 50);
    expect(trigger).not.toHaveBeenCalled();

    jest.advanceTimersByTime(100);

    expect(trigger).toHaveBeenCalledTimes(1);
    expect(trigger.mock.calls[0][0].objectIDs).toEqual(['a', 'b']);
  });

  it('triggers once per list with the correct indexName for each', async () => {
    setBody(`
      <div data-indexname="products">${hitList(['p1', 'p2'])}</div>
      <div data-insights-index="articles">${hitList(['a1'], {
        className: 'ais-AutocompleteIndexList'
      })}</div>`);

    setup();
    await advance();

    expect(trigger).toHaveBeenCalledTimes(2);
    const byIndex = {};
    trigger.mock.calls.forEach(([payload]) => {
      byIndex[payload.indexName] = payload.objectIDs;
    });
    expect(byIndex).toEqual({ products: ['p1', 'p2'], articles: ['a1'] });
  });

  it('leaves indexName undefined when there is no index wrapper', async () => {
    setBody(hitList(['a']));

    setup();
    await advance();

    expect(trigger.mock.calls[0][0].indexName).toBeUndefined();
  });

  it('does not repeat IDs by default when the same items are re-added', async () => {
    setBody(hitList(['a']));
    setup();
    await advance();
    trigger.mockClear();

    const list = document.querySelector('.ais-Hits-list');
    list.innerHTML = hitHTML('a');
    await advance();

    expect(trigger).toHaveBeenCalledTimes(1);
    expect(trigger.mock.calls[0][0].objectIDs).toEqual(['a']);
  });

  it('suppresses repeats when dedupe is enabled', async () => {
    setBody(`<div data-indexname="products">${hitList(['a', 'b'])}</div>`);
    setup({ dedupe: true });
    await advance();
    expect(trigger).toHaveBeenCalledTimes(1);
    trigger.mockClear();

    // Autocomplete re-renders the same items, plus one new one.
    const list = document.querySelector('.ais-Hits-list');
    list.innerHTML = hitHTML('a') + hitHTML('b') + hitHTML('c');
    await advance();

    expect(trigger).toHaveBeenCalledTimes(1);
    expect(trigger.mock.calls[0][0].objectIDs).toEqual(['c']);

    trigger.mockClear();
    list.innerHTML = hitHTML('a') + hitHTML('c');
    await advance();

    expect(trigger).not.toHaveBeenCalled();
  });

  it('does not report hits removed before the debounce elapses', async () => {
    setBody(hitList([]));
    setup();
    const list = document.querySelector('.ais-Hits-list');

    appendHTML(list, hitHTML('a') + hitHTML('b'));
    await flushMutations();
    list.querySelector('[data-insights-object-id="a"]').remove();
    await advance();

    expect(trigger).toHaveBeenCalledTimes(1);
    expect(trigger.mock.calls[0][0].objectIDs).toEqual(['b']);
  });

  it('does not fire when every queued hit was removed', async () => {
    setBody(hitList([]));
    setup();
    const list = document.querySelector('.ais-Hits-list');

    appendHTML(list, hitHTML('a'));
    await flushMutations();
    list.innerHTML = '';
    await advance();

    expect(trigger).not.toHaveBeenCalled();
  });

  it('does not fire for a list detached before the debounce elapses', async () => {
    setup();

    appendHTML(
      document.body,
      `<div data-indexname="products">${hitList(['a'], {
        className: 'aa-List'
      })}</div>`
    );
    await flushMutations();
    document.body.innerHTML = '';
    await advance();

    expect(trigger).not.toHaveBeenCalled();
  });

  it('does not mark removed hits as sent when dedupe is enabled', async () => {
    setBody(hitList([]));
    setup({ dedupe: true });
    const list = document.querySelector('.ais-Hits-list');

    appendHTML(list, hitHTML('a'));
    await flushMutations();
    list.innerHTML = '';
    await advance();
    expect(trigger).not.toHaveBeenCalled();

    appendHTML(list, hitHTML('a'));
    await advance();

    expect(trigger).toHaveBeenCalledTimes(1);
    expect(trigger.mock.calls[0][0].objectIDs).toEqual(['a']);
  });

  it('fires when a reused hit element gets a new objectID', async () => {
    setBody(hitList(['a', 'b']));
    setup();
    await advance();
    trigger.mockClear();

    const hits = document.querySelectorAll('[data-insights-object-id]');
    hits[0].setAttribute('data-insights-object-id', 'c');
    hits[1].setAttribute('data-insights-object-id', 'd');
    await advance();

    expect(trigger).toHaveBeenCalledTimes(1);
    expect(trigger.mock.calls[0][0].objectIDs).toEqual(['c', 'd']);
  });

  it('ignores attribute writes that keep the same objectID or are outside a list', async () => {
    setBody(`${hitList(['a'])}<div id="outside"></div>`);
    setup();
    await advance();
    trigger.mockClear();

    document
      .querySelector('[data-insights-object-id]')
      .setAttribute('data-insights-object-id', 'a');
    document
      .querySelector('#outside')
      .setAttribute('data-insights-object-id', 'z');
    await advance();

    expect(trigger).not.toHaveBeenCalled();
  });

  it('honors a custom listSelector', async () => {
    setBody(`<ul class="my-list">${hitHTML('m')}</ul>${hitList(['d'])}`);

    setup({ listSelector: '.my-list' });
    await advance();

    expect(trigger).toHaveBeenCalledTimes(1);
    expect(trigger.mock.calls[0][0].objectIDs).toEqual(['m']);
  });

  it('falls back to defaults when settings are missing', async () => {
    setBody(hitList(['a']));
    trigger = jest.fn();

    hitsListChanged(undefined, trigger);
    await advance(150);

    expect(trigger).toHaveBeenCalledTimes(1);
  });

  it('logs an error and does not observe when the selector is invalid', async () => {
    setBody(hitList(['a']));

    setup({ listSelector: '[[invalid' });
    await advance();

    expect(turbine.logger.error).toHaveBeenCalled();
    expect(trigger).not.toHaveBeenCalled();
  });

  it('warns when MutationObserver is unavailable', () => {
    const original = window.MutationObserver;
    window.MutationObserver = undefined;

    try {
      setup();
    } finally {
      window.MutationObserver = original;
    }

    expect(turbine.logger.warn).toHaveBeenCalledTimes(1);
    expect(trigger).not.toHaveBeenCalled();
  });
});
