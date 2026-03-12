"use client";

import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useStore } from "@/store/useStore";
import { useRouter } from "next/navigation";
import WeatherCard from "./cards/WeatherCard";
import {
  Mic,
  MessageCircle,
  Camera,
  BookOpen,
  Stethoscope,
  Calendar,
  BarChart3,
  Building2,
  Users2,
  ArrowRight
} from "lucide-react";
import ProfileHeader from "./ProfileHeader";
import AudioButton from "./ui/AudioButton";

export default function Dashboard() {
  const { t, i18n } = useTranslation();
  const currentLanguage = useStore((state) => state.currentLanguage);
  const router = useRouter();

  useEffect(() => {
    if (currentLanguage) {
      i18n.changeLanguage(currentLanguage);
    }
  }, [currentLanguage, i18n]);

  const navigateTo = (path: string) => {
    router.push(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-green-50">
      <ProfileHeader />

      {/* Main Grid */}
      <div className="container mx-auto px-3 md:px-4 py-4 md:py-6 max-w-6xl pb-24 md:pb-32">
        {/* Weather Card - Full Width Rectangle */}
        <div className="mb-4 md:mb-6">
          <WeatherCard />
        </div>

        {/* Section divider */}
        <div className="flex items-center gap-3 mb-4 md:mb-5">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-emerald-300/70 to-transparent" />
          <span className="text-[11px] font-bold tracking-widest uppercase text-emerald-700 px-2">Features</span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-emerald-300/70 to-transparent" />
        </div>

        {/* Action Cards - 2-column Grid */}
        <div className="grid grid-cols-2 gap-4 md:gap-6">

          {/* Voice Input Card */}
          <div
            role="button"
            tabIndex={0}
            onClick={() => navigateTo("/voice")}
            onKeyDown={(e) => e.key === 'Enter' && navigateTo("/voice")}
            className="group rounded-3xl md:rounded-4xl shadow-md hover:shadow-2xl border border-white/40 p-5 md:p-7 h-48 md:h-64 transition-all duration-300 transform-gpu hover:scale-[1.03] text-gray-800 relative overflow-hidden cursor-pointer"
            style={{ background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.32) 0%, rgba(192, 132, 252, 0.32) 50%, rgba(216, 180, 254, 0.28) 100%)' }}
          >
            <span className="absolute top-3 left-3 z-20 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-700 tracking-widest uppercase">AI</span>
            <div className="absolute top-3 right-3 z-20">
              <AudioButton text={`${t('speak')}. ${t('askByVoice')}`} className="bg-white/40 hover:bg-white/60 text-gray-800" />
            </div>
            <div className="absolute -bottom-5 -right-5 text-[88px] opacity-[0.12] pointer-events-none select-none rotate-12 z-0">🎤</div>
            <div className="absolute inset-0 bg-gradient-to-br from-purple-300/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10 h-full flex flex-col items-center justify-center">
              <div className="w-14 h-14 md:w-[72px] md:h-[72px] rounded-2xl flex items-center justify-center mb-3 md:mb-4 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-purple-300/50 group-hover:shadow-xl"
                style={{ background: 'linear-gradient(135deg, #7e22ce, #a855f7)' }}>
                <Mic className="w-7 h-7 md:w-9 md:h-9 text-white drop-shadow" />
              </div>
              <h3 className="text-xl md:text-2xl font-black mb-1.5 text-gray-900">{t('speak')}</h3>
              <p className="text-xs md:text-sm text-gray-700 text-center px-2 leading-relaxed">{t('askByVoice')}</p>
            </div>
            <div className="absolute bottom-3 right-4 opacity-0 group-hover:opacity-60 transition-opacity z-10">
              <ArrowRight className="w-4 h-4 text-gray-700" />
            </div>
          </div>

          {/* Chat Card */}
          <div
            role="button"
            tabIndex={0}
            onClick={() => navigateTo("/chat")}
            onKeyDown={(e) => e.key === 'Enter' && navigateTo("/chat")}
            className="group rounded-3xl md:rounded-4xl shadow-md hover:shadow-2xl border border-white/40 p-5 md:p-7 h-48 md:h-64 transition-all duration-300 transform-gpu hover:scale-[1.03] text-gray-800 relative overflow-hidden cursor-pointer"
            style={{ background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.32) 0%, rgba(74, 222, 128, 0.32) 50%, rgba(134, 239, 172, 0.28) 100%)' }}
          >
            <span className="absolute top-3 left-3 z-20 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-green-100 text-green-700 tracking-widest uppercase">Chat</span>
            <div className="absolute top-3 right-3 z-20">
              <AudioButton text={`${t('chat')}. ${t('typeToAsk')}`} className="bg-white/40 hover:bg-white/60 text-gray-800" />
            </div>
            <div className="absolute -bottom-5 -right-5 text-[88px] opacity-[0.12] pointer-events-none select-none rotate-12 z-0">💬</div>
            <div className="absolute inset-0 bg-gradient-to-br from-green-300/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10 h-full flex flex-col items-center justify-center">
              <div className="w-14 h-14 md:w-[72px] md:h-[72px] rounded-2xl flex items-center justify-center mb-3 md:mb-4 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-green-300/50 group-hover:shadow-xl"
                style={{ background: 'linear-gradient(135deg, #15803d, #22c55e)' }}>
                <MessageCircle className="w-7 h-7 md:w-9 md:h-9 text-white drop-shadow" />
              </div>
              <h3 className="text-xl md:text-2xl font-black mb-1.5 text-gray-900">{t('chat')}</h3>
              <p className="text-xs md:text-sm text-gray-700 text-center px-2 leading-relaxed">{t('typeToAsk')}</p>
            </div>
            <div className="absolute bottom-3 right-4 opacity-0 group-hover:opacity-60 transition-opacity z-10">
              <ArrowRight className="w-4 h-4 text-gray-700" />
            </div>
          </div>

          {/* Image Upload Card */}
          <div
            role="button"
            tabIndex={0}
            onClick={() => navigateTo("/image")}
            onKeyDown={(e) => e.key === 'Enter' && navigateTo("/image")}
            className="group rounded-3xl md:rounded-4xl shadow-md hover:shadow-2xl border border-white/40 p-5 md:p-7 h-48 md:h-64 transition-all duration-300 transform-gpu hover:scale-[1.03] text-gray-800 relative overflow-hidden cursor-pointer"
            style={{ background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.32) 0%, rgba(251, 146, 60, 0.32) 50%, rgba(251, 191, 36, 0.28) 100%)' }}
          >
            <span className="absolute top-3 left-3 z-20 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-700 tracking-widest uppercase">Scan</span>
            <div className="absolute top-3 right-3 z-20">
              <AudioButton text={`${t('uploadPhoto')}. ${t('checkCropDisease')}`} className="bg-white/40 hover:bg-white/60 text-gray-800" />
            </div>
            <div className="absolute -bottom-5 -right-5 text-[88px] opacity-[0.12] pointer-events-none select-none rotate-12 z-0">📷</div>
            <div className="absolute inset-0 bg-gradient-to-br from-orange-300/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10 h-full flex flex-col items-center justify-center">
              <div className="w-14 h-14 md:w-[72px] md:h-[72px] rounded-2xl flex items-center justify-center mb-3 md:mb-4 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-orange-300/50 group-hover:shadow-xl"
                style={{ background: 'linear-gradient(135deg, #c2410c, #f97316)' }}>
                <Camera className="w-7 h-7 md:w-9 md:h-9 text-white drop-shadow" />
              </div>
              <h3 className="text-xl md:text-2xl font-black mb-1.5 text-gray-900">{t('uploadPhoto')}</h3>
              <p className="text-xs md:text-sm text-gray-700 text-center px-2 leading-relaxed">{t('checkCropDisease')}</p>
            </div>
            <div className="absolute bottom-3 right-4 opacity-0 group-hover:opacity-60 transition-opacity z-10">
              <ArrowRight className="w-4 h-4 text-gray-700" />
            </div>
          </div>

          {/* Learn Card */}
          <div
            role="button"
            tabIndex={0}
            onClick={() => navigateTo("/learn")}
            onKeyDown={(e) => e.key === 'Enter' && navigateTo("/learn")}
            className="group rounded-3xl md:rounded-4xl shadow-md hover:shadow-2xl border border-white/40 p-5 md:p-7 h-48 md:h-64 transition-all duration-300 transform-gpu hover:scale-[1.03] text-gray-800 relative overflow-hidden cursor-pointer"
            style={{ background: 'linear-gradient(135deg, rgba(254, 215, 170, 0.48) 0%, rgba(253, 186, 116, 0.45) 50%, rgba(251, 146, 60, 0.42) 100%)' }}
          >
            <span className="absolute top-3 left-3 z-20 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-700 tracking-widest uppercase">Learn</span>
            <div className="absolute top-3 right-3 z-20">
              <AudioButton text={`${t('learn')}. ${t('listenAndLearn')}`} className="bg-white/40 hover:bg-white/60 text-gray-800" />
            </div>
            <div className="absolute -bottom-5 -right-5 text-[88px] opacity-[0.12] pointer-events-none select-none rotate-12 z-0">📚</div>
            <div className="absolute inset-0 bg-gradient-to-br from-amber-300/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10 h-full flex flex-col items-center justify-center">
              <div className="w-14 h-14 md:w-[72px] md:h-[72px] rounded-2xl flex items-center justify-center mb-3 md:mb-4 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-amber-300/50 group-hover:shadow-xl"
                style={{ background: 'linear-gradient(135deg, #92400e, #f59e0b)' }}>
                <BookOpen className="w-7 h-7 md:w-9 md:h-9 text-white drop-shadow" />
              </div>
              <h3 className="text-xl md:text-2xl font-black mb-1.5 text-gray-900">{t('learn')}</h3>
              <p className="text-xs md:text-sm text-gray-700 text-center px-2 leading-relaxed">{t('listenAndLearn')}</p>
            </div>
            <div className="absolute bottom-3 right-4 opacity-0 group-hover:opacity-60 transition-opacity z-10">
              <ArrowRight className="w-4 h-4 text-gray-700" />
            </div>
          </div>

          {/* Crop Doctor Card */}
          <div
            role="button"
            tabIndex={0}
            onClick={() => navigateTo("/crop-doctor")}
            onKeyDown={(e) => e.key === 'Enter' && navigateTo("/crop-doctor")}
            className="group rounded-3xl md:rounded-4xl shadow-md hover:shadow-2xl border border-white/40 p-5 md:p-7 h-48 md:h-64 transition-all duration-300 transform-gpu hover:scale-[1.03] text-gray-800 relative overflow-hidden cursor-pointer"
            style={{ background: 'linear-gradient(135deg, rgba(20, 184, 166, 0.32) 0%, rgba(45, 212, 191, 0.32) 50%, rgba(94, 234, 212, 0.28) 100%)' }}
          >
            <span className="absolute top-3 left-3 z-20 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-700 tracking-widest uppercase">Health</span>
            <div className="absolute top-3 right-3 z-20">
              <AudioButton text={`${t('cropDoctor')}. ${t('cropDoctorDesc')}`} className="bg-white/40 hover:bg-white/60 text-gray-800" />
            </div>
            <div className="absolute -bottom-5 -right-5 text-[88px] opacity-[0.12] pointer-events-none select-none rotate-12 z-0">🩺</div>
            <div className="absolute inset-0 bg-gradient-to-br from-teal-300/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10 h-full flex flex-col items-center justify-center">
              <div className="w-14 h-14 md:w-[72px] md:h-[72px] rounded-2xl flex items-center justify-center mb-3 md:mb-4 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-teal-300/50 group-hover:shadow-xl"
                style={{ background: 'linear-gradient(135deg, #0f766e, #14b8a6)' }}>
                <Stethoscope className="w-7 h-7 md:w-9 md:h-9 text-white drop-shadow" />
              </div>
              <h3 className="text-xl md:text-2xl font-black mb-1.5 text-gray-900">{t('cropDoctor')}</h3>
              <p className="text-xs md:text-sm text-gray-700 text-center px-2 leading-relaxed">{t('cropDoctorDesc')}</p>
            </div>
            <div className="absolute bottom-3 right-4 opacity-0 group-hover:opacity-60 transition-opacity z-10">
              <ArrowRight className="w-4 h-4 text-gray-700" />
            </div>
          </div>

          {/* Almanac Card */}
          <div
            role="button"
            tabIndex={0}
            onClick={() => navigateTo("/almanac")}
            onKeyDown={(e) => e.key === 'Enter' && navigateTo("/almanac")}
            className="group rounded-3xl md:rounded-4xl shadow-md hover:shadow-2xl border border-white/40 p-5 md:p-7 h-48 md:h-64 transition-all duration-300 transform-gpu hover:scale-[1.03] text-gray-800 relative overflow-hidden cursor-pointer"
            style={{ background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.32) 0%, rgba(129, 140, 248, 0.32) 50%, rgba(165, 180, 252, 0.28) 100%)' }}
          >
            <span className="absolute top-3 left-3 z-20 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700 tracking-widest uppercase">Plan</span>
            <div className="absolute top-3 right-3 z-20">
              <AudioButton text={`${t('almanac')}. ${t('almanacDesc')}`} className="bg-white/40 hover:bg-white/60 text-gray-800" />
            </div>
            <div className="absolute -bottom-5 -right-5 text-[88px] opacity-[0.12] pointer-events-none select-none rotate-12 z-0">📅</div>
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-300/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10 h-full flex flex-col items-center justify-center">
              <div className="w-14 h-14 md:w-[72px] md:h-[72px] rounded-2xl flex items-center justify-center mb-3 md:mb-4 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-indigo-300/50 group-hover:shadow-xl"
                style={{ background: 'linear-gradient(135deg, #3730a3, #6366f1)' }}>
                <Calendar className="w-7 h-7 md:w-9 md:h-9 text-white drop-shadow" />
              </div>
              <h3 className="text-xl md:text-2xl font-black mb-1.5 text-gray-900">{t('almanac')}</h3>
              <p className="text-xs md:text-sm text-gray-700 text-center px-2 leading-relaxed">{t('almanacDesc')}</p>
            </div>
            <div className="absolute bottom-3 right-4 opacity-0 group-hover:opacity-60 transition-opacity z-10">
              <ArrowRight className="w-4 h-4 text-gray-700" />
            </div>
          </div>

          {/* Farm Insights Card */}
          <div
            role="button"
            tabIndex={0}
            onClick={() => navigateTo("/insights")}
            onKeyDown={(e) => e.key === 'Enter' && navigateTo("/insights")}
            className="group rounded-3xl md:rounded-4xl shadow-md hover:shadow-2xl border border-white/40 p-5 md:p-7 h-48 md:h-64 transition-all duration-300 transform-gpu hover:scale-[1.03] text-gray-800 relative overflow-hidden cursor-pointer"
            style={{ background: 'linear-gradient(135deg, rgba(244, 63, 94, 0.32) 0%, rgba(251, 113, 133, 0.32) 50%, rgba(253, 164, 175, 0.28) 100%)' }}
          >
            <span className="absolute top-3 left-3 z-20 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-700 tracking-widest uppercase">Data</span>
            <div className="absolute top-3 right-3 z-20">
              <AudioButton text={`${t('farmInsights')}. ${t('farmInsightsDesc')}`} className="bg-white/40 hover:bg-white/60 text-gray-800" />
            </div>
            <div className="absolute -bottom-5 -right-5 text-[88px] opacity-[0.12] pointer-events-none select-none rotate-12 z-0">📊</div>
            <div className="absolute inset-0 bg-gradient-to-br from-rose-300/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10 h-full flex flex-col items-center justify-center">
              <div className="w-14 h-14 md:w-[72px] md:h-[72px] rounded-2xl flex items-center justify-center mb-3 md:mb-4 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-rose-300/50 group-hover:shadow-xl"
                style={{ background: 'linear-gradient(135deg, #9f1239, #f43f5e)' }}>
                <BarChart3 className="w-7 h-7 md:w-9 md:h-9 text-white drop-shadow" />
              </div>
              <h3 className="text-xl md:text-2xl font-black mb-1.5 text-gray-900">{t('farmInsights')}</h3>
              <p className="text-xs md:text-sm text-gray-700 text-center px-2 leading-relaxed">{t('farmInsightsDesc')}</p>
            </div>
            <div className="absolute bottom-3 right-4 opacity-0 group-hover:opacity-60 transition-opacity z-10">
              <ArrowRight className="w-4 h-4 text-gray-700" />
            </div>
          </div>

          {/* Government Schemes Card */}
          <div
            role="button"
            tabIndex={0}
            onClick={() => navigateTo("/schemes")}
            onKeyDown={(e) => e.key === 'Enter' && navigateTo("/schemes")}
            className="group rounded-3xl md:rounded-4xl shadow-md hover:shadow-2xl border border-white/40 p-5 md:p-7 h-48 md:h-64 transition-all duration-300 transform-gpu hover:scale-[1.03] text-gray-800 relative overflow-hidden cursor-pointer"
            style={{ background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.32) 0%, rgba(251, 191, 36, 0.32) 50%, rgba(253, 224, 71, 0.28) 100%)' }}
          >
            <span className="absolute top-3 left-3 z-20 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-yellow-100 text-yellow-700 tracking-widest uppercase">Gov</span>
            <div className="absolute top-3 right-3 z-20">
              <AudioButton text={`${t('govSchemes')}. ${t('govSchemesDesc')}`} className="bg-white/40 hover:bg-white/60 text-gray-800" />
            </div>
            <div className="absolute -bottom-5 -right-5 text-[88px] opacity-[0.12] pointer-events-none select-none rotate-12 z-0">🏛️</div>
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-300/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10 h-full flex flex-col items-center justify-center">
              <div className="w-14 h-14 md:w-[72px] md:h-[72px] rounded-2xl flex items-center justify-center mb-3 md:mb-4 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-yellow-300/50 group-hover:shadow-xl"
                style={{ background: 'linear-gradient(135deg, #78350f, #d97706)' }}>
                <Building2 className="w-7 h-7 md:w-9 md:h-9 text-white drop-shadow" />
              </div>
              <h3 className="text-xl md:text-2xl font-black mb-1.5 text-gray-900">{t('govSchemes')}</h3>
              <p className="text-xs md:text-sm text-gray-700 text-center px-2 leading-relaxed">{t('govSchemesDesc')}</p>
            </div>
            <div className="absolute bottom-3 right-4 opacity-0 group-hover:opacity-60 transition-opacity z-10">
              <ArrowRight className="w-4 h-4 text-gray-700" />
            </div>
          </div>

          {/* Community Card - spans full width */}
          <div
            role="button"
            tabIndex={0}
            onClick={() => navigateTo("/community")}
            onKeyDown={(e) => e.key === 'Enter' && navigateTo("/community")}
            className="group rounded-3xl md:rounded-4xl shadow-md hover:shadow-2xl border border-white/40 p-5 md:p-7 h-48 md:h-64 transition-all duration-300 transform-gpu hover:scale-[1.015] text-gray-800 relative overflow-hidden cursor-pointer col-span-2"
            style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.28) 0%, rgba(6, 182, 212, 0.28) 50%, rgba(59, 130, 246, 0.22) 100%)' }}
          >
            <span className="absolute top-3 left-3 z-20 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 tracking-widest uppercase">Community</span>
            <div className="absolute top-3 right-3 z-20">
              <AudioButton text={`${t('community')}. ${t('communityDesc')}`} className="bg-white/40 hover:bg-white/60 text-gray-800" />
            </div>
            <div className="absolute -bottom-5 -right-5 text-[88px] opacity-[0.12] pointer-events-none select-none rotate-12 z-0">👥</div>
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-300/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10 h-full flex flex-col items-center justify-center">
              <div className="w-14 h-14 md:w-[72px] md:h-[72px] rounded-2xl flex items-center justify-center mb-3 md:mb-4 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-emerald-300/50 group-hover:shadow-xl"
                style={{ background: 'linear-gradient(135deg, #065f46, #10b981)' }}>
                <Users2 className="w-7 h-7 md:w-9 md:h-9 text-white drop-shadow" />
              </div>
              <h3 className="text-xl md:text-2xl font-black mb-1.5 text-gray-900">{t('community')}</h3>
              <p className="text-xs md:text-sm text-gray-700 text-center px-2 leading-relaxed">{t('communityDesc')}</p>
            </div>
            <div className="absolute bottom-3 right-4 opacity-0 group-hover:opacity-60 transition-opacity z-10">
              <ArrowRight className="w-4 h-4 text-gray-700" />
            </div>
          </div>

        </div>

        {/* Website Info Section - Static */}
        <div className="mt-8 mb-4">
          <div className="bg-white/30 backdrop-blur-2xl rounded-3xl shadow-lg border border-white/40 p-5 md:p-6" style={{ background: 'linear-gradient(135deg, rgba(134, 239, 172, 0.35) 0%, rgba(167, 243, 208, 0.35) 100%)' }}>
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div className="shrink-0">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-white/40 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/60">
                  <span className="text-2xl md:text-3xl">🌾</span>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-2 bg-white/50 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/60">
                    <span className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></span>
                    <h3 className="text-base md:text-lg font-bold text-gray-900">{t('appName')}</h3>
                  </div>
                  <AudioButton text={`${t('appName')}. ${t('websiteInfo')}`} />
                </div>
                <p className="text-xs md:text-sm text-gray-800 leading-relaxed">{t('websiteInfo')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button with pulse ring */}
      <div className="fixed right-5 bottom-6 z-50">
        <div className="relative">
          <span className="absolute inset-0 rounded-full bg-emerald-400/50 animate-ping pointer-events-none" />
          <button
            aria-label="Open chat"
            onClick={() => navigateTo('/chat')}
            className="relative flex items-center gap-2.5 bg-gradient-to-r from-emerald-500 to-teal-400 text-white px-5 py-3.5 rounded-full shadow-xl hover:shadow-2xl transform transition-all duration-200 hover:-translate-y-1 active:translate-y-0 font-bold text-sm"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="hidden sm:inline">{t('chat') || 'Chat'}</span>
          </button>
        </div>
      </div>

    </div>
  );
}
