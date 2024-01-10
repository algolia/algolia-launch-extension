# Algolia Launch Extension

The Algolia Launch Extension wraps the Algolia Search Insights to send user interaction events to Algolia to enable AI
feature.

**NOTE**
> The connector is provided « as is » and Algolia (a) makes no representation or warranties of any kind, whether express, implied, statutory or otherwise regarding the connector, and (b) disclaims all warranties, including any implied or express warranties (i) of merchantability, satisfactory quality, fitness for a particular purpose, non-infringement, or quiet enjoyment, (ii) arising out of any course of dealing or usage of trade, and (iii) that the connector will be uninterrupted, error free or free of harmful components.
> Algolia does not provide support for the connector, including installation or troubleshooting. If you require help with this connector, please contact Algolia Sales.
> The connector, and Subscriber’s use of such connector is subject to and governed by the applicable open source license accompanying, linked to or embedded in such connector repository (“Open Source License”). Algolia grants Subscriber a license to use the connector to the full extent permitted by the applicable Open Source License.


## What is inside?

The extension includes a Configuration, four Actions, and three Data Elements to help configure the Algolia Insights
based on business requirements.

### Configuration

| Property                              | Description                                                                                                                                          |
|---------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------|
| Application ID                        | Enter the Application Id which can be found in the on the Algolia Dashboard in the [API Keys](https://www.algolia.com/account/api-keys/all) section. |
| Search API Key                        | Enter Search API Key which can be found in the on the Algolia Dashboard in the [API Keys](https://www.algolia.com/account/api-keys/all) section.     |
| Index Name                            | Enter the Index Name that contain the Products or Content.  This Index will be used as a default.                                                    |
| User Token Data Element               | Set the Data Element that will return the User Token.                                                                                                |
| Authenticated User Token Data Element | Set the Data Element that will return the Authenticated User Token.                                                                                  |
| Use User Token Cookie                 | Check this box if you want Algolia to generate a User Token cookie.  The default value is `false`.                                                   |
| Insight Library Version               | Enter the Algolia Insight version.  The default value is `2.2.3`.                                                                                    |
| User Opt Out Data Element             | Select a Data Element that will retrieve the user's decision on tracking.                                                                            |
| Currency                              | Select a currency type.  The default value is `USD`.                                                                                                 |

### Actions

#### Load Insights

This action includes the Algolia Insights library to be utilized for sending events to Algolia.

#### Clicked

| Property                              | Description                                                                                                                                                                                                                                                                                                                                                                                                                |
|---------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Event Name                            | Enter the Event Name that can be used to further refine this `click` event                                                                                                                                                                                                                                                                                                                                                 |
| Event Type                            | Automatically set as `click`                                                                                                                                                                                                                                                                                                                                                                                               |
| Event Details Data Element            | Select a Data Element that will retrieve the event details (`indexName`, `objectId`, `queryId` (optional), `position` (optional)). If the Data Element contains `queryId` and `position`, the event will be classed as *Clicked after Search* otherwise it will be considered a *Clicked* event class. If Index Name is not available from the Data Element, then the default Index Name will be used when sending events. |
| User Token Data Element               | Select a Data Element that will retrieve the User Token.                                                                                                                                                                                                                                                                                                                                                                   |
| Authenticated User Token Data Element | Set the Data Element that will return the Authenticated User Token.                                                                                                                                                                                                                                                                                                                                                        |

#### Converted

| Property                              | Description                                                                                                                                                                                                                                                                                                                                                                               |
|---------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Event Name                            | Enter the Event Name that can be used to further refine this `convert` event                                                                                                                                                                                                                                                                                                              |
| Event Type                            | Automatically set as `convert`                                                                                                                                                                                                                                                                                                                                                            |
| Event Details Data Element            | Select a Data Element that will retrieve the event details (`indexName`, `objectId`, `queryId` (optional)). If the Data Element contains `queryId`, the event will be classed as *Converted after Search* otherwise it will be considered a *Converted* event class.  If Index Name is not available from the Data Element, then the default Index Name will be used when sending events. |

#### Converted - Add to Cart

| Property                              | Description                                                                                                                                                                                                                                                                                                                                                                                                          |
|---------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Event Name                            | Enter the Event Name that can be used to further refine this `convert` event                                                                                                                                                                                                                                                                                                                                         |
| Event Type                            | Automatically set as `convert`                                                                                                                                                                                                                                                                                                                                                                                       |
| Sub Event Type                        | Automatically set as `addToCart`                                                                                                                                                                                                                                                                                                                                                                                     |
| Event Details Data Element            | Select a Data Element that will retrieve the event details (`indexName`, `objectId`, `queryId` (optional), `objectData` (optional)). If the Data Element contains `queryId`, the event will be classed as *Add to Cart after Search* otherwise it will be considered a *Add to Cart* event class.  If Index Name is not available from the Data Element, then the default Index Name will be used when sending events. |

#### Converted - Purchase

| Property                              | Description                                                                                                                                                                                                                                                                                                                                                                                                        |
|---------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Event Name                            | Enter the Event Name that can be used to further refine this `convert` event                                                                                                                                                                                                                                                                                                                                       |
| Event Type                            | Automatically set as `convert`                                                                                                                                                                                                                                                                                                                                                                                     |
| Sub Event Type                        | Automatically set as `purchase`                                                                                                                                                                                                                                                                                                                                                                                    |
| Event Details Data Element            | Select a Data Element that will retrieve the event details (`indexName`, `objectId`, `queryId` (optional), `objectData` (optional)). If the Data Element contains `queryId`, the event will be classed as *Purchased after Search* otherwise it will be considered a *Purchased* event class.  If Index Name is not available from the Data Element, then the default Index Name will be used when sending events. |

#### Viewed

| Property                              | Description                                                                                                                                                                                               |
|---------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Event Name                            | Enter the Event Name that can be used to further refine this `view` event                                                                                                                                 |
| Event Type                            | Automatically set as `view`                                                                                                                                                                               |
| Event Details Data Element            | Select a Data Element that will retrieve the event details (`indexName`, `objectId`). If Index Name is not available from the Data Element, then the default Index Name will be used when sending events. |

### Data Elements

The Data Elements are used to retrieve event details to be used by the Algolia Insight library for sending events.

#### Data Set

The Data Set Data Element returns the `dataset` associated to the HTML element.

| Property                          | Description                                                                                                                                                                                                  |
|-----------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Hit Element Div/Class Name        | Enter the HTML Element Name and/or CSS Class Name that has the dataset attributes (`data-insights-object-id`, `data-insights-query-id` (optional), `data-insights-position` (optional)) on the HTML Element. |
| Index Name Element Div/Class Name | Enter the HTML Element Name and/or CSS Class Name that has the dataset attributes (`data-indexname`) on the HTML Element.                                                                                    |

This Data Element returns:

```javascript
{
  timestamp,
  queryID,
  indexName,
  objectID,
  position
}
```

##### Example of HTML that contains dataset.

```
<div data-indexname="magento2_master_default_products" class="instant-search-comp__hits">
...
<div class="hit-card"
    data-insights-object-id="${hit.objectID}"
    data-insights-position="${hit.__position}"
    data-insights-query-id="${hit.__queryID}">
    <h4 class="hit-name">...</h4>
      
</div>
...
</div>
```

#### Query String

| Property                         | Description                                              |
|----------------------------------|----------------------------------------------------------|
| Object ID Param Name             | Enter the query param name that contains the Object Id.  |
| Index Name Param Name (Optional) | Enter the query param name that contains the Index Name. |
| Query ID Param Name (Optional)   | Enter the query param name that contains the Query Id.   |
| Position Param Name (Optional)   | Enter the query param name that contains the Position.   |

This Data Element returns:

```javascript
{
  timestamp,
  queryID,
  indexName,
  objectID
}
```

##### Example of HTML that contains query parameters.

```
<a href="product.html?objectID=${hit.objectID}&queryID=${hit.__queryID}&indexName=${indexName}&position=${hit.position}">Read More</a></div>
```

#### Storage

This Data Element uses the Session Storage to get the event details. There is no configuration needed for this Data
Element.  
The data is added in the *click* event action automatically. On *convert* event action, the data is removed.

This Data Element returns what is stored in the Session Storage.

## Clicked or Converted after Search

### InstantSearch & Autocomplete

The Clicked or Converted after Search requires a `queryId` and `position`. These two properties are available when
insights are enabled on InstantSearch and/or Autocomplete.
Please review below resources to set up Insights.

#### Resources

- [Setting up Insights on Autocomplete](https://www.algolia.com/doc/ui-libraries/autocomplete/api-reference/autocomplete-js/autocomplete/#param-insights)
- [Setting up Insights on InstantSearch.js](https://www.algolia.com/doc/guides/building-search-ui/events/js/#set-the-insights-option-to-true)

## Algolia Insights Resources

- [Get started with click and conversion events](https://www.algolia.com/doc/guides/sending-events/implementing/how-to/sending-events-backend/)
- [Sending Algolia Insights events](https://www.algolia.com/doc/ui-libraries/autocomplete/guides/sending-algolia-insights-events/)
- [Insights API Client](https://www.algolia.com/doc/api-client/methods/insights/)

## Development & Release

For development and release process, you can refer to
the [Adobe Launch Extension development page](https://experienceleague.adobe.com/docs/experience-platform/tags/extension-dev/submit/develop.html).

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
