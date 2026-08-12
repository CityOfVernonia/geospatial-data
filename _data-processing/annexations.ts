import chalk from 'chalk';
import commandExists from 'command-exists';
import fs from 'fs-extra';
import { promisify } from 'node:util';
import { exec } from 'node:child_process';
import { queryFeatures } from '@esri/arcgis-rest-feature-service';
import type { IFeature, IQueryFeaturesResponse } from '@esri/arcgis-rest-feature-service';
import { SPATIAL_EXTENT } from './_utils.js';

const ANNEXATIONS_URL = 'https://gis.columbiacountymaps.com/annex_images/';

const FEATURE_SERVICE_URL =
  'https://gis.columbiacountymaps.com/server/rest/services/Land_Development/Land_Use_Planning/FeatureServer/3';

const FILE_DIRECTORY = 'annexations/files/';

const downloadFile = async (boundary_change: string, image: string): Promise<void> => {
  if (!image) {
    console.log(chalk.red(`${boundary_change} does not have associated files.`));

    return;
  }

  const parts = image.split('.');

  const fileName = parts[0];

  const fileExtension = parts[1];

  const imageFile = `${FILE_DIRECTORY}${image}`;

  const pdfFile = `${FILE_DIRECTORY}${fileName}.pdf`;

  const url = `${ANNEXATIONS_URL}${image}`;

  if (fileExtension.toLowerCase() !== 'tif') {
    console.log(chalk.red(`File extension ${fileExtension} is not supported (${image}).`));

    return;
  }

  try {
    const exists = await fs.exists(pdfFile);

    if (exists) {
      console.log(chalk.green(`${boundary_change} exists.`));

      return;
    }

    const imageData = await (await fetch(url)).arrayBuffer();

    await fs.writeFile(imageFile, Buffer.from(imageData));

    await promisify(exec)(`tiff2pdf -z -o ${pdfFile} ${imageFile}`);

    await fs.remove(imageFile);

    console.log(chalk.green(`${fileName} successfully downloaded.`));
  } catch (error: any) {
    if (error.statusCode && error.statusCode === 404) {
      console.log(chalk.red(`Annexation ${image} does not exist at ${`${ANNEXATIONS_URL}${image}`}.`));
    } else {
      console.log(error);
    }
  }
};

(async (): Promise<void> => {
  await commandExists('tiff2pdf');

  console.log(chalk.green('Running city annexations...'));

  try {
    (
      (await queryFeatures({
        f: 'json',
        geometry: SPATIAL_EXTENT,
        geometryType: 'esriGeometryPolygon',
        url: FEATURE_SERVICE_URL,
        outFields: ['BNDY_CHG_1', 'IMAGE'],
        returnGeometry: false,
      })) as IQueryFeaturesResponse
    ).features.forEach((feature: IFeature): void => {
      const {
        attributes: { BNDY_CHG_1, IMAGE },
      } = feature;

      if (BNDY_CHG_1 === ' ') return;

      downloadFile(BNDY_CHG_1, IMAGE);
    });
  } catch (error) {
    if (error === null) {
      console.log(chalk.red(`tiff2pdf must be installed and available via the command line.`));
    } else {
      console.log(error);
    }
  }
}).call({});
