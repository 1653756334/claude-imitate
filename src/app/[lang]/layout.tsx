import React from "react";
import "../globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import Slider from "../components/Slider";

import { getDictionary } from "@/app/[lang]/i18n";

export default async function I18nLayout({
  children,
  params: { lang },
}: Readonly<{
  children: React.ReactNode;
  params: { lang: Global.SupportedLang };
}>) {
  const t = await getDictionary(lang);

  return (
    <html lang={lang}>
      <head>
        <title>{t.title}</title>
        <meta property="og:title" content={t.title} key="title" />
      </head>

      <body className="h-screen bg-gradient-to-l from-orange-100/80 to-orange-50/20">
        <AntdRegistry>
          <div className="flex flex-row">
            <Slider />
            {children}
          </div>
        </AntdRegistry>
      </body>
    </html>
  );
}
