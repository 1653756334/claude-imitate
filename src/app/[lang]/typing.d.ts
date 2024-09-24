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
    setting: {
      [key: string]: string;
    };
    login: {
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

declare namespace Login {
  interface LoginContentProps {
    t: Global.Dictionary;
  }

  interface LoginFrom {
    email: string;
    password: string;
  }
  interface RegisterFrom {
    username: string;
    email: string;
    password: string;
    code: string;
  }
  interface ResetPasswordFrom {
    email: string;
    password: string;
    code: string;
  }

  interface LoginProps {
    form: FormInstance<LoginFrom>;
    setActiveTab: (tab: string) => void;
    onLogin: (values: LoginFrom) => void;
    t: Global.Dictionary;
  }
  interface RegisterProps {
    form: FormInstance<RegisterFrom>;
    onRegister: (values: RegisterFrom) => void;
    sendVerificationCode: (email: string) => void;
    t: Global.Dictionary;
  }
  interface ResetPasswordProps {
    form: FormInstance<ResetPasswordFrom>;
    onResetPassword: (values: ResetPasswordFrom) => void;
    sendVerificationCode: (email: string) => void;
    setActiveTab: (tab: string) => void;
    t: Global.Dictionary;
  }
}

declare namespace Store {
  interface Model {
    label: string; // 显示的名称
    key: string; // 实际的名称
  }
  interface Setting {
    baseUrl: string;
    APIKey: string;
    models: Model[];
    customerModels: string[];
    currentDisplayModel: string;
    currentModel: string;
    historyNum: number;
    random: number;
    sysPrompt: string;
  }
  interface SettingState {
    settings: Setting;
  }
  interface SettingAction {
    getSettingFromLocal: () => void;
    saveSettingsToLocal: (setting: Setting) => void;
    saveOneSettingToLocal: <K extends keyof Setting>(key: K, value: Setting[K]) => void;
  }

  interface User {
    email: string;
    avatar: string;
    name: string;
  }
  interface UserState {
    user: User;
  }
  interface UserAction {
    setUserToLocal: (user: User) => void;
    getUserFromLocal: () => void;
  }

  interface Message {
    id: string;
    content: string;
    role: "user" | "assistant";
    createdAt: number;
  }
  interface Session {
    id: string;
    messages: Message[];
  }
  interface SessionState {
    data: Session[];
  }
  interface SessionAction {
    addMessage: (sessionId: string, message: Message) => void;
    deleteMessage: (id: string, messageId: string) => void;
    addSession: (id: string) => void;
    deleteSession: (id: string) => void;
    saveSessionToLocal: () => void;
    getSessionFromLocal: () => void;
  }
}
