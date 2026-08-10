import { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import MainWeather from './components/MainWeather';
import HourlyForecast from './components/HourlyForecast';
import WeeklyForecast from './components/WeeklyForecast';
import Footer from './components/Footer';
import { getWeatherData } from './services/api';

export default function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleSelectLocation = async (loc) => {
    setSelectedLocation(loc);
    try {
      const data = await getWeatherData(loc.latitude, loc.longitude);
      setWeatherData(data);
    } catch (err) {
      console.error('Failed to fetch weather forecast data', err);
    }
  };

  const handleReset = () => {
    setWeatherData(null);
    setSelectedLocation(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <Navbar onReset={handleReset} />
      <main className="max-w-5xl mx-auto px-6 py-8 w-full flex-grow">
        {!weatherData ? (
          <Home onSelectLocation={handleSelectLocation} />
        ) : (
          <div className="space-y-6">
            <MainWeather 
              weatherData={weatherData} 
              selectedLocation={selectedLocation} 
              onReset={handleReset} 
            />
            <HourlyForecast weatherData={weatherData} />
            <WeeklyForecast weatherData={weatherData} />
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}