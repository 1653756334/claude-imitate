"use client";
import { CommentOutlined, DownOutlined } from "@ant-design/icons";
import React, { useState } from "react";

import OutsideClickHandler from "@/app/components/OutsideClickHandler";
import Confirm from "@/app/components/Comfirm";
import Modify from "@/app/components/Modify";

export default function ChatContent({ t, params }: Chat.ChatContentProps) {
  const [showModify, setShowModify] = useState(false);
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

  const onDeleteChat = () => {
    setConfirmData({
      title: t.chat.delete_title,
      content: t.chat.delete_content,
      yesText: t.confirm.delete,
      noText: t.confirm.no,
      visible: true,
      onConfirm: () => {
        setConfirmData({ ...confirmData, visible: false });
      },
      onCancel: () => {
        setConfirmData({ ...confirmData, visible: false });
      },
    });
  };
  const onRenameChat = () => {
    setModifyData({
      title: t.chat.rename_title,
      content: params.title!,
      yesText: t.confirm.rename,
      noText: t.confirm.no,
      visible: true,
      onConfirm: (value: string) => {
        console.log(value);
        setModifyData({ ...modifyData, visible: false });
      },
      onCancel: () => {
        setModifyData({ ...modifyData, visible: false });
      },
    });
  };
  return (
    <div>
      <header className="sticky top-0 z-10 -mb-6 flex h-14 items-center gap-3 pl-11 pr-2 md:pb-0.5 md:pl-6">
        <div className="flex items-center gap-2 mx-auto text-lg text-black/80">
          <div>
            <CommentOutlined />
          </div>
          <OutsideClickHandler onOutsideClick={() => setShowModify(false)}>
            <div
              className="py-1 px-2 flex items-center gap-1 cursor-pointer rounded-lg hover:bg-amber-900/10 relative"
              onClick={() => setShowModify(!showModify)}
            >
              {t.title} <DownOutlined className="text-sm" />
              <div
                className={`absolute top-full left-1/2 -translate-x-1/2 translate-y-1 bg-amber-600/10 flex flex-col items-center border border-amber-600/50 rounded-lg justify-center gap-1 p-1 text-sm
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
      <main className="flex-1 flex flex-col gap-3 px-4 max-w-3xl mx-auto w-full pt-1">
        {params.id}
      </main>
      <Confirm {...confirmData} />
      <Modify {...modifyData} />
    </div>
  );
}
