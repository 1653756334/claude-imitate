import NewServer from "@/app/components/New/NewServer";

export default async function Home({
  params: { lang },
}: {
  params: { lang: Global.SupportedLang };
}) {
  return <NewServer lang={lang} />;
}
