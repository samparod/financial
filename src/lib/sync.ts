"use client";

import { useEffect, useRef, useState } from "react";
import { useCod } from "@/lib/store";
import type { AppState } from "@/lib/types";

export function useServerSync() {
  const [mode, setMode] = useState<"local" | "server" | "offline">("local");
  const timer = useRef<number | null>(null);
  const skip = useRef(true);

  useEffect(() => {
    let stop = false;
    (async () => {
      try {
        const r = await fetch("/api/state", { cache: "no-store" });
        if (!r.ok) throw new Error("api");
        const data = (await r.json()) as AppState;
        if (stop) return;
        useCod.setState({
          settings: data.settings,
          plProducts: data.plProducts,
          operations: data.operations,
          stability: data.stability,
          stock: data.stock,
          cash: data.cash,
          shipments: data.shipments,
          winners: data.winners,
          hydrated: true,
        });
        setMode("server");
        window.setTimeout(() => {
          skip.current = false;
        }, 500);
      } catch {
        setMode("local");
        skip.current = false;
      }
    })();
    return () => {
      stop = true;
    };
  }, []);

  useEffect(() => {
    const unsub = useCod.subscribe((s) => {
      if (skip.current || mode === "local") return;
      if (timer.current) window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => {
        fetch("/api/state", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            settings: s.settings,
            plProducts: s.plProducts,
            operations: s.operations,
            stability: s.stability,
            stock: s.stock,
            cash: s.cash,
            shipments: s.shipments,
            winners: s.winners,
          }),
        }).catch(() => setMode("offline"));
      }, 700);
    });
    return () => {
      unsub();
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, [mode]);

  return mode;
}
