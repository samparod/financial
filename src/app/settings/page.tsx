"use client";

import { useCod } from "@/lib/store";
import { Num, PageHead, Btn } from "@/components/ui";
import { useT } from "@/lib/lang";

export default function SettingsPage() {
  const { t } = useT();
  const s = useCod();
  const g = s.settings.gulfFees;
  const a = s.settings.algeriaFeesUsd;

  return (
    <div className="p-6 lg:p-8 max-w-4xl">
      <PageHead
        kicker="SETTINGS"
        title={t("set.title")}
        desc="رسوم الكول سنتر وCOD كما في Lmofid.COD. يمكن إرجاع البيانات التجريبية."
        extra={<Btn tone="danger" onClick={() => s.reset()}>إعادة البيانات التجريبية</Btn>}
      />

      <div className="card p-5 mb-4">
        <h2 className="font-bold mb-3">سعر الصرف والجزائر</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <Num label="دينار لكل دولار" value={s.settings.usdToDzd} onChange={(n) => s.patchSettings({ usdToDzd: n })} />
          <Num label="تأكيد الجزائر" value={s.settings.algeriaConfirm} onChange={(n) => s.patchSettings({ algeriaConfirm: n })} step={0.01} />
          <Num label="توصيل الجزائر" value={s.settings.algeriaDelivered} onChange={(n) => s.patchSettings({ algeriaDelivered: n })} step={0.01} />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="card p-5">
          <h2 className="font-bold mb-3">رسوم الخليج $</h2>
          <div className="grid grid-cols-2 gap-3">
            <Num label="لكل ليد" value={g.leadFee} onChange={(n) => s.patchSettings({ gulfFees: { ...g, leadFee: n } })} step={0.01} />
            <Num label="لكل تأكيد" value={g.confirmFee} onChange={(n) => s.patchSettings({ gulfFees: { ...g, confirmFee: n } })} step={0.01} />
            <Num label="إضافي تأكيد" value={g.extraPerConfirm} onChange={(n) => s.patchSettings({ gulfFees: { ...g, extraPerConfirm: n } })} step={0.01} />
            <Num label="لكل توصيل" value={g.deliveredFee} onChange={(n) => s.patchSettings({ gulfFees: { ...g, deliveredFee: n } })} step={0.01} />
            <Num label="COD %" value={g.codPercent} onChange={(n) => s.patchSettings({ gulfFees: { ...g, codPercent: n } })} step={0.01} />
          </div>
        </div>
        <div className="card p-5">
          <h2 className="font-bold mb-3">رسوم الجزائر $</h2>
          <div className="grid grid-cols-2 gap-3">
            <Num label="لكل ليد" value={a.leadFee} onChange={(n) => s.patchSettings({ algeriaFeesUsd: { ...a, leadFee: n } })} step={0.01} />
            <Num label="لكل تأكيد" value={a.confirmFee} onChange={(n) => s.patchSettings({ algeriaFeesUsd: { ...a, confirmFee: n } })} step={0.01} />
            <Num label="إضافي تأكيد" value={a.extraPerConfirm} onChange={(n) => s.patchSettings({ algeriaFeesUsd: { ...a, extraPerConfirm: n } })} step={0.01} />
            <Num label="لكل توصيل" value={a.deliveredFee} onChange={(n) => s.patchSettings({ algeriaFeesUsd: { ...a, deliveredFee: n } })} step={0.01} />
            <Num label="COD %" value={a.codPercent} onChange={(n) => s.patchSettings({ algeriaFeesUsd: { ...a, codPercent: n } })} step={0.01} />
          </div>
        </div>
      </div>
    </div>
  );
}
