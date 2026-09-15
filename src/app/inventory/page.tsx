"use client";

import { useState } from "react";
import { useCod } from "@/lib/store";
import { stockPath } from "@/lib/cod";
import { money } from "@/lib/format";
import { Badge, Btn, Num, PageHead, TextField } from "@/components/ui";
import { Explain, Tip } from "@/components/Explain";
import { useT } from "@/lib/lang";
import type { Region } from "@/lib/types";

export default function InventoryPage() {
  const { t } = useT();
  const [region, setRegion] = useState<Region | "all">("all");
  const s = useCod();
  const items = s.stock.filter((x) => region === "all" || x.region === region);

  return (
    <div className="lg:p-8">
      <PageHead
        kicker="INVENTORY"
        title={t("inv.title")}
        extra={
          <div className="flex gap-2">
            <Btn tone={region === "all" ? "gold" : "ghost"} onClick={() => setRegion("all")}>{t("inv.all")}</Btn>
            <Btn tone={region === "gulf" ? "gold" : "ghost"} onClick={() => setRegion("gulf")}>{t("sheet.gulf")}</Btn>
            <Btn tone={region === "algeria" ? "gold" : "ghost"} onClick={() => setRegion("algeria")}>{t("sheet.algeria")}</Btn>
            <Btn onClick={() => s.addStock(region === "algeria" ? "algeria" : "gulf")}>{t("inv.add")}</Btn>
          </div>
        }
      />

      <Explain id="inv.page" />

      <div className="space-y-4">
        {items.map((item) => {
          const p = stockPath(item);
          const tones = { order_now: "bad", plan: "warn", ok: "good", overstock: "gold" } as const;
          const pctLeft = Math.min(100, (item.qty / Math.max(p.needFor30, 1)) * 100);
          return (
            <div key={item.id} className="card p-5">
              <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-bold text-lg">{item.name}</h2>
                    <Badge tone={tones[p.advice]}>{t(`inv.advice.${p.advice}`)}</Badge>
                    <Badge>{item.region === "gulf" ? t("inv.gulfShort") : t("sheet.algeria")}</Badge>
                  </div>
                  <Tip id="inv.advice" />
                  <p className="text-xs text-mute mt-1">
                    {t("inv.meta", { wh: item.warehouse, sku: item.sku, val: money(item.qty * item.unitCostUsd) })}
                  </p>
                </div>
                <button className="text-xs text-danger" onClick={() => s.removeStock(item.id)}>{t("common.delete")}</button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 mb-4">
                <TextField label={t("inv.name")} value={item.name} onChange={(v) => s.setStock(item.id, { name: v })} help="inv.name" />
                <TextField label={t("inv.sku")} value={item.sku} onChange={(v) => s.setStock(item.id, { sku: v })} help="inv.sku" />
                <TextField label={t("inv.warehouse")} value={item.warehouse} onChange={(v) => s.setStock(item.id, { warehouse: v })} help="inv.warehouse" />
                <Num label={t("inv.qty")} value={item.qty} onChange={(n) => s.setStock(item.id, { qty: n })} help="inv.qty" />
                <Num label={t("inv.daily")} value={item.dailySales} onChange={(n) => s.setStock(item.id, { dailySales: n })} step={0.5} help="inv.daily" />
                <Num label={t("inv.lead")} value={item.leadTimeDays} onChange={(n) => s.setStock(item.id, { leadTimeDays: n })} help="inv.lead" />
                <Num label={t("inv.buffer")} value={item.bufferDays} onChange={(n) => s.setStock(item.id, { bufferDays: n })} help="inv.buffer" />
                <Num label={t("inv.unitCost")} value={item.unitCostUsd} onChange={(n) => s.setStock(item.id, { unitCostUsd: n })} step={0.1} help="inv.unitCost" />
              </div>

              <div className="h-2 rounded-full bg-line overflow-hidden mb-3">
                <div
                  className={`h-full ${p.advice === "order_now" ? "bg-danger" : p.advice === "plan" ? "bg-warn" : "bg-profit"}`}
                  style={{ width: `${Math.min(100, pctLeft)}%` }}
                />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                <Stat k={t("inv.daysLeft")} v={t("inv.daysLeftVal", { n: p.daysLeft })} help="inv.daysLeft" />
                <Stat k={t("inv.zeroDay")} v={t("inv.dayN", { n: p.stockZeroDay })} help="inv.zeroDay" />
                <Stat k={t("inv.need30")} v={t("inv.need30Val", { n: Math.ceil(p.needFor30) })} help="inv.need30" />
                <Stat
                  k={t("inv.orderBy")}
                  v={p.orderByDay < 1 ? t("inv.tooLate") : t("inv.dayN", { n: p.orderByDay })}
                  help="inv.orderBy"
                />
              </div>
              <p className="text-xs text-mute mt-3">
                {t("inv.ifOrder", { lead: item.leadTimeDays, left: p.daysLeft })}
                {p.daysLeft < item.leadTimeDays ? t("inv.willGap") : t("inv.haveMargin")}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Stat({ k, v, help }: { k: string; v: string; help: string }) {
  return (
    <div className="border border-line rounded-lg p-3">
      <div className="text-[11px] text-mute">{k}</div>
      <div className="font-bold mt-1">{v}</div>
      <Tip id={help} />
    </div>
  );
}
