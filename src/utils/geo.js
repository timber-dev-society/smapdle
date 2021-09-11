//
// https://www.movable-type.co.uk/scripts/latlong.html

const R = 6371e3 // metres
const LIMIT = 100


/**
 * This uses the ‘haversine’ formula to calculate the great-circle distance between two points 
 * that is, the shortest distance over the earth’s surface 
 * giving an ‘as-the-crow-flies’ distance between the points (ignoring any hills they fly over, of course!).
 * 
 * @param {*} from 
 * @param {*} to 
 * @returns 
 */
export const getDistance = (from, to) => {
  const φ1 = from.lat * Math.PI/180; // φ, λ in radians
  const φ2 = to.lat * Math.PI/180;
  const Δφ = (to.lat - from.lat) * Math.PI/180;
  const Δλ = (to.lon - from.lon) * Math.PI/180;

  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  return R * c;
}

export const isInTheLimit = (pos, marker) => {
  return getDistance(pos, marker) < LIMIT
} 
