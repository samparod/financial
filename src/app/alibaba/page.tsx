"use client";

import { useState } from "react";
import { useCod } from "@/lib/store";
import { landedCost } from "@/lib/cod";
import { money } from "@/lib/format";
import { Badge, Btn, Num, PageHead, TextField } from "@/components/ui";
import { Explain, LabelHelp, Tip } from "@/components/Explain";
import { useT } from "@/lib/lang";
import type { Region, ShipmentStatus } from "@/lib/types";

const STATUS: ShipmentStatus[] = [
  "draft",
  "ordered",
  "production",
  "shipped",
  "customs",
  "arrived",
  "in_stock",
];

export default function AlibabaPage() {
  const { t } = useT();
  const s = useCod();
  const [region, setRegion] = useState<Region | "all">("all");
  const list = s.shipments.filter((x) => region === "all" || x.region === region);
  // Money already committed but not sellable yet: everything between the order
  // and the moment it lands in stock.
  const inTransit = list.filter((x) => x.status !== "draft" && x.status !== "in_stock");
  const inTransitUsd = inTransit.reduce((sum, x) => sum + landedCost(x).total, 0);
  const inTransitQty = inTransit.reduce((sum, x) => sum + x.qty, 0);

  return (
    <div className="lg:p-8">
      <PageHead
        kicker="ALIBABA IMPORT"
        title={t("ab.title")}
        desc={t("ab.desc")}
        extra={
          <div className="flex gap-2">
            <Btn tone={region === "all" ? "gold" : "ghost"} onClick={() => setRegion("all")}>{t("common.all")}</Btn>
            <Btn tone={region === "gulf" ? "gold" : "ghost"} onClick={() => setRegion("gulf")}>{t("sheet.gulf")}</Btn>
            <Btn tone={region === "algeria" ? "gold" : "ghost"} onClick={() => setRegion("algeria")}>{t("sheet.algeria")}</Btn>
            <Btn onClick={() => s.addShip(region === "algeria" ? "algeria" : "gulf")}>{t("common.addShip")}</Btn>
          </div>
        }
      />
      <Explain id="ab.page" />

      {inTransit.length > 0 && (
        <div className="card p-5 mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-[11px] text-mute">{t("ab.inTransit")}</div>
            <div className="text-2xl font-extrabold text-gold mt-1">{money(inTransitUsd)}</div>
          </div>
          <p className="text-xs text-mute">
            {t("ab.inTransitNote", { n: inTransit.length, qty: inTransitQty })}
          </p>
        </div>
      )}

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
                    {t("ab.toEta", { sup: ship.supplier, dest: ship.destination, eta: L.eta })}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge tone={ship.status === "in_stock" || ship.status === "arrived" ? "good" : "gold"}>
                    {t(`ab.st.${ship.status}`)}
                  </Badge>
                  <button className="text-xs text-danger" onClick={() => s.removeShip(ship.id)}>{t("common.delete")}</button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-4">
                <TextField label={t("ab.product")} value={ship.productName} onChange={(v) => s.setShip(ship.id, { productName: v })} help="ab.product" />
                <TextField label={t("ab.supplier")} value={ship.supplier} onChange={(v) => s.setShip(ship.id, { supplier: v })} help="ab.supplier" />
                <div className="flex items-end gap-1.5">
                  <div className="flex-1 min-w-0">
                    <TextField label={t("ab.url")} value={ship.alibabaUrl} onChange={(v) => s.setShip(ship.id, { alibabaUrl: v })} help="ab.url" />
                  </div>
                  {isOpenableUrl(ship.alibabaUrl) && (
                    <a
                      href={ship.alibabaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={t("ab.openUrl")}
                      className="shrink-0 border border-gold/40 bg-gold/15 text-gold rounded-lg px-2.5 py-2 text-xs leading-none"
                    >
                      ↗
                    </a>
                  )}
                </div>
                <TextField label={t("ab.dest")} value={ship.destination} onChange={(v) => s.setShip(ship.id, { destination: v })} help="ab.dest" />
                <LabelHelp id="ab.status">
                  <label className="block">
                    <div className="text-[11px] text-mute mb-1">{t("common.status")}</div>
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
                      {STATUS.map((id) => (
                        <option key={id} value={id}>{t(`ab.st.${id}`)}</option>
                      ))}
                    </select>
                  </label>
                </LabelHelp>
                <LabelHelp id="ab.orderDate">
                  <label className="block">
                    <div className="text-[11px] text-mute mb-1">{t("ab.orderDate")}</div>
                    <input
                      type="date"
                      className="sheet-input"
                      value={ship.orderDate}
                      onChange={(e) => s.setShip(ship.id, { orderDate: e.target.value })}
                    />
                  </label>
                </LabelHelp>
                <Num label={t("ab.china")} value={ship.chinaPrice} onChange={(n) => s.setShip(ship.id, { chinaPrice: n })} step={0.01} help="ab.china" />
                <Num label={t("ab.weight")} value={ship.weightKg} onChange={(n) => s.setShip(ship.id, { weightKg: n })} step={0.01} help="ab.weight" />
                <Num label={t("ab.sea")} value={ship.seaRatePerKg} onChange={(n) => s.setShip(ship.id, { seaRatePerKg: n })} help="ab.sea" />
                <Num label={t("ab.qty")} value={ship.qty} onChange={(n) => s.setShip(ship.id, { qty: n })} help="ab.qty" />
                <Num label={t("ab.customs")} value={ship.customsPct} onChange={(n) => s.setShip(ship.id, { customsPct: n })} step={0.01} help="ab.customs" />
                <Num label={t("ab.other")} value={ship.otherFees} onChange={(n) => s.setShip(ship.id, { otherFees: n })} help="ab.other" />
                <Num label={t("ab.prodDays")} value={ship.productionDays} onChange={(n) => s.setShip(ship.id, { productionDays: n })} help="ab.prodDays" />
                <Num label={t("ab.transit")} value={ship.transitDays} onChange={(n) => s.setShip(ship.id, { transitDays: n })} help="ab.transit" />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                <Mini k={t("ab.goods")} v={money(L.goods)} help="ab.goods" />
                <Mini k={t("ab.shipping")} v={money(L.shipping)} help="ab.shipping" />
                <Mini k={t("ab.customsMoney")} v={money(L.customs)} help="ab.customsMoney" />
                <Mini k={t("ab.total")} v={money(L.total)} help="ab.total" />
                <Mini
                  k={t("ab.perUnit")}
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

function isOpenableUrl(url: string) {
  return /^https?:\/\/\S+$/i.test(url.trim());
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
