import { create } from "zustand";
import { DEFAULT_MODEL_LIST } from "./constant";

export const useSettingStore = create<Store.SettingState & Store.SettingAction>(
  (set) => ({
    settings: {
      baseUrl: "",
      APIKey: "",
      models: [],
      customerModels: [],
      currentDisplayModel: "GPT-4o mini",
      currentModel: "gpt-4o-mini",
      historyNum: 5,
      random: 0.5,
      sysPrompt: "You are a helpful assistant.",
      filePostUrl: "",
      secret: "",
      maxFileSize: 10,
    },
    getSettingFromLocal: () => {
      const setting = localStorage.getItem("setting");
      if (setting) {
        set((state) => {
          const newSetting = {
            ...state.settings,
            ...JSON.parse(setting),
          } as Store.Setting;

          // 合并默认模型列表和用户自定义模型列表
          const customerModels = newSetting.customerModels
            .filter((model) => model.trim() !== "")
            .map((model) => ({ label: model, value: model }));

          // 添加customer model 并去重
          newSetting.models = newSetting.models
            .concat(customerModels)
            .concat(DEFAULT_MODEL_LIST)
            .filter(
              (model, index, self) =>
                index === self.findIndex((t) => t.value === model.value)
            )
            .sort((a, b) => a.value.localeCompare(b.value));
          localStorage.setItem("setting", JSON.stringify(newSetting));
          return { settings: newSetting };
        });
      } else {
        set((state) => {
          const newSetting = { ...state.settings, models: DEFAULT_MODEL_LIST };
          localStorage.setItem("setting", JSON.stringify(newSetting));
          return { settings: newSetting };
        });
      }
    },
    saveSettingsToLocal: (setting: Store.Setting) => {
      set((state) => {
        const newSetting = { ...state.settings, ...setting };
        localStorage.setItem("setting", JSON.stringify(newSetting));
        return { settings: newSetting };
      });
    },
    saveOneSettingToLocal: <K extends keyof Store.Setting>(
      key: K,
      value: Store.Setting[K]
    ) => {
      set((state) => {
        const newSetting = { ...state.settings, [key]: value };
        if (key === "customerModels") {
          const valueToAdd = (value as string[])
            .filter((model) => model.trim() !== "")
            .map((model) => ({ label: model, value: model }));
          newSetting.models = DEFAULT_MODEL_LIST.concat(valueToAdd).filter(
            (model, index, self) =>
              index === self.findIndex((t) => t.value === model.value)
          );
        }
        localStorage.setItem("setting", JSON.stringify(newSetting));
        return { settings: newSetting };
      });
    },
  })
);

export const useUserStore = create<Store.UserState & Store.UserAction>(
  (set) => ({
    user: {
      email: "bashirian76100@gmail.com",
      avatar: "https://avatars.githubusercontent.com/u/71807854?s=8100&v=4",
      name: "ClaudeImitate",
    },

    setUserToLocal: (user: Store.User) => {
      localStorage.setItem("user", JSON.stringify(user));
      set((state) => ({ user: { ...state.user, ...user } }));
    },
    setOneUserInfoToLocal: (
      key: keyof Store.User,
      value: Store.User[keyof Store.User]
    ) => {
      set((state) => {
        const newUser = { ...state.user, [key]: value };
        localStorage.setItem("user", JSON.stringify(newUser));
        return { user: newUser };
      });
    },
    getUserFromLocal: () => {
      const user = localStorage.getItem("user");
      if (user) {
        set((state) => ({ user: { ...state.user, ...JSON.parse(user) } }));
      }
    },
  })
);

export const useSessionStore = create<Store.SessionState & Store.SessionAction>(
  (set, get) => ({
    chatData: [],
    curMsg: "",
    getReversedChatData: () => {
      const chatData = get().chatData;
      const reversedChatData = chatData.sort(
        (a, b) => b.createdAt - a.createdAt
      );
      return reversedChatData;
    },
    addMessage: (sessionId: string, message: Global.ChatItem) =>
      set((state) => {
        const session = state.chatData.find(
          (session) => session.id === sessionId
        );
        if (session) {
          session.messages.push(message);
        }
        localStorage.setItem("sessions", JSON.stringify(state.chatData));
        return { chatData: state.chatData };
      }),
    deleteMessage: (id: string, messageId: string) =>
      set((state) => {
        const session = state.chatData.find((session) => session.id === id);
        if (session) {
          session.messages = session.messages.filter(
            (message) => message.id !== messageId
          );
          localStorage.setItem("sessions", JSON.stringify(state.chatData));
        }
        return { chatData: state.chatData };
      }),
    renameSession: (id: string, title: string) =>
      set((state) => {
        const session = state.chatData.find((session) => session.id === id);
        if (session) {
          session.title = title;
        }
        localStorage.setItem("sessions", JSON.stringify(state.chatData));
        return { chatData: state.chatData };
      }),
    addSession: (id: string, title: string) =>
      set((state) => {
        state.chatData.push({ id, title, messages: [], createdAt: Date.now() });
        localStorage.setItem("sessions", JSON.stringify(state.chatData));
        return { chatData: state.chatData };
      }),
    deleteSession: (id: string) =>
      set((state) => {
        state.chatData = state.chatData.filter((session) => session.id !== id);
        localStorage.setItem("sessions", JSON.stringify(state.chatData));
        return { chatData: state.chatData };
      }),
    saveSessionToLocal: () =>
      set((state) => {
        localStorage.setItem("sessions", JSON.stringify(state.chatData));
        return { chatData: state.chatData };
      }),
    getSessionFromLocal: () =>
      set((state) => {
        const sessions = localStorage.getItem("sessions");
        if (sessions) {
          state.chatData = JSON.parse(sessions);
        }
        return { chatData: state.chatData };
      }),
    getSessionById: (id: string) => {
      const sessions = get().chatData;
      return sessions.find((session) => session.id === id);
    },
    setCurMsg: (msg: string) => set(() => ({ curMsg: msg })),
  })
);
