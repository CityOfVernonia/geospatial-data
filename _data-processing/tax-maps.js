import { promisify } from 'node:util';
import fs from 'fs-extra';
import { exec, execFileSync } from 'node:child_process';
import download from 'download';
import chalk from 'chalk';

const _exec = promisify(exec);

const GHOST_SCRIPT_VERSION = '10.05.0';

// Columbia County tax map base URL
const TAX_MAP_URL = 'https://gis.columbiacountymaps.com/TaxMaps/';

/**
 * Download PDF.
 * @param {string} taxMap
 */
const downloadPdf = async (taxMap) => {
  try {
    const pdf = await download(`${TAX_MAP_URL}${taxMap}.pdf`);

    writePdf(taxMap, pdf);
  } catch (error) {
    console.log(chalk.red(`Failed to download ${taxMap} PDF.`), error);
  }
};

/**
 * Convert pdf to jpg into `tax-maps/files/jpg` directory using GhostScript.
 * @param {string} taxMap
 */
const pdf2jpeg = async (taxMap) => {
  execFileSync(`gswin64c`, [
    `-sOutputFile=tax-maps/files/jpg/${taxMap}.jpg`,
    `-sDEVICE=jpeg`,
    `-r600`,
    `tax-maps/files/pdf/${taxMap}.pdf`,
  ]);

  console.log(chalk.green(`${taxMap}.pdf successfully converted.`));
};

/**
 * Write PDF file into `tax-maps/files/pdf`.
 * @param {string} taxMap
 * @param {Buffer} pdf
 */
const writePdf = async (taxMap, pdf) => {
  try {
    await fs.writeFile(`tax-maps/files/pdf/${taxMap}.pdf`, pdf);

    pdf2jpeg(taxMap);
  } catch (error) {
    console.log(chalk.red(`Failed to write ${taxMap}.pdf.`), error);
  }
};

/**
 * Check for GhostScript and run.
 */
(async () => {
  try {
    const gsVersion = (await _exec('gswin64c --version')).stdout;

    if (gsVersion === `${GHOST_SCRIPT_VERSION}\n`) {
      try {
        const taxMaps = await fs.readFile('tax-maps/tax-maps.txt', 'utf-8');

        taxMaps.split('\r\n').forEach(downloadPdf);
      } catch (error) {
        console.log(chalk.red('Failed to read tax map list.'), error);
      }
    } else {
      console.log(chalk.red(`GhostScript version must be ${GHOST_SCRIPT_VERSION}.`));
    }
  } catch (error) {
    console.log(
      chalk.red(
        `GhostScript (64-bit version ${GHOST_SCRIPT_VERSION}) must be installed and available via the command line.`,
      ),
    );
  }
}).call();
