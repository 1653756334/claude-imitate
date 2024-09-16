"use client";
import { CommentOutlined, DownOutlined } from "@ant-design/icons";
import React from "react";

export default function ChatContent({ t, params }: Chat.ChatContentProps) {
  return (
    <div>
      <header className="sticky top-0 z-10 -mb-6 flex h-14 items-center gap-3 pl-11 pr-2 md:pb-0.5 md:pl-6">
        <div className="flex items-center gap-2 mx-auto text-lg text-black/80">
          <div>
            <CommentOutlined />
          </div>
          <div className="py-1 px-2 flex items-center gap-1 cursor-pointer rounded-lg hover:bg-amber-900/10">
            {t.title} <DownOutlined className="text-sm" />
          </div>
        </div>
      </header>
      <main className="flex-1 flex flex-col gap-3 px-4 max-w-3xl mx-auto w-full pt-1">
        {params.id}
      </main>
    </div>
  );
}
