# Floodplain Management

Datasets to support floodplain management.

## Base Flood Elevations

FIRM base flood elevations within Vernonia's special flood hazard area.

**GeoJSON:** [base-flood-elevations.geojson](base-flood-elevations.geojson) ([preview](../preview.html?geojson=https%3A%2F%2Fcityofvernonia.github.io%2Fgeospatial-data%2Ffloodplain-management%2Fbase-flood-elevations.json))

**GeoJSONLayer JSON:** [base-flood-elevations.json](base-flood-elevations.json)

**Updated:** 2023.10.02

**Copyright:** FEMA and City of Vernonia, Oregon

**Properties/Attributes:**

```json
{
  "type": "Feature",
  "geometry": {},
  "properties": {
    "bfe": 608
  }
}
```

## Cross Sections

FIRM cross sections within Vernonia's special flood hazard area.

**GeoJSON:** [cross-sections.geojson](cross-sections.geojson) ([preview](../preview.html?geojson=https%3A%2F%2Fcityofvernonia.github.io%2Fgeospatial-data%2Ffloodplain-management%2Fcross-sections.json))

**GeoJSONLayer JSON:** [cross-sections.json](cross-sections.json)

**Updated:** 2023.10.02

**Copyright:** FEMA and City of Vernonia, Oregon

**Properties/Attributes:**

```json
{
  "type": "Feature",
  "geometry": {},
  "properties": {
    "name": "Nehalem River",
    "section_id": "L",
    "bfe": 619.6
  }
}
```

## FIRM Panels

City of Vernonia (410041) community FIRM panels.

**GeoJSON:** [firm-panels.geojson](firm-panels.geojson) ([preview](../preview.html?geojson=https%3A%2F%2Fcityofvernonia.github.io%2Fgeospatial-data%2Ffloodplain-management%2Ffirm-panels.json))

**GeoJSONLayer JSON:** [firm-panels.json](firm-panels.json)

**Updated:** 2023.10.02

**Copyright:** FEMA and City of Vernonia, Oregon

**Properties/Attributes:**

```json
{
  "type": "Feature",
  "geometry": {},
  "properties": {
    "firm_panel": "41009C0377D",
    "effective_date": "11/26/2010"
  }
}
```

## Flood Hazard Layers

[flood-hazard.json](flood-hazard.json) is available for a Flood Hazard group layer, including flood zones, stream profiles, cross sections, base flood elevations and FIRM panels.

```typescript
const floodHazardProperties = await(
  await fetch('https://cityofvernonia.github.io/geospatial-data/floodplain-management/flood-hazard.json', {
    cache: 'reload',
  })
).json();

floodHazardProperties.layers = floodHazardProperties.layers.map((layerProperties: any): esri.GeoJSONLayer => {
  return new GeoJSONLayer(layerProperties);
});

const floodHazard = new GroupLayer(floodHazardProperties);
```

## Flood Zones

Flood zones within City of Vernonia (410041) community FIRM panels.

**GeoJSON:** [flood-zones.geojson](flood-zones.geojson) ([preview](../preview.html?geojson=https%3A%2F%2Fcityofvernonia.github.io%2Fgeospatial-data%2Ffloodplain-management%2Fflood-zones.json))

**GeoJSONLayer JSON:** [flood-zones.json](flood-zones.json)

**Updated:** 2023.10.02

**Copyright:** FEMA and City of Vernonia, Oregon

**Properties/Attributes:**

```json
{
  "type": "Feature",
  "geometry": {},
  "properties": {
    "zone": "AE",
    "description": "Zone AE - 1% annual inundation"
  }
}
```

## Special Flood Hazard Area

FEMA defines the SFHA as _the area that will be inundated by the flood event having a 1% chance of being equaled or exceeded in any given year_. The City of Vernonia SFHA also includes areas _that will be inundated by the flood event having a 0.2% chance of being equaled or exceeded in any given year_. Geospatially all Zone AE and Zone X (Shaded) within Vernonia City Limits.

**GeoJSON:** [special-flood-hazard-area.geojson](special-flood-hazard-area.geojson) ([preview](../preview.html?geojson=https%3A%2F%2Fcityofvernonia.github.io%2Fgeospatial-data%2Ffloodplain-management%2Fspecial-flood-hazard-area.json))

**GeoJSONLayer JSON:** [special-flood-hazard-area.json](special-flood-hazard-area.json)

**Updated:** 2023.09.28

**Copyright:** FEMA and City of Vernonia, Oregon

**Notes:** Single geometry without properties/attributes.

## Stream Profiles

FIRM stream profiles within Vernonia's special flood hazard area.

**GeoJSON:** [stream-profiles.geojson](stream-profiles.geojson) ([preview](../preview.html?geojson=https%3A%2F%2Fcityofvernonia.github.io%2Fgeospatial-data%2Ffloodplain-management%2Fstream-profiles.json))

**GeoJSONLayer JSON:** [stream-profiles.json](stream-profiles.json)

**Updated:** 2023.10.02

**Copyright:** FEMA and City of Vernonia, Oregon

**Properties/Attributes:**

```json
{
  "type": "Feature",
  "geometry": {},
  "properties": {
    "name": "Nehalem River"
  }
}
```

---

The City of Vernonia is an Equal Opportunity Employer and Provider

Copyright © 2023 City of Vernonia, Oregon

Made with :heart: and :coffee: in Vernonia, Oregon
