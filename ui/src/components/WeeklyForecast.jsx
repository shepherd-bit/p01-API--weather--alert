import { Sun, Cloud, CloudRain, CloudLightning, Wind, Droplets } from 'lucide-react';

export default function WeeklyForecast({ weatherData }) {
  if (!weatherData || !weatherData.daily) return null;

  const daily = weatherData.daily;
  const times = daily.time || [];
  const maxTemps = daily.temperature_2m_max || [];
  const minTemps = daily.temperature_2m_min || [];
  const weatherCodes = daily.weather_code || [];
  const precipitationSums = daily.precipitation_sum || [];
  const windSpeeds = daily.wind_speed_10m_max || [];

  // Calculate overall min and max across the week for the visual temperature bar range
  const absoluteMin = Math.min(...minTemps);
  const absoluteMax = Math.max(...maxTemps);
  const totalSpan = absoluteMax - absoluteMin || 1;

  const getWeeklyIcon = (code) => {
    switch (code) {
      case 0:
        return <Sun className="w-5 h-5 text-amber-500" />;
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
        return <Sun className="w-5 h-5 text-amber-500" />;
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-xl border-4 border-slate-200 space-y-4">
      <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
        7-Day Forecast
      </h3>

      <div className="space-y-3">
        {times.map((timeStr, idx) => {
          const date = new Date(timeStr);
          const isToday = idx === 0;
          const dayName = isToday ? 'Today' : date.toLocaleDateString([], { weekday: 'short' });
          const dateLabel = date.toLocaleDateString([], { day: 'numeric', month: 'short' });
          
          const maxT = Math.round(maxTemps[idx] ?? 0);
          const minT = Math.round(minTemps[idx] ?? 0);
          const code = weatherCodes[idx] ?? 0;
          const precip = precipitationSums[idx] ?? 0;
          const wind = Math.round(windSpeeds[idx] ?? 0);

          // Calculate left and right percentages for the range bar
          const leftPercent = Math.max(0, Math.min(100, ((minT - absoluteMin) / totalSpan) * 100));
          const rightPercent = Math.max(0, Math.min(100, ((maxT - absoluteMin) / totalSpan) * 100));
          const barWidth = Math.max(8, rightPercent - leftPercent);

          return (
            <div
              key={timeStr}
              className={`p-4 rounded-2xl border-2 flex flex-col md:flex-row items-center justify-between gap-4 transition-all ${
                isToday
                  ? 'bg-purple-50/50 border-purple-300 shadow-md ring-2 ring-purple-400/20'
                  : 'bg-slate-50 border-slate-200 hover:border-slate-300 shadow-xs'
              }`}
            >
              {/* Day & Date */}
              <div className="w-full md:w-32 flex md:flex-col justify-between md:justify-start">
                <span className={`text-sm font-extrabold ${isToday ? 'text-purple-700' : 'text-slate-900'}`}>
                  {dayName}
                </span>
                <span className="text-xs font-medium text-slate-500">
                  {dateLabel}
                </span>
              </div>

              {/* Weather Icon */}
              <div className="flex items-center gap-3 w-full md:w-auto justify-start">
                {getWeeklyIcon(code)}
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                  <span className="flex items-center gap-0.5 text-blue-600">
                    <Droplets className="w-3.5 h-3.5" /> {precip}mm
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="flex items-center gap-0.5 text-teal-600">
                    <Wind className="w-3.5 h-3.5" /> {wind}km/h
                  </span>
                </div>
              </div>

              {/* Temperature Range Bar & Labels */}
              <div className="w-full md:w-72 flex items-center gap-3">
                <span className="text-xs font-bold text-slate-500 w-8 text-right">
                  {minT}°
                </span>
                
                <div className="flex-1 bg-slate-200 h-2.5 rounded-full relative overflow-hidden border border-slate-300">
                  <div
                    className="absolute h-full rounded-full bg-gradient-to-r from-blue-400 via-purple-500 to-amber-500 shadow-xs"
                    style={{
                      left: `${leftPercent}%`,
                      width: `${barWidth}%`,
                    }}
                  ></div>
                </div>

                <span className="text-xs font-extrabold text-slate-900 w-8">
                  {maxT}°
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}