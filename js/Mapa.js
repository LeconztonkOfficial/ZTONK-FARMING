// Coordenadas exactas encontradas
const latitud = 19.376117; 
const longitud = -99.030331;

const latitud2 = 19.357720;
const longitud2 = -99.093567;

// Inicializar el mapa centrado en tu negocio
const map = L.map('mapa').setView([latitud, longitud], 13);

// Cargar la capa de OpenStreetMap
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 13,
  attribution: '© OpenStreetMap'
}).addTo(map);

// Marcador principal (Ztonk Shop) con el Popup ABIERTO al cargar
L.marker([latitud, longitud]).addTo(map)
  .bindPopup('<b>Ztonk Shop</b><br>C. Huitzilin 55.')
  .openPopup(); 


// Circunferencia de cobertura (5 km de radio)
L.circle([latitud, longitud], {
  color: '#2563eb',       // Color del borde
  fillColor: '#3b82f6',   // Color del relleno
  fillOpacity: 0.2,       // Transparencia al 20%
  radius: 7000            // 7000 metros = 5 km
}).addTo(map);