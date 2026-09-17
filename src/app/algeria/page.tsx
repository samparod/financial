"use client";

import { useMemo, useState } from "react";
import { calcGulfSim, calcPl, plCollectedSales } from "@/lib/cod";
import { useCod } from "@/lib/store";
import { money, pct } from "@/lib/format";
import { Badge, Kpi, Num, PageHead } from "@/components/ui";
import { Explain, LabelHelp } from "@/components/Explain";
import { useT } from "@/lib/lang";

export default function AlgeriaPage() {
  const { t } = useT();
  const s = useCod();
  const fx = s.settings.usdToDzd;
  const fees = s.settings.algeriaFeesUsd;
  const plProducts = useCod((st) => st.plProducts);
  const dzPl = useMemo(() => plProducts.filter((p) => p.region === "algeria"), [plProducts]);

  const [leads, setLeads] = useState(1000);
  const [productCostDzd, setProductCostDzd] = useState(1000);
  const [cr, setCr] = useState(0.48);
  const [dr, setDr] = useState(0.42);
  const [cpl, setCpl] = useState(3);
  const [aovDzd, setAovDzd] = useState(6900);

  const deliveryDzd = s.settings.algeriaDeliveryDzd;
  const returnDzd = s.settings.algeriaReturnDzd;
  const callDzd = s.settings.algeriaCallCenterDzd;

  const shippingPerConfirmed = useMemo(
    () => (dr * deliveryDzd + (1 - dr) * returnDzd) / Math.max(fx, 1),
    [dr, deliveryDzd, returnDzd, fx]
  );

  const simFees = useMemo(
    () => ({
      ...fees,
      confirmFee: fees.confirmFee + callDzd / Math.max(fx, 1),
    }),
    [fees, callDzd, fx]
  );

  const r = useMemo(
    () =>
      calcGulfSim({
        leads,
        productCost: productCostDzd / Math.max(fx, 1),
        confirmationRate: cr,
        deliveredRate: dr,
        cpl,
        aov: aovDzd / Math.max(fx, 1),
        shippingPerConfirmed,
        fees: simFees,
      }),
    [leads, productCostDzd, cr, dr, cpl, aovDzd, fx, shippingPerConfirmed, simFees]
  );

  const dzdHint = (usd: number) => money(usd * fx, "DZD", 0);

  return (
    <div className="lg:p-8">
      <PageHead
        kicker="ALGERIA · USD + DZD"
        title={t("dz.title")}
        desc={t("sheet.formula")}
        extra={<Badge tone="gold">{t("dz.fxBadge", { fx })}</Badge>}
      />

      <Explain id="dz.page" />

      {dzPl.length > 0 && (
        <select
          className="sheet-input w-56 mb-4"
          defaultValue=""
          onChange={(e) => {
            const p = dzPl.find((x) => x.id === e.target.value);
            e.currentTarget.value = "";
            if (!p) return;
            setLeads(p.leads || 1000);
            setProductCostDzd(p.productCost || productCostDzd);
            if (p.leads > 0) setCr(Math.round((p.orders / p.leads) * 100) / 100);
            if (p.orders > 0) setDr(Math.round((p.delivered / p.orders) * 100) / 100);
            if (p.leads > 0 && p.adsSpend > 0) setCpl(Math.round((p.adsSpend / p.leads) * 100) / 100);
            const sales = plCollectedSales(p);
            if (p.delivered > 0 && sales > 0) setAovDzd(Math.round(sales / p.delivered));
          }}
        >
          <option value="">{t("calc.fromSheet")}</option>
          {dzPl.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      )}

      <div className="grid lg:grid-cols-3 gap-4 mb-6">
        <div className="card p-5 lg:col-span-1">
          <h2 className="font-bold mb-3">{t("dz.market")}</h2>
          <p className="text-xs text-mute mb-4">{t("dz.note")}</p>
          <div className="space-y-2 text-sm mb-4">
            <Line k={t("dz.confirmLbl")} v={pct(cr)} />
            <Line k={t("dz.deliveredLbl")} v={pct(dr)} />
            <Line
              k={t("dz.shipPerDzd")}
              v={money(dr * deliveryDzd + (1 - dr) * returnDzd, "DZD", 0)}
            />
            <Line k={t("dz.fx")} v={t("dz.fxBadge", { fx })} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Num label="Leads" value={leads} onChange={setLeads} help="gulf.leads" />
            <Num label={t("dz.productCostDzd")} value={productCostDzd} onChange={setProductCostDzd} step={1} help="dz.pcost" />
            <Num label="Confirmation" value={cr} onChange={setCr} step={0.01} help="gulf.cr" />
            <Num label="Delivered Rate" value={dr} onChange={setDr} step={0.01} help="gulf.dr" />
            <Num label="CPL / CPP $" value={cpl} onChange={setCpl} step={0.1} help="gulf.cpl" />
            <Num label={t("dz.sellPriceDzd")} value={aovDzd} onChange={setAovDzd} step={1} help="gulf.price" />
          </div>

          <div className="border-t border-line mt-5 pt-4">
            <p className="text-xs text-mute mb-3">{t("dz.marketFees")}</p>
            <div className="grid grid-cols-2 gap-3">
              <Num label={t("dz.fx")} value={fx} onChange={(n) => s.patchSettings({ usdToDzd: n })} help="dz.fx" />
              <Num label={t("dz.delivery")} value={deliveryDzd} onChange={(n) => s.patchSettings({ algeriaDeliveryDzd: n })} help="dz.delivery" />
              <Num label={t("dz.return")} value={returnDzd} onChange={(n) => s.patchSettings({ algeriaReturnDzd: n })} help="dz.return" />
              <Num label={t("dz.callCenter")} value={callDzd} onChange={(n) => s.patchSettings({ algeriaCallCenterDzd: n })} help="dz.callCenter" />
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-3 content-start">
          <Kpi label={t("gulf.confirmed")} value={String(Math.round(r.confirmed))} help="gulf.confirmed" />
          <Kpi label={t("gulf.delivered")} value={String(Math.round(r.delivered))} help="gulf.delivered" />
          <Kpi
            label={t("gulf.salesUsd")}
            value={money(r.sales)}
            tone="gold"
            hint={dzdHint(r.sales)}
            help="gulf.sales"
          />
          <Kpi label="EPD" value={money(r.epd)} tone={r.epd >= 10 ? "good" : r.epd > 0 ? "warn" : "bad"} hint={dzdHint(r.epd)} help="gulf.epd" />
          <Kpi label={t("gulf.shipping")} value={money(r.shipping)} hint={dzdHint(r.shipping)} help="gulf.shipping" />
          <Kpi label={t("gulf.callCenter")} value={money(r.callCenter)} hint={dzdHint(r.callCenter)} help="gulf.callCenter" />
          <Kpi label={t("gulf.cod")} value={money(r.cod)} hint={dzdHint(r.cod)} help="gulf.cod" />
          <Kpi label={t("gulf.ads")} value={money(r.ads)} help="gulf.ads" />
          <Kpi label={t("gulf.productSold")} value={money(r.productSold)} hint={dzdHint(r.productSold)} help="gulf.productSold" />
          <Kpi label={t("gulf.invest")} value={money(r.invest)} hint={dzdHint(r.invest)} help="gulf.invest" />
          <Kpi label={t("gulf.profit")} value={money(r.profit)} tone={r.profit > 0 ? "good" : "bad"} hint={dzdHint(r.profit)} help="gulf.profit" />
          <Kpi label="ROI" value={pct(r.roi)} tone={r.roi > 0.3 ? "good" : "warn"} hint={t("gulf.margin", { pct: pct(r.margin) })} help="gulf.roi" />
        </div>
      </div>

      {dzPl.length > 0 && (
        <div className="card overflow-x-auto">
          <h2 className="font-bold p-4 pb-2">
            <LabelHelp id="dz.sheetProducts">{t("dz.sheetProducts")}</LabelHelp>
          </h2>
          <table className="w-full text-sm min-w-[800px]">
            <thead className="bg-[#152033]">
              <tr>
                <th className="p-3 text-right">{t("dz.product")}</th>
                <th className="p-3">{t("dz.sales")}</th>
                <th className="p-3">{t("dz.profitUsd")}</th>
                <th className="p-3">{t("dz.profitDzd")}</th>
                <th className="p-3">EPD</th>
                <th className="p-3">{t("dz.confirm")}</th>
              </tr>
            </thead>
            <tbody>
              {dzPl.map((p) => {
                const c = calcPl(p, fees, fx, true);
                const salesLocal = plCollectedSales(p);
                return (
                  <tr key={p.id} className="border-t border-line">
                    <td className="p-3 font-semibold">{p.name}</td>
                    <td className="p-3">
                      <div className="font-bold tabular-nums">{money(salesLocal, "DZD", 0)}</div>
                      <div className="text-xs text-mute">{money(fx > 0 ? salesLocal / fx : 0)}</div>
                    </td>
                    <td className={`p-3 ${c.profit >= 0 ? "text-profit" : "text-danger"}`}>{money(c.profit)}</td>
                    <td className="p-3 text-gold">{money(c.profit * fx, "DZD", 0)}</td>
                    <td className="p-3 text-profit">{money(c.epd)}</td>
                    <td className="p-3">{pct(c.confirmRate)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
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
