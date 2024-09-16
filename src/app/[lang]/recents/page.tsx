import React from "react";
import dynamic from "next/dynamic";

import { getDictionary } from "../i18n";

const DynamicRecentsContent = dynamic(() => import("./RecentsContent"), { ssr: false });

export default async function Recents({ params: { lang } }: { params: { lang: Global.SupportedLang } }) {
  const t = await getDictionary(lang);
  return (
    <DynamicRecentsContent t={t}/>
  );
}
