import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Shell } from "@/components/Shell";
import { TelegramWebApp } from "@/components/TelegramWebApp";

export const metadata: Metadata = {
  title: "Stability COD · استقرار",
  description: "نظام إدارة حسابات COD للخليج والجزائر",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover" as const,
  themeColor: "#070b14",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <Script src="https://telegram.org/js/telegram-web-app.js" strategy="beforeInteractive" />
        <TelegramWebApp />
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
