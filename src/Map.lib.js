/**
 * Map Library: Colletction of generic map functions
 * @module 'Map.lib'
 */

/**
 * Calculates distance between 2 points using Haversine formula
 * @param {Number} lat1 - Latitude of first pin
 * @param {Number} lon1 - Longitude of first pin
 * @param {Number} lat2 - Latitude of second pin
 * @param {Number} lon2 - Longitude of second pin
 * @returns {Number} distance - Distance between two points in Meters
 */

const getDistanceFromLatLon = (lat1, lon1, lat2, lon2) => {
  /**
   * Converts degree to Radian
   * @param {Number} deg
   * @returns {Number} radian
   */
  const deg2rad = (deg) => deg * (Math.PI / 180);

  // Radius of the earth in meters to get result into Meters
  const R = 6371000;
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
    + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2))
    * Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in meters
  return d;
};

module.exports = {
  getDistanceFromLatLon,
};
