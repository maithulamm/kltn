import React from 'react';

const haversineDistance = (coords1, coords2) => {
  const toRad = (value) => (value * Math.PI) / 180;

  const R = 6371; // Bán kính của Trái Đất tính bằng km
  const dLat = toRad(coords2.lat - coords1.lat);
  const dLon = toRad(coords2.lon - coords1.lon);

  const lat1 = toRad(coords1.lat);
  const lat2 = toRad(coords2.lat);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Khoảng cách tính bằng km
};

const App = () => {
  const coords1 = { lat: 21.028511, lon: 105.804817 };
  const coords2 = { lat: 10.762622, lon: 106.660172 };

  const distance = haversineDistance(coords1, coords2);

  return (
    <div>
      <h1>Khoảng cách giữa hai điểm:</h1>
      <p>{distance.toFixed(2)} km</p>
    </div>
  );
};

export default App;
