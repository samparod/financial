"use client";

import { useEffect, useMemo, useState } from "react";
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
    currency: "USD" as Currency,
  });

  // Sync draft currency when region changes
  useEffect(() => {
    setDraft((prev) => ({
      ...prev,
      currency: region === "algeria" ? "DZD" : "USD",
    }));
  }, [region]);

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
        desc={t("cf.desc")}
        extra={
          <div className="flex gap-2">
            <Btn tone={region === "gulf" ? "gold" : "ghost"} onClick={() => setRegion("gulf")}>{t("sheet.gulf")}</Btn>
            <Btn tone={region === "algeria" ? "gold" : "ghost"} onClick={() => setRegion("algeria")}>{t("sheet.algeria")}</Btn>
          </div>
        }
      />

      <Explain id="cf.page" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <Kpi label={t("cf.in")} value={money(inflow)} tone="good" help="cf.in" />
        <Kpi label={t("cf.out")} value={money(outflow)} tone="bad" help="cf.out" />
        <Kpi label={t("cf.net")} value={money(net)} tone={net >= 0 ? "good" : "bad"} help="cf.net" />
        <Kpi label={t("cf.plGap")} value={money(plProfit - opsTotal(ops))} tone="gold" help="cf.plGap" />
      </div>
      {region === "algeria" && (
        <p className="text-sm text-mute mb-4">
          {t("cf.netDzd")} <b className="text-gold">{money(net * fx, "DZD", 0)}</b>
        </p>
      )}

      <div className="grid lg:grid-cols-3 gap-4 mb-6">
        <div className="card p-5">
          <h2 className="font-bold mb-3">{t("cf.newMove")}</h2>
          <div className="space-y-3">
            <TextField label={t("cf.label")} value={draft.label} onChange={(v) => setDraft({ ...draft, label: v })} help="cf.label" />
            <Num label={t("cf.amount")} value={draft.amount} onChange={(n) => setDraft({ ...draft, amount: n })} help="cf.amount" />
            <LabelHelp id="cf.date">
              <label className="block text-[11px] text-mute">
                {t("cf.th.date")}
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
                <option value="in">{t("common.in")}</option>
                <option value="out">{t("common.out")}</option>
              </select>
              <select
                className="sheet-input"
                value={draft.category}
                onChange={(e) => setDraft({ ...draft, category: e.target.value })}
              >
                <option value="cod">{t("cf.cat.cod")}</option>
                <option value="ads">{t("cf.cat.ads")}</option>
                <option value="product">{t("cf.cat.product")}</option>
                <option value="shipping">{t("cf.cat.shipping")}</option>
                <option value="ops">{t("cf.cat.ops")}</option>
                <option value="other">{t("cf.cat.other")}</option>
              </select>
            </div>
            <select
                className="sheet-input"
                value={draft.currency}
                onChange={(e) => setDraft({ ...draft, currency: e.target.value as Currency })}
              >
                <option value="USD">{t("cf.usd")}</option>
                <option value="DZD">{t("cf.dzd")}</option>
                <option value="SAR">{t("cf.sar")}</option>
              </select>
            <Btn
              tone="gold"
              onClick={() => {
                if (!draft.label || !draft.amount) return;
                s.addCash({ ...draft, region });
                setDraft({ ...draft, label: "", amount: 0 });
              }}
            >
              {t("cf.save")}
            </Btn>
          </div>
        </div>
        <div className="card p-5 lg:col-span-2">
          <h2 className="font-bold mb-3">{t("cf.byCat")}</h2>
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
            {t("cf.fixedOps", {
              ops: money(opsTotal(ops)),
              sal: money(ops.salaries),
              rent: money(ops.rent),
              mgmt: money(ops.management),
            })}
          </p>
        </div>
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-[#152033]">
            <tr>
              <th className="p-3 text-right">{t("cf.th.date")}</th>
              <th className="p-3 text-right">{t("cf.th.label")}</th>
              <th className="p-3">{t("cf.th.type")}</th>
              <th className="p-3">{t("cf.th.cat")}</th>
              <th className="p-3">{t("cf.th.amount")}</th>
              <th className="p-3">{t("cf.th.usd")}</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {[...rows].sort((a, b) => a.date.localeCompare(b.date)).map((c) => (
              <tr key={c.id} className="border-t border-line">
                <td className="p-3">{c.date}</td>
                <td className="p-3">{c.label}</td>
                <td className="p-3">
                  <Badge tone={c.type === "in" ? "good" : "bad"}>{c.type === "in" ? t("common.in") : t("common.out")}</Badge>
                </td>
                <td className="p-3 text-mute">{t(`cf.cat.${c.category}`)}</td>
                <td className="p-3">{money(c.amount, c.currency)}</td>
                <td className="p-3">{money(toUsd(c))}</td>
                <td className="p-3">
                  <button className="text-xs text-danger" onClick={() => s.removeCash(c.id)}>{t("common.delete")}</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
