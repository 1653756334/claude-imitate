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
  };
}

declare namespace Chat {
  enum ChatRole {
    USER = "user",
    ASSISTANT = "assistant",
  }
  interface ChatItem {
    sessionId: string;
    role: ChatRole;
    content: string;
  }
  interface ChatContentProps {
    t: Global.Dictionary;
    params: {
      id?: string;
      title?: string;
      chatList?: Chat.ChatItem[];
    };
  };
}
