

"use client";
import React from "react";
import clsx from "clsx";
import { ThumbsUp, ThumbsDown, AlertTriangle, ArrowRight, CheckCircle2, XCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useStore } from "@/store/useStore";

// --- RadialChart ---
type RadialChartProps = {
  percent: number;
  color: string;
  label: string;
  centerText: string;
  pulse?: boolean;
};
const RadialChart = ({ percent, color, label, centerText, pulse }: RadialChartProps) => (
  <div className="flex flex-col items-center mb-8">
    <div className="relative w-40 h-40 flex items-center justify-center">
      <svg className="absolute top-0 left-0" width="160" height="160">
        <circle
          cx="80" cy="80" r="70"
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="18"
        />
        <circle
          cx="80" cy="80" r="70"
          fill="none"
          stroke={color}
          strokeWidth="18"
          strokeDasharray={440}
          strokeDashoffset={440 - (440 * percent) / 100}
          strokeLinecap="round"
          className={pulse ? "animate-pulse" : ""}
        />
      </svg>
      <span className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl md:text-3xl font-black text-gray-900">{centerText}</span>
      </span>
    </div>
    <span className="mt-2 text-base font-semibold text-gray-700">{label}</span>
  </div>
);

// --- BubbleCluster ---
type Bubble = { icon: React.ReactNode; size: "lg" | "md" | "sm" };
type BubbleClusterProps = { bubbles: Bubble[] };
const BubbleCluster = ({ bubbles }: BubbleClusterProps) => (
  <div className="flex items-end gap-3 justify-center mb-8">
    {bubbles.map((b, i) => (
      <div key={i} className={clsx(
        "rounded-full bg-emerald-200 flex items-center justify-center shadow-md",
        b.size === "lg" && "w-12 h-12 text-lg",
        b.size === "md" && "w-8 h-8 text-base",
        b.size === "sm" && "w-5 h-5 text-xs"
      )}>
        <span>{b.icon}</span>
      </div>
    ))}
  </div>
);

// --- GaugeMeter ---
// Removed duplicate GaugeMeter definition below, keep only the later one

// --- ComparisonChart ---
// Removed unused ComparisonChart definition

// --- StepFlow ---
// Removed unused StepFlow definition

// --- TimelineBar ---
// Removed unused TimelineBar definition

// --- Feedback ---
// Removed duplicate Feedback definition



// --- Decision Flow Components ---
type StatusStripProps = {
  risk: { color: "green" | "yellow" | "red"; label: string; icon: React.ReactNode };
  issue: string;
  trend: { color: "green" | "yellow" | "red"; label: string; icon: React.ReactNode };
};
const StatusStrip = ({ risk, issue, trend }: StatusStripProps) => {
  const { t } = useTranslation();
  return (
    <div className="flex items-center gap-3 md:gap-5 px-4 py-2 rounded-xl bg-white/80 shadow border border-white/40 w-full max-w-2xl mx-auto mt-4">
      <span className={clsx(
        "flex items-center gap-1 font-bold text-sm px-2 py-0.5 rounded-full",
        risk.color === "green" && "bg-emerald-100 text-emerald-700",
        risk.color === "yellow" && "bg-yellow-100 text-yellow-700",
        risk.color === "red" && "bg-rose-100 text-rose-700"
      )}>
        {risk.icon} {t(risk.label)}
      </span>
      <span className="font-black text-base md:text-lg text-gray-900">{t(issue)}</span>
      <span className={clsx(
        "flex items-center gap-1 text-base font-bold",
        trend.color === "green" && "text-emerald-600",
        trend.color === "yellow" && "text-yellow-600",
        trend.color === "red" && "text-rose-600"
      )}>{trend.icon} {t(trend.label)}</span>
      <span className="ml-auto text-xs text-gray-500 font-medium">{t('basedOnNearbyReports', 'Based on nearby farmer reports')}</span>
    </div>
  );
};

type Signal = { icon: React.ReactNode; label: string };
type SignalStripProps = { signals: Signal[] };
const SignalStrip = ({ signals }: SignalStripProps) => {
  const { t } = useTranslation();
  return (
    <div className="flex items-center gap-4 md:gap-8 px-4 py-2 mt-3 mb-2 w-full max-w-2xl mx-auto">
      {signals.map((s, i) => (
        <span key={i} className="flex items-center gap-1 text-base md:text-lg font-medium text-gray-700">
          <span className="text-xl md:text-2xl">{s.icon}</span> {t(s.label)}
        </span>
      ))}
    </div>
  );
};

type GaugeMeterProps = { value: number; color: string; label: string };
const GaugeMeter = ({ value, color, label }: GaugeMeterProps) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center w-full max-w-xs mx-auto my-4">
      <div className="relative w-44 h-24">
        <svg width="176" height="96">
          <path d="M16,96 A72,72 0 0,1 160,96" fill="none" stroke="#e5e7eb" strokeWidth="18" />
          <path
            d="M16,96 A72,72 0 0,1 160,96"
            fill="none"
            stroke={color}
            strokeWidth="18"
            strokeDasharray={226}
            strokeDashoffset={226 - (226 * value) / 100}
            strokeLinecap="round"
            className="transition-all duration-700"
          />
          {/* Needle */}
          <line
            x1="88" y1="96"
            x2={88 + 72 * Math.cos(Math.PI * (1 - value / 100))}
            y2={96 - 72 * Math.sin(Math.PI * (1 - value / 100))}
            stroke={color}
            strokeWidth="5"
            className="transition-all duration-700"
          />
        </svg>
      </div>
      <span className={clsx("mt-2 font-bold text-lg flex items-center gap-2", color === "#f43f5e" && "text-rose-600", color === "#facc15" && "text-yellow-600", color === "#22c55e" && "text-emerald-600")}>{t(label)}</span>
    </div>
  );
};

type ComparisonBarItem = { label: string; value: number };
type ComparisonBarsProps = { good: ComparisonBarItem[]; bad: ComparisonBarItem[] };
const ComparisonBars = ({ good, bad }: ComparisonBarsProps) => {
  const { t } = useTranslation();
  return (
    <div className="rounded-xl bg-white/80 shadow border border-white/40 px-4 py-3 w-full max-w-2xl mx-auto mb-4 flex flex-col gap-2">
      <div className="flex items-center gap-2 text-emerald-700 font-bold mb-1"><CheckCircle2 className="w-5 h-5" /> {t('workedWell', 'Worked Well')}</div>
      {good.map((item, i) => (
        <div key={i} className="flex items-center gap-2 mb-1">
          <span className="h-3 bg-emerald-400 rounded-full" style={{ width: `${item.value}%`, minWidth: 40, maxWidth: 160 }}></span>
          <span className="text-emerald-900 font-medium text-sm">{t(item.label)}</span>
        </div>
      ))}
      <div className="flex items-center gap-2 text-rose-700 font-bold mt-2"><XCircle className="w-5 h-5" /> {t('didntWork', 'Didn\'t Work')}</div>
      {bad.map((item, i) => (
        <div key={i} className="flex items-center gap-2 mb-1">
          <span className="h-3 bg-rose-400 rounded-full" style={{ width: `${item.value}%`, minWidth: 20, maxWidth: 80 }}></span>
          <span className="text-rose-900 font-medium text-sm">{t(item.label)}</span>
        </div>
      ))}
    </div>
  );
};

type ActionStep = { icon: React.ReactNode; label: string };
type ActionFlowProps = { steps: ActionStep[] };
const ActionFlow = ({ steps }: ActionFlowProps) => {
  const { t } = useTranslation();
  return (
    <div className="rounded-xl bg-emerald-50 border border-emerald-200 shadow px-4 py-5 w-full max-w-2xl mx-auto mb-4 flex flex-col items-center">
      <div className="font-bold text-emerald-800 mb-2">{t('doThisNow', 'DO THIS NOW:')}</div>
      {steps.map((step, i) => (
        <React.Fragment key={i}>
          <button className="w-full max-w-xs mb-2 px-4 py-2 rounded-full bg-white shadow text-emerald-700 font-bold flex items-center justify-center gap-2 hover:bg-emerald-100 transition">
            {step.icon} {t(step.label)}
          </button>
          {i < steps.length - 1 && <span className="text-emerald-400 mb-2">↓</span>}
        </React.Fragment>
      ))}
    </div>
  );
};

type RiskNoticeProps = { label: string };
const RiskNotice = ({ label }: RiskNoticeProps) => {
  const { t } = useTranslation();
  return (
    <div className="rounded-xl bg-yellow-50 border border-yellow-200 shadow px-4 py-3 w-full max-w-2xl mx-auto mb-4 flex items-center gap-2 justify-center">
      <AlertTriangle className="w-5 h-5 text-yellow-600" />
      <span className="font-semibold text-yellow-700">{t(label)}</span>
    </div>
  );
};

const Feedback = () => {
  const { t } = useTranslation();
  return (
    <div className="flex gap-6 mt-2 mb-6 justify-center w-full max-w-2xl mx-auto">
      <button className="flex flex-col items-center gap-2 px-6 py-3 rounded-xl bg-emerald-100 text-emerald-700 font-bold shadow hover:bg-emerald-200 transition text-lg"> <ThumbsUp className="w-7 h-7" /> {t('yes', 'Yes')} </button>
      <button className="flex flex-col items-center gap-2 px-6 py-3 rounded-xl bg-rose-100 text-rose-700 font-bold shadow hover:bg-rose-200 transition text-lg"> <ThumbsDown className="w-7 h-7" /> {t('no', 'No')} </button>
    </div>
  );
};


const NearbyPage = () => {
  const { t, i18n } = useTranslation();
  const currentLanguage = useStore((state) => state.currentLanguage);

  useEffect(() => {
    if (currentLanguage) {
      i18n.changeLanguage(currentLanguage);
    }
  }, [currentLanguage, i18n]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-green-50 pb-16 animate-fade-in">
      <main className="flex flex-col items-center w-full px-2 md:px-0">
        {/* 1. PROBLEM SUMMARY */}
        <StatusStrip
          risk={{ color: "yellow", label: "risk_medium", icon: <span className="text-yellow-400">●</span> }}
          issue="leafSpot"
          trend={{ icon: <span className="inline-block rotate-12">↗</span>, color: "red", label: "trend_increasing" }}
        />

        {/* 2. NEARBY SIGNALS */}
        <SignalStrip
          signals={[
            { icon: "👥", label: "manyFarmersNearby" },
            { icon: "🌿", label: "tomato" },
            { icon: "⚠️", label: "seenRecently" },
          ]}
        />

        {/* 3. SPREAD (GAUGE) */}
        <GaugeMeter value={90} color="#f43f5e" label="spreadingFast" />

        {/* 4. WHAT WORKS (STACKED) */}
        <ComparisonBars
          good={[
            { label: "neemOil", value: 100 },
            { label: "removeLeaves", value: 80 },
            { label: "earlyWatering", value: 70 },
          ]}
          bad={[
            { label: "excessFertilizer", value: 30 },
            { label: "pesticide", value: 20 },
          ]}
        />

        {/* 5. ACTION FLOW (VERTICAL) */}
        <ActionFlow
          steps={[
            { icon: "🧴", label: "sprayNeemOil" },
            { icon: "🍃", label: "removeLeaves" },
            { icon: "👀", label: "monitorDaily" },
          ]}
        />

        {/* 6. FUTURE RISK (NOTICE) */}
        <RiskNotice label="riskIncreasingNext3Days" />

        {/* 7. FEEDBACK */}
        <Feedback />
      </main>
    </div>
  );
};

export default NearbyPage;
