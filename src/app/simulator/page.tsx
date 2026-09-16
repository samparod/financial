"use client";

import { useState } from "react";
import { useCod } from "@/lib/store";
import { sellingPriceUsd } from "@/lib/cod";
import { money } from "@/lib/format";
import { Kpi, Num, PageHead } from "@/components/ui";
import { Explain } from "@/components/Explain";
import { useT } from "@/lib/lang";

export default function SimulatorPage() {
  const { t } = useT();
  const settings = useCod((s) => s.settings);
  const rules = settings.pricing;
  const [cost, setCost] = useState(5);
  const [weight, setWeight] = useState(0.2);
  const [rate, setRate] = useState(9);
  const [dr, setDr] = useState(0.55);
  const [cpl, setCpl] = useState(4);
  const [profit, setProfit] = useState(rules.targetProfitUsd);
  const [sarFx, setSarFx] = useState(3.75);
  const [dzdFx, setDzdFx] = useState(settings.usdToDzd);

  const landed = cost + weight * rate;
  const usd = sellingPriceUsd(landed, dr, cpl, profit, rules);
  const sar = usd * sarFx;
  const dzd = usd * dzdFx;
  const shipping = rules.shippingBaseUsd * (1 / Math.max(dr, 0.2));
  const ads = cpl * rules.adsPerDeliveredMultiple;
  const cod = usd * rules.codPercent;

  return (
    <div className="lg:p-8 max-w-4xl">
      <PageHead
        kicker="SELLING PRICE"
        title={t("sim.title")}
        desc={t("sim.desc")}
      />

      <Explain id="sim.page" />

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div className="card p-5 grid grid-cols-2 gap-3">
          <Num label={t("sim.china")} value={cost} onChange={setCost} step={0.1} help="sim.china" />
          <Num label={t("sim.weight")} value={weight} onChange={setWeight} step={0.01} help="sim.weight" />
          <Num label={t("sim.rate")} value={rate} onChange={setRate} help="sim.rate" />
          <Num label="Delivered Rate" value={dr} onChange={setDr} step={0.01} help="sim.dr" />
          <Num label="CPL $" value={cpl} onChange={setCpl} step={0.1} help="sim.cpl" />
          <Num label={t("sim.profit")} value={profit} onChange={setProfit} help="sim.profit" />
          <Num label="SAR / USD" value={sarFx} onChange={setSarFx} step={0.01} help="sim.sarFx" />
          <Num label="DZD / USD" value={dzdFx} onChange={setDzdFx} help="sim.dzdFx" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Kpi label={t("sim.landed")} value={money(landed)} help="sim.landed" />
          <Kpi label={t("sim.shippingCalc")} value={money(shipping)} help="sim.shippingCalc" />
          <Kpi label={t("sim.adsPerDel")} value={money(ads)} help="sim.adsPerDel" />
          <Kpi label={`COD ${Math.round(rules.codPercent * 100)}%`} value={money(cod)} help="sim.cod5" />
          <Kpi label={t("sim.priceUsd")} value={money(usd)} tone="gold" help="sim.priceUsd" />
          <Kpi label={t("sim.sar")} value={t("sim.sarVal", { n: Math.round(sar / 10) * 10 })} tone="good" help="sim.sar" />
          <Kpi label={t("sim.dzd")} value={money(dzd, "DZD", 0)} tone="good" help="sim.dzd" />
          <Kpi label={t("sim.margin")} value={`${(((usd - landed) / usd) * 100).toFixed(0)}%`} help="sim.margin" />
        </div>
      </div>
    </div>
  );
}
