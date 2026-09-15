import type { Currency } from "./types";

const SYM: Record<Currency, string> = {
  USD: "$",
  DZD: "د.ج",
  SAR: "ر.س",
  AED: "د.إ",
  KWD: "د.ك",
  QAR: "ر.ق",
  BHD: "د.ب",
  OMR: "ر.ع",
};

export function money(n: number, currency: Currency = "USD", digits = 2) {
  if (!Number.isFinite(n)) return "—";
  const abs = Math.abs(n);
  const formatted = abs.toLocaleString("en-US", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
  const sign = n < 0 ? "−" : "";
  if (currency === "USD") return `${sign}${SYM[currency]}${formatted}`;
  return `${sign}${formatted} ${SYM[currency]}`;
}

export function pct(n: number) {
  return `${(n * 100).toFixed(0)}%`;
}

export function cls(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(" ");
}
