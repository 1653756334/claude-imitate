import { getDictionary } from "../i18n";
import NewContent from "./NewContent";

export default async function New({ lang }: { lang: Global.SupportedLang }) {
  const t = await getDictionary(lang);

  return (
    <NewContent t={t}/>
  );
}
