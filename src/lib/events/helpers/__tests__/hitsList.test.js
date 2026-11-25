/**
 * @jest-environment jsdom
 */
'use strict';

const {
  chunk,
  collectObjectIDs,
  objectIDsInList,
  resolveIndexName
} = require('../hitsList');

const LIST_SELECTOR = '.ais-Hits-list';

const fromHTML = (html) => {
  const container = document.createElement('div');
  container.innerHTML = html.trim();
  return container.firstElementChild;
};

describe('collectObjectIDs', () => {
  it('returns an empty map for non-element nodes and null', () => {
    expect(collectObjectIDs(null, LIST_SELECTOR).size).toBe(0);
    expect(
      collectObjectIDs(document.createTextNode('x'), LIST_SELECTOR).size
    ).toBe(0);
  });

  it('collects IDs from a node that is inside a list, including itself', () => {
    const list = fromHTML(
      `<ul class="ais-Hits-list"><li id="hit" data-insights-object-id="a"><span data-insights-object-id="b"></span></li></ul>`
    );
    const hit = list.querySelector('#hit');

    const result = collectObjectIDs(hit, LIST_SELECTOR);

    expect(result.get(list)).toEqual(['a', 'b']);
  });

  it('collects IDs from a list element that is itself the added node', () => {
    const list = fromHTML(
      `<ul class="ais-Hits-list"><li data-insights-object-id="a"></li><li data-insights-object-id="b"></li></ul>`
    );

    expect(collectObjectIDs(list, LIST_SELECTOR).get(list)).toEqual(['a', 'b']);
  });

  it('collects IDs from lists contained in the added node', () => {
    const wrapper = fromHTML(
      `<div><ul class="ais-Hits-list"><li data-insights-object-id="a"></li></ul><ul class="ais-Hits-list"><li data-insights-object-id="b"></li></ul></div>`
    );
    const lists = wrapper.querySelectorAll('.ais-Hits-list');

    const result = collectObjectIDs(wrapper, LIST_SELECTOR);

    expect(result.get(lists[0])).toEqual(['a']);
    expect(result.get(lists[1])).toEqual(['b']);
  });

  it('ignores hits that are not within a list', () => {
    const node = fromHTML(`<div data-insights-object-id="a"></div>`);

    expect(collectObjectIDs(node, LIST_SELECTOR).size).toBe(0);
  });

  it('de-duplicates IDs per list and skips empty ones', () => {
    const list = fromHTML(
      `<ul class="ais-Hits-list"><li data-insights-object-id="a"><a data-insights-object-id="a"></a></li><li data-insights-object-id=""></li></ul>`
    );

    expect(collectObjectIDs(list, LIST_SELECTOR).get(list)).toEqual(['a']);
  });
});

describe('objectIDsInList', () => {
  it('returns the set of objectIDs rendered inside the list', () => {
    const list = fromHTML(
      `<ul class="ais-Hits-list"><li data-insights-object-id="a"></li><li data-insights-object-id="b"></li><li data-insights-object-id=""></li></ul>`
    );

    expect(objectIDsInList(list)).toEqual(new Set(['a', 'b']));
  });
});

describe('resolveIndexName', () => {
  it('reads data-indexname from the closest holder', () => {
    const wrapper = fromHTML(
      `<div data-indexname="products"><ul class="ais-Hits-list"></ul></div>`
    );

    expect(
      resolveIndexName(wrapper.firstElementChild, '[data-indexname]')
    ).toBe('products');
  });

  it('reads data-insights-index', () => {
    const wrapper = fromHTML(
      `<div data-insights-index="articles"><ul class="ais-Hits-list"></ul></div>`
    );

    expect(
      resolveIndexName(
        wrapper.firstElementChild,
        '[data-indexname], [data-insights-index]'
      )
    ).toBe('articles');
  });

  it('returns undefined when there is no holder or the selector is invalid', () => {
    const list = fromHTML(`<ul class="ais-Hits-list"></ul>`);

    expect(resolveIndexName(list, '[data-indexname]')).toBeUndefined();
    expect(resolveIndexName(list, '[[invalid')).toBeUndefined();
  });
});

describe('chunk', () => {
  it('splits arrays into chunks of the given size', () => {
    expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
    expect(chunk([], 20)).toEqual([]);
    expect(chunk([1], 20)).toEqual([[1]]);
  });
});
