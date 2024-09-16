import { getDictionary } from "@/app/[lang]/i18n";
import dynamic from "next/dynamic";

const DynamicNewContent = dynamic(() => import("./NewContent"), { ssr: false });

export default async function MainPage({lang}: {lang: Global.SupportedLang}) {
  const t = await getDictionary(lang);

  return (
    <DynamicNewContent t={t}/>
  );
}
