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
  Menu,
  X,
} from "lucide-react";
import { useCod } from "@/lib/store";
import { cls } from "@/lib/format";
import { useEffect, useState } from "react";
import { LangProvider, useT } from "@/lib/lang";
import { LANGS } from "@/lib/i18n";
import { useServerSync } from "@/lib/sync";
import { ErrorBoundary } from "@/components/ErrorBoundary";

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

const TABS = [
  { href: "/", key: "nav.home", icon: LayoutDashboard },
  { href: "/accounts", key: "nav.accounts", icon: Table2 },
  { href: "/stability", key: "nav.stability", icon: Calculator },
  { href: "/inventory", key: "nav.inventory", icon: Warehouse },
];

function samePath(a: string, b: string) {
  const n = (p: string) => (p !== "/" && p.endsWith("/") ? p.slice(0, -1) : p);
  return n(a) === n(b);
}

function NavLinks({
  onClick,
  compact,
}: {
  onClick?: () => void;
  compact?: boolean;
}) {
  const path = usePathname();
  const { t } = useT();
  return (
    <>
      {NAV.map((item) => {
        const active = samePath(path, item.href);
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClick}
            className={cls(
              "flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm",
              compact && "py-3 text-base",
              active ? "bg-gold/15 text-gold" : "text-[#c5d0e0]"
            )}
          >
            <Icon size={compact ? 20 : 16} />
            {t(item.key)}
          </Link>
        );
      })}
    </>
  );
}

function ShellInner({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const { t, lang, setLang, helpOn, setHelpOn } = useT();
  const hydrated = useCod((s) => s.hydrated);
  const sync = useServerSync();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [path]);

  return (
    <div className="min-h-[100dvh] lg:flex bg-ink">
      <aside className="hidden lg:flex w-[260px] shrink-0 border-e border-line bg-[#0a101c] flex-col sticky top-0 h-screen">
        <Brand t={t} lang={lang} setLang={setLang} />
        <nav className="flex-1 overflow-y-auto py-3 px-2">
          <NavLinks />
        </nav>
        <SyncFoot t={t} sync={sync} helpOn={helpOn} setHelpOn={setHelpOn} />
      </aside>

      <header
        className="lg:hidden sticky top-0 z-40 border-b border-line bg-[#0a101c]/95 backdrop-blur"
        style={{ paddingTop: "var(--tg-top, env(safe-area-inset-top, 0px))" }}
      >
        <div className="flex items-center justify-between px-3 py-2 gap-2">
          <button
            type="button"
            className="w-10 h-10 rounded-lg border border-line flex items-center justify-center"
            onClick={() => setOpen(true)}
            aria-label="menu"
          >
            <Menu size={20} />
          </button>
          <div className="text-center min-w-0">
            <div className="font-extrabold leading-none">Stability</div>
            <div className="text-[10px] text-gold truncate">{t("brand.sub")}</div>
          </div>
          <div className="flex gap-0.5">
            {LANGS.map((l) => (
              <button
                key={l.id}
                type="button"
                onClick={() => setLang(l.id)}
                className={cls(
                  "text-[10px] px-1.5 py-1 rounded border",
                  lang === l.id ? "border-gold text-gold" : "border-line text-mute"
                )}
              >
                {l.id.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </header>

      {open && (
        <div className="lg:hidden fixed inset-0 z-50">
          <button className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
          <div
            className="absolute top-0 bottom-0 start-0 w-[86%] max-w-sm bg-[#0a101c] border-e border-line flex flex-col"
            style={{
              paddingTop: "var(--tg-top, env(safe-area-inset-top, 0px))",
              paddingBottom: "var(--tg-bottom, env(safe-area-inset-bottom, 0px))",
            }}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-line">
              <div className="font-extrabold">Stability</div>
              <button type="button" onClick={() => setOpen(false)} className="w-9 h-9 flex items-center justify-center">
                <X size={20} />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto px-2 py-2">
              <NavLinks compact onClick={() => setOpen(false)} />
            </nav>
            <SyncFoot t={t} sync={sync} helpOn={helpOn} setHelpOn={setHelpOn} />
          </div>
        </div>
      )}

      <main className="flex-1 min-w-0 pb-24 lg:pb-0">
        {!hydrated ? (
          <div className="p-8 text-mute">{t("load")}</div>
        ) : (
          <div className="px-3 py-4 lg:p-0 max-w-full overflow-x-hidden">{children}</div>
        )}
      </main>

      <nav
        className="lg:hidden fixed bottom-0 inset-x-0 z-40 border-t border-line bg-[#0a101c]"
        style={{ paddingBottom: "var(--tg-bottom, env(safe-area-inset-bottom, 0px))" }}
      >
        <div className="grid grid-cols-5">
          {TABS.map((item) => {
            const active = samePath(path, item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cls(
                  "flex flex-col items-center justify-center gap-0.5 py-2 text-[10px]",
                  active ? "text-gold" : "text-mute"
                )}
              >
                <Icon size={20} />
                <span className="truncate max-w-[72px]">{t(item.key)}</span>
              </Link>
            );
          })}
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="flex flex-col items-center justify-center gap-0.5 py-2 text-[10px] text-mute"
          >
            <Menu size={20} />
            <span>{t("nav.menu")}</span>
          </button>
        </div>
      </nav>
    </div>
  );
}

function Brand({
  t,
  lang,
  setLang,
}: {
  t: (k: string, vars?: Record<string, string | number>) => string;
  lang: string;
  setLang: (l: "ar" | "fr" | "en") => void;
}) {
  return (
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
  );
}

function SyncFoot({
  t,
  sync,
  helpOn,
  setHelpOn,
}: {
  t: (k: string, vars?: Record<string, string | number>) => string;
  sync: string;
  helpOn: boolean;
  setHelpOn: (v: boolean) => void;
}) {
  // Use state to avoid hydration mismatch — window.istiqrar is only available client-side
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    setIsDesktop(typeof window !== "undefined" && !!window.istiqrar);
  }, []);

  return (
    <div className="p-4 text-[11px] text-mute border-t border-line space-y-2">
      <div>{t("brand.foot")}</div>
      <div className={sync === "server" ? "text-profit" : sync === "offline" ? "text-danger" : "text-mute"}>
        {sync === "server"
          ? t("sync.server")
          : sync === "offline"
            ? t("sync.offline")
            : isDesktop
              ? t("sync.desktop")
              : t("sync.local")}
      </div>
      <button
        type="button"
        className="text-gold"
        onClick={() => setHelpOn(!helpOn)}
      >
        {helpOn ? t("help.hide") : t("help.show")}
      </button>
    </div>
  );
}

function ShellBoundary({ children }: { children: React.ReactNode }) {
  const { t } = useT();
  return (
    <ErrorBoundary
      title={t("err.title")}
      body={t("err.body")}
      reload={t("err.reload")}
      details={t("err.details")}
    >
      {children}
    </ErrorBoundary>
  );
}

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <LangProvider>
      <ShellBoundary>
        <ShellInner>{children}</ShellInner>
      </ShellBoundary>
    </LangProvider>
  );
}
