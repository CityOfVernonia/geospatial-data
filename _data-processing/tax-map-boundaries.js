import fs from 'fs-extra';

const file = 'tax-maps/tax-map-boundaries.geojson';

fs.readFile(file, 'utf-8', (readError, readData) => {
  if (readError) {
    console.log(chalk.red('Failed to read GeoJSON file.'), readError);
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

  fs.writeFile(file, JSON.stringify(geojson));
});
