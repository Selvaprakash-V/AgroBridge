import React from "react";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { RadarIcon } from "lucide-react";
import { useTranslation } from "react-i18next";


interface WhatsHappeningNearbyCardProps {
  className?: string;
}

const WhatsHappeningNearbyCard: React.FC<WhatsHappeningNearbyCardProps> = ({ className }) => {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <button
      type="button"
      onClick={() => router.push("/nearby")}
      className={clsx(
        "group rounded-3xl md:rounded-4xl shadow-md hover:shadow-2xl border border-white/40 p-5 md:p-7 h-48 md:h-64 transition-all duration-300 transform-gpu hover:scale-[1.015] text-gray-800 relative overflow-hidden cursor-pointer w-full",
        className
      )}
      style={{ background: 'linear-gradient(135deg, rgba(190, 37, 134, 0.28) 0%, rgba(236, 72, 153, 0.18) 100%)' }}
      aria-label="Go to Nearby Intelligence"
    >
      {/* Badge (top left, styled like Community but blue) */}
      <span className="absolute top-3 left-3 z-20 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-pink-100 text-pink-700 tracking-widest uppercase">LIVE</span>

      {/* Animated Pulse Indicator (top right) */}
      <span className="absolute top-3 right-3 z-20 flex items-center">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500 shadow"></span>
        </span>
      </span>

      {/* Large Emoji at Bottom Right */}
      <div className="absolute -bottom-5 -right-5 text-[88px] opacity-[0.12] pointer-events-none select-none rotate-12 z-0">📡</div>

      {/* Overlay gradient for hover effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-300/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Icon and Title */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center">
        <div className="w-14 h-14 md:w-[72px] md:h-[72px] rounded-2xl flex items-center justify-center mb-3 md:mb-4 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-pink-300/50 group-hover:shadow-xl"
          style={{ background: 'linear-gradient(135deg, #be2586, #ec4899)' }}>
          <RadarIcon className="w-7 h-7 md:w-9 md:h-9 text-white drop-shadow" />
        </div>
        <h3 className="text-xl md:text-2xl font-black mb-1.5 text-gray-900">{t('whatsHappeningNearby', 'What\'s Happening Nearby')}</h3>
        <p className="text-xs md:text-sm text-gray-700 text-center px-2 leading-relaxed">{t('whatsHappeningNearbyDesc', 'What\'s happening around your farm')}</p>
      </div>
    </button>
  );
};

export default WhatsHappeningNearbyCard;
