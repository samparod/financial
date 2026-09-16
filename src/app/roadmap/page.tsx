"use client";

import { useMemo, useState } from "react";
import { useCod } from "@/lib/store";
import { stockPath } from "@/lib/cod";
import { cls } from "@/lib/format";
import { PageHead } from "@/components/ui";
import { Explain, Tip } from "@/components/Explain";
import { useT } from "@/lib/lang";

export default function RoadmapPage() {
  const { t, lang } = useT();
  const stock = useCod((s) => s.stock);
  const [id, setId] = useState(stock[0]?.id ?? "");
  const item = stock.find((x) => x.id === id) ?? stock[0];
  const path = item ? stockPath(item) : null;
  const today = new Date();
  // Keep the bar timeline at 2–3 rows whatever the horizon is.
  const barCols = !path ? 16 : path.horizon <= 32 ? 16 : path.horizon <= 60 ? 20 : 30;
  // One month is enough for a near stock-out; stretch to three when it is far.
  const monthCount = !path ? 1 : path.stockZeroDay > 28 ? 3 : 1;
  const months = useMemo(
    () =>
      Array.from({ length: monthCount }, (_, i) => {
        const first = new Date(today.getFullYear(), today.getMonth() + i, 1);
        return { first, cells: buildMonth(first.getFullYear(), first.getMonth()) };
      }),
    [monthCount]
  );

  if (!item || !path) {
    return (
      <div className="p-8">
        <p className="text-mute">{t("road.addFirst")}</p>
      </div>
    );
  }

  return (
    <div className="lg:p-8">
      <PageHead
        kicker="THE PATH"
        title={t("road.title")}
        desc={t("road.desc")}
        extra={
          <select
            value={item.id}
            onChange={(e) => setId(e.target.value)}
            className="sheet-input w-56"
          >
            {stock.map((x) => (
              <option key={x.id} value={x.id}>
                {x.name} · {x.qty}
              </option>
            ))}
          </select>
        }
      />

      <Explain id="road.page" />

      <div className="card p-5 mb-6">
        <Explain id="road.timeline" />
        <div className="flex justify-between text-sm text-mute mb-4">
          <span>{t("road.day1", { qty: item.qty })}</span>
          <span>{t("road.pcsDay", { n: item.dailySales })}</span>
          <span>{t("road.stock0", { n: path.stockZeroDay })}</span>
          <span>{t("road.daysEnd", { n: path.horizon })}</span>
        </div>
        <div className="relative pt-8 pb-10">
          <div className="absolute top-10 right-0 left-0 h-px bg-line" />
          <svg className="absolute top-2 right-0 left-0 h-16 w-full pointer-events-none" viewBox="0 0 100 40" preserveAspectRatio="none">
            <path
              d={`M 0 32 Q ${Math.min(95, (path.stockZeroDay / path.horizon) * 100) / 2} 4 ${Math.min(95, (path.stockZeroDay / path.horizon) * 100)} 32`}
              fill="none"
              stroke="#e85d5d"
              strokeWidth="1.2"
            />
          </svg>
          <div className="grid gap-1 relative" style={{ gridTemplateColumns: `repeat(${barCols}, minmax(0, 1fr))` }}>
            {path.days.map((d) => {
              const isZero = d.day === path.stockZeroDay;
              const isOrder = d.day === Math.max(1, path.orderByDay);
              const empty = d.remaining <= 0;
              return (
                <div key={d.day} className="text-center" title={d.event ? t(d.event) : undefined}>
                  <div
                    className={cls(
                      "h-10 rounded flex items-end justify-center text-[10px] font-bold",
                      empty ? "bg-danger/30 text-danger" : isZero ? "bg-danger text-white" : isOrder ? "bg-warn/80 text-black" : "bg-[#17324a] text-white"
                    )}
                    style={{ height: `${Math.max(12, (d.remaining / item.qty) * 56)}px` }}
                  />
                  <div className={cls("text-[10px] mt-1", isZero ? "text-danger font-bold" : "text-mute")}>{d.day}</div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex flex-wrap gap-4 text-xs">
          <Legend c="#17324a" t={t("road.legendRemain")} />
          <Legend c="#e8a317" t={t("road.legendOrder")} />
          <Legend c="#e85d5d" t={t("road.legendZero")} />
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <div className="card p-5">
          <h2 className="font-bold mb-3">
            {months.length > 1
              ? t("road.calMonths", { n: months.length })
              : t("road.cal", { month: monthName(months[0].first, lang) })}
          </h2>
          <Explain id="road.calendar" open={false} />
          {months.map((m, mi) => (
            <div key={mi} className={mi > 0 ? "mt-5" : undefined}>
              {months.length > 1 && (
                <div className="text-xs font-bold text-gold mb-2">{monthName(m.first, lang)}</div>
              )}
              <div className="grid grid-cols-7 gap-1 text-center text-[11px] text-mute mb-1">
                {["cal.sun", "cal.mon", "cal.tue", "cal.wed", "cal.thu", "cal.fri", "cal.sat"].map((d) => (
                  <div key={d}>{t(d)}</div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {m.cells.map((cell, i) => {
                  if (!cell) return <div key={i} />;
                  const offset = diffDays(startOfToday(), cell);
                  const remaining = Math.max(0, item.qty - item.dailySales * offset);
                  const isZero = offset + 1 === path.stockZeroDay;
                  const isOrder = offset + 1 === Math.max(1, path.orderByDay);
                  const isToday = offset === 0;
                  const isPast = offset < 0;
                  return (
                    <div
                      key={i}
                      className={cls(
                        "h-16 rounded-lg border p-1 text-right",
                        isToday && "border-gold",
                        isZero && "bg-danger/20 border-danger",
                        isOrder && !isZero && "bg-warn/20 border-warn",
                        (isPast || (remaining <= 0 && !isZero)) && "opacity-40"
                      )}
                    >
                      <div className="text-xs font-bold">{cell.getDate()}</div>
                      {!isPast && <div className="text-[10px] text-mute">{Math.round(remaining)}</div>}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <div className="card p-5">
          <h2 className="font-bold mb-3">{t("road.read")}</h2>
          <ol className="space-y-3 text-sm">
            <li>
              <b>{t("road.today1", { qty: item.qty, daily: item.dailySales })}</b>
            </li>
            <li>
              <b>{t("road.orderTitle")}</b>{" "}
              {path.orderByDay < 1 ? t("road.orderLate") : t("road.orderSafe", { n: path.orderByDay })}
              <Tip id="road.orderDay" />
            </li>
            <li>
              <b>{t("road.zeroTitle")}</b> {t("road.zeroBody", { n: path.stockZeroDay })}
              <Tip id="road.zero" />
            </li>
            <li>
              <b>{t("road.arriveTitle")}</b> {t("road.arriveBody", { n: item.leadTimeDays })}
              <Tip id="road.arrival" />
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}

function Legend({ c, t }: { c: string; t: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <i className="w-3 h-3 rounded-sm inline-block" style={{ background: c }} />
      {t}
    </span>
  );
}

function startOfToday() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

function diffDays(a: Date, b: Date) {
  return Math.round((b.getTime() - a.getTime()) / 86400000);
}

function buildMonth(year: number, month: number) {
  const first = new Date(year, month, 1);
  const pad = first.getDay();
  const days = new Date(year, month + 1, 0).getDate();
  const cells: Array<Date | null> = [];
  for (let i = 0; i < pad; i++) cells.push(null);
  for (let d = 1; d <= days; d++) cells.push(new Date(year, month, d));
  return cells;
}

function monthName(d: Date, lang: string) {
  const loc = lang === "ar" ? "ar-DZ" : lang === "fr" ? "fr-FR" : "en-US";
  return d.toLocaleDateString(loc, { month: "long", year: "numeric" });
}
