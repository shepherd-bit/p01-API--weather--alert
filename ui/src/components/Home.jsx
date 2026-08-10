import { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Navigation } from 'lucide-react';
import { searchLocations } from '../services/api';

const POPULAR_CITIES = [
  { name: 'Nairobi', country: 'Kenya', latitude: -1.2921, longitude: 36.8219, country_code: 'KE' },
  { name: 'Brisbane', country: 'Australia', latitude: -27.4698, longitude: 153.0251, country_code: 'AU' },
  { name: 'Tokyo', country: 'Japan', latitude: 35.6762, longitude: 139.6503, country_code: 'JP' },
  { name: 'London', country: 'United Kingdom', latitude: 51.5074, longitude: -0.1278, country_code: 'GB' },
  { name: 'New York', country: 'United States', latitude: 40.7128, longitude: -74.0060, country_code: 'US' },
  { name: 'Paris', country: 'France', latitude: 48.8566, longitude: 2.3522, country_code: 'FR' },
];

export default function Home({ onSelectLocation }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setResults([]);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.trim().length >= 2) {
        setLoading(true);
        const data = await searchLocations(query);
        setResults(data);
        setLoading(false);
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const handleLocateMe = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          try {
            const data = await searchLocations(`${lat},${lon}`);
            if (data && data.length > 0) {
              onSelectLocation(data[0]);
            } else {
              onSelectLocation({ name: 'Current Location', latitude: lat, longitude: lon, country_code: 'GPS' });
            }
          } catch {
            onSelectLocation({ name: 'Current Location', latitude: lat, longitude: lon, country_code: 'GPS' });
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
          alert("Unable to retrieve your location. Please check permissions.");
        }
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center pt-8 md:pt-16 pb-12 text-center space-y-8">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold shadow-xs">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        LIVE FROM OPEN-METEO • NO API KEY NEEDED
      </div>

      {/* Headline */}
      <div className="space-y-3 max-w-2xl">
        <h1 className="text-3xl sm:text-6xl font-black tracking-tight text-slate-900">
          Weather that <span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 bg-clip-text text-transparent">feels alive.</span>
        </h1>
        <p className="text-xs sm:text-base text-slate-600 font-medium px-4">
          Search any city, airport, or region worldwide. Animated forecasts, minimal design, zero clutter.
        </p>
      </div>

      {/* Search Input Box */}
      <div className="relative w-full max-w-md mx-auto" ref={dropdownRef}>
        <div className="flex items-center bg-white border-2 border-slate-200 rounded-full p-1.5 shadow-lg focus-within:border-purple-500 focus-within:ring-4 focus-within:ring-purple-100 transition-all">
          <Search className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 ml-3 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search city, airport..."
            className="w-full bg-transparent border-none px-2.5 py-1.5 text-xs sm:text-sm text-slate-900 focus:outline-none placeholder:text-slate-400"
          />
          <button
            onClick={handleLocateMe}
            className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs font-bold transition-all shadow-md shrink-0"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>Locate</span>
          </button>
        </div>

        {/* Dropdown Results */}
        {(results.length > 0 || loading) && (
          <div className="absolute left-0 right-0 mt-2 bg-white rounded-2xl border-2 border-slate-200 shadow-xl overflow-hidden z-50 max-h-64 overflow-y-auto">
            {loading && (
              <div className="p-4 text-xs text-slate-500 font-medium">Searching locations...</div>
            )}
            {!loading && results.map((loc, idx) => (
              <div
                key={idx}
                onClick={() => onSelectLocation(loc)}
                className="flex items-center gap-3 px-4 py-3 hover:bg-purple-50 cursor-pointer border-b border-slate-100 last:border-none text-left transition-colors"
              >
                <MapPin className="w-4 h-4 text-purple-600 shrink-0" />
                <div>
                  <div className="text-xs sm:text-sm font-bold text-slate-900">{loc.name}</div>
                  <div className="text-[10px] sm:text-xs text-slate-500">{[loc.admin1, loc.country].filter(Boolean).join(', ')}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Popular Cities Quick Badges */}
      <div className="flex flex-wrap justify-center gap-2 max-w-lg pt-2">
        {POPULAR_CITIES.map((city) => (
          <button
            key={city.name}
            onClick={() => onSelectLocation(city)}
            className="bg-white hover:bg-slate-50 border-2 border-slate-200 text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-full shadow-xs transition-all hover:border-purple-300"
          >
            {city.name}
          </button>
        ))}
      </div>
    </div>
  );
}