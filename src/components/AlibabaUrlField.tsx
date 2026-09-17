"use client";

import { TextField } from "@/components/ui";
import { resolveAlibabaHref } from "@/lib/alibaba-url";

type Props = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  help?: string;
  openTitle: string;
  className?: string;
};

export function AlibabaUrlField({ label, value, onChange, help, openTitle, className }: Props) {
  const href = resolveAlibabaHref(value);
  const canOpen = Boolean(href);

  return (
    <div className={`flex items-end gap-1.5 ${className ?? ""}`}>
      <div className="flex-1 min-w-0">
        <TextField label={label} value={value} onChange={onChange} help={help} />
      </div>
      {canOpen ? (
        <a
          href={href!}
          target="_blank"
          rel="noopener noreferrer"
          title={openTitle}
          className="shrink-0 border border-gold/40 bg-gold/15 text-gold rounded-lg px-2.5 py-2 text-xs leading-none"
        >
          ↗
        </a>
      ) : (
        <span
          title={openTitle}
          className="shrink-0 border border-line/80 text-mute rounded-lg px-2.5 py-2 text-xs leading-none opacity-40"
          aria-hidden
        >
          ↗
        </span>
      )}
    </div>
  );
}
