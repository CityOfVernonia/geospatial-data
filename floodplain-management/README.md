# Floodplain Management

Datasets to support floodplain management.

Use [flood-hazard.json](flood-hazard.json) to initialize Flood Hazard group layer, including flood zones, stream profiles, cross sections, base flood elevations and FIRM panels, suitable non-floodplain apps with layer control .

Use [flood-hazard-app.json](flood-hazard-app.json) to initialize Flood Hazard group layer, including all floodplain management layers, for use in flood hazard apps.

```typescript
const floodHazardProperties = await(
  await fetch('https://cityofvernonia.github.io/geospatial-data/floodplain-management/flood-hazard.json', {
    cache: 'reload',
  }),
).json();

floodHazardProperties.layers = floodHazardProperties.layers.map((layerProperties: any): esri.GeoJSONLayer => {
  return new GeoJSONLayer(layerProperties);
});

const floodHazard = new GroupLayer(floodHazardProperties);
```

## Base Flood Elevations

FIRM base flood elevations within Vernonia's special flood hazard area.

**GeoJSON:** [base-flood-elevations.geojson](base-flood-elevations.geojson)

**GeoJSONLayer JSON:** [base-flood-elevations.json](base-flood-elevations.json) ([preview](../preview.html?geojson=https%3A%2F%2Fcityofvernonia.github.io%2Fgeospatial-data%2Ffloodplain-management%2Fbase-flood-elevations.json))

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

**GeoJSON:** [cross-sections.geojson](cross-sections.geojson)

**GeoJSONLayer JSON:** [cross-sections.json](cross-sections.json) ([preview](../preview.html?geojson=https%3A%2F%2Fcityofvernonia.github.io%2Fgeospatial-data%2Ffloodplain-management%2Fcross-sections.json))

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

## Letter of Map Amendments (LOMA)

LOMAs within Vernonia City Limits.

**GeoJSON:** [lomas.geojson](lomas.geojson)

**GeoJSONLayer JSON:** [lomas.json](lomas.json) ([preview](../preview.html?geojson=https%3A%2F%2Fcityofvernonia.github.io%2Fgeospatial-data%2Ffloodplain-management%2Flomas.json))

**Updated:** 2023.10.03

**Copyright:** FEMA and City of Vernonia, Oregon

**Properties/Attributes:**

```json
{
  "type": "Feature",
  "geometry": {},
  "properties": {
    "case_number": "15-10-1489A",
    "name": "1921 Mist Drive",
    "date": "9/11/2015",
    "type": "DetermLetter",
    "status": "Completed",
    "outcome": "Structure removed-Property partially inundated",
    "community": "410041 - VERNONIA, CITY OF",
    "file_id": "15-10-1489A-410041",
    "url": "https://map1.msc.fema.gov/data/41/L/15-10-1489A-410041.pdf"
  }
}
```

## FIRM Panels

City of Vernonia (410041) community FIRM panels.

**GeoJSON:** [firm-panels.geojson](firm-panels.geojson)

**GeoJSONLayer JSON:** [firm-panels.json](firm-panels.json) ([preview](../preview.html?geojson=https%3A%2F%2Fcityofvernonia.github.io%2Fgeospatial-data%2Ffloodplain-management%2Ffirm-panels.json))

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

## Flood Zones

Flood zones within City of Vernonia (410041) community FIRM panels.

**GeoJSON:** [flood-zones.geojson](flood-zones.geojson)

**GeoJSONLayer JSON:** [flood-zones.json](flood-zones.json) ([preview](../preview.html?geojson=https%3A%2F%2Fcityofvernonia.github.io%2Fgeospatial-data%2Ffloodplain-management%2Fflood-zones.json))

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

## Residential Floodplain Structures

Residential structures within the Vernonia SFHA.

**GeoJSON:** [residential-floodplain-structures.geojson](residential-floodplain-structures.geojson)

**GeoJSONLayer JSON:** [residential-floodplain-structures.json](residential-floodplain-structures.json) ([preview](../preview.html?geojson=https%3A%2F%2Fcityofvernonia.github.io%2Fgeospatial-data%2Ffloodplain-management%2Fresidential-floodplain-structures.json))

**Updated:** 2023.10.12

**Copyright:** City of Vernonia, Oregon

**Properties/Attributes:**

```json
{
  "type": "Feature",
  "geometry": {},
  "properties": {
    "address": "374 Bridge St",
    "street_name": "Bridge St",
    "house_number": 374,
    "year_built": 1944,
    "flood_zone": "AE",
    "elevated": "Yes",
    "year_elevated": 2007,
    "t9_5_compliance": "Yes",
    "ground_elev": 616.58,
    "bfe_elev": 620.4,
    "for_elev": 0,
    "floor_elev": 0,
    "notes": null
  }
}
```

## Special Flood Hazard Area

FEMA defines the SFHA as _the area that will be inundated by the flood event having a 1% chance of being equaled or exceeded in any given year_. The City of Vernonia SFHA also includes areas _that will be inundated by the flood event having a 0.2% chance of being equaled or exceeded in any given year_. Geospatially all Zone AE and Zone X (Shaded) within Vernonia City Limits.

**GeoJSON:** [special-flood-hazard-area.geojson](special-flood-hazard-area.geojson)

**GeoJSONLayer JSON:** [special-flood-hazard-area.json](special-flood-hazard-area.json) ([preview](../preview.html?geojson=https%3A%2F%2Fcityofvernonia.github.io%2Fgeospatial-data%2Ffloodplain-management%2Fspecial-flood-hazard-area.json))

**Updated:** 2023.09.28

**Copyright:** FEMA and City of Vernonia, Oregon

**Notes:** Single geometry without properties/attributes.

## Stream Profiles

FIRM stream profiles within Vernonia's special flood hazard area.

**GeoJSON:** [stream-profiles.geojson](stream-profiles.geojson)

**GeoJSONLayer JSON:** [stream-profiles.json](stream-profiles.json) ([preview](../preview.html?geojson=https%3A%2F%2Fcityofvernonia.github.io%2Fgeospatial-data%2Ffloodplain-management%2Fstream-profiles.json))

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
