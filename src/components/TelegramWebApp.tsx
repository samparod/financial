"use client";

import { useEffect } from "react";

export function TelegramWebApp() {
  useEffect(() => {
    const w = window as Window & {
      Telegram?: { WebApp?: { ready: () => void; expand: () => void } };
    };
    const app = w.Telegram?.WebApp;
    if (!app) return;
    app.ready();
    app.expand();
  }, []);
  return null;
}
