const getDistanceMiles = (location1, location2) => {
  const toRad = (val) => (val * Math.PI) / 180;
  const R = 3958.8;

  const dLat = toRad(location2.lat - location1.latitude);
  const dLon = toRad(location2.lon - location1.longitude);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(location1.latitude)) *
      Math.cos(toRad(location2.lat)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const miles = R * c;

  if (miles < 1) {
    const metres = Math.round(miles * 1609.34);
    return `${metres}m`;
  }

  const rounded = Math.round(miles);
  return `${rounded}mi`;
};

export default getDistanceMiles;
