export type MapPoint = { id: number; lat: number; lng: number; name: string };

/**
 * ~100 real Colombian cities and towns, one per department capital + major
 * secondary cities, spread across all regions.  Coordinates are accurate to
 * ±0.001°.
 */
const COLOMBIA_CITIES: Omit<MapPoint, "id">[] = [
  // --- Andean region --------------------------------------------------------
  { name: "Bogotá",           lat:  4.7110, lng: -74.0721 },
  { name: "Medellín",         lat:  6.2442, lng: -75.5812 },
  { name: "Cali",             lat:  3.4516, lng: -76.5320 },
  { name: "Bucaramanga",      lat:  7.1193, lng: -73.1227 },
  { name: "Pereira",          lat:  4.8133, lng: -75.6961 },
  { name: "Manizales",        lat:  5.0703, lng: -75.5174 },
  { name: "Armenia",          lat:  4.5339, lng: -75.6811 },
  { name: "Ibagué",           lat:  4.4389, lng: -75.2322 },
  { name: "Pasto",            lat:  1.2136, lng: -77.2811 },
  { name: "Neiva",            lat:  2.9273, lng: -75.2819 },
  { name: "Popayán",          lat:  2.4419, lng: -76.6062 },
  { name: "Tunja",            lat:  5.5353, lng: -73.3578 },
  { name: "Duitama",          lat:  5.8278, lng: -73.0233 },
  { name: "Sogamoso",         lat:  5.7153, lng: -72.9361 },
  { name: "Zipaquirá",        lat:  5.0211, lng: -74.0056 },
  { name: "Facatativá",       lat:  4.8153, lng: -74.3556 },
  { name: "Chiquinquirá",     lat:  5.6186, lng: -73.8219 },
  { name: "Girardot",         lat:  4.3019, lng: -74.8003 },
  { name: "Honda",            lat:  5.2033, lng: -74.7444 },
  { name: "Espinal",          lat:  4.1489, lng: -74.8839 },
  { name: "Chaparral",        lat:  3.7247, lng: -75.4892 },
  { name: "Líbano",           lat:  4.9208, lng: -75.0597 },
  { name: "La Dorada",        lat:  5.4553, lng: -74.6647 },
  { name: "Soacha",           lat:  4.5797, lng: -74.2172 },
  { name: "Bello",            lat:  6.3397, lng: -75.5572 },
  { name: "Itagüí",           lat:  6.1847, lng: -75.5989 },
  { name: "Envigado",         lat:  6.1750, lng: -75.5908 },
  { name: "Rionegro",         lat:  6.1547, lng: -75.3797 },
  { name: "Copacabana",       lat:  6.3464, lng: -75.5069 },
  { name: "Santa Rosa de Cabal", lat: 4.8719, lng: -75.6217 },
  { name: "Dos Quebradas",    lat:  4.8394, lng: -75.6703 },
  { name: "Chinchiná",        lat:  4.9778, lng: -75.6061 },
  { name: "La Virginia",      lat:  4.8986, lng: -75.8678 },
  { name: "Palmira",          lat:  3.5397, lng: -76.3042 },
  { name: "Tuluá",            lat:  4.0839, lng: -76.2014 },
  { name: "Buga",             lat:  3.9011, lng: -76.2986 },
  { name: "Cartago",          lat:  4.7453, lng: -75.9117 },
  { name: "Buenaventura",     lat:  3.8833, lng: -77.0311 },
  { name: "El Cerrito",       lat:  3.6997, lng: -76.3164 },
  { name: "Jamundí",          lat:  3.2600, lng: -76.5386 },
  { name: "Sevilla",          lat:  4.2675, lng: -75.9389 },
  { name: "Zarzal",           lat:  4.3861, lng: -76.0711 },
  { name: "Roldanillo",       lat:  4.4114, lng: -76.1556 },
  { name: "Mocoa",            lat:  1.1472, lng: -76.6481 },
  { name: "Puerto Asís",      lat:  0.4975, lng: -76.4992 },
  { name: "Ipiales",          lat:  0.8283, lng: -77.6436 },
  { name: "Tumaco",           lat:  1.8008, lng: -78.7631 },
  { name: "Quibdó",           lat:  5.6918, lng: -76.6583 },

  // --- Caribbean region -----------------------------------------------------
  { name: "Barranquilla",     lat: 10.9639, lng: -74.7964 },
  { name: "Cartagena",        lat: 10.3910, lng: -75.4794 },
  { name: "Santa Marta",      lat: 11.2404, lng: -74.1990 },
  { name: "Valledupar",       lat: 10.4631, lng: -73.2532 },
  { name: "Montería",         lat:  8.7575, lng: -75.8851 },
  { name: "Sincelejo",        lat:  9.3047, lng: -75.3978 },
  { name: "Riohacha",         lat: 11.5444, lng: -72.9078 },
  { name: "Soledad",          lat: 10.9183, lng: -74.7658 },
  { name: "Maicao",           lat: 11.3783, lng: -72.2433 },
  { name: "Fundación",        lat: 10.5236, lng: -74.1842 },
  { name: "El Banco",         lat:  9.0011, lng: -73.9769 },
  { name: "Mompós",           lat:  9.2419, lng: -74.4283 },
  { name: "Tolú",             lat:  9.5228, lng: -75.5797 },
  { name: "Corozal",          lat:  9.3153, lng: -75.2967 },
  { name: "Aguachica",        lat:  8.3078, lng: -73.6267 },
  { name: "San Andrés",       lat: 12.5847, lng: -81.7006 },
  { name: "Turbo",            lat:  8.0964, lng: -76.7281 },
  { name: "Apartadó",         lat:  7.8842, lng: -76.6289 },

  // --- Eastern Andes / Norte de Santander ----------------------------------
  { name: "Cúcuta",           lat:  7.8939, lng: -72.5078 },
  { name: "Pamplona",         lat:  7.3756, lng: -72.6481 },
  { name: "Ocaña",            lat:  8.2386, lng: -73.3567 },

  // --- Santander -----------------------------------------------------------
  { name: "Barrancabermeja",  lat:  7.0644, lng: -73.8547 },
  { name: "San Gil",          lat:  6.5567, lng: -73.1333 },
  { name: "Vélez",            lat:  6.0111, lng: -73.6758 },
  { name: "Socorro",          lat:  6.4622, lng: -73.2594 },

  // --- Llanos Orientales / Orinoquía region --------------------------------
  { name: "Villavicencio",    lat:  4.1420, lng: -73.6288 },
  { name: "Yopal",            lat:  5.3378, lng: -72.3964 },
  { name: "Arauca",           lat:  7.0847, lng: -70.7617 },
  { name: "Puerto Carreño",   lat:  6.1883, lng: -67.4833 },
  { name: "Granada",          lat:  3.5428, lng: -73.7153 },
  { name: "Acacías",          lat:  3.9886, lng: -73.7606 },
  { name: "Puerto López",     lat:  4.0853, lng: -72.9600 },
  { name: "Tauramena",        lat:  5.0186, lng: -72.7553 },

  // --- Amazon region -------------------------------------------------------
  { name: "Florencia",        lat:  1.6144, lng: -75.6062 },
  { name: "San José del Guaviare", lat: 2.5648, lng: -72.6381 },
  { name: "Mitú",             lat:  1.2528, lng: -70.2344 },
  { name: "Puerto Inírida",   lat:  3.8653, lng: -67.9236 },
  { name: "Leticia",          lat: -4.2153, lng: -69.9406 },
  { name: "Puerto Leguízamo", lat: -0.1981, lng: -74.7714 },
  { name: "La Chorrera",      lat: -0.7297, lng: -72.7919 },

  // --- Pacific region -------------------------------------------------------
  { name: "Nuquí",            lat:  5.7119, lng: -77.2744 },
  { name: "Bahía Solano",     lat:  6.2289, lng: -77.4039 },
  { name: "Guapi",            lat:  2.5664, lng: -77.8858 },
  { name: "Timbiquí",         lat:  2.7683, lng: -77.6625 },
  { name: "El Charco",        lat:  2.4800, lng: -78.1131 },

  // --- Chocó / Urabá -------------------------------------------------------
  { name: "Istmina",          lat:  5.1603, lng: -76.6858 },
  { name: "Condoto",          lat:  5.0919, lng: -76.6558 },

  // --- Extreme geographic points -------------------------------------------
  { name: "Punta Gallinas",   lat: 12.4536, lng: -71.6803 }, // northernmost point
  { name: "Cabo Manglares",   lat:  1.6583, lng: -79.0183 }, // SW Pacific tip
];

export const COLOMBIA_MARKERS: MapPoint[] = COLOMBIA_CITIES.map((c, i) => ({
  id: i + 1,
  ...c,
}));

/** Geographic center of Colombia (~4°N, 73°W). */
export const COLOMBIA_CENTER: [number, number] = [4.0, -73.5];
