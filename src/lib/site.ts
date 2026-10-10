/** Shared contact constants for the Dushanbe Seventh-day Adventist church site. */
export const CHURCH = {
  address: 'улица Борбад, 117',
  addressFull: 'улица Борбад, 117, Душанбе, Таджикистан',
  phoneDisplay: '+992 072 86 3535',
  phoneHref: 'tel:+992072863535',
  email: 'Dushanbeasdchurch@gmail.com',
  emailHref: 'mailto:Dushanbeasdchurch@gmail.com',
  whatsappUrl: 'https://wa.me/992072863535',
  telegramUrl: 'https://t.me/+992072863535',
  youtubeUrl: 'https://www.youtube.com/@esdadventistorg',
  geo: { lat: 38.520646, lng: 68.745455 },
} as const;

export const MAP_EMBED_SRC = `https://yandex.ru/map-widget/v1/?ll=${CHURCH.geo.lng}%2C${CHURCH.geo.lat}&z=16&pt=${CHURCH.geo.lng},${CHURCH.geo.lat},pm2rdm`;
export const MAP_DIRECTIONS_URL = `https://yandex.ru/maps/?pt=${CHURCH.geo.lng},${CHURCH.geo.lat}&z=16&l=map`;
