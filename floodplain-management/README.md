# Floodplain Management

Datasets to support floodplain management.

## Floodplain Development Permits

Floodplain Development Permits within Vernonia City Limits.

**CSV:** [floodplain-development-permits.csv](floodplain-development-permits.csv)

**CSVLayer JSON:** [floodplain-development-permits.json](floodplain-development-permits.json) ([preview](../preview.html?csv=https%3A%2F%2Fcityofvernonia.github.io%2Fgeospatial-data%2Ffloodplain-management%2Ffloodplain-development-permits.json))

**Fields:**

* Permit - Floodplain Development Permit number
* Date - Date submitted
* TaxLotId - Tax lot identification number
* Address - Address (if applicable) without city, state, or zip code
* Notes - Short description of permit type, e.g., new dwelling, etc.
* Status - “Active” or “Closed” – Status of the permit
* Latitude
* Longitude

## Floodplain Structures

Structures within the Vernonia Special Flood Hazard Area.

**GeoJSON:** [floodplain-structures.geojson](floodplain-structures.geojson)

**GeoJSONLayer JSON:** [floodplain-structures.json](floodplain-structures.json) ([preview](../preview.html?geojson=https%3A%2F%2Fcityofvernonia.github.io%2Fgeospatial-data%2Ffloodplain-management%2Ffloodplain-structures.json))

**Updated:** 2023.10.12

**Copyright:** City of Vernonia, Oregon

**Properties/Attributes:**

```json
{
  "type": "Feature",
  "geometry": {},
  "properties": {
    "type": "Residential",
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

---

The City of Vernonia is an Equal Opportunity Employer and Provider

Copyright © 2023 City of Vernonia, Oregon

Made with :heart: and :coffee: in Vernonia, Oregon
