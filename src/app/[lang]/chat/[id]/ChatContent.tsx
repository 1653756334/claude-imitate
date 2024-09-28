"use client";
import {
  ArrowUpOutlined,
  CommentOutlined,
  DownOutlined,
} from "@ant-design/icons";
import React, { useRef, useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { v4 as uuid } from "uuid";

import OutsideClickHandler from "@/app/components/OutsideClickHandler";
import Confirm from "@/app/components/Comfirm";
import Modify from "@/app/components/Modify";
import DropdownMenu from "@/app/components/DropDown";
import SelfMessage from "@/app/components/SelfMessage";
import AssistantMsg from "@/app/components/AssistantMsg";
import {
  useSettingStore,
  useSessionStore,
  useUserStore,
} from "@/app/lib/store";
import { throttle } from "@/app/lib/utils";
import { message as Message } from "antd";
import { IconProvider } from "@/app/components/IconProvider";
import HintText from "@/app/components/HintText";
export default function ChatContent({ t }: Chat.ChatContentProps) {
  const pathname = usePathname();
  const session_id = pathname.split("/").slice(-1)[0];
  const [showModify, setShowModify] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [curChat, setCurChat] = useState<string>("");
  const [content, setContent] = useState("");
  const [chatList, setChatList] = useState<Global.ChatItem[]>([]);
  const [loading, setLoading] = useState(false);
  const breakStreamRef = useRef(false);

  const chatListRef = useRef<HTMLDivElement>(null);
  const { settings, saveOneSettingToLocal } = useSettingStore();
  const { user } = useUserStore();

  const {
    setCurMsg,
    curMsg,
    getSessionById,
    addMessage,
    deleteSession,
    renameSession,
    deleteMessage,
  } = useSessionStore();

  const router = useRouter();

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 370)}px`;
    }
  };

  const [confirmData, setConfirmData] = useState<Comfirm.ComfirmProps>({
    title: "",
    content: "",
    onCancel: () => {},
    onConfirm: () => {},
    visible: false,
    yesText: "",
    noText: "",
  });
  const [modifyData, setModifyData] = useState<Modify.ModifyProps>({
    title: "",
    content: "",
    onCancel: () => {},
    onConfirm: () => {},
    visible: false,
    yesText: "",
    noText: "",
  });

  const hasSentMessage = useRef(true);

  // 先加载历史记录
  const session = getSessionById(session_id) || { messages: [], title: "" };

  useEffect(() => {
    if (hasSentMessage.current) {
      setChatList(session.messages);
      downToBottom();
    }
    // 说明从上个页面过来，需要发送
    if (curMsg !== "" && hasSentMessage.current) {
      streamChat();
      // 标记消息已发送
      hasSentMessage.current = false;
      // 清除 curMsg，防止重复发送
      setCurMsg("");
    }
    // 清理函数
    return () => {
      hasSentMessage.current = false;
    };
  }, []);

  useEffect(() => {
    setChatList(session.messages);
  }, [session.messages.length]);

  useEffect(() => {
    adjustTextareaHeight();
  }, [content]);

  const onDeleteChat = () => {
    const data = {
      title: t.chat.delete_title,
      content: t.chat.delete_content,
      yesText: t.confirm.delete,
      noText: t.confirm.no,
      visible: true,
    };
    setConfirmData({
      ...data,
      onConfirm: () => {
        setConfirmData({ ...data, visible: false });
        deleteSession(session_id);
        router.push("/new");
      },
      onCancel: () => {
        setConfirmData({ ...data, visible: false });
      },
    });
  };

  const onRenameChat = () => {
    const data = {
      title: t.chat.rename_title,
      content: session.title,
      yesText: t.confirm.rename,
      noText: t.confirm.no,
      visible: true,
    };
    setModifyData({
      ...data,
      onConfirm: (value: string) => {
        renameSession(session_id, value);
        setModifyData({ ...data, visible: false, content: value });
      },
      onCancel: () => {
        setModifyData({ ...data, visible: false });
      },
    });
  };
  const handleEditChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };
  const chooseModel = (item: Store.Model) => {
    saveOneSettingToLocal("currentModel", item.value);
    saveOneSettingToLocal("currentDisplayModel", item.label);
  };

  const isScrolledToBottom = () => {
    if (chatListRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatListRef.current;
      return scrollTop + clientHeight >= scrollHeight - 30; // 允许30px的误差
    }
    return false;
  };

  const downToBottom = () => {
    if (chatListRef.current) {
      setTimeout(() => {
        chatListRef.current?.scrollTo({
          top: chatListRef.current.scrollHeight + 100,
          behavior: "smooth",
        });
      }, 100);
    }
  };

  const throttleDownToBottom = throttle(downToBottom, 50);

  async function genTitle(historyMsgList: Global.ChatItem[]) {
    try {
      const res = await fetch("/api/chat-out-stream", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          key: settings.APIKey,
          secret: settings.secret,
          historyMsgList: [
            ...historyMsgList,
            {
              role: "user",
              content: t.chat.generate_title,
            },
          ],
          systemPrompt: t.chat.generate_title,
          baseUrl: settings.baseUrl,
        }),
      });
      if (res.ok) {
        const title = await res.json();
        renameSession(session_id, title.msg.toString());
      } else {
        Message.error(t.chat.generate_title_failed);
      }
    } catch (e) {
      console.log(e);
      Message.error(t.chat.generate_title_failed);
    }
  }

  async function streamChat(message?: Global.ChatItem) {
    setLoading(true);
    breakStreamRef.current = false;
    let historyMsgList: Global.ChatItem[] = [];
    const systemPrompt = settings.sysPrompt;
    if (chatList.length > 0) {
      const historyCnt = settings.historyNum;
      historyMsgList = chatList.slice(-historyCnt);
    } else {
      historyMsgList = getSessionById(session_id)?.messages || [];
    }
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: settings.currentModel,
        historyMsgList,
        temperature: settings.random,
        systemPrompt,
        key: settings.APIKey,
        baseUrl: settings.baseUrl,
        secret: settings.secret,
      }),
    });

    if (!response.ok) {
      const res = await response.json();
      let errMsg = JSON.stringify(res.msg.error);

      if (res.code === 400) {
        errMsg += ", " + t.chat.error_hint;
      }
      addMessage(session_id, {
        role: "assistant",
        content: errMsg,
        id: uuid(),
        createdAt: Date.now(),
      });
      // console.log(res);

      downToBottom();
      setLoading(false);
      return;
    }

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    let messgae_slice = "";

    while (true) {
      if (breakStreamRef.current) {
        reader?.cancel();
        setLoading(false);
        breakStreamRef.current = false;
        setCurChat("");
        // 停止的时候删除消息，只有一条消息就删除会话
        if (message) {
          deleteMessage(session_id, message.id);
        } else {
          deleteSession(session_id);
          router.push("/new");
        }
        break;
      }
      const { done, value } = await reader!.read();

      if (done) {
        setLoading(false);
        break;
      }
      const chunk = decoder.decode(value);
      const lines = chunk.split("\n");

      for (const line of lines) {
        if (line.startsWith("data: ")) {
          const data = line.replace("data: ", "");
          if (data === "[DONE]") {
            // 流结束
            const all_message = {
              role: "assistant" as const,
              content: messgae_slice,
              id: uuid(),
              createdAt: Date.now(),
            };
            setCurChat("");
            addMessage(session_id, all_message);
            downToBottom();
            setLoading(false);
            // 第一次发送信息生成标题
            if (chatList.length <= 2) {
              genTitle(historyMsgList);
            }
          } else {
            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices[0].delta.content;
              if (content) {
                messgae_slice += content;
                // 节流
                throttle(setCurChat, 1000 / 60)(messgae_slice);
              }
              // 如果内容滑到了底部，就一直往底下滚动
              if (isScrolledToBottom()) {
                throttleDownToBottom();
              }
            } catch (error) {
              console.error("解析JSON时出错:", error);
              setCurChat("");
            }
          }
        }
      }
    }
  }

  const sendMessage = async () => {
    if (content.trim() === "") {
      return;
    }
    const randonId = uuid();
    downToBottom();
    const message = {
      role: "user" as const,
      content,
      id: randonId,
      createdAt: Date.now(),
    };
    addMessage(session_id, message);
    setContent("");
    streamChat(message);
  };

  return (
    <div>
      <header className=" top-0 z-10 -mb-6 flex h-14 items-center gap-3 pl-11 pr-2 md:pb-0.5 md:pl-6 relative w-[80%] mx-auto">
        <div className=" pointer-events-none absolute inset-0 -bottom-7 z-[-1] bg-gradient-to-t from-transparent via-amber-900/5 to-amber-900/10 blur"></div>
        <div className="flex items-center gap-2 mx-auto text-lg text-black/80">
          <div>
            <CommentOutlined />
          </div>
          <OutsideClickHandler onOutsideClick={() => setShowModify(false)}>
            <div
              className="py-1 px-2 flex items-center gap-1 cursor-pointer rounded-lg hover:bg-amber-900/10 relative "
              onClick={() => setShowModify(!showModify)}
            >
              <div className="max-w-3xl overflow-hidden whitespace-nowrap text-ellipsis">
                {session.title}
              </div>
              <DownOutlined className="text-sm" />
              <div
                className={`absolute whitespace-nowrap top-full left-1/2 -translate-x-1/2 translate-y-1 bg-[#e2dbca] flex flex-col items-center border border-amber-600/50 rounded-lg justify-center gap-1 p-1 text-sm
                ${
                  showModify ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              >
                <div
                  className="cursor-pointer px-2 w-full text-center hover:bg-amber-900/10 rounded-md"
                  onClick={onRenameChat}
                >
                  {t.chat.rename}
                </div>
                <div
                  className="cursor-pointer px-2 w-full text-center hover:bg-amber-900/10 rounded-md"
                  onClick={onDeleteChat}
                >
                  {t.chat.delete}
                </div>
              </div>
            </div>
          </OutsideClickHandler>
        </div>
      </header>
      <main className="flex-1 flex flex-col px-4 mx-auto w-full pt-1 h-[calc(100vh-3.3rem)] mt-5 max-md:max-w-[100vw] max-md:px-3">
        {/* 聊天记录 */}
        <div
          className="flex-1 overflow-y-auto scrollbar flex w-full box-border px-2 max-md:px-0 my-5"
          ref={chatListRef}
        >
          <div className="max-w-3xl mx-auto flex flex-col gap-5 items-start w-full max-md:px-5">
            {chatList.map((item) => {
              if (item.role === "user") {
                return (
                  <SelfMessage
                    key={item.id}
                    content={item.content}
                    avatar={user.avatar}
                    onReEdit={() => {
                      setContent(item.content);
                    }}
                  />
                );
              } else {
                return <AssistantMsg key={item.id} content={item.content} />;
              }
            })}
            {curChat && curChat.trim() !== "" && (
              <AssistantMsg content={curChat} />
            )}
            <div
              style={{ animation: loading ? "spin 1s linear infinite" : "" }}
            >
              <IconProvider.LoadingTag fill="#da8d6d" width={28} height={28} />
            </div>
          </div>
        </div>
        {/* 底部输入框 */}
        <div className="w-full  gap-3 flex flex-col relative z-10 max-w-[800px] mx-auto">
          <div
            className="relative p-5 pb-3 pr-12 bg-white rounded-2xl border-2 border-gray-300 border-b-0 rounded-b-none flex flex-col gap-2"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                if (loading) return;
                sendMessage();
              }
            }}
          >
            <div className="w-full">
              <textarea
                ref={textareaRef}
                value={content}
                onChange={handleEditChange}
                className="w-full outline-none scrollbar-thin scrollbar-thumb-orange-200 scrollbar-track-transparent resize-none bg-transparent scrollbar"
                placeholder={t.new.placeholder}
                rows={1}
                style={{
                  minHeight: "24px",
                  maxHeight: "370px",
                  overflowY: "auto",
                }}
              />
            </div>
            <div className="text-sm relative z-10">
              <div className="">
                <DropdownMenu
                  items={settings.models}
                  callback={(item) => {
                    chooseModel(item);
                  }}
                  width="100px"
                  position="top"
                >
                  {settings.currentDisplayModel}
                </DropdownMenu>
              </div>
            </div>
          </div>
          <div
            className={`absolute right-2 top-3  rounded-lg p-2 cursor-pointer  w-8 h-8 flex items-center justify-center text-white
              ${
                loading
                  ? "border-orange-700/80 !p-0"
                  : "bg-orange-700/60 hover:bg-orange-700/80"
              }`}
            onClick={sendMessage}
          >
            {loading ? (
              <div
                onClick={() => {
                  breakStreamRef.current = true;
                }}
              >
                <HintText hintText={t.chat.pause} more={-55}>
                  <IconProvider.Pause width={24} height={24} fill="#da8d6d" />
                </HintText>
              </div>
            ) : (
              <ArrowUpOutlined />
            )}
          </div>
        </div>
      </main>
      <Confirm {...confirmData} />
      <Modify {...modifyData} />
    </div>
  );
}
