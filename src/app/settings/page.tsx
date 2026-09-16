"use client";

import { useEffect, useRef, useState } from "react";
import { useCod } from "@/lib/store";
import { Num, PageHead, Btn } from "@/components/ui";
import { Explain } from "@/components/Explain";
import { useT } from "@/lib/lang";
import { downloadBackup, parseBackup } from "@/lib/backup";

export default function SettingsPage() {
  const { t } = useT();
  const s = useCod();
  const g = s.settings.gulfFees;
  const a = s.settings.algeriaFeesUsd;
  const p = s.settings.pricing;
  const fileRef = useRef<HTMLInputElement>(null);
  const [msg, setMsg] = useState("");
  const [dataDir, setDataDir] = useState("");

  useEffect(() => {
    window.istiqrar?.dataDir().then(setDataDir).catch(() => undefined);
  }, []);

  const onFile = async (f: File | undefined) => {
    if (!f) return;
    try {
      const parsed = parseBackup(JSON.parse(await f.text()));
      if (!parsed) {
        setMsg(t("set.backupBad"));
        return;
      }
      s.importState(parsed);
      setMsg(t("set.backupOk"));
    } catch {
      setMsg(t("set.backupBad"));
    }
  };

  return (
    <div className="lg:p-8 max-w-4xl">
      <PageHead
        kicker="SETTINGS"
        title={t("set.title")}
        desc={t("set.desc")}
        extra={<Btn tone="danger" onClick={() => s.reset()}>{t("set.reset")}</Btn>}
      />
      <Explain id="set.page" />

      <div className="card p-5 mb-4">
        <h2 className="font-bold mb-2">{t("set.backup")}</h2>
        <p className="text-sm text-mute mb-4">{t("set.backupDesc")}</p>
        <div className="flex flex-wrap gap-2">
          <Btn tone="gold" onClick={() => downloadBackup(s)}>{t("set.saveFile")}</Btn>
          <Btn onClick={() => fileRef.current?.click()}>{t("set.loadFile")}</Btn>
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="application/json,.json"
          className="hidden"
          onChange={(e) => {
            onFile(e.target.files?.[0]);
            e.target.value = "";
          }}
        />
        {dataDir && (
          <p className="text-xs text-mute mt-3 font-mono break-all" dir="ltr">
            {t("set.dataDir")}: {dataDir}
          </p>
        )}
        {msg && <p className="text-sm text-gold mt-3">{msg}</p>}
      </div>
      <div className="card p-5 mb-4">
        <h2 className="font-bold mb-3">{t("set.fxTitle")}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <Num label={t("set.dzdPerUsd")} value={s.settings.usdToDzd} onChange={(n) => s.patchSettings({ usdToDzd: n })} help="set.fx" />
          <Num label={t("set.dzConfirmLbl")} value={s.settings.algeriaConfirm} onChange={(n) => s.patchSettings({ algeriaConfirm: n })} step={0.01} help="set.dzConfirm" />
          <Num label={t("set.dzDeliveredLbl")} value={s.settings.algeriaDelivered} onChange={(n) => s.patchSettings({ algeriaDelivered: n })} step={0.01} help="set.dzDelivered" />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="card p-5">
          <h2 className="font-bold mb-3">{t("set.gulfFees")}</h2>
          <div className="grid grid-cols-2 gap-3">
            <Num label={t("set.perLead")} value={g.leadFee} onChange={(n) => s.patchSettings({ gulfFees: { ...g, leadFee: n } })} step={0.01} help="set.leadFee" />
            <Num label={t("set.perConfirm")} value={g.confirmFee} onChange={(n) => s.patchSettings({ gulfFees: { ...g, confirmFee: n } })} step={0.01} help="set.confirmFee" />
            <Num label={t("set.extraConfirm")} value={g.extraPerConfirm} onChange={(n) => s.patchSettings({ gulfFees: { ...g, extraPerConfirm: n } })} step={0.01} help="set.extra" />
            <Num label={t("set.perDelivered")} value={g.deliveredFee} onChange={(n) => s.patchSettings({ gulfFees: { ...g, deliveredFee: n } })} step={0.01} help="set.deliveredFee" />
            <Num label="COD %" value={g.codPercent} onChange={(n) => s.patchSettings({ gulfFees: { ...g, codPercent: n } })} step={0.01} help="set.codPercent" />
          </div>
        </div>
        <div className="card p-5">
          <h2 className="font-bold mb-3">{t("set.dzFees")}</h2>
          <div className="grid grid-cols-2 gap-3">
            <Num label={t("set.perLead")} value={a.leadFee} onChange={(n) => s.patchSettings({ algeriaFeesUsd: { ...a, leadFee: n } })} step={0.01} help="set.leadFee" />
            <Num label={t("set.perConfirm")} value={a.confirmFee} onChange={(n) => s.patchSettings({ algeriaFeesUsd: { ...a, confirmFee: n } })} step={0.01} help="set.confirmFee" />
            <Num label={t("set.extraConfirm")} value={a.extraPerConfirm} onChange={(n) => s.patchSettings({ algeriaFeesUsd: { ...a, extraPerConfirm: n } })} step={0.01} help="set.extra" />
            <Num label={t("set.perDelivered")} value={a.deliveredFee} onChange={(n) => s.patchSettings({ algeriaFeesUsd: { ...a, deliveredFee: n } })} step={0.01} help="set.deliveredFee" />
            <Num label="COD %" value={a.codPercent} onChange={(n) => s.patchSettings({ algeriaFeesUsd: { ...a, codPercent: n } })} step={0.01} help="set.codPercent" />
          </div>
        </div>
      </div>

      <div className="card p-5 mt-4">
        <h2 className="font-bold mb-2">{t("set.pricingTitle")}</h2>
        <p className="text-sm text-mute mb-4">{t("set.pricingDesc")}</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <Num label={t("set.shippingBase")} value={p.shippingBaseUsd} onChange={(n) => s.patchSettings({ pricing: { ...p, shippingBaseUsd: n } })} step={0.5} />
          <Num label={t("set.callCenterUsd")} value={p.callCenterUsd} onChange={(n) => s.patchSettings({ pricing: { ...p, callCenterUsd: n } })} step={0.1} />
          <Num label={t("set.adsMultiple")} value={p.adsPerDeliveredMultiple} onChange={(n) => s.patchSettings({ pricing: { ...p, adsPerDeliveredMultiple: n } })} step={0.1} />
          <Num label="COD %" value={p.codPercent} onChange={(n) => s.patchSettings({ pricing: { ...p, codPercent: n } })} step={0.01} />
          <Num label={t("set.targetProfit")} value={p.targetProfitUsd} onChange={(n) => s.patchSettings({ pricing: { ...p, targetProfitUsd: n } })} />
        </div>
      </div>
    </div>
  );
}
