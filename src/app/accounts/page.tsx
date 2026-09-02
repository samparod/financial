"use client";

import { useState } from "react";
import { useCod } from "@/lib/store";
import { calcPl, opsTotal } from "@/lib/cod";
import { money } from "@/lib/format";
import { Btn, Num, PageHead } from "@/components/ui";
import { useT } from "@/lib/lang";
import type { PlProduct, Region } from "@/lib/types";

function fmt(n: number, ints = false) {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", {
    minimumFractionDigits: ints ? 0 : 2,
    maximumFractionDigits: ints ? 0 : 2,
  });
}

function CellInput({
  value,
  onChange,
  step = 1,
}: {
  value: number;
  onChange: (n: number) => void;
  step?: number;
}) {
  return (
    <input
      type="number"
      step={step}
      value={Number.isFinite(value) ? value : 0}
      onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
      className="w-full bg-[#0b1220] border border-line rounded px-1 py-1.5 text-center text-sm tabular-nums outline-none focus:border-gold"
    />
  );
}

function Calc({
  label,
  values,
  ints,
  className = "",
}: {
  label: string;
  values: number[];
  ints?: boolean;
  className?: string;
}) {
  const sum = values.reduce((a, b) => a + b, 0);
  return (
    <tr className={`border-t border-line ${className}`}>
      <td className="p-2 whitespace-nowrap font-medium">{label}</td>
      {values.map((v, i) => (
        <td key={i} className="p-2 text-center tabular-nums bg-[#14304a] text-[#9fd6ff]">
          {fmt(v, ints)}
        </td>
      ))}
      <td className="p-2 text-center tabular-nums bg-[#1a3a58] font-bold text-[#9fd6ff]">{fmt(sum, ints)}</td>
    </tr>
  );
}

export default function AccountsPage() {
  const { t } = useT();
  const [region, setRegion] = useState<Region>("gulf");
  const [showBreak, setShowBreak] = useState(true);
  const s = useCod();
  const fees = region === "gulf" ? s.settings.gulfFees : s.settings.algeriaFeesUsd;
  const rows = s.plProducts.filter((p) => p.region === region);
  const ops = s.operations.find((o) => o.region === region)!;
  const calcs = rows.map((p) => calcPl(p, fees));
  const ot = opsTotal(ops);
  const profitSum = calcs.reduce((a, c) => a + c.profit, 0);
  const ordersSum = rows.reduce((a, p) => a + p.orders, 0);
  const net = profitSum - ot;

  const set = (p: PlProduct, patch: Partial<PlProduct>) => s.setPl(p.id, patch);

  const inputRows = [
    { key: "productCost" as const, label: t("sheet.productCost"), step: 0.01 },
    { key: "leads" as const, label: t("sheet.lead") },
    { key: "orders" as const, label: t("sheet.order") },
    { key: "delivered" as const, label: t("sheet.delivered") },
    { key: "totalSales" as const, label: t("sheet.sales"), step: 0.01 },
  ];

  const spendRows = [
    { key: "adsSpend" as const, label: t("sheet.ads"), step: 0.01 },
    { key: "testSpend" as const, label: t("sheet.test"), step: 0.01 },
    { key: "adAccount" as const, label: t("sheet.adAccount"), step: 0.01 },
  ];

  const colW = Math.max(120, Math.min(160, 900 / Math.max(rows.length, 1)));

  return (
    <div className="lg:p-8">
      <PageHead
        kicker="PROFIT & LOST"
        title={t("sheet.title")}
        desc={t("sheet.desc")}
        extra={
          <div className="flex flex-wrap gap-2">
            <Btn tone={region === "gulf" ? "gold" : "ghost"} onClick={() => setRegion("gulf")}>
              {t("sheet.gulf")}
            </Btn>
            <Btn tone={region === "algeria" ? "gold" : "ghost"} onClick={() => setRegion("algeria")}>
              {t("sheet.algeria")}
            </Btn>
            <Btn tone="gold" onClick={() => s.addPl(region)}>
              {t("sheet.add")}
            </Btn>
          </div>
        }
      />

      <p className="text-xs text-mute mb-3">
        {t("sheet.formulaHint")} — <span className="text-gold font-mono">{t("sheet.formula")}</span>
      </p>

      <div className="overflow-x-auto card">
        <table className="w-full text-sm min-w-[720px]">
          <thead>
            <tr className="bg-[#1a365d] text-white">
              <th className="text-start p-3 w-48">{t("sheet.product")}</th>
              {rows.map((p) => (
                <th key={p.id} className="p-2" style={{ minWidth: colW }}>
                  <input
                    value={p.name}
                    onChange={(e) => set(p, { name: e.target.value })}
                    className="w-full bg-transparent text-center font-bold outline-none border-b border-white/20"
                  />
                </th>
              ))}
              <th className="p-3 text-gold min-w-[110px]">{t("sheet.total")}</th>
            </tr>
          </thead>
          <tbody>
            {inputRows.map((f) => (
              <tr key={f.key} className="border-t border-line">
                <td className="p-2 text-mute whitespace-nowrap">{f.label}</td>
                {rows.map((p) => (
                  <td key={p.id} className="p-1">
                    <CellInput
                      value={p[f.key] as number}
                      step={f.step ?? 1}
                      onChange={(n) => set(p, { [f.key]: n })}
                    />
                  </td>
                ))}
                <td className="p-2 text-center tabular-nums">
                  {fmt(
                    rows.reduce((a, p) => a + (p[f.key] as number), 0),
                    f.key !== "productCost" && f.key !== "totalSales"
                  )}
                </td>
              </tr>
            ))}

            <tr className="bg-[#152033]">
              <td className="p-2 font-bold" colSpan={rows.length + 2}>
                {t("sheet.gross")}
              </td>
            </tr>
            <Calc label={t("sheet.codCollected")} values={rows.map((p) => p.totalSales)} />

            <tr className="bg-[#152033]">
              <td className="p-2 font-bold" colSpan={rows.length + 2}>
                {t("sheet.cosHeader")}
                <button
                  type="button"
                  className="ms-3 text-[11px] font-normal text-gold"
                  onClick={() => setShowBreak(!showBreak)}
                >
                  {showBreak ? "▾" : "▸"} {t("sheet.formula")}
                </button>
              </td>
            </tr>

            {spendRows.map((f) => (
              <tr key={f.key} className="border-t border-line">
                <td className="p-2 text-mute whitespace-nowrap">{f.label}</td>
                {rows.map((p) => (
                  <td key={p.id} className="p-1">
                    <CellInput value={p[f.key] as number} step={0.01} onChange={(n) => set(p, { [f.key]: n })} />
                  </td>
                ))}
                <td className="p-2 text-center tabular-nums">
                  {fmt(rows.reduce((a, p) => a + (p[f.key] as number), 0))}
                </td>
              </tr>
            ))}

            <Calc label={t("sheet.productLine")} values={calcs.map((c) => c.product)} />

            {showBreak && (
              <>
                <Calc label={t("sheet.leadFee")} values={calcs.map((c) => c.cos.lead)} />
                <Calc label={t("sheet.confirmFee")} values={calcs.map((c) => c.cos.confirm)} />
                <Calc label={t("sheet.deliverFee")} values={calcs.map((c) => c.cos.delivered)} />
                <Calc label={t("sheet.extraFee")} values={calcs.map((c) => c.cos.extra)} />
                <Calc label={t("sheet.codFee")} values={calcs.map((c) => c.cos.cod)} />
              </>
            )}

            <Calc
              label={t("sheet.serviceCost")}
              values={calcs.map((c) => c.service)}
              className="font-bold"
            />

            <tr className="border-t border-line">
              <td className="p-2 text-mute">{t("sheet.bonus")}</td>
              {rows.map((p) => (
                <td key={p.id} className="p-1">
                  <CellInput value={p.bonus} step={0.01} onChange={(n) => set(p, { bonus: n })} />
                </td>
              ))}
              <td className="p-2 text-center">{fmt(rows.reduce((a, p) => a + p.bonus, 0))}</td>
            </tr>

            <Calc label={t("sheet.totalCos")} values={calcs.map((c) => c.totalCost)} className="font-bold" />

            <tr className="border-t border-line bg-[#0d2818]">
              <td className="p-2 font-bold">{t("sheet.profits")}</td>
              {calcs.map((c, i) => (
                <td key={rows[i].id} className={`p-2 text-center font-bold tabular-nums ${c.profit >= 0 ? "text-profit" : "text-danger"}`}>
                  {fmt(c.profit)}
                </td>
              ))}
              <td className={`p-2 text-center font-bold ${profitSum >= 0 ? "text-profit" : "text-danger"}`}>
                {fmt(profitSum)}
              </td>
            </tr>

            <tr className="bg-[#152033]">
              <td className="p-2 font-bold" colSpan={rows.length + 2}>
                {t("sheet.kpi")}
              </td>
            </tr>
            <Calc label={t("sheet.ads")} values={calcs.map((c) => c.adsPerOrder)} />
            <Calc label={t("sheet.test")} values={calcs.map((c) => c.testPerOrder)} />
            <Calc label={t("sheet.adAccount")} values={calcs.map((c) => c.adAccPerOrder)} />
            <Calc label={t("sheet.productLine")} values={calcs.map((c) => c.productPerOrder)} />
            <Calc label={t("sheet.serviceCost")} values={calcs.map((c) => c.servicePerOrder)} />
            <Calc label={t("sheet.epo")} values={calcs.map((c) => c.epo)} />
            <Calc label={t("sheet.epd")} values={calcs.map((c) => c.epd)} className="font-bold" />

            <tr>
              <td />
              {rows.map((p) => (
                <td key={p.id} className="p-2 text-center">
                  <button type="button" className="text-xs text-danger" onClick={() => s.removePl(p.id)}>
                    {t("sheet.delete")}
                  </button>
                </td>
              ))}
              <td className="p-2 text-center">
                <button type="button" className="text-xs text-gold font-bold" onClick={() => s.addPl(region)}>
                  {t("sheet.add")}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="grid lg:grid-cols-2 gap-4 mt-6">
        <div className="card p-5">
          <h2 className="font-bold mb-1 underline">{t("sheet.ops")}</h2>
          <div className="grid grid-cols-2 gap-3 mt-4">
            <Num label={t("sheet.salaries")} value={ops.salaries} onChange={(n) => s.setOps(region, { salaries: n })} />
            <Num label={t("sheet.vat")} value={ops.vatDuty} onChange={(n) => s.setOps(region, { vatDuty: n })} />
            <Num label={t("sheet.rent")} value={ops.rent} onChange={(n) => s.setOps(region, { rent: n })} />
            <Num label={t("sheet.utilities")} value={ops.utilities} onChange={(n) => s.setOps(region, { utilities: n })} />
            <Num label={t("sheet.mgmt")} value={ops.management} onChange={(n) => s.setOps(region, { management: n })} />
            <Num label={t("sheet.extra")} value={ops.extra} onChange={(n) => s.setOps(region, { extra: n })} />
          </div>
          <div className="mt-4 flex justify-between border-t border-line pt-3">
            <span>{t("sheet.opsTotal")}</span>
            <span className="font-bold">{money(ot)}</span>
          </div>
          <div className="flex justify-between text-sm mt-1">
            <span className="text-mute">{t("sheet.costPerOp")}</span>
            <span>{money(ordersSum ? ot / ordersSum : 0)}</span>
          </div>
        </div>
        <div className="card p-5">
          <h2 className="font-bold mb-3">{t("sheet.net")}</h2>
          <div className={`text-4xl font-extrabold tabular-nums ${net >= 0 ? "text-profit" : "text-danger"}`}>
            {money(net)}
          </div>
          <p className="text-sm text-mute mt-2">
            {t("sheet.profits")} {money(profitSum)} − {t("sheet.ops")} {money(ot)}
          </p>
          {region === "algeria" && (
            <p className="text-sm mt-3 text-gold font-bold">{money(net * s.settings.usdToDzd, "DZD", 0)}</p>
          )}
        </div>
      </div>
    </div>
  );
}
