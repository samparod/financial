"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { tr, type Lang } from "./i18n";

const LangCtx = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
} | null>(null);

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ar");

  useEffect(() => {
    const saved = window.localStorage.getItem("lmofid-lang") as Lang | null;
    if (saved === "ar" || saved === "fr" || saved === "en") setLangState(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    window.localStorage.setItem("lmofid-lang", l);
  };

  return (
    <LangCtx.Provider value={{ lang, setLang, t: (k) => tr(lang, k) }}>
      {children}
    </LangCtx.Provider>
  );
}

export function useT() {
  const ctx = useContext(LangCtx);
  if (!ctx) throw new Error("useT outside LangProvider");
  return ctx;
}
