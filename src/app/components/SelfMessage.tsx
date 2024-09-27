import React from "react";
import MarkdownRenderer from "./MarkdownRenderer";
import { EditOutlined } from "@ant-design/icons";

import Image from "next/image";

export default function SelfMessage({
  content,
  avatar,
  onReEdit,
}: {
  content: string;
  avatar: string;
  onReEdit: () => void;
}) {
  return (
    <div className="w-full ">
      <div className="flex items-start">
        <div className="flex items-start rounded-lg p-2 gap-3 px-3 relative group max-w-full">
          <Image
            src={avatar}
            alt="avatar"
            width={32} // 对应于 w-6（6 * 4 = 24px）
            height={32} // 对应于 h-6
            className="rounded-full flex-shrink-0 object-cover w-8 h-8"
          />
          <div className="markdown-content border-slate-400 rounded-lg overflow-hidden break-words w-full">
            <MarkdownRenderer content={content} />
          </div>
          <div
            className={`absolute w-6 h-6 flex items-center justify-center p-1 -bottom-2 -right-2 text-slate-500 rounded-md bg-[#e5d7d0]
            cursor-pointer border border-[#c8c6b7] hover:bg-[#f6e7e1] opacity-0 group-hover:opacity-100`}
            onClick={onReEdit}
          >
            <EditOutlined />
          </div>
        </div>
      </div>
    </div>
  );
}
