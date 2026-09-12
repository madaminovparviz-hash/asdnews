/** Shared contact constants for the Dushanbe Seventh-day Adventist church site. */
export const CHURCH = {
  address: 'улица Борбад, 117',
  addressFull: 'улица Борбад, 117, Душанбе, Таджикистан',
  phoneDisplay: '+992 98 724 1279',
  phoneHref: 'tel:+992987241279',
  email: 'info@adventist-dushanbe.tj',
  emailHref: 'mailto:info@adventist-dushanbe.tj',
  /** Approximate coordinates of ул. Борбад 117, Душанбе (placeholder). */
  geo: { lat: 38.5663, lng: 68.8305 },
} as const;

export const MAP_EMBED_SRC = `https://www.openstreetmap.org/export/embed.html?bbox=${CHURCH.geo.lng - 0.026}%2C${CHURCH.geo.lat - 0.014}%2C${CHURCH.geo.lng + 0.026}%2C${CHURCH.geo.lat + 0.014}&layer=mapnik&marker=${CHURCH.geo.lat}%2C${CHURCH.geo.lng}`;
export const MAP_DIRECTIONS_URL = `https://www.openstreetmap.org/?mlat=${CHURCH.geo.lat}&mlon=${CHURCH.geo.lng}#map=17/${CHURCH.geo.lat}/${CHURCH.geo.lng}`;
