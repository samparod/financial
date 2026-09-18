"use client";

import { useState } from "react";
import { useCod } from "@/lib/store";
import { sellingPriceUsd } from "@/lib/cod";
import { money } from "@/lib/format";
import { AlibabaUrlField } from "@/components/AlibabaUrlField";
import { Badge, Btn, Num, PageHead, TextField } from "@/components/ui";
import { Explain, LabelHelp, Tip } from "@/components/Explain";
import { useT } from "@/lib/lang";
import type { Region, TestStatus } from "@/lib/types";

const STATUSES: { id: TestStatus; tone: "neutral" | "warn" | "good" | "bad" | "gold" }[] = [
  { id: "not_tested", tone: "neutral" },
  { id: "testing", tone: "warn" },
  { id: "winner", tone: "good" },
  { id: "loser", tone: "bad" },
  { id: "hold", tone: "gold" },
];

const CRITERIA: {
  key: "wow" | "problem" | "competition" | "perceivedValue" | "scalability" | "availability";
  help: string;
}[] = [
  { key: "problem", help: "win.problem" },
  { key: "wow", help: "win.wow" },
  { key: "availability", help: "win.availability" },
  { key: "competition", help: "win.competition" },
  { key: "perceivedValue", help: "win.value" },
  { key: "scalability", help: "win.scale" },
];

/** Rough sea-freight rate used only for the quick price hint on a candidate. */
const SEA_RATE_PER_KG = 9;

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
        desc={t("win.desc")}
        extra={
          <div className="flex gap-2 flex-wrap">
            <Btn onClick={() => s.addWinner(region === "algeria" ? "algeria" : "gulf")}>{t("common.addProduct")}</Btn>
          </div>
        }
      />
      <Explain id="win.page" />

      <div className="flex flex-wrap gap-2 mb-5">
        {(["all", "gulf", "algeria"] as const).map((r) => (
          <Btn key={r} tone={region === r ? "gold" : "ghost"} onClick={() => setRegion(r)}>
            {r === "all" ? t("common.all") : r === "gulf" ? t("sheet.gulf") : t("sheet.algeria")}
          </Btn>
        ))}
        {([{ id: "all" as const }, ...STATUSES]).map((x) => (
          <Btn key={x.id} tone={status === x.id ? "gold" : "ghost"} onClick={() => setStatus(x.id as TestStatus | "all")}>
            {x.id === "all" ? t("win.allSt") : t(`win.st.${x.id}`)}
          </Btn>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        {list.map((w) => {
          const score =
            (w.wow + w.problem + w.availability + w.competition + w.perceivedValue + w.scalability) / 6;
          const landed = w.chinaPrice + w.weightKg * SEA_RATE_PER_KG;
          const suggest = sellingPriceUsd(landed, 0.5, 4, undefined, s.settings.pricing);
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
                  <div className="text-xs text-mute">{w.niche || t("win.noNiche")}</div>
                </div>
                <Badge tone={st.tone}>{t(`win.st.${st.id}`)}</Badge>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <TextField label={t("win.niche")} value={w.niche} onChange={(v) => s.setWinner(w.id, { niche: v })} help="win.niche" />
                <LabelHelp id="win.status">
                  <label className="block">
                    <div className="text-[11px] text-mute mb-1">{t("common.status")}</div>
                    <select
                      className="sheet-input"
                      value={w.status}
                      onChange={(e) => s.setWinner(w.id, { status: e.target.value as TestStatus })}
                    >
                      {STATUSES.map((x) => (
                        <option key={x.id} value={x.id}>{t(`win.st.${x.id}`)}</option>
                      ))}
                    </select>
                  </label>
                </LabelHelp>
                <Num label={t("win.china")} value={w.chinaPrice} onChange={(n) => s.setWinner(w.id, { chinaPrice: n })} step={0.01} help="win.china" />
                <Num label={t("win.price")} value={w.sellingPrice} onChange={(n) => s.setWinner(w.id, { sellingPrice: n })} step={0.1} help="win.price" />
                <Num label={t("win.weight")} value={w.weightKg} onChange={(n) => s.setWinner(w.id, { weightKg: n })} step={0.01} help="win.weight" />
                <AlibabaUrlField
                  className="col-span-2"
                  label={t("win.url")}
                  value={w.alibabaUrl}
                  onChange={(v) => s.setWinner(w.id, { alibabaUrl: v })}
                  help="win.url"
                  openTitle={t("ab.openUrl")}
                />
              </div>
              <Explain id="win.criteria" open={false} />
              <div className="grid grid-cols-2 gap-2 mb-3">
                {CRITERIA.map((c) => (
                  <LabelHelp key={c.key} id={c.help}>
                    <label className="text-xs">
                      <div className="flex justify-between text-mute mb-1">
                        <span>{t(`win.c.${c.key}`)}</span>
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
                placeholder={t("win.notes")}
                value={w.notes}
                onChange={(e) => s.setWinner(w.id, { notes: e.target.value })}
              />
              <div className="flex justify-between items-center mt-3 text-sm gap-3">
                <div className="min-w-0">
                  <span>
                    {t("win.score", { score: score.toFixed(1), landed: money(landed), suggest: money(suggest) })}
                  </span>
                  <Tip id="win.score" />
                  <Tip id="win.suggestPrice" />
                </div>
                <button className="text-xs text-danger shrink-0" onClick={() => s.removeWinner(w.id)}>{t("common.delete")}</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
