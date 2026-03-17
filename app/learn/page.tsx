"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import { ArrowLeft, BookOpen, Volume2, Play, Pause, AudioLines } from "lucide-react";
import { useStore } from "@/store/useStore";
import { speakNative } from "@/lib/audio";
import { getLanguageByCode } from "@/lib/languages";
import FarmingBackground from "@/components/FarmingBackground";

const tipIds = [
  'soilTesting',
  'cropRotation',
  'waterManagement',
  'organicFertilizers',
  'pestControl',
  'seedSelection',
  'weatherMonitoring',
  'mulchingBenefits',
];

export default function LearnPage() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const currentLanguage = useStore((state) => state.currentLanguage);
  const language = getLanguageByCode(currentLanguage);
  const [selectedTip, setSelectedTip] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);

  useEffect(() => {
    if (currentLanguage) {
      i18n.changeLanguage(currentLanguage);
    }
  }, [currentLanguage, i18n]);

  const tips = tipIds.map((id) => ({
    title: t(`learnTips.${id}.title`),
    content: t(`learnTips.${id}.content`),
  }));

  const handlePlayTip = (index: number) => {
    if (isPlaying && selectedTip === index) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    setSelectedTip(index);
    setIsPlaying(true);
    const tip = tips[index];
    const textToSpeak = `${tip.title}. ${tip.content}`;
    
    speakNative(textToSpeak, language?.browserCode || "en-IN");
    
    // Reset playing state when speech ends
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.onend = () => setIsPlaying(false);
  };

  const handleBackClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newRipple = { x, y, id: Date.now() };
    setRipples([...ripples, newRipple]);
    
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);
    
    // Stop any playing speech
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    
    setIsExiting(true);
    setTimeout(() => {
      router.push("/");
    }, 300);
  };

  return (
    <div className={`fixed inset-0 flex flex-col bg-linear-to-br from-amber-50 via-yellow-50 to-orange-50 transition-transform duration-300 ${isExiting ? 'translate-x-full' : 'translate-x-0'}`}>
      <FarmingBackground />
      <div className="flex-1 flex flex-col overflow-hidden relative z-10">
        <header className="px-2 pt-2 sm:px-3 sm:pt-3">
          <div className="bg-cream-50/70 backdrop-blur-2xl rounded-2xl sm:rounded-3xl border border-yellow-100/50 px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4 shadow-xl">
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={handleBackClick}
                className="relative p-2 hover:bg-yellow-100 rounded-full transition-colors overflow-hidden"
                aria-label="Back to home"
              >
                {ripples.map((ripple) => (
                  <span
                    key={ripple.id}
                    className="absolute rounded-full bg-amber-400/40 animate-ripple pointer-events-none"
                    style={{
                      left: ripple.x,
                      top: ripple.y,
                      width: '20px',
                      height: '20px',
                      transform: 'translate(-50%, -50%)',
                      animation: 'ripple 0.6s ease-out',
                    }}
                  />
                ))}
                <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 text-amber-700 relative z-10" />
              </button>
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-linear-to-br from-amber-500 to-orange-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
                <BookOpen className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-800">{t('learn')}</h2>
                <p className="text-xs text-gray-600 hidden sm:block">{t('farmingTips')}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Tips List */}
        <div className="flex-1 p-3 sm:p-4 overflow-y-auto">
          <div className="space-y-3 sm:space-y-4 max-w-4xl mx-auto">
            {tips.map((tip, index) => {
              const isActive = isPlaying && selectedTip === index;
              return (
                <div
                  key={index}
                  className={`group relative rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-500 ease-out ${
                    isActive 
                      ? 'bg-linear-to-br from-orange-500 to-amber-500 shadow-xl shadow-orange-200' 
                      : 'bg-white/80 hover:bg-white shadow-sm hover:shadow-md'
                  }`}
                >
                  <div className="p-4 sm:p-6 md:p-8">
                    <div className="flex items-start justify-between gap-3 sm:gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 sm:gap-4 mb-2 sm:mb-3">
                          <div className={`mt-1 p-2 rounded-xl transition-all duration-300 ${
                            isActive ? 'bg-white/20 text-white backdrop-blur-sm' : 'bg-orange-100 text-orange-600'
                          }`}>
                            {isActive ? <AudioLines className="w-5 h-5 sm:w-6 sm:h-6 animate-pulse" /> : <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />}
                          </div>
                          <h3 className={`flex-1 text-base sm:text-lg md:text-xl font-bold leading-tight transition-colors duration-300 ${
                            isActive ? 'text-white' : 'text-gray-800'
                          }`}>{tip.title}</h3>
                        </div>
                        <p className={`text-sm sm:text-base leading-relaxed pl-11 sm:pl-14 transition-colors duration-300 ${
                          isActive ? 'text-orange-50' : 'text-gray-600'
                        }`}>{tip.content}</p>
                      </div>
                      
                      <button
                        onClick={() => handlePlayTip(index)}
                        className={`shrink-0 p-3 sm:p-4 rounded-full transition-all duration-300 shadow-lg ${
                          isActive
                            ? 'bg-white text-orange-600'
                            : 'bg-orange-50 text-orange-500 hover:bg-orange-100'
                        }`}
                        aria-label={isActive ? 'Pause' : 'Play'}
                      >
                        {isActive ? (
                          <Pause className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
                        ) : (
                          <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-current translate-x-0.5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
