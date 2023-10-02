import { readFile, writeFile } from 'fs';
import { execFileSync } from 'child_process';
import download from 'download';
import chalk from 'chalk';

// tax map url
const taxMapUrl = 'https://gis.columbiacountymaps.com/TaxMaps/';

// array of tax maps
let taxMaps;

// convert pdf to tiff into `tiff` directory
const pdf2jpeg = async (taxMap) => {
  // convert pdf to jpg into `jpg` directory
  execFileSync(`gswin64c`, [
    `-sOutputFile=tax-maps/files/jpg/${taxMap}.jpg`,
    `-sDEVICE=jpeg`,
    `-r600`,
    `tax-maps/files/pdf/${taxMap}.pdf`,
  ]);
  console.log(chalk.green(`${taxMap}.pdf successfully converted.`));
};

// read list of tax maps
readFile('tax-maps/tax-maps.txt', 'utf-8', (readError, readData) => {
  //handle read error
  if (readError) {
    console.log(chalk.red('Failed to read tax map list.'), readError);
    return;
  }
  // array of tax maps
  taxMaps = readData.split('\r\n');
  // download tax maps and write to `pdf`
  taxMaps.forEach(async (taxMap) => {
    // download file
    download(`${taxMapUrl}${taxMap}.pdf`)
      .then(async (pdfData) => {
        // write pdf
        writeFile(`tax-maps/files/pdf/${taxMap}.pdf`, pdfData, (pdfWriteError) => {
          // handle write error
          if (pdfWriteError) {
            console.log(chalk.red(`Failed to write ${taxMap}.pdf.`), pdfWriteError);
            return;
          }
          // convert and jpg
          pdf2jpeg(taxMap);
        });
      })
      .catch((downloadError) => {
        // handle download error
        console.log(chalk.red(`Failed to download ${taxMap} PDF.`), downloadError);
      });
  });
});
