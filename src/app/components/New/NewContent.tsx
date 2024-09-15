"use client";
import React, { useRef, useEffect, useState } from "react";
import { IconProvider } from "@/app/components/IconProvider";
import { ArrowUpOutlined, LinkOutlined, PlusOutlined } from "@ant-design/icons";
import DropdownMenu from "@/app/components/DropDown";
import HintText from "@/app/components/HintText";
import { message } from "antd";

export default function NewContent({ t }: { t: Global.Dictionary }) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [content, setContent] = useState("");
  const [fileList, setFileList] = useState<File[]>([]);

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
        message.error("你最多添加5个文件");
        return;
      }
      setFileList((prev) => [...prev, ...files]);
    }
  };

	const onRemoveFile = (file: File) => {
		setFileList((prev) => prev.filter((f) => f !== file));
	}

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
          <IconProvider.AI height={32} width={32} fill="#d57858" />
        </div>
        <h1 className="text-[2.5rem] text-gray-800/70 ">
          {t.new.welcome} , {"名字"}
        </h1>
      </div>
      <div className="w-full  gap-3 flex flex-col shadow-orange-700/30 drop-shadow-xl relative">
        <div className="relative p-5 pr-12 bg-white rounded-2xl border border-gray-200">
          <div className="w-full">
            <textarea
              ref={textareaRef}
              value={content}
              onChange={handleChange}
              className="w-full outline-none scrollbar-thin scrollbar-thumb-orange-200 scrollbar-track-transparent resize-none bg-transparent scrollbar"
              placeholder="请输入你的需求"
              style={{ minHeight: "50px", maxHeight: "360px" }} // 设置一个最小高度
            />
          </div>
          <div className="text-sm">
            <div className="">
              <DropdownMenu
                buttonText="gpt-4-1106-preview"
                items={dropdownItems}
                callback={(item) => {
                  console.log(item);
                }}
                width="100px"
              />
            </div>
          </div>
        </div>
        <div className="absolute right-2 top-3 bg-orange-700/60 rounded-lg p-2 cursor-pointer hover:bg-orange-700/80 w-8 h-8 flex items-center justify-center">
          <ArrowUpOutlined className="text-white" />
        </div>
        <div
          className={`fixed pt-1 -translate-y-1 px-2 top-full w-[96%] left-1/2 -translate-x-1/2 bg-orange-200/20 rounded-xl rounded-t-none -z-10 
					border border-orange-300 transition-all duration-300
					${fileList.length == 0 ? "max-h-[3.25rem]" : "max-h-[18rem]"}`}
        >
          <div className=" flex items-center justify-between h-12 select-none">
            <div className="text-sm text-gray-500">
              {fileList.length == 0
                ? "这里是描述"
                : `${fileList.length} 个文件已添加`}
            </div>
            <HintText hintText="上传文件或者图片">
              <div
                className={`text-sm text-gray-500 font-bold cursor-pointer hover:bg-gray-800/10 rounded-lg p-2 flex items-center justify-center
						gap-1`}
                onClick={() => {
                  document.querySelector("input")?.click();
                }}
              >
                <LinkOutlined className="text-lg" /> 上传文件
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
      <div></div>
    </div>
  );
}
