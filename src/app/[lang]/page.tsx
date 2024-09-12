import { getDictionary } from "./i18n";

export default async function Home({
  params: { lang },
}: {
  params: { lang: Global.SupportedLang };
}) {
  const t = await getDictionary(lang);

  return (
    <div className='relative mx-auto flex h-full w-full max-w-3xl flex-1 flex-col md:px-2 bg-pink-100'>
      {t.home.title}
    </div>
  );
}
