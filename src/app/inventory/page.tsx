"use client";

import { useState } from "react";
import { useCod } from "@/lib/store";
import { stockPath } from "@/lib/cod";
import { money } from "@/lib/format";
import { Badge, Btn, Num, PageHead, TextField } from "@/components/ui";
import { useT } from "@/lib/lang";
import type { Region } from "@/lib/types";

const ADVICE = {
  order_now: { ar: "اطلب مخزون الآن", tone: "bad" as const },
  plan: { ar: "خطّط للطلب هذا الأسبوع", tone: "warn" as const },
  ok: { ar: "المخزون يكفي", tone: "good" as const },
  overstock: { ar: "مخزون زائد — لا تطلب", tone: "gold" as const },
};

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

      <div className="space-y-4">
        {items.map((item) => {
          const p = stockPath(item);
          const a = ADVICE[p.advice];
          const pctLeft = Math.min(100, (item.qty / Math.max(p.needFor30, 1)) * 100);
          return (
            <div key={item.id} className="card p-5">
              <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-bold text-lg">{item.name}</h2>
                    <Badge tone={a.tone}>{a.ar}</Badge>
                    <Badge>{item.region === "gulf" ? "خليج" : "الجزائر"}</Badge>
                  </div>
                  <p className="text-xs text-mute mt-1">
                    {item.warehouse} · SKU {item.sku} · قيمة المخزون {money(item.qty * item.unitCostUsd)}
                  </p>
                </div>
                <button className="text-xs text-danger" onClick={() => s.removeStock(item.id)}>حذف</button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 mb-4">
                <TextField label="الاسم" value={item.name} onChange={(v) => s.setStock(item.id, { name: v })} />
                <TextField label="SKU" value={item.sku} onChange={(v) => s.setStock(item.id, { sku: v })} />
                <TextField label="المستودع" value={item.warehouse} onChange={(v) => s.setStock(item.id, { warehouse: v })} />
                <Num label="الكمية" value={item.qty} onChange={(n) => s.setStock(item.id, { qty: n })} />
                <Num label="مبيعات / يوم" value={item.dailySales} onChange={(n) => s.setStock(item.id, { dailySales: n })} step={0.5} />
                <Num label="مدة الاستيراد" value={item.leadTimeDays} onChange={(n) => s.setStock(item.id, { leadTimeDays: n })} />
                <Num label="أيام أمان" value={item.bufferDays} onChange={(n) => s.setStock(item.id, { bufferDays: n })} />
                <Num label="تكلفة القطعة $" value={item.unitCostUsd} onChange={(n) => s.setStock(item.id, { unitCostUsd: n })} step={0.1} />
              </div>

              <div className="h-2 rounded-full bg-line overflow-hidden mb-3">
                <div
                  className={`h-full ${p.advice === "order_now" ? "bg-danger" : p.advice === "plan" ? "bg-warn" : "bg-profit"}`}
                  style={{ width: `${Math.min(100, pctLeft)}%` }}
                />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                <Stat k="أيام حتى الصفر" v={`${p.daysLeft} يوم`} />
                <Stat k="يوم النفاد" v={`اليوم ${p.stockZeroDay}`} />
                <Stat k="احتياج 30 يوم" v={`${Math.ceil(p.needFor30)} قطعة`} />
                <Stat
                  k="آخر يوم للطلب"
                  v={p.orderByDay < 1 ? "فات الأوان — اطلب اليوم" : `اليوم ${p.orderByDay}`}
                />
              </div>
              <p className="text-xs text-mute mt-3">
                إذا طلبت اليوم، الشحنة تصل بعد {item.leadTimeDays} يوم. المخزون الحالي يكفي {p.daysLeft} يوم فقط.
                {p.daysLeft < item.leadTimeDays
                  ? " ستبقى أيام بلا بضاعة إن لم يكن عندك شحنة في الطريق."
                  : " لديك هامش قبل النفاد."}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div className="border border-line rounded-lg p-3">
      <div className="text-[11px] text-mute">{k}</div>
      <div className="font-bold mt-1">{v}</div>
    </div>
  );
}
