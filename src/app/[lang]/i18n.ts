import "server-only";

const dictionaries = {
  en: () => import("@/app/locales/en.json").then((module) => module.default),
  zh: () => import("@/app/locales/zh.json").then((module) => module.default),
};

export const getDictionary = async (locale: Global.SupportedLang) => dictionaries[locale]();
