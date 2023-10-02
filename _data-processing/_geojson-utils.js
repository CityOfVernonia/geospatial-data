import fs from 'fs-extra';
import chalk from 'chalk';

export const cleanFeatures = (file) => {
  fs.readFile(file, 'utf-8', async (readError, readData) => {
    if (readError) {
      console.log(chalk.red(`Failed to read ${file} file.`), readError);
      return;
    }
    const geojson = JSON.parse(readData);
    geojson.features.forEach((feature) => {
      const { properties } = feature;
      delete feature['id'];
      delete properties['OBJECTID'];
      delete properties['Shape_Area'];
      delete properties['Shape_Length'];
    });
    await fs.writeFile(file, JSON.stringify(geojson));
    console.log(chalk.green(`Cleaned ${file} file.`));
  });
};
