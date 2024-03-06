import util from 'node:util';
import { exec } from 'child_process';
import fs from 'fs-extra';
import download from 'download';
import { queryFeatures } from '@esri/arcgis-rest-feature-service';
import { DateTime } from 'luxon';
import { spatialExtent } from './_geometries.js';
const _exec = util.promisify(exec);

const geoJsonFile = 'boundaries/annexations.geojson';

const serviceUrl =
  'https://gis.columbiacountymaps.com/server/rest/services/Land_Development/Land_Use_Planning/FeatureServer/3';

const imageUrl = 'https://gis.columbiacountymaps.com/annex_images/';

const annexationFiles = (geojson) => {
  geojson.features.forEach(async (feature) => {
    const { IMAGE } = feature.properties;
    const tiffFile = `boundaries/annexation-files/${IMAGE}`;
    const pdfFile = `boundaries/annexation-files/${IMAGE.replace('tiff', 'pdf').replace('tif', 'pdf')}`;
    const exists = await fs.exists(pdfFile);
    if (!exists) {
      const data = await download(`${imageUrl}${IMAGE}`);
      await fs.writeFile(tiffFile, data);
      await _exec(`tiff2pdf -z -o ${pdfFile} ${tiffFile}`);
      await fs.remove(tiffFile);
    }
  });
};

const annexations = async () => {
  try {
    const geojson = await queryFeatures({
      url: serviceUrl,
      outFields: ['*'],
      outSR: '4326',
      returnGeometry: true,
      geometry: spatialExtent,
      spatialRel: 'esriSpatialRelIntersects',
      geometryType: 'esriGeometryPolygon',
      f: 'geojson',
    });

    annexationFiles(geojson);

    geojson.features.forEach((feature) => {
      if (feature['id']) delete feature['id'];

      const {
        properties: { BNDY_CHG_1, InitialDat, DORApprove, DORApprova, DORAppro_1, DateComple, IMAGE },
      } = feature;

      const _properties = {
        boundary_change: BNDY_CHG_1,
        initial_date: InitialDat
          ? DateTime.fromMillis(InitialDat).toUTC().toLocaleString(DateTime.DATE_SHORT)
          : 'Unknown',
        completed_date: DateComple
          ? DateTime.fromMillis(DateComple).toUTC().toLocaleString(DateTime.DATE_SHORT)
          : 'Unknown',
        dor_approved: DORApprove === 'Y' ? 'Yes' : 'No, n/a, or unknown',
        dor_id: DORApprova || 'Unknown',
        dor_date: DORAppro_1 ? DateTime.fromMillis(DORAppro_1).toUTC().toLocaleString(DateTime.DATE_SHORT) : 'Unknown',
        pdf_url: IMAGE ? `https://cityofvernonia.github.io/geospatial-data/boundaries/annexation-files/${IMAGE.replace('tif', 'pdf')}` : null,
        tif_url: `${imageUrl}${IMAGE}`,
      };

      feature.properties = _properties;
    });

    try {
      fs.writeFile(geoJsonFile, JSON.stringify(geojson));
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
};

annexations();
