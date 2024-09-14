import { getDictionary } from "./i18n";

export default async function Home({
  params: { lang },
}: {
  params: { lang: Global.SupportedLang };
}) {
  const t = await getDictionary(lang);

  return (
    <div className="relative mx-auto h-full w-full max-w-3xl flex-1 l md:px-2 px-4 pb-20 md:pl-8 lg:mt-6 min-h-screen-w-scroll !mt-0 flex flex-col items-center gap-8 pt-12 md:pr-14 2xl:pr-20">
      {t.title}
    </div>
  );
}
