//i cant think of anything better for the fallback
//so london it is 
import React, { useState, useEffect, useMemo } from 'react';

import { motion, AnimatePresence } from 'framer-motion';

interface HourlyData {
  time: string;
  tempC: number;
  condition: string;
}

interface ForecastDay {
  day: string;
  highC: number;
  lowC: number;
  condition: string;
}

interface WeatherData {
  city: string;
  tempC: number;
  condition: string;
  highC: number;
  lowC: number;
  humidity: string;
  wind: string;
  feelsLikeC: number;
  uvIndex: number;
  visibility: string;
  hourly: HourlyData[];
  forecast: ForecastDay[];
  timestamp: string;
}

export const WeatherApp: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [unit, setUnit] = useState<'C' | 'F'>('C');
  const [refreshKey, setRefreshKey] = useState(0);



  const convertTemp = (c: number) => {
    return unit === 'C' ? Math.round(c) : Math.round((c * 9) / 5 + 32);
  };

  const fetchWeatherData = async (latitude: number, longitude: number, cityOverrides?: string) => {
    try {
      setLoading(true);
      setError(null);

      let finalCity = cityOverrides || "Unknown Sector";

      if (!cityOverrides) {
        // Fetch City Name (Reverse Geocoding)
        const cityRes = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10`,
          { headers: { 'User-Agent': 'PortfolioOS/1.0' } }
        );
        const cityData = await cityRes.json();
        finalCity = cityData.address?.city || cityData.address?.town || cityData.address?.village || "Unknown Sector";
      }

      // Fetch Weather Data (Open-Meteo)
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&hourly=temperature_2m,weather_code,visibility&daily=weather_code,temperature_2m_max,temperature_2m_min,uv_index_max&timezone=auto`
      );
      const wData = await weatherRes.json();

      // helper to decode wmo codes
      const getConditionText = (code: number) => {
        const codes: Record<number, string> = {
          0: 'Clear Sky', 1: 'Mainly Clear', 2: 'Partly Cloudy', 3: 'Overcast',
          45: 'Fog', 48: 'Depositing Rime Fog', 51: 'Light Drizzle', 53: 'Moderate Drizzle', 55: 'Dense Drizzle',
          56: 'Freezing Drizzle', 57: 'Freezing Drizzle', 61: 'Slight Rain', 63: 'Moderate Rain', 65: 'Heavy Rain',
          66: 'Freezing Rain', 67: 'Freezing Rain', 71: 'Slight Snow', 73: 'Moderate Snow', 75: 'Heavy Snow',
          77: 'Snow Grains', 80: 'Slight Rain Showers', 81: 'Moderate Rain Showers', 82: 'Violent Rain Showers',
          85: 'Snow Showers', 86: 'Heavy Snow Showers', 95: 'Thunderstorm', 96: 'Thunderstorm with Hail', 99: 'Heavy Thunderstorm'
        };
        return codes[code] || 'Unknown';
      };

      const current = wData.current;
      const hourly = wData.hourly;
      const daily = wData.daily;

      // process hourly data
      const currentHour = new Date().getHours();
      const hourlyIndex = hourly.time.findIndex((t: string) => new Date(t).getHours() === currentHour);
      const startIndex = hourlyIndex !== -1 ? hourlyIndex : 0;

      const hourlyData: HourlyData[] = hourly.time.slice(startIndex, startIndex + 12).map((t: string, i: number) => ({
        time: new Date(t).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        tempC: hourly.temperature_2m[startIndex + i],
        condition: getConditionText(hourly.weather_code[startIndex + i])
      }));

      // process daily forecast
      const forecastData: ForecastDay[] = daily.time.slice(0, 5).map((t: string, i: number) => ({
        day: new Date(t).toLocaleDateString([], { weekday: 'short' }),
        highC: daily.temperature_2m_max[i],
        lowC: daily.temperature_2m_min[i],
        condition: getConditionText(daily.weather_code[i])
      }));

      // get visibility (convert meters to km)
      const visMeters = hourly.visibility ? hourly.visibility[startIndex] : 10000;
      const visKm = (visMeters / 1000).toFixed(1) + " km";

      setWeather({
        city: finalCity,
        tempC: current.temperature_2m,
        condition: getConditionText(current.weather_code),
        highC: daily.temperature_2m_max[0],
        lowC: daily.temperature_2m_min[0],
        humidity: `${current.relative_humidity_2m}%`,
        wind: `${current.wind_speed_10m} km/h`,
        feelsLikeC: current.apparent_temperature,
        uvIndex: daily.uv_index_max[0],
        visibility: visKm,
        hourly: hourlyData,
        forecast: forecastData,
        timestamp: new Date().toLocaleTimeString()
      });

    } catch (err: any) {
      console.error(err);
      setError(err.message || "Unable to acquire weather telemetry.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const initWeather = async () => {
      try {
        setLoading(true);
        setError(null);
        await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(
            async (pos) => {
              await fetchWeatherData(pos.coords.latitude, pos.coords.longitude);
              resolve(true);
            },
            async (err) => {
              console.warn("Geolocation failed, falling back to default.", err);
              // viva la london ig
              await fetchWeatherData(51.5074, -0.1278, "London (Fallback)");
              resolve(true);
            },
            { timeout: 5000 }
          );
        });
      } catch (e) {
        // double catch
        await fetchWeatherData(51.5074, -0.1278, "London (Fallback)");
      }
    };

    initWeather();
  }, [refreshKey]);

  const getWeatherIcon = (cond: string) => {
    const c = cond.toLowerCase();
    if (c.includes('sun') || c.includes('clear')) return '☀️';
    if (c.includes('cloud')) return '☁️';
    if (c.includes('rain') || c.includes('drizzle')) return '🌧️';
    if (c.includes('storm') || c.includes('thunder')) return '⛈️';
    if (c.includes('snow')) return '❄️';
    if (c.includes('fog') || c.includes('mist')) return '🌫️';
    return '⛅';
  };

  const getThemeWallpaper = () => {
    if (!weather) return '';
    const cond = weather.condition.toLowerCase();
    if (cond.includes('rain')) return 'https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?q=80&w=2564&auto=format&fit=crop';
    if (cond.includes('cloud')) return 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?q=80&w=2564&auto=format&fit=crop';
    if (cond.includes('clear') || cond.includes('sun')) return 'https://images.unsplash.com/photo-1601297183305-6df142704ea2?q=80&w=2564&auto=format&fit=crop';
    return 'https://images.unsplash.com/photo-1472289175570-1f6784206758?q=80&w=2670&auto=format&fit=crop';
  };

  const setAsWallpaper = () => {
    const wall = getThemeWallpaper();
    if (wall) {
      // custom event to set wallpaper
      window.dispatchEvent(new CustomEvent('setWallpaper', { detail: wall }));
    }
  };

  if (loading) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-white p-8 space-y-4">
        <motion.div
          animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="text-7xl"
        >
          ⛅
        </motion.div>
        <div className="text-center">
          <h2 className="text-xl font-black uppercase tracking-widest text-white/90">Atmospheric Scan</h2>
          <p className="text-white/30 text-[10px] font-bold uppercase tracking-[0.2em] mt-2 italic">Polling local weather nodes...</p>
        </div>
        <div className="w-48 h-1 bg-white/5 rounded-full overflow-hidden mt-4">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="h-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
          />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-white p-8 text-center">
        <span className="text-6xl mb-6 filter drop-shadow-[0_0_20px_rgba(239,68,68,0.3)]">🛰️</span>
        <h2 className="text-xl font-black uppercase tracking-widest text-red-400">Telemetry Lost</h2>
        <p className="text-white/40 text-xs mt-3 max-w-xs font-medium leading-relaxed">{error}</p>
        <button
          onClick={() => setRefreshKey(k => k + 1)}
          className="mt-8 px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all"
        >
          Re-establish Uplink
        </button>
      </div>
    );
  }

  if (!weather) return null;

  return (
    <div className="h-full flex flex-col bg-zinc-950 text-white font-sans selection:bg-blue-500/30">

      <div className={`absolute inset-0 opacity-20 pointer-events-none transition-all duration-1000 bg-gradient-to-br ${weather.condition.toLowerCase().includes('rain') ? 'from-indigo-900 via-zinc-950 to-black' :
        weather.condition.toLowerCase().includes('cloud') ? 'from-slate-800 via-zinc-950 to-black' :
          'from-blue-900 via-zinc-950 to-black'
        }`} />


      <header className="h-16 shrink-0 flex items-center justify-between px-8 border-b border-white/5 bg-black/40 backdrop-blur-md relative z-10">
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <h1 className="text-lg font-black tracking-tighter uppercase flex items-center gap-2">
              <span className="text-blue-500">📍</span> {weather.city}
            </h1>
            <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em]">{weather.timestamp}</span>
          </div>
        </div>
        <div className="flex items-center gap-3">

          <div className="flex items-center bg-black/40 border border-white/10 p-1 rounded-lg">
            <button
              onClick={() => setUnit('C')}
              className={`px-3 py-1 rounded-md text-[10px] font-black transition-all ${unit === 'C' ? 'bg-blue-600 text-white shadow-lg' : 'text-white/40 hover:text-white'}`}
            >
              °C
            </button>
            <button
              onClick={() => setUnit('F')}
              className={`px-3 py-1 rounded-md text-[10px] font-black transition-all ${unit === 'F' ? 'bg-blue-600 text-white shadow-lg' : 'text-white/40 hover:text-white'}`}
            >
              °F
            </button>
          </div>
          <button
            onClick={() => setRefreshKey(k => k + 1)}
            className="w-9 h-9 flex items-center justify-center bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all"
            title="Refresh Station"
          >
            🔄
          </button>

        </div>
      </header>

      <main className="flex-1 overflow-y-auto custom-scrollbar relative z-10 p-8">
        <div className="max-w-6xl mx-auto space-y-10">


          <div className="grid grid-cols-12 gap-8 items-start">


            <div className="col-span-5 bg-white/5 border border-white/10 rounded-[2.5rem] p-10 flex flex-col items-center text-center backdrop-blur-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6 opacity-10 text-8xl group-hover:scale-110 transition-transform duration-700">
                {getWeatherIcon(weather.condition)}
              </div>

              <div className="text-8xl font-black mb-2 flex items-start leading-none tracking-tighter tabular-nums drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                {convertTemp(weather.tempC)}
                <span className="text-4xl mt-4 opacity-50">°</span>
              </div>

              <h2 className="text-3xl font-black uppercase tracking-tighter text-white/90 mb-4">{weather.condition}</h2>

              <div className="flex gap-4 text-sm font-bold text-white/40 uppercase tracking-widest">
                <span className="flex items-center gap-2"><span className="text-red-500 opacity-50">H</span> {convertTemp(weather.highC)}°</span>
                <span className="text-white/10">|</span>
                <span className="flex items-center gap-2"><span className="text-blue-500 opacity-50">L</span> {convertTemp(weather.lowC)}°</span>
              </div>

              <div className="mt-8 pt-8 border-t border-white/5 w-full">
                <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">Last Updated: {weather.timestamp}</p>
              </div>
            </div>

            <div className="col-span-7 grid grid-cols-3 gap-4">
              {[
                { label: 'Feels Like', value: `${convertTemp(weather.feelsLikeC)}°`, icon: '🌡️' },
                { label: 'UV Index', value: weather.uvIndex, icon: '☀️', sub: weather.uvIndex > 5 ? 'High' : 'Low' },
                { label: 'Humidity', value: weather.humidity, icon: '💧' },
                { label: 'Wind Speed', value: weather.wind, icon: '🌬️' },
                { label: 'Visibility', value: weather.visibility, icon: '👁️' },
                { label: 'Status', value: 'Nominal', icon: '📡', sub: 'Station Link OK' },
              ].map((stat, i) => (
                <div key={i} className="bg-white/5 border border-white/5 p-6 rounded-3xl flex flex-col hover:bg-white/10 transition-all border-b-2 border-b-transparent hover:border-b-blue-500/50">
                  <div className="text-2xl mb-4 grayscale group-hover:grayscale-0 transition-all">{stat.icon}</div>
                  <div className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em] mb-1">{stat.label}</div>
                  <div className="text-xl font-black text-white uppercase tracking-tight">{stat.value}</div>
                  {stat.sub && <div className="text-[9px] font-bold text-blue-500 uppercase mt-1">{stat.sub}</div>}
                </div>
              ))}
            </div>
          </div>

          <section className="bg-white/5 border border-white/10 rounded-[2rem] p-8 backdrop-blur-md overflow-hidden">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mb-8 border-b border-white/5 pb-4">Chronological Projection (12H)</h3>
            <div className="flex gap-8 overflow-x-auto pb-6 scrollbar-hide snap-x">
              {weather.hourly.map((h, i) => (
                <div key={i} className="flex flex-col items-center min-w-[80px] snap-center">
                  <span className="text-[10px] font-bold text-white/40 uppercase mb-4">{h.time}</span>
                  <span className="text-2xl mb-4 hover:scale-125 transition-transform cursor-default">{getWeatherIcon(h.condition)}</span>
                  <span className="text-lg font-black tracking-tighter">{convertTemp(h.tempC)}°</span>
                </div>
              ))}
            </div>
          </section>

          {/* five days outlook on the weather */}
          <div className="grid grid-cols-2 gap-8">
            <section className="bg-white/5 border border-white/10 rounded-[2rem] p-8">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mb-8 border-b border-white/5 pb-4">Weekly Extrapolation</h3>
              <div className="space-y-6">
                {weather.forecast.map((f, i) => (
                  <div key={i} className="flex items-center justify-between group">
                    <span className="w-20 font-black text-[11px] uppercase tracking-widest text-white/60 group-hover:text-white transition-colors">
                      {i === 0 ? 'Today' : f.day}
                    </span>
                    <div className="flex-1 flex items-center justify-center gap-4">
                      <span className="text-xl filter group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.4)] transition-all">
                        {getWeatherIcon(f.condition)}
                      </span>
                      <span className="text-[9px] font-bold text-white/30 uppercase tracking-widest">{f.condition}</span>
                    </div>
                    <div className="flex items-center gap-4 w-24 justify-end">
                      <span className="text-[11px] font-black tabular-nums">{convertTemp(f.highC)}°</span>
                      <span className="text-[11px] font-bold tabular-nums text-white/20">{convertTemp(f.lowC)}°</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-blue-600/10 border border-blue-500/20 rounded-[2rem] p-8 flex flex-col items-center justify-center text-center relative overflow-hidden group">
              <div className="absolute inset-0 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-1000" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '12px 12px' }} />
              <div className="text-5xl mb-6">🌩️</div>
              <h3 className="text-xl font-black uppercase tracking-tighter mb-2">Predictive Logic</h3>
              <p className="text-xs text-white/40 leading-relaxed max-w-xs mb-8">
                System detects a {Math.floor(Math.random() * 20) + 5}% variance in precipitation density for the upcoming weekend cycle.
              </p>
              <div className="px-4 py-2 bg-blue-600 text-white text-[9px] font-black uppercase tracking-widest rounded-lg shadow-lg shadow-blue-900/40">
                Optimization Active
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* footer sync */}
      <footer className="h-10 bg-black/60 border-t border-white/5 px-8 flex items-center justify-between shrink-0 relative z-20">
        <div className="flex gap-6 text-[9px] font-black uppercase tracking-widest">
          <span className="flex items-center gap-1.5 text-zinc-600">
            <span className="w-1 h-1 rounded-full bg-emerald-500"></span>
            Sync: ON
          </span>
          <span className="text-zinc-700">|</span>
          <span className="text-zinc-600 italic">Google Search</span>
        </div>
        <div className="text-[9px] font-black text-zinc-700 uppercase tracking-widest">
          Node: ATMOS-5501
        </div>
      </footer>
    </div>
  );
};
