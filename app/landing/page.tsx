"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { LANGUAGES } from "@/lib/languages";
import { useStore } from "@/store/useStore";
import { Globe } from "lucide-react";
/* ── tiny helpers ──────────────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay },
});

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = Math.ceil(target / 60);
    const id = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(id); }
      else setCount(start);
    }, 20);
    return () => clearInterval(id);
  }, [target]);
  return <span>{count}{suffix}</span>;
}

/* ── data ──────────────────────────────────────────────────── */
/* ── page ──────────────────────────────────────────────────── */
export default function LandingPage() {
  const { t, i18n } = useTranslation();
  const currentLanguage = useStore((s) => s.currentLanguage);
  const setLanguage = useStore((s) => s.setLanguage);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  // close dropdown when clicking outside
  useEffect(() => {
    function handle(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  useEffect(() => {
    if (currentLanguage) {
      i18n.changeLanguage(currentLanguage);
    }
  }, [currentLanguage, i18n]);

  const features = [
    { emoji: "🌿", title: t('feature_cd_title'), desc: t('feature_cd_desc'), gradient: "from-emerald-400 to-green-600", bg: "bg-emerald-50", border: "border-emerald-200" },
    { emoji: "⛅", title: t('feature_weather_title'), desc: t('feature_weather_desc'), gradient: "from-sky-400 to-cyan-600", bg: "bg-sky-50", border: "border-sky-200" },
    { emoji: "💬", title: t('feature_chat_title'), desc: t('feature_chat_desc'), gradient: "from-violet-400 to-purple-600", bg: "bg-violet-50", border: "border-violet-200" },
    { emoji: "📅", title: t('feature_calendar_title'), desc: t('feature_calendar_desc'), gradient: "from-amber-400 to-orange-500", bg: "bg-amber-50", border: "border-amber-200" },
    { emoji: "🧠", title: t('feature_insights_title'), desc: t('feature_insights_desc'), gradient: "from-teal-400 to-emerald-600", bg: "bg-teal-50", border: "border-teal-200" },
    { emoji: "📸", title: t('feature_history_title'), desc: t('feature_history_desc'), gradient: "from-rose-400 to-pink-600", bg: "bg-rose-50", border: "border-rose-200" },
  ];

  const steps = [
    { n: "01", emoji: "✍️", title: t('step1_title'), desc: t('step1_desc') },
    { n: "02", emoji: "🌏", title: t('step2_title'), desc: t('step2_desc') },
    { n: "03", emoji: "📷", title: t('step3_title'), desc: t('step3_desc') },
    { n: "04", emoji: "🌱", title: t('step4_title'), desc: t('step4_desc') },
  ];

  const stats = [
    { value: 10, suffix: "+", label: t('stat_languages') },
    { value: 6,  suffix: "",  label: t('stat_features') },
    { value: 50, suffix: "+", label: t('stat_crops') },
    { value: 99, suffix: "%", label: t('stat_free') },
  ];

  const activeLang = LANGUAGES.find((l) => l.code === currentLanguage) ?? LANGUAGES[0];

  function selectLang(code: string) {
    setLanguage(code);   // also sets languageSelected: true inside the store
    setLangOpen(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-emerald-50 to-cyan-50 overflow-x-hidden">

      {/* ── floating background emojis ── */}
      <style jsx>{`
        @keyframes floatA { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-22px) rotate(6deg)} }
        @keyframes floatB { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-32px) rotate(-5deg)} }
        .fa { animation: floatA 5s ease-in-out infinite; }
        .fb { animation: floatB 7s ease-in-out infinite; }
      `}</style>
      <div className="fixed inset-0 pointer-events-none opacity-[0.07] z-0 select-none">
        {[
          { t:"top-[6%]",  l:"left-[2%]",  e:"🌾", cls:"fa", s:"100px" },
          { t:"top-[10%]", l:"right-[4%]", e:"🚜", cls:"fb", s:"120px" },
          { t:"top-[40%]", l:"left-[6%]",  e:"🌻", cls:"fb", s:"110px" },
          { t:"top-[50%]", l:"right-[8%]", e:"🌿", cls:"fa", s:"105px" },
          { t:"bottom-[15%]", l:"left-[20%]",  e:"🌽", cls:"fa", s:"115px" },
          { t:"bottom-[10%]", l:"right-[18%]", e:"🍃", cls:"fb", s:"108px" },
          { t:"top-[25%]",    l:"left-[45%]",  e:"🥕", cls:"fa", s:"90px"  },
        ].map((x, i) => (
          <div key={i} className={`absolute ${x.t} ${x.l} ${x.cls}`} style={{ fontSize: x.s }}>{x.e}</div>
        ))}
      </div>

      {/* ─────────── NAVBAR ─────────── */}
      <nav className="sticky top-0 z-50 px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between bg-white/40 backdrop-blur-2xl border border-white/50 rounded-2xl px-5 py-3 shadow-lg"
             style={{ background: "linear-gradient(135deg,rgba(16,185,129,0.15),rgba(6,182,212,0.1))" }}>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌾</span>
            <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-700 to-cyan-600">AgroBridge</span>
          </div>

          <div className="flex items-center gap-3">
            {/* ── language picker ── */}
            <div ref={langRef} className="relative">
              <button
                onClick={() => setLangOpen((o) => !o)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold text-gray-700 bg-white/60 border border-white/60 backdrop-blur-md shadow-sm hover:bg-white/80 transition-all"
              >
                <Globe className="w-4 h-4 text-emerald-600" />
                <span>{activeLang.name}</span>
                <svg className={`w-3 h-3 text-gray-400 transition-transform ${langOpen ? "rotate-180" : ""}`} viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                </svg>
              </button>

              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-48 rounded-2xl bg-white/90 backdrop-blur-xl border border-white/60 shadow-xl overflow-hidden z-50"
                  >
                    <div className="py-1 max-h-64 overflow-y-auto">
                      {LANGUAGES.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => selectLang(lang.code)}
                          className={`w-full text-left px-4 py-2.5 text-sm flex items-center justify-between hover:bg-emerald-50 transition-colors ${
                            lang.code === activeLang.code ? "bg-emerald-50 font-semibold text-emerald-700" : "text-gray-700"
                          }`}
                        >
                          <span>{lang.name}</span>
                          <span className="text-xs text-gray-400">{lang.englishName}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="/login" className="px-4 py-2 text-sm font-semibold text-gray-700 rounded-xl hover:bg-white/60 transition-all">{t('signInBtn')}</Link>
            <Link href="/register" className="px-4 py-2 text-sm font-semibold text-white rounded-xl shadow-md hover:opacity-90 transition-all"
                  style={{ background: "linear-gradient(135deg,#10b981,#06b6d4)" }}>
              {t('getStarted')}
            </Link>
          </div>
        </div>
      </nav>

      {/* ─────────── HERO ─────────── */}
      <section className="relative z-10 text-center pt-20 pb-24 px-4">
        <motion.div {...fadeUp(0)}>
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide mb-5 text-emerald-700 bg-emerald-100 border border-emerald-200">
            🌱 {t('heroTagline')}
          </span>
        </motion.div>

        <motion.h1 {...fadeUp(0.1)} className="text-5xl md:text-7xl font-extrabold leading-tight mb-5">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-700 via-green-600 to-cyan-600">
            {t('heroLine1')}
          </span>{" "}
          <br className="hidden md:block" />
          <span className="text-gray-800">{t('heroLine2')}</span>
        </motion.h1>

        <motion.p {...fadeUp(0.2)} className="max-w-2xl mx-auto text-lg text-gray-600 mb-8">
          {t('heroDesc')}
        </motion.p>

        <motion.div {...fadeUp(0.3)} className="flex flex-wrap justify-center gap-4">
          <Link href="/register"
                className="px-7 py-3.5 rounded-2xl text-white font-semibold text-base shadow-xl hover:scale-105 active:scale-95 transition-transform"
                style={{ background: "linear-gradient(135deg,#10b981,#06b6d4)" }}>
            {t('createFreeAccountBtn')} →
          </Link>
          <Link href="/login"
                className="px-7 py-3.5 rounded-2xl text-gray-800 font-semibold text-base bg-white/70 border border-white/60 backdrop-blur-md shadow-md hover:scale-105 active:scale-95 transition-transform">
            {t('signInBtn')}
          </Link>
        </motion.div>

        {/* hero illustration strip */}
        <motion.div {...fadeUp(0.4)} className="mt-14 flex justify-center gap-4 flex-wrap text-5xl">
          {["🌾","🚜","🌱","☀️","🌧️","🍅","🥕","🌽","🍃"].map((e,i)=>(
            <motion.span key={i} whileHover={{ scale: 1.4, rotate: 10 }} className="cursor-default select-none">{e}</motion.span>
          ))}
        </motion.div>
      </section>

      {/* ─────────── STATS ─────────── */}
      <section className="relative z-10 py-12 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s,i) => (
            <motion.div key={i} {...fadeUp(i * 0.1)}
              className="text-center p-6 rounded-2xl border border-white/50 backdrop-blur-md shadow-md"
              style={{ background:"linear-gradient(135deg,rgba(255,255,255,0.55),rgba(236,253,245,0.4))" }}>
              <div className="text-3xl font-extrabold text-emerald-700">
                <AnimatedCounter target={s.value} suffix={s.suffix} />
              </div>
              <div className="text-sm text-gray-600 mt-1 font-medium">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─────────── FEATURES ─────────── */}
      <section className="relative z-10 py-20 px-4">
        <motion.div {...fadeUp(0)} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">{t('everythingFarmerNeeds')}</h2>
          <p className="text-gray-500 max-w-xl mx-auto">{t('everythingFarmerNeedsSub')}</p>
        </motion.div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div key={i} {...fadeUp(i * 0.08)}
              whileHover={{ y: -6, scale: 1.02 }}
              className={`p-6 rounded-2xl border ${f.border} ${f.bg} shadow-sm backdrop-blur-sm transition-shadow hover:shadow-xl cursor-default`}>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 bg-gradient-to-br ${f.gradient} shadow-md`}>
                {f.emoji}
              </div>
              <h3 className="text-base font-bold text-gray-800 mb-2">{f.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─────────── HOW IT WORKS ─────────── */}
      <section className="relative z-10 py-20 px-4">
        <motion.div {...fadeUp(0)} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">{t('upAndRunning')}</h2>
          <p className="text-gray-500 max-w-xl mx-auto">{t('howItWorksSub')}</p>
        </motion.div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <motion.div key={i} {...fadeUp(i * 0.1)}>
              <div className="relative p-6 rounded-2xl bg-white/60 border border-white/50 backdrop-blur-md shadow-md text-center hover:shadow-lg transition-shadow">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 text-white text-xs font-bold flex items-center justify-center mx-auto mb-3 shadow">
                  {s.n}
                </div>
                <div className="text-3xl mb-3">{s.emoji}</div>
                <h4 className="font-bold text-gray-800 mb-1">{s.title}</h4>
                <p className="text-xs text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
              {i < steps.length - 1 && (
                <div className="hidden md:flex absolute top-1/2 -right-3 text-gray-300 text-lg">›</div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─────────── WHY SECTION ─────────── */}
      <section className="relative z-10 py-16 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { emoji:"🌍", title:t('builtForIndia'), desc:t('builtForIndiaDesc'), grad:"from-orange-400 to-amber-500" },
            { emoji:"🔒", title:t('privacyFirst'), desc:t('privacyFirstDesc'), grad:"from-violet-500 to-purple-600" },
            { emoji:"⚡", title:t('offlineFriendly'), desc:t('offlineFriendlyDesc'), grad:"from-emerald-500 to-teal-600" },
          ].map((c, i) => (
            <motion.div key={i} {...fadeUp(i * 0.12)}
              whileHover={{ scale: 1.03 }}
              className="p-7 rounded-2xl text-white shadow-xl"
              style={{ background: `linear-gradient(135deg, var(--tw-gradient-from-${i}), var(--tw-gradient-to-${i}))` }}>
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${c.grad} flex items-center justify-center text-3xl mb-4 shadow-lg`}>{c.emoji}</div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">{c.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{c.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─────────── CTA ─────────── */}
      <section className="relative z-10 py-24 px-4">
        <motion.div {...fadeUp(0)}
          className="max-w-3xl mx-auto text-center p-12 rounded-3xl shadow-2xl border border-white/50 backdrop-blur-xl"
          style={{ background: "linear-gradient(135deg,rgba(16,185,129,0.18),rgba(6,182,212,0.12))" }}>
          <div className="text-5xl mb-5">🌾</div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4">
            {t('readyToGrow')}
          </h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            {t('readyToGrowDesc')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/register"
                  className="px-8 py-3.5 rounded-2xl text-white font-semibold shadow-xl hover:scale-105 active:scale-95 transition-transform"
                  style={{ background: "linear-gradient(135deg,#10b981,#06b6d4)" }}>
              {t('createFreeAccountBtn')} →
            </Link>
            <Link href="/login"
                  className="px-8 py-3.5 rounded-2xl text-gray-800 font-semibold bg-white/70 border border-white/60 backdrop-blur-md shadow-md hover:scale-105 active:scale-95 transition-transform">
              {t('alreadyHaveAccountBtn')}
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ─────────── FOOTER ─────────── */}
      <footer className="relative z-10 py-8 text-center text-sm text-gray-400 border-t border-gray-200/60">
        <p>© {new Date().getFullYear()} AgroBridge · Built for farmers across India 🇮🇳</p>
      </footer>

    </div>
  );
}
