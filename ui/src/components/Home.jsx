import { useState, useEffect } from 'react';
import { Search, MapPin, ArrowRight } from 'lucide-react';
import { searchLocations } from '../services/api';

export default function Home({ onSelectLocation }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  // Fetch suggestions as user types
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.trim().length < 2) {
        setSuggestions([]);
        return;
      }
      try {
        const data = await searchLocations(query);
        setSuggestions(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Failed to fetch suggestions', err);
      }
    };

    const timer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timer);
  }, [query]);

  const handleQuickCity = async (cityName) => {
    setQuery(cityName);
    try {
      const data = await searchLocations(cityName);
      if (data && data.length > 0) {
        onSelectLocation(data[0]);
      }
    } catch (err) {
      console.error('Failed to select quick city', err);
    }
  };

  return (
    <div className="text-center flex flex-col items-center justify-center py-16">
      {/* Live Badge with defined border & shadow */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border-2 border-emerald-300 shadow-sm mb-6">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        LIVE FROM OPEN-METEO • NO API KEY NEEDED
      </div>
      
      {/* Single-line Slogan */}
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 whitespace-nowrap leading-tight">
        Weather that <span className="text-purple-600">feels alive.</span>
      </h1>
      
      <p className="text-slate-500 mt-4 max-w-md text-sm font-medium">
        Search any city, airport, or region worldwide. Animated forecasts, minimal design, zero clutter.
      </p>

      {/* Search Bar Container with heavy border and shadow */}
      <div className="w-full max-w-xl mt-8 relative">
        <div className="flex items-center bg-white border-2 border-slate-300 rounded-full shadow-lg px-5 py-3.5 focus-within:ring-4 focus-within:ring-purple-500/20 focus-within:border-purple-600 transition-all">
          <Search className="w-5 h-5 text-slate-500 mr-3 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search any city, airport, or region..."
            className="w-full outline-none text-slate-800 placeholder-slate-400 text-sm bg-transparent font-medium"
          />
          <button className="bg-slate-900 text-white text-xs font-semibold px-5 py-2.5 rounded-full flex items-center gap-1.5 shrink-0 hover:bg-slate-800 transition-colors shadow-md">
            <MapPin className="w-3.5 h-3.5" /> Locate
          </button>
        </div>

        {/* Suggestions Dropdown */}
        {suggestions.length > 0 && (
          <div className="absolute left-0 right-0 mt-3 bg-white rounded-2xl shadow-2xl border-2 border-slate-200 overflow-hidden z-20 text-left">
            {suggestions.map((loc) => (
              <div
                key={loc.id}
                onClick={() => onSelectLocation(loc)}
                className="px-5 py-3.5 hover:bg-slate-100 flex items-center justify-between cursor-pointer border-b border-slate-100 last:border-none transition-colors"
              >
                <div>
                  <div className="font-semibold text-slate-900 text-sm flex items-center gap-2">
                    {loc.name} <span className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded uppercase font-bold">{loc.country_code}</span>
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5 font-medium">
                    {[loc.admin1, loc.country].filter(Boolean).join(' • ')} • {loc.latitude.toFixed(2)}, {loc.longitude.toFixed(2)}
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500" />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Pills with defined border & shadow */}
      <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
        {['Nairobi', 'Brisbane', 'Tokyo', 'London', 'New York', 'Paris'].map((city) => (
          <button
            key={city}
            onClick={() => handleQuickCity(city)}
            className="px-4 py-2 text-xs font-semibold border-2 border-slate-300 rounded-full text-slate-700 hover:border-slate-500 hover:bg-slate-100 transition-all bg-white shadow-sm"
          >
            {city}
          </button>
        ))}
      </div>
    </div>
  );
}