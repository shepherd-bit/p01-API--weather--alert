import * as openMeteoService from '../services/openMeteoService.js';

export const searchCity = async (req, res) => {
  try {
    const { city } = req.query;
    if (!city) {
      return res.status(400).json({ error: 'City query parameter is required' });
    }
    const locations = await openMeteoService.fetchLocations(city);
    res.json(locations);
  } catch (error) {
    res.status(500).json({ error: 'Failed to search city location data' });
  }
};

export const getForecast = async (req, res) => {
  try {
    const { lat, lon } = req.query;
    if (!lat || !lon) {
      return res.status(400).json({ error: 'Latitude (lat) and Longitude (lon) are required' });
    }
    const weatherData = await openMeteoService.fetchWeatherForecast(lat, lon);
    res.json(weatherData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weather forecast details' });
  }
};