"use client";

import { cls } from "@/lib/format";
import { Tip } from "@/components/Explain";

export function PageHead({
  kicker,
  title,
  desc,
  extra,
}: {
  kicker?: string;
  title: string;
  desc?: string;
  extra?: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3 mb-4 lg:mb-6">
      <div className="min-w-0">
        {kicker && <div className="text-[10px] lg:text-[11px] text-gold tracking-widest mb-1">{kicker}</div>}
        <h1 className="text-xl lg:text-2xl font-extrabold leading-tight">{title}</h1>
        {desc && <p className="text-sm text-mute mt-1 max-w-2xl">{desc}</p>}
      </div>
      {extra && <div className="w-full sm:w-auto flex flex-wrap gap-2">{extra}</div>}
    </div>
  );
}

export function Kpi({
  label,
  value,
  hint,
  tone = "neutral",
  help,
}: {
  label: string;
  value: string;
  hint?: string;
  tone?: "neutral" | "good" | "bad" | "gold" | "warn";
  help?: string;
}) {
  const color =
    tone === "good"
      ? "text-profit"
      : tone === "bad"
        ? "text-danger"
        : tone === "gold"
          ? "text-gold"
          : tone === "warn"
            ? "text-warn"
            : "text-white";
  return (
    <div className="card p-4">
      <div className="kpi-label">{label}</div>
      <div className={cls("text-lg lg:text-2xl font-extrabold mt-1 tabular-nums", color)}>{value}</div>
      {hint && <div className="text-xs text-mute mt-1">{hint}</div>}
      {help && <Tip id={help} />}
    </div>
  );
}

export function Num({
  label,
  value,
  onChange,
  step = 1,
  suffix,
  help,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  step?: number;
  suffix?: string;
  help?: string;
}) {
  return (
    <label className="block">
      <div className="text-[11px] text-mute mb-1">{label}</div>
      <div className="relative">
        <input
          type="number"
          step={step}
          value={Number.isFinite(value) ? value : 0}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          className="sheet-input tabular-nums"
          dir="ltr"
        />
        {suffix && <span className="absolute start-2 top-1.5 text-[11px] text-mute">{suffix}</span>}
      </div>
      {help && <Tip id={help} />}
    </label>
  );
}

export function TextField({
  label,
  value,
  onChange,
  help,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  help?: string;
}) {
  return (
    <label className="block">
      <div className="text-[11px] text-mute mb-1">{label}</div>
      <input value={value} onChange={(e) => onChange(e.target.value)} className="sheet-input" />
      {help && <Tip id={help} />}
    </label>
  );
}

export function Badge({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "good" | "bad" | "warn" | "gold" | "neutral";
}) {
  const map = {
    good: "bg-profit/15 text-profit",
    bad: "bg-danger/15 text-danger",
    warn: "bg-warn/15 text-warn",
    gold: "bg-gold/15 text-gold",
    neutral: "bg-white/10 text-mute",
  };
  return (
    <span className={cls("inline-flex px-2 py-0.5 rounded text-[11px] font-semibold", map[tone])}>
      {children}
    </span>
  );
}

export function Btn({
  children,
  onClick,
  tone = "ghost",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  tone?: "ghost" | "gold" | "danger";
}) {
  const map = {
    ghost: "border-line text-mute hover:text-white hover:border-white/20",
    gold: "border-gold/40 bg-gold/15 text-gold hover:bg-gold/25",
    danger: "border-danger/40 text-danger hover:bg-danger/10",
  };
  return (
    <button
      type="button"
      onClick={onClick}
      className={cls("border rounded-lg px-3 py-1.5 text-sm transition-colors", map[tone])}
    >
      {children}
    </button>
  );
}
