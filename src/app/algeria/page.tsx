"use client";

import { useMemo } from "react";
import { useCod } from "@/lib/store";
import { calcGulfSim, calcPl, calcStability, opsTotal } from "@/lib/cod";
import { money, pct } from "@/lib/format";
import { Badge, Kpi, Num, PageHead } from "@/components/ui";
import { useT } from "@/lib/lang";

export default function AlgeriaPage() {
  const { t } = useT();
  const s = useCod();
  const fx = s.settings.usdToDzd;
  const fees = s.settings.algeriaFeesUsd;
  const rows = s.plProducts.filter((p) => p.region === "algeria");
  const ops = s.operations.find((o) => o.region === "algeria")!;
  const profitUsd = rows.reduce((a, p) => a + calcPl(p, fees).profit, 0);
  const netUsd = profitUsd - opsTotal(ops);
  const st = calcStability(s.stability.algeria);

  const sim = useMemo(
    () =>
      calcGulfSim({
        leads: 100,
        productCost: s.stability.algeria.productCost,
        confirmationRate: s.settings.algeriaConfirm,
        deliveredRate: s.settings.algeriaDelivered,
        cpl: s.stability.algeria.testCost * (1 + s.stability.algeria.costPct),
        aov: s.stability.algeria.sellingPriceLocal / fx,
        shippingPerConfirmed: s.settings.algeriaDeliveryDzd / fx,
        fees,
      }),
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
        extra={<Badge tone="gold">1 $ = {fx} د.ج</Badge>}
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <Kpi label="صافي الدولار" value={money(netUsd)} tone={netUsd > 0 ? "good" : "bad"} />
        <Kpi label="صافي الدينار" value={money(netUsd * fx, "DZD", 0)} tone="gold" />
        <Kpi label="تأكيد / توصيل" value={`${pct(s.settings.algeriaConfirm)} · ${pct(s.settings.algeriaDelivered)}`} />
        <Kpi label="EPD اختبار" value={money(st.oldP.epd)} tone={st.stable ? "good" : "warn"} hint={st.stable ? "Stability" : "تحت العتبة"} />
      </div>

      <div className="grid lg:grid-cols-3 gap-4 mb-6">
        <div className="card p-5">
          <h2 className="font-bold mb-3">مدخلات السوق الجزائري</h2>
          <div className="grid grid-cols-2 gap-3">
            <Num label="سعر الصرف د.ج / $" value={fx} onChange={(n) => s.patchSettings({ usdToDzd: n })} />
            <Num label="Confirmation" value={s.settings.algeriaConfirm} onChange={(n) => s.patchSettings({ algeriaConfirm: n })} step={0.01} />
            <Num label="Delivered" value={s.settings.algeriaDelivered} onChange={(n) => s.patchSettings({ algeriaDelivered: n })} step={0.01} />
            <Num label="توصيل د.ج" value={s.settings.algeriaDeliveryDzd} onChange={(n) => s.patchSettings({ algeriaDeliveryDzd: n })} />
            <Num label="مرتجع د.ج" value={s.settings.algeriaReturnDzd} onChange={(n) => s.patchSettings({ algeriaReturnDzd: n })} />
            <Num label="كول سنتر د.ج" value={s.settings.algeriaCallCenterDzd} onChange={(n) => s.patchSettings({ algeriaCallCenterDzd: n })} />
          </div>
        </div>
        <div className="card p-5 lg:col-span-2">
          <h2 className="font-bold mb-3">محاكاة 100 ليد — عمودين</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-mute">
                <th className="text-right p-2">البند</th>
                <th className="p-2">دولار</th>
                <th className="p-2">دينار</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["مبيعات COD", sim.sales],
                ["توصيل (محلي)", (s.settings.algeriaDeliveryDzd / fx) * sim.delivered],
                ["كول سنتر", sim.callCenter],
                ["COD fees", sim.cod],
                ["إعلانات", sim.ads],
                ["تكلفة المنتج", sim.productSold],
                ["ربح", sim.profit],
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
            EPD {money(sim.epd)} · بالدينار {money(sim.epd * fx, "DZD", 0)} لكل توصيلة ناجحة
          </p>
        </div>
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full text-sm min-w-[800px]">
          <thead className="bg-[#152033]">
            <tr>
              <th className="p-3 text-right">المنتج</th>
              <th className="p-3">مبيعات</th>
              <th className="p-3">ربح $</th>
              <th className="p-3">ربح د.ج</th>
              <th className="p-3">EPD</th>
              <th className="p-3">تأكيد</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((p) => {
              const c = calcPl(p, fees);
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
