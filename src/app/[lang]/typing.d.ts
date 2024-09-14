declare namespace Global {
  type SupportedLang = "en" | "zh";
  interface Dictionary {
    title: string;
    slider: {
      [key: string]: string;
    };
    recents: {
      [key: string]: string;
    };
    confirm: {
      [key: string]: string;
    };
  }
}

declare namespace Recents {
  type RecentsContentProps = {
    t: Global.Dictionary;
  };
}
