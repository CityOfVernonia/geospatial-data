import chalk from 'chalk';
import commandExists from 'command-exists';
import download from 'download';
import { execFileSync } from 'node:child_process';
import fs from 'fs-extra';
import { execute, TAX_MAPS } from './_utils.js';

const GHOST_SCRIPT_VERSION = '10.05.1';

const JPG_DIRECTORY = 'tax-maps/files/jpg/';

const PDF_DIRECTORY = 'tax-maps/files/pdf/';

const TAX_MAP_URL = 'https://gis.columbiacountymaps.com/TaxMaps/';

/**
 * Check for GhostScript and run.
 */
(async () => {
  try {
    await commandExists('gswin64c');

    const gsVersion = (await execute('gswin64c --version')).stdout;

    if (gsVersion.includes(GHOST_SCRIPT_VERSION)) {
      console.log(chalk.green('Running tax maps...'));

      for (const taxMap of TAX_MAPS) {
        const pdf = await download(`${TAX_MAP_URL}${taxMap}.pdf`);

        const pdfFile = `${PDF_DIRECTORY}${taxMap}.pdf`;

        await fs.writeFile(pdfFile, pdf);

        execFileSync('gswin64c', [`-sOutputFile=${JPG_DIRECTORY}${taxMap}.jpg`, '-sDEVICE=jpeg', '-r600', pdfFile]);

        console.log(chalk.green(`${taxMap}.pdf successfully processed.`));
      }
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
    } else if (error && error.hasOwnProperty('code')) {
      console.log(chalk.red(`Spawning child process for gswin64c failed with ${error.code}.`));
    } else if (error && error.hasOwnProperty('stdout') && error.hasOwnProperty('stderr')) {
      console.log(chalk.red('Spawned child process for gswin64c but exited with non-zero exit code.'));

      console.log(error.stdout);

      console.log(error.stderr);
    } else {
      console.log(chalk.red('An error has occurred (probably with fs.writeFile).'));

      console.log(error);
    }
  }
}).call();
