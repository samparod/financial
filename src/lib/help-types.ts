import type { Lang } from "./i18n";

export type HelpItem = {
  title: string;
  meaning: string;
  example: string;
};

export type HelpBundle = Record<Lang, Record<string, HelpItem>>;
