"use client";
import React, { useRef, useEffect, useState } from "react";
import { IconProvider } from "@/app/components/IconProvider";
import { ArrowUpOutlined } from "@ant-design/icons";
import DropdownMenu from "@/app/components/DropDown";

export default function NewContent() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [content, setContent] = useState("");

  const dropdownItems = [
    { label: "gpt-4-1106-preview" },
    { label: "gpt-4o" },
    { label: "gpt-4o-mini" },
  ];

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      if (textarea.scrollHeight <= 370) {
        textarea.style.height = `${textarea.scrollHeight}px`;
        textarea.style.overflowY = "hidden";
      } else {
        textarea.style.height = "370px";
        textarea.style.overflowY = "auto";
      }
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [content]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  return (
    <div className="relative mx-auto h-full w-full max-w-3xl flex-1 l md:px-2 px-4 pb-20 md:pl-8 lg:mt-6 min-h-screen-w-scroll !mt-0 flex flex-col items-center gap-8 pt-12 md:pr-14 2xl:pr-20">
      {/* 使用免费计划 */}
      <div className="text-sm text-gray-500 p-2 rounded-full bg-orange-200/50 border border-orange-300">
        Using limited free plan{" "}
        <span className="text-orange-600/80 cursor-pointer hover:text-orange-600 hover:underline">
          Upgrade
        </span>
      </div>
      {/* 欢迎 */}
      <div className="flex items-center gap-3">
        <div>
          <IconProvider.AI height={32} width={32} fill="#fdba74" />
        </div>
        <h1 className="text-[2.5rem] text-gray-800/70 ">你好,{"名字"}</h1>
      </div>
      <div className="w-full rounded-xl border border-gray-200 p-5 gap-3 flex flex-col bg-white/90  shadow-orange-700/30 drop-shadow-xl pr-12 relative">
        <div className="w-full">
          <textarea
            ref={textareaRef}
            value={content}
            onChange={handleChange}
            className="w-full outline-none scrollbar-thin scrollbar-thumb-orange-200 scrollbar-track-transparent resize-none bg-transparent scrollbar"
            placeholder="请输入你的需求"
            style={{ minHeight: "50px", maxHeight: "380px" }} // 设置一个最小高度
          />
        </div>
        <div className="text-sm">
          <span className="">
            <DropdownMenu
              buttonText="gpt-4-1106-preview"
              items={dropdownItems}
              callback={(item) => {
                console.log(item);
              }}
              width="100px"
            />
          </span>
        </div>
        <div className="absolute right-2 top-3 bg-orange-700/60 rounded-lg p-2 cursor-pointer hover:bg-orange-700/80 w-8 h-8 flex items-center justify-center">
          <ArrowUpOutlined className="text-white" />
        </div>
      </div>
      <div></div>
    </div>
  );
}
