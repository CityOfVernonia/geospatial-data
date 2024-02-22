/**
 * Web mercator extent of Vernonia City Limits.
 */
export const cityExtent = {
  spatialReference: {
    latestWkid: 3857,
    wkid: 102100,
  },
  xmin: -13715274.4729,
  ymin: 5756619.730999999,
  xmax: -13710046.811,
  ymax: 5759781.4201000035,
};

/**
 * NAD 1983 (2011) Oregon Statewide Lambert (Intl Feet) extent of greater Vernonia area for querying data.
 */
export const spatialExtent = {
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
