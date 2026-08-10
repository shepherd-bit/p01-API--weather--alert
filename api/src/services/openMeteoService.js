import axios from 'axios';

export const fetchLocations = async (city) => {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=5&language=en&format=json`;
  const response = await axios.get(url);
  return response.data.results || [];
};

export const fetchWeatherForecast = async (lat, lon) => {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m,wind_gusts_10m&hourly=temperature_2m,weather_code,precipitation_probability&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum,wind_speed_10m_max&timezone=auto`;
  const response = await axios.get(url);
  return response.data;
};