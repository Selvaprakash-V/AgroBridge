"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Droplets, Wind, MapPin, Volume2, Loader2, RefreshCw, Thermometer } from "lucide-react";
import { useStore } from "@/store/useStore";
import { getWeather } from "@/actions/weather";
import { speakNative } from "@/lib/audio";
import { getLanguageByCode } from "@/lib/languages";

export default function WeatherCard() {
  const { t, i18n } = useTranslation();
  const lat = useStore((state) => state.lat);
  const lon = useStore((state) => state.lon);
  const currentLanguage = useStore((state) => state.currentLanguage);
  const setLocation = useStore((state) => state.setLocation);
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const language = getLanguageByCode(currentLanguage);

  useEffect(() => {
    if (currentLanguage) {
      i18n.changeLanguage(currentLanguage);
    }
  }, [currentLanguage, i18n]);

  useEffect(() => {
    if (lat && lon) {
      fetchWeather();
    } else {
      requestLocation();
    }
  }, [lat, lon]);

  const requestLocation = () => {
    if (typeof window !== "undefined" && "geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation(position.coords.latitude.toString(), position.coords.longitude.toString());
        },
        () => setLoading(false)
      );
    } else {
      setLoading(false);
    }
  };

  const fetchWeather = async () => {
    if (!lat || !lon) return;
    setLoading(true);
    const result = await getWeather(lat, lon, currentLanguage.split("-")[0]);
    if (result.success && result.data) {
      setWeather(result.data);
    }
    setLoading(false);
  };

  const handleSpeak = () => {
    if (!weather) return;
    const text = `${t('weather')}: ${weather.description}, ${weather.temperature} डिग्री, नमी ${weather.humidity} प्रतिशत`;
    speakNative(text, language?.browserCode || "en-IN");
  };

  if (loading) {
    return (
      <div className="rounded-3xl shadow-lg border border-white/40 p-8 h-48 flex items-center justify-center overflow-hidden relative"
        style={{ background: 'linear-gradient(135deg, rgba(96, 165, 250, 0.35) 0%, rgba(59, 130, 246, 0.35) 100%)' }}>
        <div className="absolute -top-8 -right-8 text-[120px] opacity-[0.10] pointer-events-none select-none">☁️</div>
        <div className="text-center relative z-10">
          <Loader2 className="w-10 h-10 animate-spin mx-auto mb-3 text-blue-700" />
          <p className="text-base font-semibold text-gray-800">{t('loadingWeather')}</p>
        </div>
      </div>
    );
  }

  if (!weather) {
    return (
      <div className="rounded-3xl shadow-lg border border-white/40 p-8 h-48 flex items-center justify-between overflow-hidden relative"
        style={{ background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.38) 0%, rgba(249, 115, 22, 0.38) 100%)' }}>
        <div className="absolute -bottom-6 -right-6 text-[110px] opacity-[0.10] pointer-events-none select-none">📍</div>
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-md" style={{ background: 'linear-gradient(135deg, #92400e, #f97316)' }}>
            <MapPin className="w-7 h-7 text-white" />
          </div>
          <div>
            <p className="text-2xl font-bold mb-1 text-gray-900">{t('locationNeeded')}</p>
          </div>
        </div>
        <button
          onClick={requestLocation}
          className="bg-white/60 text-orange-700 px-8 py-4 rounded-2xl font-bold hover:bg-white/80 hover:shadow-lg transition-all border border-white/40"
        >
          {t('enableLocation')}
        </button>
      </div>
    );
  }

  return (
    <div className="card p-6 md:p-8 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(96, 165, 250, 0.25) 0%, rgba(59, 130, 246, 0.20) 50%, rgba(99, 102, 241, 0.15) 100%)' }}>
      {/* Decorative cloud blob */}
      <div className="absolute -top-8 -right-8 text-[140px] opacity-[0.08] pointer-events-none select-none">☁️</div>
      <div className="absolute top-16 -right-2 text-[60px] opacity-[0.06] pointer-events-none select-none">🌤️</div>

      {/* Top row: location + controls */}
      <div className="flex items-start justify-between mb-3 relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #1d4ed8, #3b82f6)' }}>
            <MapPin className="w-3.5 h-3.5 text-white" />
          </div>
          <p className="text-base md:text-lg font-bold text-gray-900">{weather.location}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleSpeak}
            className="p-2.5 bg-white/40 hover:bg-white/60 rounded-xl transition-all border border-white/50 text-blue-700 shadow-sm"
            title={t('listen')}
          >
            <Volume2 className="w-4 h-4" />
          </button>
          <button
            onClick={fetchWeather}
            className="p-2.5 bg-white/40 hover:bg-white/60 rounded-xl transition-all border border-white/50 text-blue-700 shadow-sm"
            title={t('refresh')}
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex items-end justify-between">
        {/* Left: temp + description */}
        <div>
          <div className="flex items-baseline gap-3 mb-1">
            <span className="text-5xl md:text-6xl font-black bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(135deg, #1e40af, #0ea5e9)' }}>
              {weather.temperature}°
            </span>
            <span className="text-xl md:text-2xl font-bold text-blue-900/70">C</span>
          </div>
          <p className="text-sm md:text-base font-semibold text-gray-700 capitalize mb-3">{weather.description}</p>

          {/* Stats pills */}
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center gap-1.5 bg-white/50 backdrop-blur-sm border border-white/60 rounded-full px-3 py-1 shadow-sm">
              <Droplets className="w-3.5 h-3.5 text-blue-600" />
              <span className="text-xs font-semibold text-gray-800">{weather.humidity}%</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/50 backdrop-blur-sm border border-white/60 rounded-full px-3 py-1 shadow-sm">
              <Wind className="w-3.5 h-3.5 text-blue-600" />
              <span className="text-xs font-semibold text-gray-800">{weather.windSpeed} m/s</span>
            </div>
            {weather.feelsLike && (
              <div className="flex items-center gap-1.5 bg-white/50 backdrop-blur-sm border border-white/60 rounded-full px-3 py-1 shadow-sm">
                <Thermometer className="w-3.5 h-3.5 text-orange-500" />
                <span className="text-xs font-semibold text-gray-800">Feels {weather.feelsLike}°</span>
              </div>
            )}
          </div>
        </div>

        {/* Right: large weather emoji */}
        <div className="text-6xl md:text-8xl drop-shadow-md select-none ml-4 transition-transform hover:scale-110 duration-300">
          {weather.description?.toLowerCase().includes('rain') ? '🌧️' :
           weather.description?.toLowerCase().includes('drizzle') ? '🌦️' :
           weather.description?.toLowerCase().includes('thunder') ? '⛈️' :
           weather.description?.toLowerCase().includes('snow') ? '🌨️' :
           weather.description?.toLowerCase().includes('mist') || weather.description?.toLowerCase().includes('fog') ? '🌫️' :
           weather.description?.toLowerCase().includes('cloud') ? '☁️' :
           weather.description?.toLowerCase().includes('clear') ? '☀️' : '🌤️'}
        </div>
      </div>
    </div>
  );
}
