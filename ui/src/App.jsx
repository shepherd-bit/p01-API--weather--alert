import { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import MainWeather from './components/MainWeather';
import HourlyForecast from './components/HourlyForecast';
import WeeklyForecast from './components/WeeklyForecast';
import Footer from './components/Footer';

export default function App() {
  const [weatherData, setWeatherData] = useState(null);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <Navbar />
      <main className="max-w-4xl mx-auto px-6 py-8 w-full flex-grow">
        {!weatherData ? <Home /> : (
          <div className="space-y-6">
            <MainWeather />
            <HourlyForecast />
            <WeeklyForecast />
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}