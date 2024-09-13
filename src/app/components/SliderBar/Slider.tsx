"use client";
import { ArrowRightOutlined } from "@ant-design/icons";
import Link from "next/link";
import { Jacques_Francois } from "next/font/google";
import React, { useState, useEffect, useRef } from "react";

import VerticalAlignTopOutlined from "@/assets/svgs/VerticalAlignBottomOutlined.svg";
import ChatAdd from "@/assets/svgs/ChatAdd.svg";
import Chat from "@/assets/svgs/Chat.svg";

const playpen_Sans = Jacques_Francois({
  subsets: ["latin"],
  weight: ["400"],
});

const history = [
  {
    id: 1,
    title: "如何使用人工智能优化工作流程vwbvwrjnvewkhvuiew",
  },
  {
    id: 2,
    title: "机器学习在金融领域的应用",
  },
  {
    id: 3,
    title: "深度学习模型训练技巧",
  },
  {
    id: 4,
    title: "自然语言处理在客户服务中的运用",
  },
  {
    id: 5,
    title: "计算机视觉技术在安防系统中的应用",
  },
  {
    id: 6,
    title: "区块链技术如何改变供应链管理",
  },
  {
    id: 7,
    title: "大数据分析在市场营销中的作用",
  },
  {
    id: 8,
    title: "物联网设备的安全性问题及解决方案",
  },
  {
    id: 9,
    title: "云计算技术在企业中的实施策略",
  },
  {
    id: 10,
    title: "人工智能伦理问题探讨",
  },
  {
    id: 11,
    title: "5G技术对智能城市建设的影响",
  },
  {
    id: 12,
    title: "量子计算机的发展现状与未来展望",
  },
];

export default function Slider({ t }: Slider.SlideProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const [historyData, setHistoryData] = useState<Slider.HistoryData[] | null>(
    null
  );

  const sliderRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isPinned) return;
      if (e.clientX <= 50 || titleRef.current?.contains(e.target as Node)) {
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

  useEffect(() => {
    const isPinned = localStorage.getItem("isPinned");
    setHistoryData(history.slice(0, 10));
    if (isPinned === "true") {
      setIsPinned(true);
    }
  }, []);

  const handleSpin = () => {
    localStorage.setItem("isPinned", (!isPinned).toString());
    setIsPinned(!isPinned);
  };

  return (
    <div
      className="ease-in-out duration-200 hidden lg:block"
      style={{ width: isPinned ? "18rem" : "4.5rem" }}
    >
      <nav
        className={`z-20 h-screen max-md:fixed max-md:inset-0 select-none relative`}
        style={{ width: "4.5rem", height: "calc(100vh - 0.1rem)" }}
      >
        <div
          className={`w-18rem text-xl !opacity-100 fixed z-30 top-3 left-3 flex items-center justify-between`}
          style={{ width: "calc(18rem - 1.5rem)" }}
          ref={logoRef}
        >
          <Link href="/" className={`${playpen_Sans.className} font-bold`}>
            <span ref={titleRef}>{t.slider.logo}</span>
          </Link>
          {/* 固定 */}
          <div
            className={` cursor-pointer hover:bg-orange-200 rounded-md p-1 w-6 h-6 text-sm flex items-center justify-center transition-all duration-200 ${
              isExpanded || isPinned
                ? "opacity-100 translate-x-0"
                : "opacity-0 pointer-events-none -translate-x-full"
            }`}
            onClick={handleSpin}
          >
            <VerticalAlignTopOutlined
              className={` ${
                isPinned ? "text-orange-500 rotate-90" : "-rotate-90"
              }`}
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
            height: isPinned ? "100vh" : "calc(100vh - 0.1rem)",
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
            className={`mt-5 mb-5 cursor-pointer text-orange-700 hover:bg-gray-200/60 rounded-md p-1 flex items-center`}
            style={{ fontSize: "1.07rem" }}
          >
            <ChatAdd width={20} height={20} className="-rotate-90" />
            <span className="ml-1">{t.slider.new}</span>
          </div>
          {/* 对话历史 */}
          <div className="font-bold mb-3 relative group">
            <span>{t.slider.history}</span>
          </div>
          <div
            className="flex flex-col text-sm overflow-y-auto scrollbar"
            style={{ height: "calc(100vh - 12.5rem)" }}
          >
            {historyData &&
              historyData.map((item) => {
                return (
                  <div
                    className="hover:bg-gray-200 rounded-md p-1 cursor-pointer flex items-center relative group"
                    key={item.id}
                  >
                    <Chat width={20} height={20} />
                    <span className="text-ellipsis overflow-hidden whitespace-nowrap ml-1 mr-1 flex-1">
                      {item.title}
                    </span>
                  </div>
                );
              })}
            {/* 查看所有 */}
            <div className="flex h-5 mt-3 font-bold cursor-pointer hover:text-black/70">
              <Link href={"/recents"}>
                <span>查看所有</span>{" "}
                <span className="w-5 h-5 text-sm">
                  <ArrowRightOutlined />
                </span>
              </Link>
            </div>
          </div>

          {/* 用户信息 */}
          <div className="flex items-center justify-between gap-2 pt-1 pb-1 hover:bg-gray-200/60 rounded-md p-1  cursor-pointer">
            <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden">
              <img
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/33.png"
                alt={t.slider.avatar}
                className="object-cover"
              />
            </div>
            <div className="h-10 flex-1 leading-10 mr-2 text-sm text-center overflow-hidden text-ellipsis whitespace-nowrap">
              rhueive@gmail.com
            </div>
          </div>
        </div>
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center overflow-hidden absolute bottom-3 right-3 transition-all duration-200 ${
            isExpanded ? "opacity-0 translate-x-2" : "opacity-100 translate-x-0"
          }`}
        >
          <img
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/33.png"
            alt={t.slider.avatar}
            className="object-cover"
          />
        </div>
      </nav>
    </div>
  );
}
