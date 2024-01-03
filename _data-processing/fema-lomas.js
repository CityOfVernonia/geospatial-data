import fs from 'fs-extra';
import { queryFeatures } from '@esri/arcgis-rest-feature-service';
import { DateTime } from 'luxon';
import { cityExtent } from './_geometries.js';

const file = 'flood-hazard/lomas.geojson';

const downloadLOMAs = async () => {
  try {
    const geojson = await queryFeatures({
      url: 'https://hazards.fema.gov/gis/nfhl/rest/services/public/NFHL/MapServer/34',
      outFields: ['*'],
      outSR: '4326',
      returnGeometry: true,
      geometry: cityExtent,
      spatialRel: 'esriSpatialRelIntersects',
      geometryType: 'esriGeometryEnvelope',
      f: 'geojson',
    });

    geojson.features.forEach((feature) => {
      delete feature['id'];
      const {
        properties: {
          CASENUMBER,
          PROJECTNAME,
          DATEENDED,
          DETERMINATIONTYPE,
          STATUS,
          OUTCOME,
          CID,
          COMMUNITYNAME,
          PDFHYPERLINKID,
        },
      } = feature;

      const _properties = {
        case_number: CASENUMBER,
        name: PROJECTNAME,
        date: DATEENDED ? DateTime.fromMillis(DATEENDED).toUTC().toLocaleString(DateTime.DATE_SHORT) : 'Unknown',
        type: DETERMINATIONTYPE,
        status: STATUS,
        outcome: OUTCOME,
        community: `${CID} - ${COMMUNITYNAME}`,
        file_id: PDFHYPERLINKID,
        url: `https://map1.msc.fema.gov/data/41/L/${PDFHYPERLINKID}.pdf`,
      };

      feature.properties = _properties;
    });

    try {
      fs.writeFile(file, JSON.stringify(geojson));
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
};

downloadLOMAs();
