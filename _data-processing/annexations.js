import util from 'node:util';
import { exec } from 'child_process';
import fs from 'fs-extra';
import download from 'download';
import { queryFeatures } from '@esri/arcgis-rest-feature-service';
// import { DateTime } from 'luxon';
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

const downloadAnnexations = async () => {
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

    /**
     * TO DO: fix up attributes/properties
     */
    // geojson.features.forEach(async (feature) => {
    //   delete feature['id'];
    //   const {
    //     properties: {
    //       CASENUMBER,
    //       PROJECTNAME,
    //       DATEENDED,
    //       DETERMINATIONTYPE,
    //       STATUS,
    //       OUTCOME,
    //       CID,
    //       COMMUNITYNAME,
    //       PDFHYPERLINKID,
    //     },
    //   } = feature;
    //   const _properties = {
    //     case_number: CASENUMBER,
    //     name: PROJECTNAME,
    //     date: DATEENDED ? DateTime.fromMillis(DATEENDED).toUTC().toLocaleString(DateTime.DATE_SHORT) : 'Unknown',
    //     type: DETERMINATIONTYPE,
    //     status: STATUS,
    //     outcome: OUTCOME,
    //     community: `${CID} - ${COMMUNITYNAME}`,
    //     file_id: PDFHYPERLINKID,
    //     url: `https://map1.msc.fema.gov/data/41/L/${PDFHYPERLINKID}.pdf`,
    //   };
    //   feature.properties = _properties;
    // });

    try {
      fs.writeFile(geoJsonFile, JSON.stringify(geojson));
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
};

downloadAnnexations();
