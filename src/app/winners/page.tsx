"use client";

import { useState } from "react";
import { useCod } from "@/lib/store";
import { sellingPriceUsd } from "@/lib/cod";
import { money } from "@/lib/format";
import { Badge, Btn, Num, PageHead, TextField } from "@/components/ui";
import { Explain, LabelHelp, Tip } from "@/components/Explain";
import { useT } from "@/lib/lang";
import type { Region, TestStatus } from "@/lib/types";

const STATUSES: { id: TestStatus; ar: string; tone: "neutral" | "warn" | "good" | "bad" | "gold" }[] = [
  { id: "not_tested", ar: "لم يُختبر", tone: "neutral" },
  { id: "testing", ar: "قيد الاختبار", tone: "warn" },
  { id: "winner", ar: "رابحة", tone: "good" },
  { id: "loser", ar: "خاسرة", tone: "bad" },
  { id: "hold", ar: "معلّقة", tone: "gold" },
];

const CRITERIA: {
  key: "wow" | "problem" | "competition" | "perceivedValue" | "scalability" | "availability";
  ar: string;
  help: string;
}[] = [
  { key: "problem", ar: "يحل مشكلة", help: "win.problem" },
  { key: "wow", ar: "Wow Factor", help: "win.wow" },
  { key: "availability", ar: "صعب تلقاها في المحل", help: "win.availability" },
  { key: "competition", ar: "منافسة ضعيفة", help: "win.competition" },
  { key: "perceivedValue", ar: "قيمة مدركة عالية", help: "win.value" },
  { key: "scalability", ar: "قابل للتوسع", help: "win.scale" },
];

export default function WinnersPage() {
  const { t } = useT();
  const s = useCod();
  const [region, setRegion] = useState<Region | "all">("all");
  const [status, setStatus] = useState<TestStatus | "all">("all");
  const list = s.winners.filter(
    (w) => (region === "all" || w.region === region) && (status === "all" || w.status === status)
  );

  return (
    <div className="lg:p-8">
      <PageHead
        kicker="WINNING PRODUCTS"
        title={t("win.title")}
        desc="معايير الملف: لماذا يشتري، Wow، التوفر، المنافسة، القيمة المدركة، قابلية التوسع. وسجّل إن اختبرت المنتج أو لا."
        extra={
          <div className="flex gap-2 flex-wrap">
            <Btn onClick={() => s.addWinner(region === "algeria" ? "algeria" : "gulf")}>+ منتج</Btn>
          </div>
        }
      />
      <Explain id="win.page" />

      <div className="flex flex-wrap gap-2 mb-5">
        {(["all", "gulf", "algeria"] as const).map((r) => (
          <Btn key={r} tone={region === r ? "gold" : "ghost"} onClick={() => setRegion(r)}>
            {r === "all" ? "الكل" : r === "gulf" ? "الخليج" : "الجزائر"}
          </Btn>
        ))}
        {([{ id: "all", ar: "كل الحالات" }, ...STATUSES] as const).map((x) => (
          <Btn key={x.id} tone={status === x.id ? "gold" : "ghost"} onClick={() => setStatus(x.id as TestStatus | "all")}>
            {x.ar}
          </Btn>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        {list.map((w) => {
          const score =
            (w.wow + w.problem + w.availability + w.competition + w.perceivedValue + w.scalability) / 6;
          const landed = w.chinaPrice + w.weightKg * 9;
          const suggest = sellingPriceUsd(landed, 0.5, 4);
          const st = STATUSES.find((x) => x.id === w.status)!;
          return (
            <div key={w.id} className="card p-5">
              <div className="flex justify-between gap-2 mb-3">
                <div>
                  <input
                    className="bg-transparent font-bold text-lg w-full outline-none"
                    value={w.name}
                    onChange={(e) => s.setWinner(w.id, { name: e.target.value })}
                  />
                  <div className="text-xs text-mute">{w.niche || "بدون نيش"}</div>
                </div>
                <Badge tone={st.tone}>{st.ar}</Badge>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <TextField label="النيش" value={w.niche} onChange={(v) => s.setWinner(w.id, { niche: v })} help="win.niche" />
                <LabelHelp id="win.status">
                  <label className="block">
                    <div className="text-[11px] text-mute mb-1">الحالة</div>
                    <select
                      className="sheet-input"
                      value={w.status}
                      onChange={(e) => s.setWinner(w.id, { status: e.target.value as TestStatus })}
                    >
                      {STATUSES.map((x) => (
                        <option key={x.id} value={x.id}>{x.ar}</option>
                      ))}
                    </select>
                  </label>
                </LabelHelp>
                <Num label="سعر الصين $" value={w.chinaPrice} onChange={(n) => s.setWinner(w.id, { chinaPrice: n })} step={0.01} help="win.china" />
                <Num label="سعر البيع $" value={w.sellingPrice} onChange={(n) => s.setWinner(w.id, { sellingPrice: n })} step={0.1} help="win.price" />
                <Num label="الوزن كغ" value={w.weightKg} onChange={(n) => s.setWinner(w.id, { weightKg: n })} step={0.01} help="win.weight" />
                <TextField label="رابط" value={w.alibabaUrl} onChange={(v) => s.setWinner(w.id, { alibabaUrl: v })} help="win.url" />
              </div>
              <Explain id="win.criteria" open={false} />
              <div className="grid grid-cols-2 gap-2 mb-3">
                {CRITERIA.map((c) => (
                  <LabelHelp key={c.key} id={c.help}>
                    <label className="text-xs">
                      <div className="flex justify-between text-mute mb-1">
                        <span>{c.ar}</span>
                        <span>{w[c.key]}/10</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={10}
                        value={w[c.key]}
                        onChange={(e) => s.setWinner(w.id, { [c.key]: parseInt(e.target.value, 10) })}
                        className="w-full"
                      />
                    </label>
                  </LabelHelp>
                ))}
              </div>
              <textarea
                className="sheet-input min-h-[70px]"
                placeholder="ملاحظات الاختبار…"
                value={w.notes}
                onChange={(e) => s.setWinner(w.id, { notes: e.target.value })}
              />
              <div className="flex justify-between items-center mt-3 text-sm gap-3">
                <div className="min-w-0">
                  <span>
                    تقييم {score.toFixed(1)}/10 · واصلة ≈ {money(landed)} · سعر مقترح {money(suggest)}
                  </span>
                  <Tip id="win.score" />
                  <Tip id="win.suggestPrice" />
                </div>
                <button className="text-xs text-danger shrink-0" onClick={() => s.removeWinner(w.id)}>حذف</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
