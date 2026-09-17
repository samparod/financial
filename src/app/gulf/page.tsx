"use client";

import { useMemo, useState } from "react";
import { GULF_COUNTRIES, calcGulfSim } from "@/lib/cod";
import { useCod } from "@/lib/store";
import { money, pct } from "@/lib/format";
import { Badge, Kpi, Num, PageHead } from "@/components/ui";
import { Explain, LabelHelp } from "@/components/Explain";
import { useT } from "@/lib/lang";
import type { GulfCountry } from "@/lib/types";

export default function GulfPage() {
  const { t } = useT();
  const fees = useCod((s) => s.settings.gulfFees);
  const plProducts = useCod((s) => s.plProducts);
  const gulfPl = useMemo(() => plProducts.filter((p) => p.region === "gulf"), [plProducts]);
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
    <div className="lg:p-8">
      <PageHead kicker="GULF ACCOUNTS" title={t("gulf.title")} desc={t("sheet.formula")} />

      <Explain id="gulf.page" />

      {gulfPl.length > 0 && (
        <select
          className="sheet-input w-56 mb-4"
          defaultValue=""
          onChange={(e) => {
            const p = gulfPl.find((x) => x.id === e.target.value);
            e.currentTarget.value = "";
            if (!p) return;
            setLeads(p.leads || 1000);
            setProductCost(p.productCost || productCost);
            if (p.leads > 0) setCr(Math.round((p.orders / p.leads) * 100) / 100);
            if (p.orders > 0) setDr(Math.round((p.delivered / p.orders) * 100) / 100);
            if (p.leads > 0 && p.adsSpend > 0) setCpl(Math.round((p.adsSpend / p.leads) * 100) / 100);
            if (p.delivered > 0) setAovLocal(Math.round((p.totalSales / p.delivered) * profile.fxToUsd));
          }}
        >
          <option value="">{t("calc.fromSheet")}</option>
          {gulfPl.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      )}

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
            {t(`gulf.c.${c.id}`)}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-4 mb-6">
        <div className="card p-5 lg:col-span-1">
          <h2 className="font-bold mb-3">{t(`gulf.c.${profile.id}`)}</h2>
          <p className="text-xs text-mute mb-4">{t(`gulf.n.${profile.id}`)}</p>
          <div className="space-y-2 text-sm">
            <Line k={t("gulf.expectedDr")} v={`${Math.round(profile.deliveredMin * 100)}–${Math.round(profile.deliveredMax * 100)}%`} />
            <Line k={t("gulf.transit")} v={t("gulf.transitVal", { min: profile.transitMin, max: profile.transitMax })} />
            <Line k={t("gulf.shipPer")} v={money(profile.shippingPerConfirmed)} />
            <Line k={t("gulf.fxLine")} v={t("gulf.fxVal", { cur: profile.currency, n: (1 / profile.fxToUsd).toFixed(3) })} />
          </div>
          <div className="grid grid-cols-2 gap-3 mt-5">
            <Num label="Leads" value={leads} onChange={setLeads} help="gulf.leads" />
            <Num label={t("gulf.productCost")} value={productCost} onChange={setProductCost} step={0.1} help="gulf.productCost" />
            <Num label="Confirmation" value={cr} onChange={setCr} step={0.01} help="gulf.cr" />
            <Num label="Delivered Rate" value={dr} onChange={setDr} step={0.01} help="gulf.dr" />
            <Num label="CPL / CPP $" value={cpl} onChange={setCpl} step={0.1} help="gulf.cpl" />
            <Num label={t("gulf.sellPrice", { cur: profile.currency })} value={aovLocal} onChange={setAovLocal} help="gulf.price" />
          </div>
        </div>

        <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-3 content-start">
          <Kpi label={t("gulf.confirmed")} value={String(Math.round(r.confirmed))} help="gulf.confirmed" />
          <Kpi label={t("gulf.delivered")} value={String(Math.round(r.delivered))} help="gulf.delivered" />
          <Kpi label={t("gulf.salesUsd")} value={money(r.sales)} tone="gold" hint={`${money(r.sales * profile.fxToUsd, profile.currency, 0)}`} help="gulf.sales" />
          <Kpi label="EPD" value={money(r.epd)} tone={r.epd >= 10 ? "good" : r.epd > 0 ? "warn" : "bad"} help="gulf.epd" />
          <Kpi label={t("gulf.shipping")} value={money(r.shipping)} help="gulf.shipping" />
          <Kpi label={t("gulf.callCenter")} value={money(r.callCenter)} help="gulf.callCenter" />
          <Kpi label={t("gulf.cod")} value={money(r.cod)} help="gulf.cod" />
          <Kpi label={t("gulf.ads")} value={money(r.ads)} help="gulf.ads" />
          <Kpi label={t("gulf.productSold")} value={money(r.productSold)} help="gulf.productSold" />
          <Kpi label={t("gulf.invest")} value={money(r.invest)} help="gulf.invest" />
          <Kpi label={t("gulf.profit")} value={money(r.profit)} tone={r.profit > 0 ? "good" : "bad"} help="gulf.profit" />
          <Kpi label="ROI" value={pct(r.roi)} tone={r.roi > 0.3 ? "good" : "warn"} hint={t("gulf.margin", { pct: pct(r.margin) })} help="gulf.roi" />
        </div>
      </div>

      <div className="card p-5">
        <h2 className="font-bold mb-3">
          <LabelHelp id="gulf.compare">{t("gulf.compare")}</LabelHelp>
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-mute text-right">
                <th className="p-2">{t("gulf.country")}</th>
                <th className="p-2">{t("gulf.typicalDr")}</th>
                <th className="p-2">{t("gulf.delivered")}</th>
                <th className="p-2">{t("gulf.profit")}</th>
                <th className="p-2">EPD</th>
                <th className="p-2">{t("gulf.verdict")}</th>
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
                    <td className="p-2 font-semibold">{t(`gulf.c.${c.id}`)}</td>
                    <td className="p-2">{pct((c.deliveredMin + c.deliveredMax) / 2)}</td>
                    <td className="p-2">{Math.round(sim.delivered)}</td>
                    <td className={`p-2 ${sim.profit > 0 ? "text-profit" : "text-danger"}`}>{money(sim.profit)}</td>
                    <td className={`p-2 ${sim.epd > 0 ? "text-profit" : "text-danger"}`}>{money(sim.epd)}</td>
                    <td className="p-2">
                      <Badge tone={sim.epd >= 10 ? "good" : sim.profit > 0 ? "warn" : "bad"}>
                        {sim.epd >= 10 ? t("gulf.scale") : sim.profit > 0 ? t("gulf.careful") : t("gulf.no")}
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
