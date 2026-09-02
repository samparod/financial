"use client";

import { useMemo, useState } from "react";
import { useCod } from "@/lib/store";
import { stockPath } from "@/lib/cod";
import { cls } from "@/lib/format";
import { PageHead } from "@/components/ui";
import { useT } from "@/lib/lang";

export default function RoadmapPage() {
  const { t } = useT();
  const stock = useCod((s) => s.stock);
  const [id, setId] = useState(stock[0]?.id ?? "");
  const item = stock.find((x) => x.id === id) ?? stock[0];
  const path = item ? stockPath(item) : null;
  const today = new Date();
  const calendar = useMemo(() => buildMonth(today.getFullYear(), today.getMonth()), []);

  if (!item || !path) {
    return (
      <div className="p-8">
        <p className="text-mute">أضف صنفاً في المخزون أولاً.</p>
      </div>
    );
  }

  return (
    <div className="lg:p-8">
      <PageHead
        kicker="THE PATH"
        title={t("road.title")}
        desc="من اليوم 1 حتى نفاد المخزون. القوس يوضح يوم الصفر، ومتى يجب أن تطلب، ومتى تصل الشحنة إذا طلبت اليوم."
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

      <div className="card p-5 mb-6">
        <div className="flex justify-between text-sm text-mute mb-4">
          <span>Day 1 · مخزون {item.qty}</span>
          <span>{item.dailySales} قطعة / يوم</span>
          <span>Stock 0 · يوم {path.stockZeroDay}</span>
          <span>يوم 31–32</span>
        </div>
        <div className="relative pt-8 pb-10">
          <div className="absolute top-10 right-0 left-0 h-px bg-line" />
          <svg className="absolute top-2 right-0 left-0 h-16 w-full pointer-events-none" viewBox="0 0 100 40" preserveAspectRatio="none">
            <path
              d={`M 0 32 Q ${Math.min(95, (path.stockZeroDay / 32) * 100) / 2} 4 ${Math.min(95, (path.stockZeroDay / 32) * 100)} 32`}
              fill="none"
              stroke="#e85d5d"
              strokeWidth="1.2"
            />
          </svg>
          <div className="grid gap-1 relative" style={{ gridTemplateColumns: "repeat(16, minmax(0, 1fr))" }}>
            {path.days.map((d) => {
              const isZero = d.day === path.stockZeroDay;
              const isOrder = d.day === Math.max(1, path.orderByDay);
              const empty = d.remaining <= 0;
              return (
                <div key={d.day} className="text-center">
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
          <Legend c="#17324a" t="مخزون متبقٍ" />
          <Legend c="#e8a317" t="آخر يوم للطلب" />
          <Legend c="#e85d5d" t="المخزون صفر" />
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <div className="card p-5">
          <h2 className="font-bold mb-3">تقويم {monthName(today)}</h2>
          <div className="grid grid-cols-7 gap-1 text-center text-[11px] text-mute mb-1">
            {["أحد", "إثن", "ثلا", "أرب", "خمي", "جمع", "سبت"].map((d) => (
              <div key={d}>{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {calendar.map((cell, i) => {
              if (!cell) return <div key={i} />;
              const offset = diffDays(startOfToday(), cell);
              const remaining = Math.max(0, item.qty - item.dailySales * offset);
              const isZero = offset + 1 === path.stockZeroDay;
              const isOrder = offset + 1 === Math.max(1, path.orderByDay);
              const isToday = offset === 0;
              return (
                <div
                  key={i}
                  className={cls(
                    "h-16 rounded-lg border p-1 text-right",
                    isToday && "border-gold",
                    isZero && "bg-danger/20 border-danger",
                    isOrder && !isZero && "bg-warn/20 border-warn",
                    remaining <= 0 && !isZero && "opacity-40"
                  )}
                >
                  <div className="text-xs font-bold">{cell.getDate()}</div>
                  <div className="text-[10px] text-mute">{Math.round(remaining)}</div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="card p-5">
          <h2 className="font-bold mb-3">قراءة الطريق</h2>
          <ol className="space-y-3 text-sm">
            <li>
              <b>اليوم 1.</b> عندك {item.qty} قطعة. كل يوم يخرج {item.dailySales}.
            </li>
            <li>
              <b>يوم الطلب.</b>{" "}
              {path.orderByDay < 1
                ? "فات وقت الطلب الآمن. اطلب اليوم حتى لو وصل بعد النفاد."
                : `آخر يوم آمن للطلب هو اليوم ${path.orderByDay} حتى تصل الشحنة قبل الصفر.`}
            </li>
            <li>
              <b>Stock 0.</b> القوس يصل للصفر يوم {path.stockZeroDay}. بعدها المبيعات تتوقف.
            </li>
            <li>
              <b>وصول شحنة اليوم.</b> إذا طلبت الآن من علي بابا، الوصول بعد {item.leadTimeDays} يوم
              (إنتاج + شحن + جمارك).
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

function monthName(d: Date) {
  return d.toLocaleDateString("ar-DZ", { month: "long", year: "numeric" });
}
