const API_BASE = 'http://localhost:5000/api/weather';

export async function searchLocations(query) {
  const res = await fetch(`${API_BASE}/search?city=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error('Failed to fetch location suggestions');
  return res.json();
}

export async function getWeatherData(lat, lon) {
  const res = await fetch(`${API_BASE}/forecast?lat=${lat}&lon=${lon}`);
  if (!res.ok) throw new Error('Failed to fetch weather forecast');
  return res.json();
}