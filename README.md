# City of Vernonia Geospatial Data

![GitHub tag (latest SemVer)](https://img.shields.io/github/v/tag/CityOfVernonia/geospatial-data?color=success&style=flat-square)

Relatively small and static (or very rarely updated) geospatial datasets and related data products for use in web applications to support of City business.

## Use

Along with each GeoJSON file is a same named JSON file containing the [ArcGIS Maps SDK for JavaScript
](https://developers.arcgis.com/javascript/latest/) properties to initialize a [GeoJSONLayer](https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-GeoJSONLayer.html) with the proper symbology, popup, labels, etc.

```typescript
const url = 'https://cityofvernonia.github.io/geospatial-data/floodplain-management/flood-zones.json';

const geoJSONLayer = new GeoJSONLayer(await (await fetch(url, { cache: 'reload' })).json());

map.add(geoJSONLayer);
```

## Data

### [City Annexations](city-annexations)

Annexations and de-annexations to the municipal boundary of Vernonia.

### [Elevation Certificates](elevation-certificates)

FEMA Elevation Certificates of record within the Vernonia special flood hazard area.

### [Letter of Map Amendments](letter-of-map-amendments)

FEMA Letter of Map Amendments (LOMAs) within Vernonia City Limits.

### [Record Surveys](record-surveys)

Columbia County record surveys within the Vernonia spatial extent.

### [Tax Map Boundaries](tax-map-boundaries)

Columbia County tax map boundaries within and adjacent to Vernonia City Limits.

### [Tax Maps](tax-maps)

Columbia County tax maps within and adjacent to Vernonia City Limits.

## Data Changes

See [Change Log](CHANGELOG).

---

The City of Vernonia is an Equal Opportunity Employer and Provider

Copyright © 2025 City of Vernonia, Oregon

Made with :heart: and :coffee: in Vernonia, Oregon
