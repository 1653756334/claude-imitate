"use client";
import React, { useRef, useEffect, useState } from "react";
import { IconProvider } from "@/app/components/IconProvider";
import {
  ArrowRightOutlined,
  ArrowUpOutlined,
  CommentOutlined,
  LinkOutlined,
  PlusOutlined,
  UpOutlined,
} from "@ant-design/icons";
import DropdownMenu from "@/app/components/DropDown";
import HintText from "@/app/components/HintText";
import { message } from "antd";
import Link from "next/link";

export default function NewContent({ t }: { t: Global.Dictionary }) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [content, setContent] = useState("");
  const [fileList, setFileList] = useState<File[]>([]);
  const [showRecents, setShowRecents] = useState(true);
  const [model, setModel] = useState("gpt-4-1106-preview");

  const dropdownItems = [
    { label: "gpt-4-1106-preview" },
    { label: "gpt-4o" },
    { label: "gpt-4o-mini" },
    { label: "claude-3-5-sonnet-20240620" },
  ];

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      if (textarea.scrollHeight <= 360) {
        textarea.style.height = `${textarea.scrollHeight}px`;
        textarea.style.overflowY = "hidden";
      } else {
        textarea.style.height = "360px";
        textarea.style.overflowY = "auto";
      }
    }
  };

  const onAddFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      if (files.length + fileList.length > 5) {
        message.error(t.new.max5);
        return;
      }
      setFileList((prev) => [...prev, ...files]);
    }
  };

  const chooseModel = (model: string) => {
    setModel(model);
  };

  const onRemoveFile = (file: File) => {
    setFileList((prev) => prev.filter((f) => f !== file));
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
        {t.new.using}
        <span className="text-orange-600/80 cursor-pointer hover:text-orange-600 hover:underline">
          {t.new.upgrade}
        </span>
      </div>
      {/* 欢迎 */}
      <div className="flex items-center gap-3">
        <div>
          <IconProvider.AI height={32} width={32} fill="#d57858" />
        </div>
        <h1 className="text-[2.5rem] text-gray-800/70 ">
          {t.new.welcome} , {"名字"}
        </h1>
      </div>
      {/* 输入框 */}
      <div className="w-full  gap-3 flex flex-col shadow-orange-700/30 drop-shadow-xl relative z-10">
        <div className="relative p-5 pr-12 bg-white rounded-2xl border border-gray-200">
          <div className="w-full">
            <textarea
              ref={textareaRef}
              value={content}
              onChange={handleChange}
              className="w-full outline-none scrollbar-thin scrollbar-thumb-orange-200 scrollbar-track-transparent resize-none bg-transparent scrollbar"
              placeholder={t.new.placeholder}
              style={{ minHeight: "50px", maxHeight: "360px" }} // 设置一个最小高度
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
              >
                {model}
              </DropdownMenu>
            </div>
          </div>
        </div>
        <div className="absolute right-2 top-3 bg-orange-700/60 rounded-lg p-2 cursor-pointer hover:bg-orange-700/80 w-8 h-8 flex items-center justify-center">
          <ArrowUpOutlined className="text-white" />
        </div>
        {/* 文件上传 */}
        <div
          className={`relative pt-1  px-2 w-[96%] mx-auto -top-5 bg-orange-200/20 rounded-xl rounded-t-none -z-10 
					border border-orange-300 transition-all duration-300
					${fileList.length == 0 ? "max-h-[3.25rem]" : "max-h-[18rem]"}`}
        >
          <div className=" flex items-center justify-between h-12 select-none">
            <div className="text-sm text-gray-500">
              {fileList.length == 0
                ? t.new.file_desc
                : `${fileList.length} ${t.new.file_added}`}
            </div>
            <HintText hintText={t.new.upload_desc}>
              <div
                className={`text-sm text-gray-500 font-bold cursor-pointer hover:bg-gray-800/10 rounded-lg p-2 flex items-center justify-center
						gap-1`}
                onClick={() => {
                  document.querySelector("input")?.click();
                }}
              >
                <LinkOutlined className="text-lg" /> {t.new.upload_file}
                <input
                  type="file"
                  className="hidden"
                  multiple
                  onChange={(e) => onAddFile(e)}
                />
              </div>
            </HintText>
          </div>
          <div className="p-2 pt-0 grid grid-cols-5 relative scrollbar pb-3 gap-3">
            {fileList.map((file) => {
              const fullFilename = file.name;
              const fileExt = fullFilename.split(".").pop();
              const fileName = fullFilename.split(".").slice(0, -1).join(".");
              return (
                <div key={fullFilename} className="flex-shrink-0">
                  <HintText hintText={fullFilename} more={5}>
                    <div
                      className={`h-20 cursor-pointer relative w-full p-2 rounded-lg text-md text-gray-700 flex items-center justify-center hover:border hover:border-blue-300
										 drop-shadow-md shadow-blue-400`}
                      style={{
                        background:
                          "linear-gradient(to bottom, white, #e6f7ff)",
                      }}
                    >
                      <div className="font-bold text-blue-500/80 truncate -translate-y-1">
                        {fileName}
                      </div>
                      <div
                        className={`absolute -bottom-2 bg-blue-500/90 drop-shadow-lg shadow-blue-400 h-5 rounded-lg px-3 py-1
											 text-white justify-center items-center flex font-bold text-xs`}
                      >
                        {fileExt}
                      </div>
                      <div
                        className={`absolute -top-2 -left-2 w-5 h-5 p-1  bg-orange-200 flex items-center justify-center text-gray-500 rounded-full border border-gray-300
												hover:bg-orange-700 hover:text-white transition-all duration-300 rotate-45 font-bold`}
                        onClick={() => onRemoveFile(file)}
                      >
                        <PlusOutlined />
                      </div>
                    </div>
                  </HintText>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* 最近对话 */}
      <div className="w-full">
        <div className="flex justify-between text-sm text-black/80 font-bold">
          <div className="flex items-center gap-2">
            <CommentOutlined className="text-blue-400" /> {t.new.recent_chat}{" "}
            <div
              className={`cursor-pointer hover:bg-gray-800/10 rounded-lg p-1 h-6 flex items-center justify-center scale-90 text-gray-500 z-0`}
              onClick={() => setShowRecents(!showRecents)}
            >
              <UpOutlined
                className={`transform transition-transform duration-300 ease-in-out select-none  ${
                  showRecents ? "rotate-180" : ""
                }`}
              />
              {showRecents ? (
                ""
              ) : (
                <span className="ml-1 transition-opacity duration-300 ease-in-out">
                  {t.new.expand}
                </span>
              )}
            </div>
          </div>
          <Link href="/recents">
            <div className="flex items-center gap-1 group cursor-pointer font-medium">
              <span className="group-hover:underline">
                {t.new.show_all}
              </span>
              <span className="scale-85">
                <ArrowRightOutlined className="text-sm" />
              </span>
            </div>
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-4 overflow-hidden">
          {[...Array(6)].map((_, index) => (
            <Link href={`/chat/${index}`} key={index}>
              <div
                key={index}
                className={`flex flex-col justify-between cursor-pointer p-3 border rounded-md shadow-sm hover:drop-shadow-md
              border-gray-200 bg-gradient-to-b from-white/30 to-white/10 hover:from-white/80 hover:to-white/10 transition-all duration-300 ease-in-out
              ${
                showRecents
                  ? "max-h-[200px] opacity-100"
                  : "max-h-0 opacity-0 overflow-hidden"
              }`}
              >
                <div className="">
                  <CommentOutlined />
                </div>
                <div className="mt-2 text-sm font-medium truncate">
                  内容 {index + 1}
                </div>
                <div className="mt-2 text-xs text-gray-500">时间</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
