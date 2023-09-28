# City of Vernonia Geospatial Data

Geospatial datasets for use in web applications to support of City business.

## Use

Along with each GeoJSON file is a same named JSON file containing the [ArcGIS Maps SDK for JavaScript
](https://developers.arcgis.com/javascript/latest/) properties to initialize a [GeoJSONLayer](https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-GeoJSONLayer.html) with the proper symbology, popup, labels, etc.

```typescript
const specialFloodHazardArea = new GeoJSONLayer(
  await(
    await fetch(
      'https://cityofvernonia.github.io/geospatial-data/floodplain-management/special-flood-hazard-area.json',
      { cache: 'reload' },
    ),
  ).json(),
);
```

It's just that easy.

## Data Categories

### [Floodplain Management](floodplain-management)

[Special Flood Hazard Area](floodplain-management/#special-flood-hazard-area)

## Data Changes

See [Change Log](CHANGELOG).

---

The City of Vernonia is an Equal Opportunity Employer and Provider

Copyright © 2023 City of Vernonia, Oregon

Made with :heart: and :coffee: in Vernonia, Oregon
