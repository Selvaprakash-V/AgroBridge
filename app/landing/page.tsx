"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
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
const features = [
  {
    emoji: "🌿",
    title: "Crop Diagnosis",
    desc: "Upload a plant photo and get instant AI-powered disease detection with treatment recommendations.",
    gradient: "from-emerald-400 to-green-600",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
  },
  {
    emoji: "⛅",
    title: "Live Weather",
    desc: "Hyper-local forecasts, rainfall predictions, and optimal sowing/harvest windows for your region.",
    gradient: "from-sky-400 to-cyan-600",
    bg: "bg-sky-50",
    border: "border-sky-200",
  },
  {
    emoji: "💬",
    title: "Multilingual AI Chat",
    desc: "Ask farming questions in your native language and get instant, expert-level answers.",
    gradient: "from-violet-400 to-purple-600",
    bg: "bg-violet-50",
    border: "border-violet-200",
  },
  {
    emoji: "📅",
    title: "Crop Calendar",
    desc: "Smart almanac tailored to your soil type and climate — never miss a critical farming date.",
    gradient: "from-amber-400 to-orange-500",
    bg: "bg-amber-50",
    border: "border-amber-200",
  },
  {
    emoji: "🧠",
    title: "AI Crop Insights",
    desc: "Get personalised nutrient, pest, and irrigation insights drawn from millions of farming records.",
    gradient: "from-teal-400 to-emerald-600",
    bg: "bg-teal-50",
    border: "border-teal-200",
  },
  {
    emoji: "📸",
    title: "Plant History",
    desc: "Track every scan, diagnosis, and recommendation in a searchable personal history log.",
    gradient: "from-rose-400 to-pink-600",
    bg: "bg-rose-50",
    border: "border-rose-200",
  },
];

const steps = [
  { n: "01", emoji: "✍️", title: "Create your account", desc: "Register for free — just an email, username, and password." },
  { n: "02", emoji: "🌏", title: "Pick your language", desc: "Choose from 10+ regional languages for a fully localised experience." },
  { n: "03", emoji: "📷", title: "Scan your crops", desc: "Snap a photo of any plant and let our AI diagnose it in seconds." },
  { n: "04", emoji: "🌱", title: "Grow better", desc: "Follow AI recommendations, track progress, and boost your harvest." },
];

const stats = [
  { value: 10, suffix: "+", label: "Languages" },
  { value: 6,  suffix: "",  label: "AI Features" },
  { value: 50, suffix: "+", label: "Crop Types" },
  { value: 99, suffix: "%", label: "Free to use" },
];

/* ── page ──────────────────────────────────────────────────── */
export default function LandingPage() {
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

            <Link href="/login" className="px-4 py-2 text-sm font-semibold text-gray-700 rounded-xl hover:bg-white/60 transition-all">Sign in</Link>
            <Link href="/register" className="px-4 py-2 text-sm font-semibold text-white rounded-xl shadow-md hover:opacity-90 transition-all"
                  style={{ background: "linear-gradient(135deg,#10b981,#06b6d4)" }}>
              Get started
            </Link>
          </div>
        </div>
      </nav>

      {/* ─────────── HERO ─────────── */}
      <section className="relative z-10 text-center pt-20 pb-24 px-4">
        <motion.div {...fadeUp(0)}>
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide mb-5 text-emerald-700 bg-emerald-100 border border-emerald-200">
            🌱 AI-Powered Farming Assistant
          </span>
        </motion.div>

        <motion.h1 {...fadeUp(0.1)} className="text-5xl md:text-7xl font-extrabold leading-tight mb-5">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-700 via-green-600 to-cyan-600">
            Farm Smarter
          </span>{" "}
          <br className="hidden md:block" />
          <span className="text-gray-800">with AI at your side</span>
        </motion.h1>

        <motion.p {...fadeUp(0.2)} className="max-w-2xl mx-auto text-lg text-gray-600 mb-8">
          AgroBridge gives every farmer — regardless of language or region — instant access to crop diagnostics,
          weather intelligence, and expert planting advice. All powered by AI. All free.
        </motion.p>

        <motion.div {...fadeUp(0.3)} className="flex flex-wrap justify-center gap-4">
          <Link href="/register"
                className="px-7 py-3.5 rounded-2xl text-white font-semibold text-base shadow-xl hover:scale-105 active:scale-95 transition-transform"
                style={{ background: "linear-gradient(135deg,#10b981,#06b6d4)" }}>
            Create free account →
          </Link>
          <Link href="/login"
                className="px-7 py-3.5 rounded-2xl text-gray-800 font-semibold text-base bg-white/70 border border-white/60 backdrop-blur-md shadow-md hover:scale-105 active:scale-95 transition-transform">
            Sign in
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">Everything a farmer needs</h2>
          <p className="text-gray-500 max-w-xl mx-auto">Six powerful tools bundled in one lightweight app — designed for the field, not the boardroom.</p>
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">Up and running in minutes</h2>
          <p className="text-gray-500 max-w-xl mx-auto">No training needed. Just sign up, pick your language, and start scanning.</p>
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
            { emoji:"🌍", title:"Built for India", desc:"Localised for Indian languages, crops, soil types, and climate zones.", grad:"from-orange-400 to-amber-500" },
            { emoji:"🔒", title:"Privacy first", desc:"Your data never leaves your account. No ads, no tracking, no reselling.", grad:"from-violet-500 to-purple-600" },
            { emoji:"⚡", title:"Offline friendly", desc:"Lightweight interfaces designed for low-bandwidth rural connectivity.", grad:"from-emerald-500 to-teal-600" },
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
            Ready to grow smarter?
          </h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Join farmers already using AgroBridge to diagnose crops, plan harvests, and boost yields — for free.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/register"
                  className="px-8 py-3.5 rounded-2xl text-white font-semibold shadow-xl hover:scale-105 active:scale-95 transition-transform"
                  style={{ background: "linear-gradient(135deg,#10b981,#06b6d4)" }}>
              Create free account →
            </Link>
            <Link href="/login"
                  className="px-8 py-3.5 rounded-2xl text-gray-800 font-semibold bg-white/70 border border-white/60 backdrop-blur-md shadow-md hover:scale-105 active:scale-95 transition-transform">
              Already have an account
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
