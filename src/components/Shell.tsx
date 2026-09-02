"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Table2,
  Globe2,
  Flag,
  Calculator,
  Warehouse,
  Route,
  Banknote,
  Ship,
  Trophy,
  Tag,
  Settings,
} from "lucide-react";
import { useCod } from "@/lib/store";
import { cls } from "@/lib/format";
import { useEffect } from "react";
import { LangProvider, useT } from "@/lib/lang";
import { LANGS } from "@/lib/i18n";
import { useServerSync } from "@/lib/sync";

const NAV = [
  { href: "/", key: "nav.home", icon: LayoutDashboard },
  { href: "/accounts", key: "nav.accounts", icon: Table2 },
  { href: "/stability", key: "nav.stability", icon: Calculator },
  { href: "/gulf", key: "nav.gulf", icon: Globe2 },
  { href: "/algeria", key: "nav.algeria", icon: Flag },
  { href: "/inventory", key: "nav.inventory", icon: Warehouse },
  { href: "/roadmap", key: "nav.roadmap", icon: Route },
  { href: "/cashflow", key: "nav.cashflow", icon: Banknote },
  { href: "/alibaba", key: "nav.alibaba", icon: Ship },
  { href: "/winners", key: "nav.winners", icon: Trophy },
  { href: "/simulator", key: "nav.simulator", icon: Tag },
  { href: "/settings", key: "nav.settings", icon: Settings },
];

function ShellInner({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const { t, lang, setLang } = useT();
  const hydrated = useCod((s) => s.hydrated);
  const setHydrated = useCod((s) => s.setHydrated);
  const sync = useServerSync();

  useEffect(() => {
    const finish = () => setHydrated(true);
    const unsub = useCod.persist.onFinishHydration(finish);
    if (useCod.persist.hasHydrated()) finish();
    const timer = window.setTimeout(finish, 400);
    return () => {
      unsub();
      window.clearTimeout(timer);
    };
  }, [setHydrated]);

  return (
    <div className="min-h-screen flex">
      <aside className="w-[260px] shrink-0 border-e border-line bg-[#0a101c] flex flex-col sticky top-0 h-screen">
        <div className="px-5 py-4 border-b border-line">
          <div className="text-[11px] text-gold tracking-[0.2em]">LMOFID · COD</div>
          <div className="text-xl font-extrabold mt-1">Stability</div>
          <div className="text-xs text-mute mt-1">{t("brand.sub")}</div>
          <div className="flex gap-1 mt-3">
            {LANGS.map((l) => (
              <button
                key={l.id}
                type="button"
                onClick={() => setLang(l.id)}
                className={cls(
                  "flex-1 text-[11px] py-1 rounded border",
                  lang === l.id ? "border-gold bg-gold/15 text-gold" : "border-line text-mute"
                )}
              >
                {l.id.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto py-3 px-2">
          {NAV.map((item) => {
            const active = path === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cls(
                  "flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm mb-0.5",
                  active ? "bg-gold/15 text-gold" : "text-[#c5d0e0] hover:bg-white/5"
                )}
              >
                <Icon size={16} />
                {t(item.key)}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 text-[11px] text-mute border-t border-line space-y-1">
          <div>{t("brand.foot")}</div>
          <div className={sync === "server" ? "text-profit" : sync === "offline" ? "text-danger" : "text-mute"}>
            {sync === "server" ? "محفوظ مع التيليغرام / السيرفر" : sync === "offline" ? "السيرفر غير متصل" : "حفظ محلي في المتصفح"}
          </div>
        </div>
      </aside>
      <main className="flex-1 min-w-0">
        {!hydrated ? <div className="p-10 text-mute">{t("load")}</div> : children}
      </main>
    </div>
  );
}

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <LangProvider>
      <ShellInner>{children}</ShellInner>
    </LangProvider>
  );
}
