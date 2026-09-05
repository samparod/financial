"use client";

import { useState } from "react";
import { useCod } from "@/lib/store";
import { landedCost } from "@/lib/cod";
import { money } from "@/lib/format";
import { Badge, Btn, Num, PageHead, TextField } from "@/components/ui";
import { Explain, LabelHelp, Tip } from "@/components/Explain";
import { useT } from "@/lib/lang";
import type { Region, ShipmentStatus } from "@/lib/types";

const STATUS: { id: ShipmentStatus; ar: string }[] = [
  { id: "draft", ar: "مسودة" },
  { id: "ordered", ar: "تم الطلب" },
  { id: "production", ar: "إنتاج" },
  { id: "shipped", ar: "في الطريق" },
  { id: "customs", ar: "جمارك" },
  { id: "arrived", ar: "وصلت" },
  { id: "in_stock", ar: "في المخزن" },
];

export default function AlibabaPage() {
  const { t } = useT();
  const s = useCod();
  const [region, setRegion] = useState<Region | "all">("all");
  const list = s.shipments.filter((x) => region === "all" || x.region === region);

  return (
    <div className="lg:p-8">
      <PageHead
        kicker="ALIBABA IMPORT"
        title={t("ab.title")}
        desc="سعر الصين + الوزن × سعر الشحن (افتراضي 9$/كغ كما في الملف) + الجمارك + رسوم أخرى = التكلفة الواصلة للقطعة وموعد الوصول."
        extra={
          <div className="flex gap-2">
            <Btn tone={region === "all" ? "gold" : "ghost"} onClick={() => setRegion("all")}>الكل</Btn>
            <Btn tone={region === "gulf" ? "gold" : "ghost"} onClick={() => setRegion("gulf")}>الخليج</Btn>
            <Btn tone={region === "algeria" ? "gold" : "ghost"} onClick={() => setRegion("algeria")}>الجزائر</Btn>
            <Btn onClick={() => s.addShip(region === "algeria" ? "algeria" : "gulf")}>+ شحنة</Btn>
          </div>
        }
      />
      <Explain id="ab.page" />

      <div className="space-y-4">
        {list.map((ship) => {
          const L = landedCost(ship);
          const dzd = L.perUnit * s.settings.usdToDzd;
          return (
            <div key={ship.id} className="card p-5">
              <div className="flex flex-wrap justify-between gap-3 mb-4">
                <div>
                  <h2 className="font-bold text-lg">{ship.productName}</h2>
                  <p className="text-xs text-mute">
                    {ship.supplier} · إلى {ship.destination} · وصول متوقع {L.eta}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge tone={ship.status === "in_stock" || ship.status === "arrived" ? "good" : "gold"}>
                    {STATUS.find((x) => x.id === ship.status)?.ar}
                  </Badge>
                  <button className="text-xs text-danger" onClick={() => s.removeShip(ship.id)}>حذف</button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-4">
                <TextField label="المنتج" value={ship.productName} onChange={(v) => s.setShip(ship.id, { productName: v })} help="ab.product" />
                <TextField label="المورّد" value={ship.supplier} onChange={(v) => s.setShip(ship.id, { supplier: v })} help="ab.supplier" />
                <TextField label="رابط علي بابا" value={ship.alibabaUrl} onChange={(v) => s.setShip(ship.id, { alibabaUrl: v })} help="ab.url" />
                <TextField label="الوجهة" value={ship.destination} onChange={(v) => s.setShip(ship.id, { destination: v })} help="ab.dest" />
                <LabelHelp id="ab.status">
                  <label className="block">
                    <div className="text-[11px] text-mute mb-1">الحالة</div>
                    <select
                      className="sheet-input"
                      value={ship.status}
                      onChange={(e) => {
                        const next = e.target.value as ShipmentStatus;
                        if (next === "in_stock" && ship.status !== "in_stock") {
                          s.receiveShip(ship.id);
                        } else {
                          s.setShip(ship.id, { status: next });
                        }
                      }}
                    >
                      {STATUS.map((x) => (
                        <option key={x.id} value={x.id}>{x.ar}</option>
                      ))}
                    </select>
                  </label>
                </LabelHelp>
                <LabelHelp id="ab.orderDate">
                  <label className="block">
                    <div className="text-[11px] text-mute mb-1">تاريخ الطلب</div>
                    <input
                      type="date"
                      className="sheet-input"
                      value={ship.orderDate}
                      onChange={(e) => s.setShip(ship.id, { orderDate: e.target.value })}
                    />
                  </label>
                </LabelHelp>
                <Num label="سعر الصين $" value={ship.chinaPrice} onChange={(n) => s.setShip(ship.id, { chinaPrice: n })} step={0.01} help="ab.china" />
                <Num label="الوزن كغ / قطعة" value={ship.weightKg} onChange={(n) => s.setShip(ship.id, { weightKg: n })} step={0.01} help="ab.weight" />
                <Num label="$ / كغ شحن" value={ship.seaRatePerKg} onChange={(n) => s.setShip(ship.id, { seaRatePerKg: n })} help="ab.sea" />
                <Num label="الكمية" value={ship.qty} onChange={(n) => s.setShip(ship.id, { qty: n })} help="ab.qty" />
                <Num label="جمارك %" value={ship.customsPct} onChange={(n) => s.setShip(ship.id, { customsPct: n })} step={0.01} help="ab.customs" />
                <Num label="رسوم أخرى $" value={ship.otherFees} onChange={(n) => s.setShip(ship.id, { otherFees: n })} help="ab.other" />
                <Num label="أيام الإنتاج" value={ship.productionDays} onChange={(n) => s.setShip(ship.id, { productionDays: n })} help="ab.prodDays" />
                <Num label="أيام الشحن" value={ship.transitDays} onChange={(n) => s.setShip(ship.id, { transitDays: n })} help="ab.transit" />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                <Mini k="البضاعة" v={money(L.goods)} help="ab.goods" />
                <Mini k="الشحن" v={money(L.shipping)} help="ab.shipping" />
                <Mini k="الجمارك" v={money(L.customs)} help="ab.customsMoney" />
                <Mini k="الإجمالي" v={money(L.total)} help="ab.total" />
                <Mini
                  k="التكلفة الواصلة / قطعة"
                  v={`${money(L.perUnit)}${ship.region === "algeria" ? ` · ${money(dzd, "DZD", 0)}` : ""}`}
                  help="ab.perUnit"
                />
              </div>
              <Explain id="ab.perUnit" />
              <p className="text-xs text-mute mt-3">{ship.note}</p>
              {ship.status === "in_stock" && (
                <p className="text-xs text-profit mt-2">{t("ab.landedStock")}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Mini({ k, v, help }: { k: string; v: string; help?: string }) {
  return (
    <div className="border border-line rounded-lg p-3">
      <div className="text-[11px] text-mute">{k}</div>
      <div className="font-bold mt-1">{v}</div>
      {help && <Tip id={help} />}
    </div>
  );
}
