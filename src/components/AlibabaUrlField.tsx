"use client";

import { ExternalLink } from "lucide-react";
import { Tip } from "@/components/Explain";
import { resolveAlibabaHref } from "@/lib/alibaba-url";

type Props = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  help?: string;
  openTitle: string;
  className?: string;
};

const chrome =
  "shrink-0 w-9 self-stretch inline-flex items-center justify-center border-s border-line transition-colors";

export function AlibabaUrlField({ label, value, onChange, help, openTitle, className }: Props) {
  const href = resolveAlibabaHref(value);

  return (
    <div className={className}>
      <div className="text-[11px] text-mute mb-1">{label}</div>
      <div className="flex min-w-0 rounded-lg border border-line bg-[#0b1220] overflow-hidden focus-within:border-gold">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          dir="ltr"
          autoComplete="url"
          inputMode="url"
          spellCheck={false}
          className="flex-1 min-w-0 bg-transparent px-2 py-1.5 text-sm text-white outline-none tabular-nums"
        />
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            title={openTitle}
            aria-label={openTitle}
            className={`${chrome} text-gold hover:bg-gold/20 focus-visible:outline-none focus-visible:bg-gold/25`}
          >
            <ExternalLink size={14} strokeWidth={2.25} />
          </a>
        ) : (
          <span
            title={openTitle}
            aria-hidden
            className={`${chrome} text-mute opacity-40 pointer-events-none`}
          >
            <ExternalLink size={14} strokeWidth={2.25} />
          </span>
        )}
      </div>
      {help && <Tip id={help} />}
    </div>
  );
}
