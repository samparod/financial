"use client";

import Link from "next/link";
import { useCod } from "@/lib/store";
import { calcPl, calcStability, opsTotal, stockPath } from "@/lib/cod";
import { money } from "@/lib/format";
import { Badge, Kpi, PageHead } from "@/components/ui";
import { Explain } from "@/components/Explain";
import { useT } from "@/lib/lang";

export default function HomePage() {
  const { t } = useT();
  const s = useCod();
  const gulfFees = s.settings.gulfFees;
  const dzFees = s.settings.algeriaFeesUsd;
  const gulfPl = s.plProducts.filter((p) => p.region === "gulf");
  const dzPl = s.plProducts.filter((p) => p.region === "algeria");
  const gulfProfit = gulfPl.reduce((a, p) => a + calcPl(p, gulfFees).profit, 0);
  const dzProfitUsd = dzPl.reduce((a, p) => a + calcPl(p, dzFees, s.settings.usdToDzd).profit, 0);
  const gulfOps = s.operations.find((o) => o.region === "gulf")!;
  const dzOps = s.operations.find((o) => o.region === "algeria")!;
  const gulfNet = gulfProfit - opsTotal(gulfOps);
  const dzNet = dzProfitUsd - opsTotal(dzOps);
  const stG = calcStability(s.stability.gulf, gulfFees);
  const stDz = calcStability(
    { ...s.stability.algeria, fxToUsd: s.settings.usdToDzd },
    dzFees
  );
  const alerts = s.stock
    .map((item) => ({ item, path: stockPath(item) }))
    .filter((x) => x.path.advice === "order_now" || x.path.advice === "plan");
  const testing = s.winners.filter((w) => w.status === "testing").length;
  const winners = s.winners.filter((w) => w.status === "winner").length;

  return (
    <div className="lg:p-8">
      <PageHead kicker="STABILITY COD" title={t("home.title")} desc={t("home.desc")} />
      <Explain id="home.page" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <Kpi label={t("home.gulfNet")} value={money(gulfNet)} tone={gulfNet > 0 ? "good" : "bad"} hint="P&L − Operations" help="home.gulfNet" />
        <Kpi
          label={t("home.dzNet")}
          value={money(dzNet)}
          tone={dzNet > 0 ? "good" : "bad"}
          hint={`${money(dzNet * s.settings.usdToDzd, "DZD", 0)}`}
          help="home.dzNet"
        />
        <Kpi
          label={t("home.epd")}
          value={money(stG.oldP.epd)}
          tone={stG.stable ? "good" : "warn"}
          hint={stG.stable ? t("calc.stable") : t("calc.fragile")}
          help="home.epd"
        />
        <Kpi
          label={t("home.alerts")}
          value={String(alerts.length)}
          tone={alerts.some((a) => a.path.advice === "order_now") ? "bad" : alerts.length ? "warn" : "good"}
          hint={`${winners} · ${testing}`}
          help="home.alerts"
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-4 mb-6">
        <div className="card p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold">{t("home.stockNow")}</h2>
            <Link href="/inventory" className="text-xs text-gold">{t("home.manageStock")}</Link>
          </div>
          <Explain id="home.stockDecision" open={false} />
          {alerts.length === 0 ? (
            <p className="text-sm text-mute">{t("home.stockOk")}</p>
          ) : (
            <div className="space-y-2">
              {alerts.map(({ item, path }) => (
                <div key={item.id} className="flex items-center justify-between gap-3 border border-line rounded-lg px-3 py-2">
                  <div>
                    <div className="font-semibold">{item.name}</div>
                    <div className="text-xs text-mute">
                      {t("home.stockLine", { qty: item.qty, daily: item.dailySales, day: path.stockZeroDay })}
                    </div>
                  </div>
                  <Badge tone={path.advice === "order_now" ? "bad" : "warn"}>
                    {path.advice === "order_now" ? t("home.orderNow") : t("home.planOrder")}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="card p-5">
          <h2 className="font-bold mb-3">{t("home.stabilityTitle")}</h2>
          <Explain id="home.stabilityIndex" open={false} />
          <Row k={t("sheet.gulf")} v={stG.stable ? t("calc.stable") : t("home.unstable")} ok={stG.stable} />
          <Row k={t("sheet.algeria")} v={stDz.stable ? t("calc.stable") : t("home.unstable")} ok={stDz.stable} />
          <Row k={t("home.breakevenFrom")} v={t("home.breakevenVal", { pct: Math.round(stG.breakevenDr * 100) })} ok={stG.breakevenDr <= 0.35} />
          <Row k={t("home.priceCut")} v={stG.competitive ? t("home.stillProfit") : t("home.weakMargin")} ok={stG.competitive} />
          <Link href="/stability" className="text-xs text-gold mt-3 inline-block">{t("home.openCalc")}</Link>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          ["/accounts", "nav.accounts"],
          ["/stability", "nav.stability"],
          ["/gulf", "nav.gulf"],
          ["/algeria", "nav.algeria"],
          ["/inventory", "nav.inventory"],
          ["/roadmap", "nav.roadmap"],
          ["/cashflow", "nav.cashflow"],
          ["/alibaba", "nav.alibaba"],
        ].map(([href, key]) => (
          <Link key={href} href={href} className="card p-4 hover:border-gold/40 transition-colors">
            <div className="font-bold">{t(key)}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function Row({ k, v, ok }: { k: string; v: string; ok: boolean }) {
  return (
    <div className="flex justify-between text-sm py-1.5 border-b border-line/70">
      <span className="text-mute">{k}</span>
      <span className={ok ? "text-profit" : "text-warn"}>{v}</span>
    </div>
  );
}
