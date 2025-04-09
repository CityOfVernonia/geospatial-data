import chalk from 'chalk';
import commandExists from 'command-exists';
import download from 'download';
import { execFileSync } from 'node:child_process';
import fs from 'fs-extra';
import { execute, TAX_MAPS } from './_utils.js';

const GHOST_SCRIPT_VERSION = '10.05.0';

const JPG_DIRECTORY = 'tax-maps/files/jpg/';

const PDF_DIRECTORY = 'tax-maps/files/pdf/';

const TAX_MAP_URL = 'https://gis.columbiacountymaps.com/TaxMaps/';

/**
 * Download, write and convert tax map.
 * @param {string} taxMap
 */
const processTaxMap = async (taxMap) => {
  try {
    const pdf = await download(`${TAX_MAP_URL}${taxMap}.pdf`);

    const pdfFile = `${PDF_DIRECTORY}${taxMap}.pdf`;

    await fs.writeFile(pdfFile, pdf);

    execFileSync('gswin64c', [`-sOutputFile=${JPG_DIRECTORY}${taxMap}.jpg`, '-sDEVICE=jpeg', '-r600', pdfFile]);

    console.log(chalk.green(`${taxMap}.pdf successfully processed.`));
  } catch (error) {
    console.log(error);
  }
};

/**
 * Check for GhostScript and run.
 */
(async () => {
  try {
    await commandExists('gswin64c');

    const gsVersion = (await execute('gswin64c --version')).stdout;

    if (gsVersion.includes(GHOST_SCRIPT_VERSION)) {
      console.log(chalk.green('Running tax maps...'));

      TAX_MAPS.forEach(processTaxMap);
    } else {
      console.log(chalk.red(`GhostScript version must be ${GHOST_SCRIPT_VERSION}.`));
    }
  } catch (error) {
    if (error === null) {
      console.log(
        chalk.red(
          `GhostScript (64-bit version ${GHOST_SCRIPT_VERSION}) must be installed and available via the command line.`,
        ),
      );
    } else {
      console.log(error);
    }
  }
}).call();
