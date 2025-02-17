import fs from 'fs-extra';
import util from 'node:util';
import { exec } from 'child_process';
import download from 'download';
import chalk from 'chalk';
import { queryFeatures } from '@esri/arcgis-rest-feature-service';
import imgToPDF from 'image-to-pdf';
import { DateTime } from 'luxon';
const _exec = util.promisify(exec);

const featureServiceUrl =
  'https://gis.columbiacountymaps.com/server/rest/services/BaseData/Survey_Research/FeatureServer/0';

const surveyUrl = 'https://gis.columbiacountymaps.com/Surveys/';

const fileLocation = 'record-surveys/files/';

const fileUrl = 'https://cityofvernonia.github.io/geospatial-data/record-surveys/files/';

const geoJSONFile = 'record-surveys/surveys.geojson';

const vernoniaSpatialExtent = {
  rings: [
    [
      [606952.056605339, 1490512.4505739063],
      [606952.056605339, 1529343.4065166563],
      [650728.9227023721, 1529343.4065166563],
      [650728.9227023721, 1490512.4505739063],
      [606952.056605339, 1490512.4505739063],
    ],
  ],
  spatialReference: { wkid: 102970, latestWkid: 6557 },
};

/**
 * Convert tiff to pdf.
 * @param {*} file
 * @returns
 */
const tiff2pdf = async (file) => {
  const parts = file.split('.');
  if (parts[1] !== 'tif' && parts[1] !== 'tiff' && parts[1] !== 'TIF' && parts[1] !== 'TIFF') {
    console.log(chalk.red(`${file} is not a tiff file.`));
    return;
  }
  await _exec(`tiff2pdf -z -o ${parts[0]}.pdf ${file}`);
};

/**
 * Convert jpeg to pdf.
 * @param {*} file
 * @returns
 */
const jpeg2pdf = async (file) => {
  const parts = file.split('.');
  if (parts[1] !== 'jpg' && parts[1] !== 'jpeg' && parts[1] !== 'JPG' && parts[1] !== 'JPEG') {
    console.log(chalk.red(`${file} is not a jpeg file.`));
    return;
  }
  const stream = fs.createWriteStream(`${parts[0]}.pdf`);
  stream.on('finish', () => {
    fs.remove(file);
  });
  imgToPDF([file]).pipe(stream);
};

/**
 * Wrire file to `surveys` directory.
 * @param {*} SVY_IMAGE
 * @param {*} data
 */
const fileWrite = async (SVY_IMAGE, data) => {
  const file = `${fileLocation}${SVY_IMAGE}`;

  fs.writeFile(file, data)
    .then(async () => {
      const type = file.split('.')[1];
      if (type === 'tif' || type === 'tiff' || type === 'TIF' || type === 'TIFF') {
        try {
          await tiff2pdf(file);
          fs.remove(file);
        } catch (error) {
          console.log(chalk.red(`tiff2pdf ${SVY_IMAGE} write failed.`, error));
        }
      }
      if (type === 'jpg' || type === 'jpeg' || type === 'JPG' || type === 'JPEG') {
        jpeg2pdf(file);
      }
    })
    .catch((error) => {
      console.log(chalk.red(`${SVY_IMAGE} write failed.`, error));
    });
};

/**
 * Download file.
 * @param {*} SVY_IMAGE
 */
const fileDownload = (SVY_IMAGE) => {
  download(`${surveyUrl}${SVY_IMAGE}`)
    .then((data) => {
      fileWrite(SVY_IMAGE, data);
    })
    .catch(() => {
      console.log(chalk.red(`${SVY_IMAGE} download failed.`));
    });
};

/**
 * Check if file already exists.
 * @param {*} feature
 */
const fileCheck = (feature) => {
  const {
    attributes: { SVY_IMAGE },
  } = feature;

  fs.exists(
    `${fileLocation}${SVY_IMAGE}`
      .replace('.tiff', '.pdf')
      .replace('.TIFF', '.pdf')
      .replace('.tif', '.pdf')
      .replace('.TIF', '.pdf')
      .replace('.jpg', '.pdf')
      .replace('.JPG', '.pdf')
      .replace('.jpeg', '.pdf')
      .replace('.JPEG', '.pdf'),
  )
    .then((exists) => {
      if (!exists) {
        if (
          SVY_IMAGE.includes('.jpg') ||
          SVY_IMAGE.includes('.jpeg') ||
          SVY_IMAGE.includes('.JPG') ||
          SVY_IMAGE.includes('.JPEG')
        )
          console.log(
            chalk.yellow(`${SVY_IMAGE} is a jpeg file. Validate proper PDF conversion. ${surveyUrl}${SVY_IMAGE}`),
          );
        fileDownload(SVY_IMAGE);
      }
    })
    .catch((error) => {
      console.log(chalk.red(`File: ${fileLocation}${SVY_IMAGE} exists error.`, error));
    });
};

/**
 * Download survey geojson, properties transformations, and write `surveys.geojson`.
 */
const createGeoJSON = async () => {
  try {
    const geojson = await queryFeatures({
      url: featureServiceUrl,
      geometry: vernoniaSpatialExtent,
      returnGeometry: true,
      outFields: [
        'Client',
        'Comments',
        'FileDate',
        'Firm',
        'NumberofSh',
        'SURVEYID',
        'SVY_IMAGE',
        'SurveyDate',
        'SurveyType',
        'Subdivisio',
      ],
      spatialRel: 'esriSpatialRelIntersects',
      geometryType: 'esriGeometryPolygon',
      f: 'geojson',
    });

    // const types = [];

    geojson.features.forEach((feature) => {
      const { properties } = feature;

      // remove unuseful string valaues
      for (const property in properties) {
        if (properties.hasOwnProperty(property) && properties[property] === ' ') properties[property] = null;
        if (properties.hasOwnProperty(property) && properties[property] === '') properties[property] = null;
        if (properties.hasOwnProperty(property) && properties[property] === 'None Given') properties[property] = null;
      }

      // create friendlier properties and set values
      Object.defineProperty(properties, 'Sheets', Object.getOwnPropertyDescriptor(properties, 'NumberofSh'));
      delete properties['NumberofSh'];
      Object.defineProperty(properties, 'Subdivision', Object.getOwnPropertyDescriptor(properties, 'Subdivisio'));
      delete properties['Subdivisio'];
      Object.defineProperty(properties, 'SurveyId', Object.getOwnPropertyDescriptor(properties, 'SURVEYID'));
      delete properties['SURVEYID'];
      // url to PDF
      properties.SVY_IMAGE = `${fileUrl}${properties.SVY_IMAGE.replace('.tiff', '.pdf')
        .replace('.tif', '.pdf')
        .replace('.jpg', '.pdf')
        .replace('.jpeg', '.pdf')
        .replace(' ', '%20')}`;
      Object.defineProperty(properties, 'SurveyUrl', Object.getOwnPropertyDescriptor(properties, 'SVY_IMAGE'));
      delete properties['SVY_IMAGE'];

      // standardize properties
      if (!properties.Client) properties.Client = 'Unknown';
      if (!properties.Comments) properties.Comments = 'None';
      if (!properties.Firm) properties.Firm = 'Unknown';
      if (!properties.SurveyType) properties.SurveyType = 'Unknown';

      // survey types
      if (properties.SurveyType === 'SUBDIVISION') properties.SurveyType = 'Subdivision';
      if (properties.SurveyType === 'SURVEY') properties.SurveyType = 'Survey';
      if (properties.SurveyType === 'PARTITION') properties.SurveyType = 'Partition';
      if (properties.SurveyType === 'CORNER RESTORATION') properties.SurveyType = 'Corner Restoration';
      if (properties.SurveyType === '4') properties.SurveyType = 'Corner Restoration';
      if (properties.SurveyType === '7') properties.SurveyType = 'Partition';
      if (properties.SurveyType === '8') properties.SurveyType = 'Subdivision';
      if (properties.SurveyType === '9') properties.SurveyType = 'Survey';

      // if (types.indexOf(properties.SurveyType) === -1) types.push(properties.SurveyType);

      // ensure `Subdivision` is `null` if not a subdivision
      if (properties.SurveyType !== 'Subdivision') properties.Subdivision = null;

      // timestamp for sorting
      properties.Timestamp = properties.SurveyDate ? properties.SurveyDate : 0;

      // Date fields to `MM/DD/YYYY` strings
      if (properties.FileDate) {
        properties.FileDate = DateTime.fromMillis(properties.FileDate).toUTC().toLocaleString(DateTime.DATE_SHORT);
      } else {
        properties.FileDate = 'Unknown';
      }
      if (properties.SurveyDate) {
        properties.SurveyDate = DateTime.fromMillis(properties.SurveyDate).toUTC().toLocaleString(DateTime.DATE_SHORT);
      } else {
        properties.SurveyDate = 'Unknown';
      }
    });

    // console.log(types);

    fs.writeFile(geoJSONFile, JSON.stringify(geojson));
  } catch (error) {
    console.log(chalk.red('create geojson error', error));
  }
};

/**
 * Query surveys within spatial extent.
 */
const downloadFeatures = async () => {
  try {
    const queryResult = await queryFeatures({
      url: featureServiceUrl,
      geometry: vernoniaSpatialExtent,
      returnGeometry: false,
      outFields: ['SVY_IMAGE'],
      spatialRel: 'esriSpatialRelIntersects',
      geometryType: 'esriGeometryPolygon',
    });
    console.log(chalk.yellow(`${queryResult.features.length} results`));
    queryResult.features.forEach(fileCheck);
    createGeoJSON();
  } catch (error) {
    console.log(chalk.red('Query features error', error));
  }
};

downloadFeatures();
