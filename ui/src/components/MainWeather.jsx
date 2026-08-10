import { Sun, Moon, Cloud, CloudRain, CloudLightning, Wind, Droplets, Compass, Sunrise, Sunset, MapPin } from 'lucide-react';

export default function MainWeather({ weatherData, selectedLocation, onReset }) {
  if (!weatherData) return null;

  const current = weatherData.current || {};
  const daily = weatherData.daily || {};
  
  const isDay = current.is_day !== 0; // Default to true if undefined
  const weatherCode = current.weather_code ?? 0;

  // Helper to map WMO weather codes and day/night state to icons and descriptions
  const getWeatherDetails = (code, day) => {
    switch (code) {
      case 0:
        return {
          label: day ? 'Clear Sky' : 'Clear Night',
          icon: day ? <Sun className="w-20 h-20 text-amber-400 animate-spin-slow drop-shadow-md" /> : <Moon className="w-20 h-20 text-indigo-300 drop-shadow-md" />
        };
      case 1:
      case 2:
      case 3:
        return {
          label: 'Partly Cloudy',
          icon: <Cloud className="w-20 h-20 text-slate-400 drop-shadow-md animate-pulse" />
        };
      case 51:
      case 53:
      case 55:
      case 61:
      case 63:
        return {
          label: 'Rain Showers',
          icon: <CloudRain className="w-20 h-20 text-blue-400 drop-shadow-md" />
        };
      case 95:
      case 96:
      case 99:
        return {
          label: 'Thunderstorm',
          icon: <CloudLightning className="w-20 h-20 text-purple-500 drop-shadow-md" />
        };
      default:
        return {
          label: day ? 'Sunny' : 'Clear',
          icon: day ? <Sun className="w-20 h-20 text-amber-400 animate-spin-slow drop-shadow-md" /> : <Moon className="w-20 h-20 text-indigo-300 drop-shadow-md" />
        };
    }
  };

  const weatherDetails = getWeatherDetails(weatherCode, isDay);

  return (
    <div className="bg-white rounded-3xl p-8 shadow-2xl border-4 border-slate-200 flex flex-col md:flex-row justify-between gap-6 relative overflow-hidden">
      {/* Left Column: Temperature & Details */}
      <div className="space-y-4 flex-1">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            {selectedLocation?.name} 
            <span className="text-sm font-bold bg-slate-200 text-slate-800 px-2 py-0.5 rounded uppercase">
              {selectedLocation?.country_code}
            </span>
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-1">
            {[selectedLocation?.name, selectedLocation?.country].filter(Boolean).join(', ')} • {selectedLocation?.latitude?.toFixed(2)}, {selectedLocation?.longitude?.toFixed(2)}
          </p>
        </div>

        <div className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-100 border-2 border-purple-200 inline-block px-3.5 py-1 rounded-full shadow-xs">
          {weatherDetails.label} • Live Data
        </div>

        <div className="flex items-baseline gap-4 pt-2">
          <span className="text-6xl font-light tracking-tighter text-slate-900">
            {Math.round(current.temperature_2m ?? 0)}°
          </span>
          <div className="text-xs text-slate-600 font-medium space-y-1">
            <div>Feels like {Math.round(current.apparent_temperature ?? 0)}°</div>
            <div>H: {Math.round(daily.temperature_2m_max?.[0] ?? 0)}° • L: {Math.round(daily.temperature_2m_min?.[0] ?? 0)}°</div>
          </div>
        </div>

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
          <div className="bg-slate-50 p-3.5 rounded-2xl border-2 border-slate-200 shadow-sm flex flex-col justify-between">
            <span className="text-[11px] font-bold uppercase text-slate-500 flex items-center gap-1.5">
              <Droplets className="w-3.5 h-3.5 text-blue-500" /> Humidity
            </span>
            <span className="text-base font-bold text-slate-900 mt-2">
              {current.relative_humidity_2m}%
            </span>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-2xl border-2 border-slate-200 shadow-sm flex flex-col justify-between">
            <span className="text-[11px] font-bold uppercase text-slate-500 flex items-center gap-1.5">
              <Wind className="w-3.5 h-3.5 text-teal-500" /> Wind
            </span>
            <span className="text-base font-bold text-slate-900 mt-2">
              {current.wind_speed_10m} km/h
            </span>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-2xl border-2 border-slate-200 shadow-sm flex flex-col justify-between">
            <span className="text-[11px] font-bold uppercase text-slate-500 flex items-center gap-1.5">
              <Droplets className="w-3.5 h-3.5 text-indigo-500" /> Precip
            </span>
            <span className="text-base font-bold text-slate-900 mt-2">
              {current.precipitation ?? 0} mm
            </span>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-2xl border-2 border-slate-200 shadow-sm flex flex-col justify-between">
            <span className="text-[11px] font-bold uppercase text-slate-500 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-amber-500" /> Gusts
            </span>
            <span className="text-base font-bold text-slate-900 mt-2">
              {current.wind_gusts_10m ?? current.wind_speed_10m} km/h
            </span>
          </div>
        </div>
      </div>

      {/* Right Column: Sun timeline & Weather Icon / Change Location */}
      <div className="flex flex-col justify-between gap-6 md:w-80 shrink-0">
        <div className="flex items-center justify-between">
          <div className="hidden md:block"></div>
          {weatherDetails.icon}
        </div>

        {/* Sunrise / Sunset Card */}
        <div className="bg-slate-50 p-4 rounded-2xl border-2 border-slate-200 shadow-sm space-y-3">
          <div className="flex justify-between text-xs font-semibold text-slate-600">
            <span className="flex items-center gap-1"><Sunrise className="w-3.5 h-3.5 text-amber-500" /> Sunrise</span>
            <span>{daily.sunrise?.[0] ? new Date(daily.sunrise[0]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '06:01'}</span>
          </div>
          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden border border-slate-300">
            <div className="bg-gradient-to-r from-amber-400 via-purple-500 to-amber-600 w-3/4 h-full rounded-full"></div>
          </div>
          <div className="flex justify-between text-xs font-semibold text-slate-600">
            <span className="flex items-center gap-1"><Sunset className="w-3.5 h-3.5 text-orange-500" /> Sunset</span>
            <span>{daily.sunset?.[0] ? new Date(daily.sunset[0]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '20:00'}</span>
          </div>
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200 text-xs">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Max Wind</span>
              <span className="font-bold text-slate-800">{Math.max(...(daily.wind_speed_10m_max || [15]))} km/h</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Precip Sum</span>
              <span className="font-bold text-slate-800">{daily.precipitation_sum?.[0] ?? 0} mm</span>
            </div>
          </div>
        </div>

        {/* Change Location Button */}
        <button
          onClick={onReset}
          className="w-full flex items-center justify-center gap-2 text-xs font-bold border-2 border-slate-300 px-4 py-3 rounded-xl hover:bg-slate-100 transition-all shadow-sm text-slate-800 bg-white"
        >
          <MapPin className="w-4 h-4 text-purple-600" /> Change location
        </button>
      </div>
    </div>
  );
}