# Algolia Launch Extension

The Algolia Launch Extension wraps Algolia Insights to send user interaction events to Algolia, enabling AI-powered
features such as AI Search, Recommend, Dynamic Re-Ranking and Personalization.

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

Release notes are in [CHANGELOG.md](CHANGELOG.md).

## Development & Release

For the development and release process, refer to
the [Adobe Launch Extension development page](https://experienceleague.adobe.com/docs/experience-platform/tags/extension-dev/submit/develop.html).

### Install

```
npm install
```

This also installs the Husky git hooks (pre-commit formatting/linting, pre-push tests).

### Scaffold

Adds actions, data elements, and events assets.

```
npx @adobe/reactor-scaffold
```

### Sandbox

Builds the views in watch mode and starts the local Launch extension sandbox.

```
npm run sandbox
```

### Build

Produces the production views in `dist/`.

```
npm run build
```

### Test and lint

```
npm test        # unit tests with coverage (thresholds are enforced) and lint
npm run test:watch
npm run lint
```

### Package

Installs dependencies, builds, and packages the Launch extension. The zip file
(`package-algolia-insights-<version>.zip`) is placed at the root of the repository.

```
npm run package
```

### Upload & Release credentials

Copy `.env.example` to `.env` and set Adobe I/O OAuth Server-to-Server credentials from the [Adobe Developer Console](https://console.adobe.io):

```
REACTOR_IO_INTEGRATION_CLIENT_ID=
REACTOR_IO_INTEGRATION_CLIENT_SECRET=
```

### Upload

Uploads the packaged zip to Adobe Experience Platform Tags:

```
npm run upload
```

### Release

Releases the uploaded package so it can be installed:

```
npm run release
```

After releasing, follow the release checklist at the end of [CHANGELOG.md](CHANGELOG.md).
