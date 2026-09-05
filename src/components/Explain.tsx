"use client";

import { useT } from "@/lib/lang";
import { getHelp } from "@/lib/help";

export function Explain({ id, open = false }: { id: string; open?: boolean }) {
  const { lang, t, helpOn } = useT();
  const item = getHelp(lang, id);
  if (!item || !helpOn) return null;
  return (
    <details
      open={open}
      className="explain mb-5 rounded-xl border border-gold/25 bg-[#121a2b] p-3 sm:p-4"
    >
      <summary className="cursor-pointer font-bold text-gold text-sm list-none flex items-center gap-2">
        <span className="inline-flex h-5 w-5 items-center justify-center rounded bg-gold/20 text-[11px]" aria-hidden>
          ?
        </span>
        {item.title}
      </summary>
      <p className="text-sm leading-relaxed mt-3 text-[#d5deec]">{item.meaning}</p>
      <p className="text-sm leading-relaxed mt-2 text-[#b7e08a]">
        <span className="font-bold text-gold">{t("help.example")}: </span>
        {item.example}
      </p>
    </details>
  );
}

export function Tip({ id }: { id: string }) {
  const { lang, t, helpOn } = useT();
  const item = getHelp(lang, id);
  if (!item || !helpOn) return null;
  return (
    <details className="tip mt-1">
      <summary className="cursor-pointer text-[11px] text-gold/90 hover:text-gold">
        {t("help.what")}
      </summary>
      <div className="mt-1 rounded-lg border border-line bg-[#0b1220] p-2 text-[12px] leading-relaxed">
        <p className="text-[#c5d0e0]">{item.meaning}</p>
        <p className="mt-1 text-[#b7e08a]">
          <span className="font-semibold text-gold">{t("help.example")}: </span>
          {item.example}
        </p>
      </div>
    </details>
  );
}

export function LabelHelp({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <div>
      <div>{children}</div>
      <Tip id={id} />
    </div>
  );
}
