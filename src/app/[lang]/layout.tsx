import React from "react";
import "../globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import SlideServer from "../components/SliderBar/SlideServer";

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

      <body className="h-screen bg-gradient-to-l from-orange-100/80 to-orange-50/20 transition-all duration-200">
        <AntdRegistry>
          <div className="flex flex-row">
            <SlideServer lang={lang} />
            <div className="flex-1">
              {children}
            </div>
          </div>
        </AntdRegistry>
      </body>
    </html>
  );
}
