**NOTE: This is a Proof of Concept.  This is not production ready.**

# Algolia Launch Extension
The Algolia Launch Extension adds the Algolia Search Insights to the Adobe Launch Platform.  This extension has two actions, "Click after Search" or "Convert after Search".

## Resources
- [Send Insights Events](https://www.algolia.com/doc/guides/building-search-ui/going-further/send-insights-events/js/)
- [Sending Insights Events](https://www.algolia.com/doc/guides/sending-events/implementing/how-to/sending-events-backend/)

## Prerequisites

1. The Algolia Insights library needs to be loaded and an insight middleware needs to be created.
```
var ALGOLIA_INSIGHTS_SRC = 'https://cdn.jsdelivr.net/npm/search-insights@2.0.3';
!function (e, a, t, n, s, i, c) {
  e.AlgoliaAnalyticsObject = s, e[s] = e[s] || function () {
    (e[s].queue = e[s].queue || []).push(arguments);
  }, i = a.createElement(t), c = a.getElementsByTagName(t)[0],
    i.async = 1, i.src = n, c.parentNode.insertBefore(i, c);
}(window, document, 'script', ALGOLIA_INSIGHTS_SRC, 'aa');

const insightsMiddleware = instantsearch.middlewares.createInsightsMiddleware({
  insightsClient: window.aa,
});
```

2. Add middleware to the Instant Search instance.
```
const search = instantsearch({
  indexName: 'ADXCFDSS',
  searchClient,
});

search.use(insightsMiddleware);
```

## Actions
The two actions for this extension requires changes on the search and product detail experience.

### Click after Search

1. "Click after Search" action requires dataset to be added to each search hit.  Below is an example:
```
<div class="hit-card"
    data-insights-object-id="${hit.objectID}"
    data-insights-position="${hit.__position}"
    data-insights-query-id="${hit.__queryID}">
    <h4 class="hit-name">...</h4>
    <div class="hit-card-foot">
        <div class="hit-card-foot-link">
            <a href="product.html?objectID=${hit.objectID}&amp;queryID=${hit.__queryID}">Read More</a></div>
    </div>
</div>
```

2. In the configuration in the Adobe Launch Console, add the following:
- Event Name: Any name to identifies the event.
- CSS Class Name of the HTML DOM element that contains the dataset.

### Convert after Search
1. "Convert after Search" action requires two query params added to the url. Below is an example:

```
<a href="product.html?objectID=${hit.objectID}&amp;queryID=${hit.__queryID}">Read More</a></div>
```

2. In the configuration in the Adobe Launch Console, add the following:
- Event Name: Any name to identifies the event.
- CSS Class Name of the HTML DOM element that contains the dataset.

*This is a POC and it is not intended to be supported or maintained by Algolia*.

## Development & Release
For development and release process, you can refer to the [Adobe Launch Extension development page](https://experienceleague.adobe.com/docs/experience-platform/tags/extension-dev/submit/develop.html).

### Scaffold
The command provides a way to add actions, data elements, and events assets.
```
npx @adobe/reactor-scaffold
```

### Sandbox
The command starts a local development environment for Launch extension development.
```
npx @adobe/reactor-sandbox
```

### Packager
The command packages the Launch extension places the file at the root of the folder.
```
npx @adobe/reactor-packager
```

### Upload
The command uploads the package to the targeted Adobe Launch service in Adobe IO.
```
npx @adobe/reactor-uploader --private-key=<LOCATION of PRIVATE-KEY> --org-id=<ORG-ID> --tech-account-id=<TEST-ACCOUNT-ID> --api-key=<API-KEY> --client-secret=<CLIENT-SECRET>
```

### Release
The command releases the package to be installed for use.
```
npx @adobe/reactor-releaser --private-key=<LOCATION of PRIVATE-KEY> --org-id=<ORG-ID> --tech-account-id=<TEST-ACCOUNT-ID> --api-key=<API-KEY> --client-secret=<CLIENT-SECRET>
```
