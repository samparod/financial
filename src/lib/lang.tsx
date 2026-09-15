"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { tr, type Lang, type TVars } from "./i18n";

const LangCtx = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string, vars?: TVars) => string;
  helpOn: boolean;
  setHelpOn: (v: boolean) => void;
} | null>(null);

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ar");
  const [helpOn, setHelpOnState] = useState(true);

  useEffect(() => {
    const saved = window.localStorage.getItem("lmofid-lang") as Lang | null;
    if (saved === "ar" || saved === "fr" || saved === "en") setLangState(saved);
    const help = window.localStorage.getItem("lmofid-help");
    if (help === "off") setHelpOnState(false);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    window.localStorage.setItem("lmofid-lang", l);
  };

  const setHelpOn = (v: boolean) => {
    setHelpOnState(v);
    window.localStorage.setItem("lmofid-help", v ? "on" : "off");
  };

  return (
    <LangCtx.Provider value={{ lang, setLang, t: (k, vars) => tr(lang, k, vars), helpOn, setHelpOn }}>
      {children}
    </LangCtx.Provider>
  );
}

export function useT() {
  const ctx = useContext(LangCtx);
  if (!ctx) throw new Error("useT outside LangProvider");
  return ctx;
}
