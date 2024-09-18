import React from "react";
import dynamic from "next/dynamic";
import { getDictionary } from "@/app/[lang]/i18n";

const DynamicSliderContent = dynamic(() => import("./Slider"), { ssr: false });


export default async function SlideServer({ lang }: Slider.SlideServerProps) {
  const t = await getDictionary(lang);
  return (
    <div>
      <DynamicSliderContent t={t} />
    </div>
  );
}


