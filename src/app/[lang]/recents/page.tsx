import React from "react";

import { getDictionary } from "../i18n";
import RecentsContent from "./RecentsContent";

export default async function Recents({ params: { lang } }: { params: { lang: Global.SupportedLang } }) {
  const t = await getDictionary(lang);
  return (
    <RecentsContent t={t}/>
  );
}
