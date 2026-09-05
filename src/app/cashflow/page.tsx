"use client";

import { useMemo, useState } from "react";
import { useCod } from "@/lib/store";
import { calcPl, opsTotal } from "@/lib/cod";
import { money } from "@/lib/format";
import { Badge, Btn, Kpi, Num, PageHead, TextField } from "@/components/ui";
import { Explain, LabelHelp } from "@/components/Explain";
import { useT } from "@/lib/lang";
import type { CashEntry, Currency, Region } from "@/lib/types";

const CAT_HELP: Record<string, string> = {
  cod: "cf.cod",
  ads: "cf.ads",
  product: "cf.product",
  shipping: "cf.shipping",
  ops: "cf.ops",
  other: "cf.other",
};

export default function CashflowPage() {
  const { t } = useT();
  const s = useCod();
  const [region, setRegion] = useState<Region>("gulf");
  const [draft, setDraft] = useState({
    date: new Date().toISOString().slice(0, 10),
    type: "out" as CashEntry["type"],
    category: "ads",
    label: "",
    amount: 0,
    currency: (region === "algeria" ? "DZD" : "USD") as Currency,
  });

  const rows = s.cash.filter((c) => c.region === region);
  const fx = s.settings.usdToDzd;
  const toUsd = (c: CashEntry) => (c.currency === "USD" ? c.amount : c.amount / fx);
  const inflow = rows.filter((c) => c.type === "in").reduce((a, c) => a + toUsd(c), 0);
  const outflow = rows.filter((c) => c.type === "out").reduce((a, c) => a + toUsd(c), 0);
  const net = inflow - outflow;
  const ops = s.operations.find((o) => o.region === region)!;
  const pl = s.plProducts.filter((p) => p.region === region);
  const fees = region === "gulf" ? s.settings.gulfFees : s.settings.algeriaFeesUsd;
  const plProfit = pl.reduce((a, p) => a + calcPl(p, fees).profit, 0);

  const byCat = useMemo(() => {
    const m: Record<string, number> = {};
    for (const c of rows) {
      const sign = c.type === "in" ? 1 : -1;
      m[c.category] = (m[c.category] || 0) + sign * toUsd(c);
    }
    return Object.entries(m);
  }, [rows, fx]);

  return (
    <div className="lg:p-8">
      <PageHead
        kicker="CASH FLOW"
        title={t("cf.title")}
        desc="الربح المحاسبي ليس الكاش. هنا دخول تحصيل COD وخروج الإعلانات، الشحن، الرواتب، وعلي بابا — بالدولار أو الدينار."
        extra={
          <div className="flex gap-2">
            <Btn tone={region === "gulf" ? "gold" : "ghost"} onClick={() => setRegion("gulf")}>الخليج</Btn>
            <Btn tone={region === "algeria" ? "gold" : "ghost"} onClick={() => setRegion("algeria")}>الجزائر</Btn>
          </div>
        }
      />

      <Explain id="cf.page" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <Kpi label="دخول" value={money(inflow)} tone="good" help="cf.in" />
        <Kpi label="خروج" value={money(outflow)} tone="bad" help="cf.out" />
        <Kpi label="صافي الكاش" value={money(net)} tone={net >= 0 ? "good" : "bad"} help="cf.net" />
        <Kpi label="ربح P&L − تشغيل" value={money(plProfit - opsTotal(ops))} tone="gold" help="cf.plGap" />
      </div>
      {region === "algeria" && (
        <p className="text-sm text-mute mb-4">
          صافي الكاش بالدينار التقريبي: <b className="text-gold">{money(net * fx, "DZD", 0)}</b>
        </p>
      )}

      <div className="grid lg:grid-cols-3 gap-4 mb-6">
        <div className="card p-5">
          <h2 className="font-bold mb-3">حركة جديدة</h2>
          <div className="space-y-3">
            <TextField label="البيان" value={draft.label} onChange={(v) => setDraft({ ...draft, label: v })} help="cf.label" />
            <Num label="المبلغ" value={draft.amount} onChange={(n) => setDraft({ ...draft, amount: n })} help="cf.amount" />
            <LabelHelp id="cf.date">
              <label className="block text-[11px] text-mute">
                التاريخ
                <input
                  type="date"
                  className="sheet-input mt-1"
                  value={draft.date}
                  onChange={(e) => setDraft({ ...draft, date: e.target.value })}
                />
              </label>
            </LabelHelp>
            <Explain id="cf.type" open={false} />
            <div className="grid grid-cols-2 gap-2">
              <select
                className="sheet-input"
                value={draft.type}
                onChange={(e) => setDraft({ ...draft, type: e.target.value as CashEntry["type"] })}
              >
                <option value="in">دخول</option>
                <option value="out">خروج</option>
              </select>
              <select
                className="sheet-input"
                value={draft.category}
                onChange={(e) => setDraft({ ...draft, category: e.target.value })}
              >
                <option value="cod">تحصيل COD</option>
                <option value="ads">إعلانات</option>
                <option value="product">بضاعة / علي بابا</option>
                <option value="shipping">شحن وتوصيل</option>
                <option value="ops">تشغيل ورواتب</option>
                <option value="other">أخرى</option>
              </select>
            </div>
            <select
                className="sheet-input"
                value={draft.currency}
                onChange={(e) => setDraft({ ...draft, currency: e.target.value as Currency })}
              >
                <option value="USD">دولار</option>
                <option value="DZD">دينار</option>
                <option value="SAR">ريال</option>
              </select>
            <Btn
              tone="gold"
              onClick={() => {
                if (!draft.label || !draft.amount) return;
                s.addCash({ ...draft, region });
                setDraft({ ...draft, label: "", amount: 0 });
              }}
            >
              تسجيل
            </Btn>
          </div>
        </div>
        <div className="card p-5 lg:col-span-2">
          <h2 className="font-bold mb-3">حسب التصنيف</h2>
          <Explain id="cf.byCat" open={false} />
          <div className="space-y-2">
            {byCat.map(([k, v]) => (
              <LabelHelp id={CAT_HELP[k] ?? "cf.other"} key={k}>
                <div className="flex justify-between text-sm border-b border-line py-2">
                  <span className="text-mute">{t(`cf.cat.${k}`)}</span>
                  <span className={v >= 0 ? "text-profit" : "text-danger"}>{money(v)}</span>
                </div>
              </LabelHelp>
            ))}
          </div>
          <p className="text-xs text-mute mt-4">
            تشغيل ثابت هذا الشهر: {money(opsTotal(ops))} — رواتب {money(ops.salaries)} · كراء {money(ops.rent)} · إدارة {money(ops.management)}
          </p>
        </div>
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-[#152033]">
            <tr>
              <th className="p-3 text-right">التاريخ</th>
              <th className="p-3 text-right">البيان</th>
              <th className="p-3">نوع</th>
              <th className="p-3">تصنيف</th>
              <th className="p-3">المبلغ</th>
              <th className="p-3">بالدولار</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {[...rows].sort((a, b) => a.date.localeCompare(b.date)).map((c) => (
              <tr key={c.id} className="border-t border-line">
                <td className="p-3">{c.date}</td>
                <td className="p-3">{c.label}</td>
                <td className="p-3">
                  <Badge tone={c.type === "in" ? "good" : "bad"}>{c.type === "in" ? "دخول" : "خروج"}</Badge>
                </td>
                <td className="p-3 text-mute">{c.category}</td>
                <td className="p-3">{money(c.amount, c.currency)}</td>
                <td className="p-3">{money(toUsd(c))}</td>
                <td className="p-3">
                  <button className="text-xs text-danger" onClick={() => s.removeCash(c.id)}>حذف</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
