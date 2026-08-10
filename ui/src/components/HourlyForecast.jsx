import { useRef } from 'react';
import { Sun, Moon, Cloud, CloudRain, CloudLightning, ChevronLeft, ChevronRight } from 'lucide-react';

export default function HourlyForecast({ weatherData }) {
  const scrollRef = useRef(null);

  if (!weatherData || !weatherData.hourly) return null;

  const hourly = weatherData.hourly;
  const times = hourly.time || [];
  const temperatures = hourly.temperature_2m || [];
  const weatherCodes = hourly.weather_code || [];
  const precipitationProbs = hourly.precipitation_probability || [];
  const isDayList = hourly.is_day || [];

  const nowIndex = Math.max(0, times.findIndex(t => new Date(t) > new Date()) - 1);
  const displayHours = times.slice(nowIndex, nowIndex + 24);

  const getHourlyIcon = (code, isDay) => {
    switch (code) {
      case 0:
        return isDay ? <Sun className="w-5 h-5 text-amber-500" /> : <Moon className="w-5 h-5 text-indigo-400" />;
      case 1:
      case 2:
      case 3:
        return <Cloud className="w-5 h-5 text-slate-400" />;
      case 51:
      case 53:
      case 61:
      case 63:
        return <CloudRain className="w-5 h-5 text-blue-400" />;
      case 95:
      case 96:
        return <CloudLightning className="w-5 h-5 text-purple-500" />;
      default:
        return isDay ? <Sun className="w-5 h-5 text-amber-500" /> : <Moon className="w-5 h-5 text-indigo-400" />;
    }
  };

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -250 : 250;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-xl border-4 border-slate-200 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
          24-Hour Forecast
        </h3>
        
        {/* Left & Right Scroll Buttons */}
        <div className="flex items-center gap-1.5">
          <button 
            onClick={() => handleScroll('left')}
            className="text-xs font-bold text-slate-600 hover:text-slate-900 p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-300 transition-colors shadow-xs"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button 
            onClick={() => handleScroll('right')}
            className="text-xs font-bold text-slate-600 hover:text-slate-900 p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-300 transition-colors shadow-xs"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontal Scroll Container */}
      <div 
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto pb-2 pt-1 scrollbar-none snap-x"
        style={{ scrollbarWidth: 'none' }}
      >
        {displayHours.map((timeStr, idx) => {
          const absoluteIdx = nowIndex + idx;
          const date = new Date(timeStr);
          const isNow = idx === 0;
          const hourLabel = isNow ? 'Now' : date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
          const temp = Math.round(temperatures[absoluteIdx] ?? 0);
          const code = weatherCodes[absoluteIdx] ?? 0;
          const isDay = isDayList[absoluteIdx] !== 0;
          const precipProb = precipitationProbs[absoluteIdx] ?? 0;

          return (
            <div
              key={timeStr}
              className={`snap-start shrink-0 w-24 p-3.5 rounded-2xl flex flex-col items-center justify-between gap-3 border-2 transition-all ${
                isNow 
                  ? 'bg-purple-50/70 border-purple-400 shadow-md ring-2 ring-purple-400/20' 
                  : 'bg-slate-50 border-slate-200 hover:border-slate-300 shadow-xs'
              }`}
            >
              <span className={`text-xs font-bold ${isNow ? 'text-purple-700' : 'text-slate-600'}`}>
                {hourLabel}
              </span>

              <div className="my-1">
                {getHourlyIcon(code, isDay)}
              </div>

              <div className="text-center">
                <span className="text-base font-extrabold text-slate-900 block">
                  {temp}°
                </span>
                <span className="text-[10px] font-semibold text-blue-600 flex items-center justify-center gap-0.5 mt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                  {precipProb}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}