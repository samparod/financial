"use client";

import { useMemo, useState } from "react";
import { GULF_COUNTRIES, calcGulfSim } from "@/lib/cod";
import { useCod } from "@/lib/store";
import { money, pct } from "@/lib/format";
import { Badge, Kpi, Num, PageHead } from "@/components/ui";
import { useT } from "@/lib/lang";
import type { GulfCountry } from "@/lib/types";

export default function GulfPage() {
  const { t } = useT();
  const fees = useCod((s) => s.settings.gulfFees);
  const [country, setCountry] = useState<GulfCountry>("KSA");
  const profile = GULF_COUNTRIES.find((c) => c.id === country)!;
  const [leads, setLeads] = useState(1000);
  const [productCost, setProductCost] = useState(7);
  const [cr, setCr] = useState(0.6);
  const [dr, setDr] = useState(0.55);
  const [cpl, setCpl] = useState(3);
  const [aovLocal, setAovLocal] = useState(199);

  const aovUsd = aovLocal / profile.fxToUsd;
  const r = useMemo(
    () =>
      calcGulfSim({
        leads,
        productCost,
        confirmationRate: cr,
        deliveredRate: dr,
        cpl,
        aov: aovUsd,
        shippingPerConfirmed: profile.shippingPerConfirmed,
        fees,
      }),
    [leads, productCost, cr, dr, cpl, aovUsd, profile.shippingPerConfirmed, fees]
  );

  return (
    <div className="p-6 lg:p-8">
      <PageHead kicker="GULF ACCOUNTS" title={t("gulf.title")} desc={t("sheet.formula")} />

      <div className="flex flex-wrap gap-2 mb-6">
        {GULF_COUNTRIES.map((c) => (
          <button
            key={c.id}
            onClick={() => {
              setCountry(c.id);
              setDr((c.deliveredMin + c.deliveredMax) / 2);
            }}
            className={`px-3 py-1.5 rounded-lg border text-sm ${
              country === c.id ? "border-gold bg-gold/15 text-gold" : "border-line text-mute"
            }`}
          >
            {c.nameAr}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-4 mb-6">
        <div className="card p-5 lg:col-span-1">
          <h2 className="font-bold mb-3">{profile.nameAr}</h2>
          <p className="text-xs text-mute mb-4">{profile.note}</p>
          <div className="space-y-2 text-sm">
            <Line k="نسبة التوصيل المتوقعة" v={`${Math.round(profile.deliveredMin * 100)}–${Math.round(profile.deliveredMax * 100)}%`} />
            <Line k="مدة التوصيل" v={`${profile.transitMin}–${profile.transitMax} أيام`} />
            <Line k="شحن لكل مؤكَّد" v={money(profile.shippingPerConfirmed)} />
            <Line k="سعر الصرف إلى الدولار" v={`1 ${profile.currency} = ${(1 / profile.fxToUsd).toFixed(3)} $`} />
          </div>
          <div className="grid grid-cols-2 gap-3 mt-5">
            <Num label="Leads" value={leads} onChange={setLeads} />
            <Num label="تكلفة المنتج $" value={productCost} onChange={setProductCost} step={0.1} />
            <Num label="Confirmation" value={cr} onChange={setCr} step={0.01} />
            <Num label="Delivered Rate" value={dr} onChange={setDr} step={0.01} />
            <Num label="CPL / CPP $" value={cpl} onChange={setCpl} step={0.1} />
            <Num label={`سعر البيع ${profile.currency}`} value={aovLocal} onChange={setAovLocal} />
          </div>
        </div>

        <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-3 content-start">
          <Kpi label="مؤكَّد" value={String(Math.round(r.confirmed))} />
          <Kpi label="مسلَّم" value={String(Math.round(r.delivered))} />
          <Kpi label="المبيعات USD" value={money(r.sales)} tone="gold" hint={`${money(r.sales * profile.fxToUsd, profile.currency, 0)}`} />
          <Kpi label="EPD" value={money(r.epd)} tone={r.epd >= 10 ? "good" : r.epd > 0 ? "warn" : "bad"} />
          <Kpi label="الشحن" value={money(r.shipping)} />
          <Kpi label="كول سنتر + إضافي" value={money(r.callCenter)} />
          <Kpi label="رسوم COD 5%" value={money(r.cod)} />
          <Kpi label="إعلانات" value={money(r.ads)} />
          <Kpi label="تكلفة البضاعة" value={money(r.productSold)} />
          <Kpi label="الاستثمار" value={money(r.invest)} />
          <Kpi label="الربح" value={money(r.profit)} tone={r.profit > 0 ? "good" : "bad"} />
          <Kpi label="ROI" value={pct(r.roi)} tone={r.roi > 0.3 ? "good" : "warn"} hint={`هامش ${pct(r.margin)}`} />
        </div>
      </div>

      <div className="card p-5">
        <h2 className="font-bold mb-3">مقارنة الدول بنفس المدخلات</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-mute text-right">
                <th className="p-2">الدولة</th>
                <th className="p-2">توصيل نموذجي</th>
                <th className="p-2">مسلَّم</th>
                <th className="p-2">ربح</th>
                <th className="p-2">EPD</th>
                <th className="p-2">الحكم</th>
              </tr>
            </thead>
            <tbody>
              {GULF_COUNTRIES.map((c) => {
                const sim = calcGulfSim({
                  leads,
                  productCost,
                  confirmationRate: cr,
                  deliveredRate: (c.deliveredMin + c.deliveredMax) / 2,
                  cpl,
                  aov: aovLocal / c.fxToUsd,
                  shippingPerConfirmed: c.shippingPerConfirmed,
                  fees,
                });
                return (
                  <tr key={c.id} className="border-t border-line">
                    <td className="p-2 font-semibold">{c.nameAr}</td>
                    <td className="p-2">{pct((c.deliveredMin + c.deliveredMax) / 2)}</td>
                    <td className="p-2">{Math.round(sim.delivered)}</td>
                    <td className={`p-2 ${sim.profit > 0 ? "text-profit" : "text-danger"}`}>{money(sim.profit)}</td>
                    <td className="p-2 text-profit">{money(sim.epd)}</td>
                    <td className="p-2">
                      <Badge tone={sim.epd >= 10 ? "good" : sim.profit > 0 ? "warn" : "bad"}>
                        {sim.epd >= 10 ? "قابل للتوسع" : sim.profit > 0 ? "اختبر بحذر" : "لا"}
                      </Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Line({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-mute">{k}</span>
      <span>{v}</span>
    </div>
  );
}
