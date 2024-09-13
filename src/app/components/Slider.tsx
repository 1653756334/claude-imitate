"use client";
import {
  AliwangwangOutlined,
  BulbOutlined,
  DeleteOutlined,
  PushpinOutlined,
} from "@ant-design/icons";
import { Popconfirm } from "antd";
import Link from "next/link";
import { Jacques_Francois } from "next/font/google";
import React, { useState, useEffect, useRef } from "react";

const playpen_Sans = Jacques_Francois({
  subsets: ["latin"],
  weight: ["400"],
});

const history = [
  {
    id: 1,
    title:
      "这里是列表啊这里是列表啊这里是列表啊这里是列表啊这里是列表啊这里是列表啊",
  },
];

export default function Slider() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(-1);

  const sliderRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isPinned) return;
      if (e.clientX <= 50) {
        setIsExpanded(true);
      } else if (
        !sliderRef.current?.contains(e.target as Node) &&
        !logoRef.current?.contains(e.target as Node)
      ) {
        setIsExpanded(false);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isPinned]);

  const deleteMessage = (index: number) => {
    setIsPinned(false);
    console.log(index);
    setDeleteIndex(-1);
  };

  const chooseMessage = (index: number) => {
    setIsPinned(true);
    setDeleteIndex(index);
  };

  return (
    <div
      className="ease-in-out duration-200 hidden sm:block"
      style={{ width: isPinned ? "18rem" : "4.5rem" }}
    >
      <nav
        className={`z-20 h-screen  max-md:fixed max-md:inset-0 select-none `}
        style={{ width: "4.5rem", height: "calc(100vh - 0.1rem)" }}
      >
        <div
          className={`w-18rem text-xl !opacity-100 fixed z-30 top-3 left-3 flex items-center justify-between`}
          style={{ width: "calc(18rem - 1.5rem)" }}
          ref={logoRef}
        >
          <Link href="/" className={`${playpen_Sans.className} font-bold`}>
            Logo
          </Link>
          {/* 固定 */}
          <div
            className={` cursor-pointer hover:bg-orange-200 rounded-md p-1 w-7 h-7 flex items-center justify-center text-sm ${
              isExpanded || isPinned
                ? "opacity-100"
                : "opacity-0 pointer-events-none"
            }`}
            onClick={() => setIsPinned(!isPinned)}
          >
            <PushpinOutlined
              className={isPinned ? "text-orange-500 -rotate-45" : ""}
            />
          </div>
        </div>
        <div
          className={`p-3 border-2 relative rounded-lg rounded-l-none border-orange-100 bg-gradient-to-r from-orange-100/50 to-orange-50/10 shadow-2xl shadow-orange-300 ease-in-out duration-200 ${
            isExpanded || isPinned
              ? "translate-x-0 opacity-100"
              : "-translate-x-full opacity-0"
          } ${
            isPinned ? "rounded-r-none shadow-none" : "rounded-lg "
          } z-20 backdrop-blur-md`}
          style={{
            width: "18rem",
            height: "calc(100vh - 0.1rem)",
            marginTop: isPinned ? "0" : "0.1rem",
          }}
          ref={sliderRef}
        >
          {/* 这是一个单纯的占位符 */}
          <div
            className={`w-18rem text-xl !opacity-100 pointer-events-none h-5`}
            style={{ width: "18rem" }}
          ></div>
          {/* 新对话区域 */}
          <div
            className={`mt-5 mb-5 cursor-pointer text-orange-700 hover:bg-gray-200/60 rounded-md p-1`}
            style={{ fontSize: "1.07rem" }}
          >
            <BulbOutlined />
            <span className="ml-1">开启新对话</span>
          </div>
          {/* 对话历史 */}
          <div className="font-bold mb-3 relative group">
            <span>对话历史</span>
            <Popconfirm
              title="确定删除所有对话历史？"
              onConfirm={() => deleteMessage(-99)}
            >
              <span
                className={`${
                  deleteIndex === -99 ? "opacity-100" : "opacity-0"
                } absolute right-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out hover:text-red-400 rounded-md p-1 cursor-pointer`}
                onClick={() => chooseMessage(-99)}
              >
                <DeleteOutlined />
              </span>
            </Popconfirm>
          </div>
          <div
            className="flex flex-col text-sm overflow-y-auto scrollbar"
            style={{ height: "calc(100vh - 13rem)" }}
          >
            {history.map((item, index) => {
              return (
                <div
                  className="hover:bg-gray-200 rounded-md p-1 cursor-pointer flex items-center relative group"
                  key={item.id}
                >
                  <AliwangwangOutlined />
                  <span className="text-ellipsis overflow-hidden whitespace-nowrap ml-1 mr-2">
                    {item.title}
                  </span>
                  <Popconfirm
                    title="确定删除这条信息"
                    onConfirm={() => deleteMessage(index)}
                  >
                    <span
                      onClick={() => chooseMessage(index)}
                      className={`${deleteIndex == index ? "opacity-100" : "opacity-0"} absolute right-0 group-hover:opacity-100 transition-opacity hover:text-red-400 rounded-md p-1 cursor-pointer`}
                    >
                      <DeleteOutlined />
                    </span>
                  </Popconfirm>
                </div>
              );
            })}
          </div>
          <div className="flex items-center justify-between gap-2 pt-2 pb-2 hover:bg-gray-200/60 rounded-md p-1  cursor-pointer">
            <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden">
              <img
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/33.png"
                alt="用户头像"
                className="object-cover"
              />
            </div>
            <div className="h-10 flex-1 leading-10 mr-2 text-sm text-center overflow-hidden text-ellipsis whitespace-nowrap">
              rhueive@gmail.com
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
