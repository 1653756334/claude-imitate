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
    new: {
      [key: string]: string;
    };
    chat: {
      [key: string]: string;
    };
  }
}

declare namespace Recents {
  interface RecentsContentProps {
    t: Global.Dictionary;
  }
}

declare namespace Chat {
  interface ChatItem {
    role: "user" | "assistant";
    content: string;
  }
  interface ChatContentProps {
    t: Global.Dictionary;
  }
}
