import React from "react";
import dynamic from "next/dynamic";
const DynamicLoginContent = dynamic(() => import("./LoginContent"), {
  ssr: false,
});

import { getDictionary } from "@/app/[lang]/i18n";

export default async function Login({
  params: { lang },
}: {
  params: { lang: Global.SupportedLang };
}) {
  const t = await getDictionary(lang);
  return <DynamicLoginContent t={t} />;
}
