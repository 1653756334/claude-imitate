import { getDictionary } from "@/app/[lang]/i18n";
import NewContent from "./NewContent";

export default async function MainPage({lang}: {lang: Global.SupportedLang}) {
  const t = await getDictionary(lang);

  return (
    <NewContent t={t}/>
  );
}
