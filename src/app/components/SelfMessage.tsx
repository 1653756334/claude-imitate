import React from "react";
import MarkdownRenderer from "./MarkdownRenderer";
import { EditOutlined } from "@ant-design/icons";

export default function SelfMessage({
  content,
  avatar,
  onReEdit
}: {
  content: string;
  avatar: string;
  onReEdit: () => void;
}) {
  return (
    <div className="w-full">
      <div className="flex items-start">
        <div className="flex items-start bg-gradient-to-tl from-amber-500/20 to-amber-800/5 rounded-lg p-2 gap-3 px-3 relative group max-w-full">
          <img src={avatar} alt="avatar" className="w-6 h-6 rounded-full flex-shrink-0" />
          <div className="markdown-content border-slate-400 rounded-lg overflow-hidden break-words">
            <MarkdownRenderer content={content} />
          </div>
          <div className={`absolute w-6 h-6 flex items-center justify-center p-1 -bottom-2 -right-2 text-slate-500 rounded-md bg-[#e5d7d0]
            cursor-pointer border border-[#c8c6b7] hover:bg-[#f6e7e1] opacity-0 group-hover:opacity-100`} onClick={onReEdit}>
            <EditOutlined />
          </div>
        </div>
      </div>
    </div>
  );
}
