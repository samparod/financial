"use client";

import { useState } from "react";
import { sellingPriceUsd } from "@/lib/cod";
import { money } from "@/lib/format";
import { Kpi, Num, PageHead } from "@/components/ui";
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
    <div className="p-6 lg:p-8 max-w-4xl">
      <PageHead
        kicker="SELLING PRICE"
        title={t("sim.title")}
        desc="من ورقة Selling Price: شحن = 11 ÷ نسبة التوصيل، إعلانات ≈ CPL×3، كول سنتر 3.5، ربح مستهدف، ثم +5% COD. الناتج بالدولار والريال والدينار."
      />

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div className="card p-5 grid grid-cols-2 gap-3">
          <Num label="سعر الصين $" value={cost} onChange={setCost} step={0.1} />
          <Num label="الوزن كغ" value={weight} onChange={setWeight} step={0.01} />
          <Num label="شحن $/كغ" value={rate} onChange={setRate} />
          <Num label="Delivered Rate" value={dr} onChange={setDr} step={0.01} />
          <Num label="CPL $" value={cpl} onChange={setCpl} step={0.1} />
          <Num label="ربح مستهدف $" value={profit} onChange={setProfit} />
          <Num label="SAR / USD" value={sarFx} onChange={setSarFx} step={0.01} />
          <Num label="DZD / USD" value={dzdFx} onChange={setDzdFx} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Kpi label="تكلفة واصلة" value={money(landed)} />
          <Kpi label="شحن محسوب" value={money(shipping)} />
          <Kpi label="إعلانات / مسلَّم" value={money(ads)} />
          <Kpi label="COD 5%" value={money(cod)} />
          <Kpi label="سعر البيع $" value={money(usd)} tone="gold" />
          <Kpi label="السعودية" value={`${Math.round(sar / 10) * 10} ر.س`} tone="good" />
          <Kpi label="الجزائر" value={money(dzd, "DZD", 0)} tone="good" />
          <Kpi label="هامش على الواصلة" value={`${(((usd - landed) / usd) * 100).toFixed(0)}%`} />
        </div>
      </div>
    </div>
  );
}
