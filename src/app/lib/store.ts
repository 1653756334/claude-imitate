import { create } from "zustand";
import { DEFAULT_MODEL_LIST } from "./constant";

export const useSettingStore = create<Store.SettingState & Store.SettingAction>(
  (set) => ({
    settings: {
      baseUrl: "",
      APIKey: "",
      models: [],
      customerModels: [],
      currentDisplayModel: "gpt-4o-mini",
      currentModel: "gpt-4o-mini",
      historyNum: 5,
      random: 0.5,
      sysPrompt: "You are a helpful assistant.",
    },
    getSettingFromLocal: () => {
      const setting = localStorage.getItem("setting");
      if (setting) {
        // const newSetting = JSON.parse(setting);
        // if (newSetting.models && newSetting.models.length == 0) {
        //   newSetting.models = [
        //     { key: "gpt-4-1106-preview", label: "gpt-4-1106-preview" },
        //     { key: "gpt-4o", label: "gpt-4o" },
        //     { key: "gpt-4o-mini", label: "gpt-4o-mini" },
        //     { key: "claude-3-5-sonnet-20240620", label: "claude-3-5-sonnet-20240620" },
        //   ];
        // }
        set((state) => {
          const newSetting = { ...state.settings, ...JSON.parse(setting) } as Store.Setting;
          newSetting.models = DEFAULT_MODEL_LIST;
          const modelsToAdd = DEFAULT_MODEL_LIST.filter(defaultModel => 
            !newSetting.models.some(existingModel => existingModel.key === defaultModel.key)
          );
          newSetting.models = newSetting.models.concat(modelsToAdd);
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
    saveOneSettingToLocal: <K extends keyof Store.Setting>(key: K, value: Store.Setting[K]) => {
      set((state) => {
        const newSetting = { ...state.settings, [key]: value };
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
      avatar: "https://avatars.githubusercontent.com/u/71807854?s=48&v=4",
      name: "ClaudeImitate",
    },

    setUserToLocal: (user: Store.User) => {
      localStorage.setItem("user", JSON.stringify(user));
      set((state) => ({ user: { ...state.user, ...user } }));
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
  (set) => ({
    data: [],
    addMessage: (sessionId: string, message: Store.Message) =>
      set((state) => {
        const session = state.data.find((session) => session.id === sessionId);
        if (session) {
          session.messages.push(message);
        }
        return { data: state.data };
      }),
    deleteMessage: (id: string, messageId: string) =>
      set((state) => {
        const session = state.data.find((session) => session.id === id);
        if (session) {
          session.messages = session.messages.filter(
            (message) => message.id !== messageId
          );
        }
        return { data: state.data };
      }),
    addSession: (id: string) =>
      set((state) => {
        state.data.push({ id, messages: [] });
        return { data: state.data };
      }),
    deleteSession: (id: string) =>
      set((state) => {
        state.data = state.data.filter((session) => session.id !== id);
        return { data: state.data };
      }),
    saveSessionToLocal: () =>
      set((state) => {
        localStorage.setItem("sessions", JSON.stringify(state.data));
        return { data: state.data };
      }),
    getSessionFromLocal: () =>
      set((state) => {
        const sessions = localStorage.getItem("sessions");
        if (sessions) {
          state.data = JSON.parse(sessions);
        }
        return { data: state.data };
      }),
  })
);
