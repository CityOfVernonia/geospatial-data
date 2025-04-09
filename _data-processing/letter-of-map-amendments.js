import chalk from 'chalk';
import fs from 'fs-extra';
import download from 'download';
import { queryFeatures } from '@esri/arcgis-rest-feature-service';
import { CITY_LIMITS, dateString } from './_utils.js';

const CITY_FILE_URL = 'https://cityofvernonia.github.io/geospatial-data/letter-of-map-amendments/files/';

const FEATURE_SERVICE_URL = 'https://hazards.fema.gov/arcgis/rest/services/public/NFHL/MapServer/34';

const FEMA_FILE_URL = 'https://map1.msc.fema.gov/data/41/L/';

const FILES_DIRECTORY = 'letter-of-map-amendments/files/';

const GEOJSON_FILE = 'letter-of-map-amendments/letter-of-map-amendments.geojson';

const downloadFile = async (feature) => {
  const {
    properties: { file_id, fema_url },
  } = feature;

  const file = `${FILES_DIRECTORY}${file_id}.pdf`;

  try {
    const exists = await fs.exists(file);

    if (exists) return;

    const pdf = await download(fema_url);

    await fs.writeFile(`${file}`, pdf);

    console.log(chalk.green(`${file_id} successfully downloaded.`));
  } catch (error) {
    if (error.statusCode && error.statusCode === 404) {
      console.log(chalk.red(`LOMA ${file_id} does not exist at ${fema_url}.`));
    } else {
      console.log(error);
    }
  }
};

/**
 * Normalize features properties.
 * @param {GeoJSONFeature} feature
 */
const normalizeFeatureProperties = (feature) => {
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

  const fileName = `${PDFHYPERLINKID}.pdf`;

  const _properties = {
    case_number: CASENUMBER,
    name: PROJECTNAME,
    date: DATEENDED ? dateString(DATEENDED) : 'Unknown',
    type: DETERMINATIONTYPE,
    status: STATUS,
    outcome: OUTCOME,
    community: `${CID} - ${COMMUNITYNAME}`,
    file_id: PDFHYPERLINKID,
    city_url: `${CITY_FILE_URL}${fileName}`,
    fema_url: `${FEMA_FILE_URL}${fileName}`,
  };

  feature.properties = _properties;
};

(async () => {
  console.log(chalk.green('Running letter-of-map-amendments...'));

  try {
    const geojson = await queryFeatures({
      f: 'geojson',
      geometry: CITY_LIMITS,
      geometryType: 'esriGeometryPolygon',
      httpMethod: 'POST',
      orderByFields: ['OBJECTID ASC'],
      outFields: [
        'CASENUMBER',
        'PROJECTNAME',
        'DATEENDED',
        'DETERMINATIONTYPE',
        'STATUS',
        'OUTCOME',
        'CID',
        'COMMUNITYNAME',
        'PDFHYPERLINKID',
      ],
      outSR: '4326',
      returnGeometry: true,
      spatialRel: 'esriSpatialRelIntersects',
      url: FEATURE_SERVICE_URL,
    });

    geojson.features.forEach(normalizeFeatureProperties);

    await fs.writeFile(GEOJSON_FILE, JSON.stringify(geojson));

    geojson.features.forEach(downloadFile);
  } catch (error) {
    console.log(error);
  }
}).call();
