# Algolia Launch Extension
The Algolia Launch Extension adds the Algolia Search Insights to the Adobe Launch Platform.

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