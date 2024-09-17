"use client";
import { CommentOutlined, DownOutlined } from "@ant-design/icons";
import React, { useRef, useState, useEffect } from "react";

import OutsideClickHandler from "@/app/components/OutsideClickHandler";
import Confirm from "@/app/components/Comfirm";
import Modify from "@/app/components/Modify";
import DropdownMenu from "@/app/components/DropDown";
import SelfMessage from "@/app/components/SelfMessage";
import AssistantMsg from "@/app/components/AssistantMsg";

const markdown = `
# Hello

This is some **bold** and *italic* text.

\`\`\`javascript
function greet(name) {
  console.log(\`Hello, \${name}!\`);
}
greet('World');
\`\`\`
1234567
  `;

export default function ChatContent({ t, params }: Chat.ChatContentProps) {
  const [showModify, setShowModify] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [content, setContent] = useState("");
  const [model, setModel] = useState("gpt-4-1106-preview");

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

  const dropdownItems = [
    { label: "gpt-4-1106-preview" },
    { label: "gpt-4o" },
    { label: "gpt-4o-mini" },
    { label: "claude-3-5-sonnet-20240620" },
  ];

  const onDeleteChat = () => {
    const data = {
      title: t.chat.delete_title,
      content: t.chat.delete_content,
      yesText: t.confirm.delete,
      noText: t.confirm.no,
      visible: true,
    };
    setConfirmData({
      title: t.chat.delete_title,
      content: t.chat.delete_content,
      yesText: t.confirm.delete,
      noText: t.confirm.no,
      visible: true,
      onConfirm: () => {
        setConfirmData({ ...data, visible: false });
      },
      onCancel: () => {
        setConfirmData({ ...data, visible: false });
      },
    });
  };
  const renameChat = (value: string) => {
    console.log(value);
  };
  const onRenameChat = () => {
    const data = {
      title: t.chat.rename_title,
      content: params.title!,
      yesText: t.confirm.rename,
      noText: t.confirm.no,
      visible: true,
    };
    setModifyData({
      title: t.chat.rename_title,
      content: params.title!,
      yesText: t.confirm.rename,
      noText: t.confirm.no,
      visible: true,
      onConfirm: (value: string) => {
        renameChat(value);
        setModifyData({ ...data, visible: false });
      },
      onCancel: () => {
        setModifyData({ ...data, visible: false });
      },
    });
  };
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    adjustTextareaHeight();
  };
  const chooseModel = (model: string) => {
    setModel(model);
  };
  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 370)}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [content]);

  return (
    <div>
      <header className=" top-0 z-10 -mb-6 flex h-14 items-center gap-3 pl-11 pr-2 md:pb-0.5 md:pl-6 relative">
        <div className=" pointer-events-none absolute inset-0 -bottom-7 z-[-1] bg-gradient-to-t from-transparent via-amber-900/5 to-amber-900/10 blur"></div>
        <div className="flex items-center gap-2 mx-auto text-lg text-black/80">
          <div>
            <CommentOutlined />
          </div>
          <OutsideClickHandler onOutsideClick={() => setShowModify(false)}>
            <div
              className="py-1 px-2 flex items-center gap-1 cursor-pointer rounded-lg hover:bg-amber-900/10 relative"
              onClick={() => setShowModify(!showModify)}
            >
              {t.title}
              <DownOutlined className="text-sm" />
              <div
                className={`absolute whitespace-nowrap top-full left-1/2 -translate-x-1/2 translate-y-1 bg-amber-600/10 flex flex-col items-center border border-amber-600/50 rounded-lg justify-center gap-1 p-1 text-sm
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
      <main className="flex-1 flex flex-col px-4 max-w-3xl mx-auto w-full pt-1 h-[calc(100vh-3.3rem)] mt-5">
        {/* 聊天记录 */}
        <div className="flex-1 overflow-y-auto scrollbar flex flex-col gap-5">
          <SelfMessage
            content={markdown}
            avatar={"https://avatars.githubusercontent.com/u/103247417?v=4"}
            onReEdit={() => {
              setContent(markdown);
            }}
          />
          <AssistantMsg
            content={markdown+"21vfnduhijlbndwiuvghwguybfdnjwskvjbio eribhkkryukwhbejiowbrhowgbyruwkgbdsjkvhdsui"}
          />
        </div>
        {/* 底部输入框 */}
        <div className="w-full  gap-3 flex flex-col relative z-10">
          <div className="relative p-5 pr-12 bg-white rounded-2xl border-2 border-gray-300 border-b-0 rounded-b-none">
            <div className="w-full">
              <textarea
                ref={textareaRef}
                value={content}
                onChange={handleChange}
                className="w-full outline-none scrollbar-thin scrollbar-thumb-orange-200 scrollbar-track-transparent resize-none bg-transparent scrollbar"
                placeholder="请输入你的需求"
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
                  items={dropdownItems}
                  callback={(item) => {
                    chooseModel(item.label);
                  }}
                  width="100px"
                  position="top"
                >
                  {model}
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Confirm {...confirmData} />
      <Modify {...modifyData} />
    </div>
  );
}
