"use client";

import { useState } from "react";
import { sellingPriceUsd } from "@/lib/cod";
import { money } from "@/lib/format";
import { Kpi, Num, PageHead } from "@/components/ui";
import { Explain } from "@/components/Explain";
import { useT } from "@/lib/lang";

export default function SimulatorPage() {
  const { t } = useT();
  const [cost, setCost] = useState(5);
  const [weight, setWeight] = useState(0.2);
  const [rate, setRate] = useState(9);
  const [dr, setDr] = useState(0.55);
  const [cpl, setCpl] = useState(4);
  const [profit, setProfit] = useState(20);
  const [sarFx, setSarFx] = useState(3.75);
  const [dzdFx, setDzdFx] = useState(245);

  const landed = cost + weight * rate;
  const usd = sellingPriceUsd(landed, dr, cpl, profit);
  const sar = usd * sarFx;
  const dzd = usd * dzdFx;
  const shipping = 11 * (1 / Math.max(dr, 0.2));
  const ads = cpl * 3;
  const cod = usd * 0.05;

  return (
    <div className="lg:p-8 max-w-4xl">
      <PageHead
        kicker="SELLING PRICE"
        title={t("sim.title")}
        desc="من ورقة Selling Price: شحن = 11 ÷ نسبة التوصيل، إعلانات ≈ CPL×3، كول سنتر 3.5، ربح مستهدف، ثم +5% COD. الناتج بالدولار والريال والدينار."
      />

      <Explain id="sim.page" />

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div className="card p-5 grid grid-cols-2 gap-3">
          <Num label="سعر الصين $" value={cost} onChange={setCost} step={0.1} help="sim.china" />
          <Num label="الوزن كغ" value={weight} onChange={setWeight} step={0.01} help="sim.weight" />
          <Num label="شحن $/كغ" value={rate} onChange={setRate} help="sim.rate" />
          <Num label="Delivered Rate" value={dr} onChange={setDr} step={0.01} help="sim.dr" />
          <Num label="CPL $" value={cpl} onChange={setCpl} step={0.1} help="sim.cpl" />
          <Num label="ربح مستهدف $" value={profit} onChange={setProfit} help="sim.profit" />
          <Num label="SAR / USD" value={sarFx} onChange={setSarFx} step={0.01} help="sim.sarFx" />
          <Num label="DZD / USD" value={dzdFx} onChange={setDzdFx} help="sim.dzdFx" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Kpi label="تكلفة واصلة" value={money(landed)} help="sim.landed" />
          <Kpi label="شحن محسوب" value={money(shipping)} help="sim.shippingCalc" />
          <Kpi label="إعلانات / مسلَّم" value={money(ads)} help="sim.adsPerDel" />
          <Kpi label="COD 5%" value={money(cod)} help="sim.cod5" />
          <Kpi label="سعر البيع $" value={money(usd)} tone="gold" help="sim.priceUsd" />
          <Kpi label="السعودية" value={`${Math.round(sar / 10) * 10} ر.س`} tone="good" help="sim.sar" />
          <Kpi label="الجزائر" value={money(dzd, "DZD", 0)} tone="good" help="sim.dzd" />
          <Kpi label="هامش على الواصلة" value={`${(((usd - landed) / usd) * 100).toFixed(0)}%`} help="sim.margin" />
        </div>
      </div>
    </div>
  );
}
