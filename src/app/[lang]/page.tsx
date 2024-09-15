import New from "./new/page";

export default async function Home({
  params: { lang },
}: {
  params: { lang: Global.SupportedLang };
}) {
  return <New lang={lang} />;
}
