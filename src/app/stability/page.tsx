"use client";

import { useState } from "react";
import { useCod } from "@/lib/store";
import { calcStability } from "@/lib/cod";
import { money } from "@/lib/format";
import { Num, PageHead } from "@/components/ui";
import { useT } from "@/lib/lang";
import type { Region } from "@/lib/types";

export default function StabilityPage() {
  const { t } = useT();
  const [region, setRegion] = useState<Region>("gulf");
  const s = useCod();
  const input = s.stability[region];
  const r = calcStability(input);
  const currency = region === "gulf" ? "SAR" : "DZD";

  return (
    <div className="lg:p-8 max-w-6xl">
      <PageHead
        kicker="CALCULATOR"
        title={t("calc.title")}
        desc={t("calc.desc")}
        extra={
          <div className="flex gap-2">
            <button
              className={`px-3 py-1.5 rounded-lg border text-sm ${region === "gulf" ? "border-gold bg-gold/15 text-gold" : "border-line"}`}
              onClick={() => setRegion("gulf")}
            >
              {t("sheet.gulf")}
            </button>
            <button
              className={`px-3 py-1.5 rounded-lg border text-sm ${region === "algeria" ? "border-gold bg-gold/15 text-gold" : "border-line"}`}
              onClick={() => setRegion("algeria")}
            >
              {t("sheet.algeria")}
            </button>
          </div>
        }
      />

      <p className="text-xs text-mute mb-4 font-mono">{t("sheet.formula")}</p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        <Flag
          label={t("calc.be")}
          value={`${Math.round(r.breakevenDr * 100)}%`}
          sub="Break Even from 35% delivered"
          tone={r.breakevenDr <= 0.35 ? "good" : "warn"}
        />
        <Flag
          label={t("calc.compete")}
          value={r.competitive ? t("calc.stable") : t("calc.fragile")}
          sub="Change price and still profitable"
          tone={r.competitive ? "good" : "warn"}
        />
        <Flag
          label={t("calc.stable")}
          value={r.stable ? t("calc.stable") : r.status === "loss" ? t("calc.loss") : t("calc.fragile")}
          sub="EPD ≥ $8 · delivered ≥ 35%"
          tone={r.stable ? "good" : r.status === "loss" ? "bad" : "warn"}
        />
        <Flag
          label={t("calc.stock30")}
          value={`${Math.ceil(r.delivered * (30 / 7))}`}
          sub="pcs"
          tone="neutral"
        />
      </div>

      <div className="card overflow-hidden mb-5">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-9 gap-px bg-line">
          {[t("calc.qty"), t("calc.test"), t("calc.costPct"), t("calc.real"), t("calc.cr"), t("calc.dr"), t("calc.price"), t("calc.pcost"), t("calc.alt")].map(
            (k) => (
              <div key={k} className="bg-[#c47b12] text-white text-xs font-bold px-2 py-2">
                {k}
              </div>
            )
          )}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-9 gap-3 p-4">
          <Num label="" value={input.quantity} onChange={(n) => s.setStability(region, { quantity: n })} />
          <Num label="" value={input.testCost} onChange={(n) => s.setStability(region, { testCost: n })} step={0.1} />
          <Num label="" value={input.costPct} onChange={(n) => s.setStability(region, { costPct: n })} step={0.01} />
          <div>
            <div className="sheet-input text-profit font-bold">{r.realCost}</div>
            <div className="text-[10px] text-mute mt-1">Test + Test×Cost%</div>
          </div>
          <Num label="" value={input.confirmationRate} onChange={(n) => s.setStability(region, { confirmationRate: n })} step={0.01} />
          <Num label="" value={input.deliveredRate} onChange={(n) => s.setStability(region, { deliveredRate: n })} step={0.01} />
          <Num label={currency} value={input.sellingPriceLocal} onChange={(n) => s.setStability(region, { sellingPriceLocal: n })} />
          <Num label="" value={input.productCost} onChange={(n) => s.setStability(region, { productCost: n })} step={0.1} />
          <Num label={currency} value={input.altPriceLocal} onChange={(n) => s.setStability(region, { altPriceLocal: n })} />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Scenario t={t} title={t("calc.old")} local={input.sellingPriceLocal} cur={currency} sc={r.oldP} />
        <Scenario t={t} title={t("calc.new")} local={input.altPriceLocal} cur={currency} sc={r.newP} />
      </div>
    </div>
  );
}

function Flag({
  label,
  value,
  sub,
  tone,
}: {
  label: string;
  value: string;
  sub: string;
  tone: "good" | "bad" | "warn" | "neutral";
}) {
  const bg =
    tone === "good"
      ? "bg-[#1f8a4c] text-white"
      : tone === "bad"
        ? "bg-[#a33b3b] text-white"
        : tone === "warn"
          ? "bg-[#b8860b] text-white"
          : "bg-[#3d2a44] text-[#f3c0d4]";
  return (
    <div className={`rounded-lg p-3 ${bg}`}>
      <div className="text-[11px] opacity-80">{label}</div>
      <div className="font-extrabold text-lg leading-tight mt-1">{value}</div>
      <div className="text-[10px] opacity-80 mt-1">{sub}</div>
    </div>
  );
}

function Scenario({
  t,
  title,
  local,
  cur,
  sc,
}: {
  t: (k: string) => string;
  title: string;
  local: number;
  cur: string;
  sc: { sales: number; service: number; product: number; ads: number; profit: number; epd: number; priceUsd: number };
}) {
  const rows = [
    [t("calc.sales"), sc.sales],
    [t("calc.service"), sc.service],
    [t("calc.product"), sc.product],
    [t("calc.ads"), sc.ads],
    [t("calc.profit"), sc.profit],
  ];
  return (
    <div className="card overflow-hidden">
      <div className="bg-[#152033] px-4 py-2 font-bold">
        {title} · {local} {cur} · {money(sc.priceUsd)}
      </div>
      <table className="w-full text-sm">
        <tbody>
          {rows.map(([k, v]) => (
            <tr key={String(k)} className="border-t border-line">
              <td className="px-4 py-2 text-mute">{k as string}</td>
              <td className="px-4 py-2 text-start font-semibold tabular-nums">{money(v as number)}</td>
            </tr>
          ))}
          <tr className="bg-[#1f8a4c]">
            <td className="px-4 py-3 font-extrabold">{t("calc.epd")}</td>
            <td className="px-4 py-3 font-extrabold text-xl">{money(sc.epd)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
