"use client";

import { useEffect, useRef, useState } from "react";
import { useCod } from "@/lib/store";
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
  useCod.setState({
    ...sliceState(data),
    hydrated: true,
  });
}

export function useServerSync() {
  const [mode, setMode] = useState<"local" | "server" | "offline">("local");
  const timer = useRef<number | null>(null);
  const skip = useRef(true);
  const lastLocal = useRef(0);

  useEffect(() => {
    let stop = false;
    (async () => {
      try {
        const r = await fetch("/api/state", { cache: "no-store" });
        if (!r.ok) throw new Error("api");
        const data = (await r.json()) as AppState;
        if (stop) return;
        applyServer(data);
        setMode("server");
        window.setTimeout(() => {
          skip.current = false;
        }, 400);
      } catch {
        if (stop) return;
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
    const unsub = useCod.subscribe((s) => {
      if (skip.current || mode !== "server") return;
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
    if (mode !== "server") return;
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
