import type { Lang } from "./i18n";
import type { HelpItem } from "./help-types";
import { homeHelp } from "./help-home";
import { sheetHelp } from "./help-sheet";
import { calcHelp } from "./help-calc";
import { opsHelp } from "./help-ops";
import { tradeHelp } from "./help-trade";

function pack(lang: Lang): Record<string, HelpItem> {
  return {
    ...homeHelp[lang],
    ...sheetHelp[lang],
    ...calcHelp[lang],
    ...opsHelp[lang],
    ...tradeHelp[lang],
  };
}

export const HELP: Record<Lang, Record<string, HelpItem>> = {
  ar: pack("ar"),
  fr: pack("fr"),
  en: pack("en"),
};

export function getHelp(lang: Lang, id: string): HelpItem | undefined {
  return HELP[lang][id] ?? HELP.ar[id] ?? HELP.en[id];
}
