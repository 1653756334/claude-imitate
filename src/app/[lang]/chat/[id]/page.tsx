import React from "react";
import dynamic from "next/dynamic";

import {getDictionary} from "@/app/[lang]/i18n"

const DynamicChatContent = dynamic(() => import("./ChatContent"), {
  ssr: false,
});

export default async function Chat({ params }: { params: { id: string, lang: Global.SupportedLang } }) {

  const t = await getDictionary(params.lang);
  const title = "这里写一个临时的吧";
  
  return (
    <div>
      <DynamicChatContent t={t} params={{id: params.id, chatList: [], title}} />
    </div>
  );
}
