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

export const MAP_EMBED_SRC = `https://yandex.ru/map-widget/v1/?ll=${CHURCH.geo.lng}%2C${CHURCH.geo.lat}&z=16&pt=${CHURCH.geo.lng},${CHURCH.geo.lat},pm2rdm`;
export const MAP_DIRECTIONS_URL = `https://yandex.ru/maps/?pt=${CHURCH.geo.lng},${CHURCH.geo.lat}&z=16&l=map`;
