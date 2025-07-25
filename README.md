# Algolia Launch Extension

The Algolia Launch Extension wraps the Algolia Insights to send user interaction events to Algolia to enable AI
feature.

**NOTE**
> The connector is provided « as is » and Algolia (a) makes no representation or warranties of any kind, whether
> express, implied, statutory or otherwise regarding the connector, and (b) disclaims all warranties, including any
> implied or express warranties (i) of merchantability, satisfactory quality, fitness for a particular purpose,
> non-infringement, or quiet enjoyment, (ii) arising out of any course of dealing or usage of trade, and (iii) that the
> connector will be uninterrupted, error free or free of harmful components.
>
> Algolia does not provide support for the connector, including installation or troubleshooting. If you require help
> with this connector, please contact Algolia Sales.
> The connector, and Subscriber’s use of such connector is subject to and governed by the applicable open source license
> accompanying, linked to or embedded in such connector repository (“Open Source License”). Algolia grants Subscriber a
> license to use the connector to the full extent permitted by the applicable Open Source License.

## Documentation

The Algolia Launch extension is documented on [Adobe Doc](https://experienceleague.adobe.com/en/docs/experience-platform/tags/extensions/client/algolia-insights/overview).

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
