# Changelog

All notable changes to the Algolia Launch Extension are documented in this file.

## 3.4.0

### Added

- **HTML Attribute** data element. Reads one or more DOM attribute values (for example `html[lang]`) using
  configurable CSS selector / attribute name / output key mappings. Settings saved in the single-mapping
  format used by early 3.4.0 betas are migrated automatically when the data element is opened in the Tags UI.
- Unit test coverage for all actions, data elements, storage utilities and Tags UI settings helpers, with enforced
  coverage thresholds.
- This changelog.

### Changed

- Dependencies updated; transitive `glob` and `minimatch` versions are overridden to patched releases.
- `package.json` now declares the repository URL and the Apache-2.0 license.
- Replaced deprecated Babel tooling (`babel-polyfill`, `@babel/plugin-proposal-class-properties`, `babel-eslint`)
  and removed unused dependencies.
- Git hooks now run through Husky 8 (`.husky/`), so pre-commit formatting/linting and pre-push tests are enforced.
- README documents the full development, test and release workflow.

### Fixed

- `removeEventsFromStore` in the storage utility called the wrong reference (the function instead of its result),
  so stored events were not removed for the given object IDs. It now reads the stored data correctly, and the
  leftover debug logging was removed.

## 3.3.0

- Proxy requests can include configured headers.
- In-product help aligned with the cookie default and localStorage behavior.
- Dependency updates.

## 3.1.1

- Proxy URL support as an alternative to App ID / API Key credentials.

## 3.0.0

- Commerce event support: price, quantity, discount, currency and order value for Added to Cart and Purchased
  events, with commerce fields on the Dataset and Storage data elements.

## Release checklist (outside this repository)

After uploading and releasing the package:

1. Update the [Adobe Experience League documentation](https://experienceleague.adobe.com/en/docs/experience-platform/tags/extensions/client/algolia-insights/overview)
   to describe the HTML Attribute data element.
2. Update the Adobe Exchange listing version and "What's new" text.
3. Tag the release commit (`git tag v<version>`) and push the tag.
