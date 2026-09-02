"use client";

import { useEffect } from "react";

type Tg = {
  ready: () => void;
  expand: () => void;
  setHeaderColor?: (c: string) => void;
  setBackgroundColor?: (c: string) => void;
  disableVerticalSwipes?: () => void;
  safeAreaInset?: { top: number; bottom: number; left: number; right: number };
  contentSafeAreaInset?: { top: number; bottom: number };
};

export function TelegramWebApp() {
  useEffect(() => {
    const w = window as Window & { Telegram?: { WebApp?: Tg } };
    const app = w.Telegram?.WebApp;
    if (!app) return;
    app.ready();
    app.expand();
    app.setHeaderColor?.("#070b14");
    app.setBackgroundColor?.("#070b14");
    app.disableVerticalSwipes?.();
    const apply = () => {
      const top = (app.safeAreaInset?.top || 0) + (app.contentSafeAreaInset?.top || 0);
      const bottom = (app.safeAreaInset?.bottom || 0) + (app.contentSafeAreaInset?.bottom || 0);
      document.documentElement.style.setProperty("--tg-top", `${top}px`);
      document.documentElement.style.setProperty("--tg-bottom", `${bottom}px`);
    };
    apply();
    window.addEventListener("resize", apply);
    return () => window.removeEventListener("resize", apply);
  }, []);
  return null;
}
