"use client";

import { useMemo } from "react";
import { useCod } from "@/lib/store";
import { calcGulfSim, calcPl, calcStability, opsTotal } from "@/lib/cod";
import { money, pct } from "@/lib/format";
import { Badge, Kpi, Num, PageHead } from "@/components/ui";
import { Explain, LabelHelp } from "@/components/Explain";
import { useT } from "@/lib/lang";

export default function AlgeriaPage() {
  const { t } = useT();
  const s = useCod();
  const fx = s.settings.usdToDzd;
  const fees = s.settings.algeriaFeesUsd;
  const rows = s.plProducts.filter((p) => p.region === "algeria");
  const ops = s.operations.find((o) => o.region === "algeria")!;
  const profitUsd = rows.reduce((a, p) => a + calcPl(p, fees, s.settings.usdToDzd, true).profit, 0);
  const netUsd = profitUsd - opsTotal(ops);
  const st = calcStability(
    { ...s.stability.algeria, fxToUsd: fx },
    fees
  );

  const sim = useMemo(
    () => {
      const dr = s.settings.algeriaDelivered;
      // Weighted shipping per confirmed:
      //   delivered orders pay algeriaDeliveryDzd
      //   returned (confirmed but not delivered) pay algeriaReturnDzd
      const shippingPerConfirmed =
        (dr * s.settings.algeriaDeliveryDzd +
          (1 - dr) * s.settings.algeriaReturnDzd) /
        fx;
      // Add local call-centre DZD cost on top of platform fees (USD)
      const simFees = {
        ...fees,
        confirmFee: fees.confirmFee + s.settings.algeriaCallCenterDzd / fx,
      };
      return calcGulfSim({
        leads: 100,
        productCost: s.stability.algeria.productCost,
        confirmationRate: s.settings.algeriaConfirm,
        deliveredRate: dr,
        cpl: s.stability.algeria.testCost * (1 + s.stability.algeria.costPct),
        aov: s.stability.algeria.sellingPriceLocal / fx,
        shippingPerConfirmed,
        fees: simFees,
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [s.stability.algeria, s.settings, fees, fx]
  );

  const dual = (usd: number) => (
    <div>
      <div className="font-bold tabular-nums">{money(usd)}</div>
      <div className="text-xs text-gold">{money(usd * fx, "DZD", 0)}</div>
    </div>
  );

  return (
    <div className="lg:p-8">
      <PageHead
        kicker="ALGERIA · USD + DZD"
        title={t("dz.title")}
        desc={t("sheet.formula")}
        extra={<Badge tone="gold">{t("dz.fxBadge", { fx })}</Badge>}
      />

      <Explain id="dz.page" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <Kpi label={t("dz.netUsd")} value={money(netUsd)} tone={netUsd > 0 ? "good" : "bad"} help="dz.netUsd" />
        <Kpi label={t("dz.netDzd")} value={money(netUsd * fx, "DZD", 0)} tone="gold" help="dz.netDzd" />
        <Kpi label={t("dz.confirmDeliver")} value={`${pct(s.settings.algeriaConfirm)} · ${pct(s.settings.algeriaDelivered)}`} help="dz.confirmDeliver" />
        <Kpi label={t("dz.epdTest")} value={money(st.oldP.epd)} tone={st.stable ? "good" : "warn"} hint={st.stable ? t("calc.stable") : t("dz.below")} help="dz.epd" />
      </div>

      <div className="grid lg:grid-cols-3 gap-4 mb-6">
        <div className="card p-5">
          <h2 className="font-bold mb-3">{t("dz.market")}</h2>
          <div className="grid grid-cols-2 gap-3">
            <Num label={t("dz.fx")} value={fx} onChange={(n) => s.patchSettings({ usdToDzd: n })} help="dz.fx" />
            <Num label={t("dz.confirmLbl")} value={s.settings.algeriaConfirm} onChange={(n) => s.patchSettings({ algeriaConfirm: n })} step={0.01} help="dz.confirm" />
            <Num label={t("dz.deliveredLbl")} value={s.settings.algeriaDelivered} onChange={(n) => s.patchSettings({ algeriaDelivered: n })} step={0.01} help="dz.delivered" />
            <Num label={t("dz.delivery")} value={s.settings.algeriaDeliveryDzd} onChange={(n) => s.patchSettings({ algeriaDeliveryDzd: n })} help="dz.delivery" />
            <Num label={t("dz.return")} value={s.settings.algeriaReturnDzd} onChange={(n) => s.patchSettings({ algeriaReturnDzd: n })} help="dz.return" />
            <Num label={t("dz.callCenter")} value={s.settings.algeriaCallCenterDzd} onChange={(n) => s.patchSettings({ algeriaCallCenterDzd: n })} help="dz.callCenter" />
          </div>
        </div>
        <div className="card p-5 lg:col-span-2">
          <h2 className="font-bold mb-3">
            <LabelHelp id="dz.sim100">{t("dz.sim100")}</LabelHelp>
          </h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-mute">
                <th className="text-right p-2">{t("dz.item")}</th>
                <th className="p-2">{t("dz.usd")}</th>
                <th className="p-2">{t("dz.dzd")}</th>
              </tr>
            </thead>
            <tbody>
              {[
                [t("dz.codSales"), sim.sales],
                [t("dz.localShip"), sim.shipping],
                [t("dz.cc"), sim.callCenter],
                [t("dz.codFee"), sim.cod],
                [t("dz.ads"), sim.ads],
                [t("dz.pcost"), sim.productSold],
                [t("dz.profit"), sim.profit],
              ].map(([k, usd]) => (
                <tr key={String(k)} className="border-t border-line">
                  <td className="p-2">{k as string}</td>
                  <td className="p-2">{money(usd as number)}</td>
                  <td className="p-2 text-gold">{money((usd as number) * fx, "DZD", 0)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-xs text-mute mt-3">
            {t("dz.epdLine", { usd: money(sim.epd), dzd: money(sim.epd * fx, "DZD", 0) })}
          </p>
        </div>
      </div>

      <div className="card overflow-x-auto">
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
            {rows.map((p) => {
              const c = calcPl(p, fees, s.settings.usdToDzd, true);
              return (
                <tr key={p.id} className="border-t border-line">
                  <td className="p-3 font-semibold">{p.name}</td>
                  <td className="p-3">{dual(p.totalSales)}</td>
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
    </div>
  );
}
