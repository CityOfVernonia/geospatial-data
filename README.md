# City of Vernonia Geospatial Data

![GitHub tag (latest SemVer)](https://img.shields.io/github/v/tag/CityOfVernonia/geospatial-data?color=success&style=flat-square)

Geospatial datasets for use in web applications to support of City business.

## Use

Along with each GeoJSON file is a same named JSON file containing the [ArcGIS Maps SDK for JavaScript
](https://developers.arcgis.com/javascript/latest/) properties to initialize a [GeoJSONLayer](https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-GeoJSONLayer.html) with the proper symbology, popup, labels, etc.

```typescript
// typescript
const specialFloodHazardArea = new GeoJSONLayer(
  await(
    await fetch(
      'https://cityofvernonia.github.io/geospatial-data/floodplain-management/special-flood-hazard-area.json',
      { cache: 'reload' },
    ),
  ).json(),
);

// javascript
const request = await fetch(
  'https://cityofvernonia.github.io/geospatial-data/floodplain-management/special-flood-hazard-area.json',
  { cache: 'reload' },
);
const json = await request.json();
const specialFloodHazardArea = new GeoJSONLayer(json);
```

It's just that easy.

## Data Categories

### [Floodplain Management](floodplain-management)

Datasets to support floodplain management.

### [Record Surveys](record-surveys)

Columbia County record surveys within the Vernonia spatial extent.

### [Tax Maps](tax-maps)

Columbia County tax maps within and adjacent to Vernonia City Limits.

## Data Changes

See [Change Log](CHANGELOG).

---

The City of Vernonia is an Equal Opportunity Employer and Provider

Copyright © 2023 City of Vernonia, Oregon

Made with :heart: and :coffee: in Vernonia, Oregon
