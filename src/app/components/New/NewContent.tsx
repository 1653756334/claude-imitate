"use client";
import React, { useRef, useEffect, useState } from "react";
import { IconProvider } from "@/app/components/IconProvider";
import { useRouter } from "next/navigation";
import {
  ArrowRightOutlined,
  ArrowUpOutlined,
  CommentOutlined,
  LinkOutlined,
  LoadingOutlined,
  PlusOutlined,
  UpOutlined,
} from "@ant-design/icons";
import { v4 as uuid } from "uuid";

import DropdownMenu from "@/app/components/DropDown";
import HintText from "@/app/components/HintText";
import { Empty, message, Spin } from "antd";
import Link from "next/link";
import {
  useUserStore,
  useSettingStore,
  useSessionStore,
} from "@/app/lib/store";

export default function NewContent({ t }: { t: Global.Dictionary }) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);
  const dragCounter = useRef(0);

  const [content, setContent] = useState("");
  const [fileList, setFileList] = useState<File[]>([]);
  const [fileUrlList, setFileUrlList] = useState<New.FileItem[]>([]);
  const [sendFileLoading, setSendFileLoading] = useState(false);
  const [showRecents, setShowRecents] = useState(true);
  const [isDragging, setIsDragging] = useState(false);

  const router = useRouter();
  const { settings, saveOneSettingToLocal } = useSettingStore();
  const { user } = useUserStore();
  const { chatData, addSession, addMessage, setCurMsg } = useSessionStore();

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

  const isImg = (filename: string) => {
    const imgExt = ["png", "jpg", "jpeg", "gif", "bmp", "webp"];
    const fileExt = filename.split(".").pop();
    return fileExt && imgExt.includes(fileExt);
  };

  const sendMessageAction = () => {
    if (content.trim() == "") {
      return;
    }
    let curMsg = content;

    if (fileList.length != 0) {
      curMsg += fileUrlList
        .map((item) => {
          // 找出图片
          if (isImg(item.filename)) {
            return `![${item.filename}](${item.url})`;
          } else {
            return `[${item.filename}](${item.url})`;
          }
        })
        .join("\n");
    }
    const curSessionId = uuid();
    addSession(curSessionId, curMsg.slice(0, 50));
    addMessage(curSessionId, {
      role: "user",
      content: curMsg,
      id: uuid(),
      createdAt: Date.now(),
    });
    setContent("");
    setFileList([]);
    setFileUrlList([]);
    setCurMsg(curMsg);
    router.push(`/chat/${curSessionId}`);
  };

  const sendMessage = (
    e: React.KeyboardEvent | React.MouseEvent<HTMLDivElement>
  ) => {
    if (
      e.type === "keydown" &&
      (e as React.KeyboardEvent).key === "Enter" &&
      !(e as React.KeyboardEvent).shiftKey
    ) {
      e.preventDefault();
      sendMessageAction();
      // 在这里添加发送消息的逻辑
    } else if (e.type === "click") {
      sendMessageAction();
      // 在这里添加发送消息的逻辑
    }
  };

  const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file, file.name);
    formData.append("filePostUrl", settings.filePostUrl);
    formData.append("secret", settings.secret);

    setSendFileLoading(true);
    try {
      const response = await fetch("/api/file-server", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setFileUrlList((prev) => [
          ...prev,
          { filename: file.name, url: result.data.url },
        ]);
      } else {
        const res = await response.json();
        setFileList((prev) => prev.filter((f) => f !== file));
        console.log("文件上传失败", res);
        message.error(
          `${file.name} ${t.new.upload_file_error}, ${res.msg.error}`
        );
      }
    } catch (error) {
      console.error("上传错误:", error);
      message.error(`${file.name} ${t.new.upload_file_error}`);
      setFileList((prev) => prev.filter((f) => f !== file));
    } finally {
      setSendFileLoading(false);
    }
  };

  const handleFiles = async (files: File[]) => {
    if (files.length + fileList.length > 5) {
      message.error(t.new.max5);
      return;
    }

    for (const file of files) {
      if (file.size > 1024 * 1024 * settings.maxFileSize) {
        message.error(
          `${file.name} ${t.new.max_file_size}: ${settings.maxFileSize}MB`
        );
        continue;
      }

      setFileList((prev) => [...prev, file]);
      await uploadFile(file);
    }
  };

  const onAddFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      handleFiles(files);
    }
  };

  const chooseModel = (item: Store.Model) => {
    saveOneSettingToLocal("currentModel", item.value);
    saveOneSettingToLocal("currentDisplayModel", item.label);
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

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current++;
    console.log("进入：", dragCounter.current);
    
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current--;
    console.log("离开：", dragCounter.current);
    
    if (dragCounter.current == 0) {
      setIsDragging(false);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    dragCounter.current = 0;
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  return (
    <>
      <div
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragStart={() => console.log(111)}
        className={`fixed inset-0 ${
          isDragging ? "bg-black/30 z-50" : "pointer-events-none"
        } transition-all duration-300 flex items-center justify-center`}
      >
        {isDragging && (
          <div
            className="relative bg-gray-300 py-5 px-16 rounded-lg text-center text-gray-700 select-none">
            <LoadingOutlined spin className="text-5xl text-blue-500 mb-4" />
            <p className="text-lg font-semibold text-gray-700">
              {t.new.release_to_upload}
            </p>
          </div>
        )}
      </div>
      <div
        className={`relative mx-auto h-full w-full max-w-3xl flex-1 l md:px-2 px-4 pb-20 md:pl-8 lg:mt-6 min-h-screen-w-scroll !mt-0 flex flex-col items-center gap-8 pt-12 md:pr-14 2xl:pr-20 `}
        onDragEnter={(e) => {handleDragEnter(e); dragCounter.current--}}
      >
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
          <h1 className="text-[2.5rem] text-gray-800/70 text-center">
            {t.new.welcome} , {user.name}
          </h1>
        </div>
        {/* 输入框 */}
        <div
          ref={dropZoneRef}
          className={`w-full gap-3 flex flex-col shadow-orange-700/30 drop-shadow-xl relative z-10 `}
          onKeyDown={sendMessage}
        >
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
                  items={settings.models}
                  callback={(item) => chooseModel(item)}
                  width="100px"
                >
                  {settings.currentDisplayModel}
                </DropdownMenu>
              </div>
            </div>
          </div>
          <div
            className="absolute right-2 top-3 bg-orange-700/60 rounded-lg p-2 cursor-pointer hover:bg-orange-700/80 w-8 h-8 flex items-center justify-center text-white"
            onClick={sendMessage}
          >
            <ArrowUpOutlined />
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
              {fileList.map((file, index) => {
                const fullFilename = file.name;
                const fileExt = fullFilename.split(".").pop();
                const fileName = fullFilename.split(".").slice(0, -1).join(".");
                return (
                  <div key={fullFilename} className="flex-shrink-0">
                    <HintText hintText={fullFilename} more={5}>
                      <Spin
                        spinning={
                          sendFileLoading && index === fileList.length - 1
                        }
                        indicator={<LoadingOutlined spin />}
                      >
                        <div
                          className={`h-20 cursor-pointer relative w-full p-2 rounded-lg text-md text-gray-700 flex items-center justify-center hover:border hover:border-blue-300
										 drop-shadow-md shadow-blue-400`}
                          style={{
                            background:
                              "linear-gradient(to bottom, white, #e6f7ff)",
                          }}
                        >
                          {isImg(fullFilename) &&
                          !(sendFileLoading && index == fileList.length - 1) ? (
                            <img
                              src={fileUrlList[index].url}
                              alt={fileName}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="font-bold text-blue-500/80 truncate -translate-y-1">
                              {fileName}
                            </div>
                          )}
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
                      </Spin>
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
                <span className="group-hover:underline">{t.new.show_all}</span>
                <span className="scale-85">
                  <ArrowRightOutlined className="text-sm" />
                </span>
              </div>
            </Link>
          </div>
          <div
            className={` mt-4 overflow-hidden ${
              chatData.length == 0 ? "h-[200px]" : "grid grid-cols-3 gap-4"
            }`}
          >
            {chatData.length == 0 && (
              <Empty
                description={t.slider.no_history}
                style={{ width: "100%", height: "100%" }}
              />
            )}
            {chatData.length != 0 &&
              chatData.slice(0, 6).map((item, index) => (
                <Link href={`/chat/${item.id}`} key={item.id}>
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
                      {item.title}
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                      {new Date(item.createdAt).toLocaleString()}
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
