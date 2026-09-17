"use client";

import { useEffect, useRef, useState } from "react";
import { useCod } from "@/lib/store";
import { parseBackup } from "@/lib/backup";
import { migrateSettings } from "@/lib/cod";
import { SEED } from "@/lib/seed";
import type { AppState } from "@/lib/types";

function sliceState(s: {
  settings: AppState["settings"];
  plProducts: AppState["plProducts"];
  operations: AppState["operations"];
  stability: AppState["stability"];
  stock: AppState["stock"];
  cash: AppState["cash"];
  shipments: AppState["shipments"];
  winners: AppState["winners"];
}): AppState {
  return {
    settings: s.settings,
    plProducts: s.plProducts,
    operations: s.operations,
    stability: s.stability,
    stock: s.stock,
    cash: s.cash,
    shipments: s.shipments,
    winners: s.winners,
  };
}

function applyServer(data: AppState) {
  const base = useCod.getState().settings ?? SEED.settings;
  useCod.setState({
    ...sliceState({
      ...data,
      settings: migrateSettings(data.settings, base),
    }),
    hydrated: true,
  });
}

async function fetchState(timeoutMs = 8000): Promise<AppState | null> {
  const ctrl = new AbortController();
  const timer = window.setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const r = await fetch("/api/state", { cache: "no-store", signal: ctrl.signal });
    if (!r.ok) return null;
    return (await r.json()) as AppState;
  } catch {
    return null;
  } finally {
    window.clearTimeout(timer);
  }
}

export function useServerSync() {
  const [mode, setMode] = useState<"local" | "server" | "memory" | "offline">("local");
  const memoryServer = process.env.NEXT_PUBLIC_MEMORY_SERVER === "1";
  const timer = useRef<number | null>(null);
  const skip = useRef(true);
  const lastLocal = useRef(0);

  useEffect(() => {
    let stop = false;
    (async () => {
      if (typeof window !== "undefined" && window.istiqrar) {
        try {
          const raw = await window.istiqrar.load();
          const parsed = parseBackup(raw);
          if (!stop && parsed) {
            useCod.setState({
              ...sliceState(parsed),
              hydrated: true,
            });
          } else if (!stop) {
            useCod.setState({ hydrated: true });
          }
        } catch {
          if (!stop) useCod.setState({ hydrated: true });
        }
        skip.current = false;
        setMode("local");
        return;
      }
      if (process.env.NEXT_PUBLIC_LOCAL_ONLY === "1" && !memoryServer) {
        skip.current = false;
        useCod.setState({ hydrated: true });
        setMode("local");
        return;
      }
      const data = await fetchState();
      if (stop) return;
      if (data) {
        applyServer(data);
        setMode(memoryServer ? "memory" : "server");
        window.setTimeout(() => {
          skip.current = false;
        }, 400);
      } else {
        setMode("local");
        skip.current = false;
        useCod.setState({ hydrated: true });
      }
    })();
    return () => {
      stop = true;
    };
  }, []);

  useEffect(() => {
    const id = window.setTimeout(() => {
      if (!useCod.getState().hydrated) useCod.setState({ hydrated: true });
    }, 3000);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    const unsub = useCod.subscribe((s) => {
      if (skip.current) return;
      if (typeof window !== "undefined" && window.istiqrar) {
        lastLocal.current = Date.now();
        if (timer.current) window.clearTimeout(timer.current);
        timer.current = window.setTimeout(() => {
          window.istiqrar?.save({
            app: "stability-cod",
            version: 1,
            exportedAt: new Date().toISOString(),
            state: sliceState(s),
          });
        }, 500);
        return;
      }
      if (mode !== "server" && mode !== "memory") return;
      lastLocal.current = Date.now();
      if (timer.current) window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => {
        fetch("/api/state", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(sliceState(s)),
        }).catch(() => setMode("offline"));
      }, 700);
    });
    return () => {
      unsub();
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, [mode]);

  useEffect(() => {
    if (mode !== "server" && mode !== "memory") return;
    const tick = async () => {
      if (document.hidden) return;
      if (Date.now() - lastLocal.current < 2500) return;
      try {
        skip.current = true;
        const r = await fetch("/api/state", { cache: "no-store" });
        if (!r.ok) throw new Error("api");
        const data = (await r.json()) as AppState;
        applyServer(data);
        window.setTimeout(() => {
          skip.current = false;
        }, 300);
      } catch {
        setMode("offline");
        skip.current = false;
      }
    };
    const id = window.setInterval(tick, 12000);
    const vis = () => {
      if (!document.hidden) tick();
    };
    document.addEventListener("visibilitychange", vis);
    return () => {
      window.clearInterval(id);
      document.removeEventListener("visibilitychange", vis);
    };
  }, [mode]);

  return mode;
}
