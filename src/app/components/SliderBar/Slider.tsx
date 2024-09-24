"use client";
import {
  ArrowRightOutlined,
  CloseOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Jacques_Francois } from "next/font/google";
import React, { useState, useEffect, useRef } from "react";
import { IconProvider } from "../IconProvider";
import Modal from "../Modal";
import Setting from "../Setting";
import OutsideClickHandler from "../OutsideClickHandler";

const playpen_Sans = Jacques_Francois({
  subsets: ["latin"],
  weight: ["400"],
});

const history = [
  {
    id: "1",
    title: "如何使用人工智能优化工作流程vwbvwrjnvewkhvuiew",
  },
  {
    id: "2",
    title: "机器学习在金融领域的应用",
  },
  {
    id: "3",
    title: "深度学习模型训练技巧",
  },
  {
    id: "4",
    title: "自然语言处理在客户服务中的运用",
  },
  {
    id: "5",
    title: "计算机视觉技术在安防系统中的应用",
  },
  {
    id: "6",
    title: "区块链技术如何改变供应链管理",
  },
  {
    id: "7",
    title: "大数据分析在市场营销中的作用",
  },
  {
    id: "8",
    title: "物联网设备的安全性问题及解决方案",
  },
  {
    id: "9",
    title: "云计算技术在企业中的实施策略",
  },
  {
    id: "10",
    title: "人工智能伦理问题探讨",
  },
  {
    id: "11",
    title: "5G技术对智能城市建设的影响",
  },
  {
    id: "12",
    title: "量子计算机的发展现状与未来展望",
  },
];

export default function Slider({ t }: Slider.SlideProps) {
  const path = usePathname();
  const router = useRouter();

  const [isExpanded, setIsExpanded] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const [historyData, setHistoryData] = useState<Slider.HistoryData[] | null>(
    null
  );
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [showSetting, setShowSetting] = useState(false);

  const sliderRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  const setting = [
    {
      id: "2",
      title: t.slider.settings,
      click: () => {
        setShowSetting(true);
      },
    },
    {
      id: "1",
      title: t.slider.logout,
      click: () => {
        router.push("/login");
      },
    },
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isPinned) return;
      if (screen.width < 768) return;
      if (
        titleRef.current?.contains(e.target as Node) ||
        navRef.current?.contains(e.target as Node)
      ) {
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
  }, [path]);

  const handleSpin = () => {
    localStorage.setItem("isPinned", (!isPinned).toString());
    setIsPinned(!isPinned);
  };

  if (path.includes("/login") || path.includes("/register")) {
    return null;
  }

  return (
    <>
      {/* 当屏幕太小时候显示 */}
      <div
        className={`w-18rem text-xl h-5 fixed top-4 left-5 z-30 transition-none sm:hidden transition-all duration-100
        ${isExpanded || isPinned ? "opacity-0" : "opacity-100"}`}
        onClick={() => {
          setIsExpanded(true);
        }}
      >
        <IconProvider.Drawer width={32} height={24} />
      </div>
      {/* 小屏幕时候的遮罩 */}
      <div
        className={`max-sm:fixed max-sm:inset-0 max-sm:bg-black/50 max-sm:z-20 ${
          isExpanded || isPinned ? "max-sm:opacity-100" : "max-sm:opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsExpanded(false)}
      ></div>

      <div
        className={`ease-in-out duration-200 relative z-20 transition-all  max-sm:translate-x-0 max-sm:left-0${
          isExpanded || isPinned ? "max-sm:translate-x-0 max-sm:left-0" : ""
        }`}
        style={{ width: isPinned ? "18rem" : "0.1rem" }}
      >
        <nav
          className={`z-20 h-screen max-sm:relative max-sm:inset-0 select-none relative `}
          style={{ width: "4.5rem", height: "calc(100vh - 0.1rem)" }}
          ref={navRef}
        >
          <div
            className={`w-18rem text-xl !opacity-100 fixed z-30 top-3 left-3 flex items-center justify-between ${
              isExpanded ? "max-sm:!flex" : "max-sm:hidden"
            }`}
            style={{ width: "calc(18rem - 1.5rem)" }}
            ref={logoRef}
          >
            <Link href="/" className={`${playpen_Sans.className} font-bold`}>
              <span ref={titleRef}>{t.slider.logo}</span>
            </Link>
            {/* 固定 */}
            <div
              className={` cursor-pointer hover:bg-orange-200 rounded-md p-1 w-6 h-6 text-sm flex items-center justify-center transition-all duration-200 max-sm:hidden ${
                isExpanded || isPinned
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 pointer-events-none -translate-x-full"
              }`}
              onClick={handleSpin}
            >
              <IconProvider.VerticalAlignBottomOutlined
                className={` ${
                  isPinned ? "text-orange-500 rotate-90" : "-rotate-90"
                }`}
              />
            </div>
            <div
              className={` cursor-pointer hover:bg-orange-200 rounded-md p-1 w-6 h-6 text-sm items-center justify-center transition-all duration-200 block sm:hidden ${
                isExpanded || isPinned
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 pointer-events-none -translate-x-full"
              }`}
              onClick={() => setIsExpanded(false)}
            >
              <CloseOutlined />
            </div>
          </div>
          <div
            className={`p-3 pb-1 border relative rounded-lg rounded-l-none border-[#dcb272] bg-gradient-to-r from-orange-100/50
              to-orange-50/10 max-sm:from-orange-50 max-sm:to-amber-50 max-sm:shadow-none max-sm:!mt-0 max-sm:rounded-none max-sm:!h-screen
              shadow-2xl shadow-orange-300 ease-in-out duration-100 ${
                isExpanded || isPinned
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-full opacity-0"
              } ${
              isPinned ? "rounded-r-none shadow-none border-y-0" : "rounded-lg"
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
            <Link href={"/"}>
              <div
                className={`mt-5 mb-5 cursor-pointer text-orange-700 hover:bg-amber-800/10 rounded-md p-1 flex items-center`}
                style={{ fontSize: "1.07rem" }}
              >
                <IconProvider.ChatAdd
                  width={20}
                  height={20}
                  className="-rotate-90"
                />
                <span className="ml-1">{t.slider.new}</span>
              </div>
            </Link>
            {/* 从这里开始对话历史到底部 */}
            <div className="flex flex-col gap-2">
              <div>
                {/* 对话历史 */}
                <div className="font-bold mb-3 relative group">
                  <span>{t.slider.history}</span>
                </div>
                <div
                  className="flex flex-col text-sm overflow-y-auto scrollbar gap-1"
                  style={{ height: "calc(100vh - 15rem)" }}
                >
                  {historyData &&
                    historyData.map((item) => {
                      return (
                        <Link href={`/chat/${item.id}`} key={item.id}>
                          <div className="hover:bg-amber-800/10 rounded-md p-1 cursor-pointer flex items-center relative group">
                            <IconProvider.Chat width={20} height={20} />
                            <span className="text-ellipsis overflow-hidden whitespace-nowrap ml-1 mr-1 flex-1">
                              {item.title}
                            </span>
                          </div>
                        </Link>
                      );
                    })}
                  {/* 查看所有 */}
                  <Link href={"/recents"} className="gap-1 mt-3">
                    <div className="flex h-5 font-bold cursor-pointer hover:text-black/70">
                      <span>{t.slider.show_all}</span>
                      <span className="w-5 h-5 text-sm flex items-center justify-center text-gray-500">
                        <ArrowRightOutlined className="scale-90" />
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
              {/* 底部区域 */}
              <div className="h-20 flex flex-col justify-between">
                {/* 用户信息 */}
                <div
                  className={`flex items-centergap-2 p-1 pl-2 pr-2 rounded-md h-10
            cursor-pointer border border-gray-300/50 hover:border-gray-300
            bg-gradient-to-b from-orange-50 via-orange-100/70 to-orange-50
            shadow-sm hover:shadow-sm transition-all duration-200 relative`}
                >
                  <div
                    className="flex items-center justify-between gap-2 w-full"
                    onClick={() => setShowUserInfo(!showUserInfo)}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center overflow-hidden`}
                    >
                      <img
                        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/33.png"
                        alt={t.slider.avatar}
                        className="object-cover"
                      />
                    </div>
                    <div className="h-10 flex-1 leading-10 text-sm text-center overflow-hidden text-ellipsis whitespace-nowrap">
                      rhueive@gmail.com
                    </div>
                    <div className="text-xs flex items-center justify-center scale-75">
                      <DownOutlined />
                    </div>
                  </div>
                  <OutsideClickHandler
                    onOutsideClick={() => setShowUserInfo(false)}
                  >
                    <div
                      className={`absolute left-0 bottom-full w-full transition-all duration-200
                    border rounded-md shadow-sm shadow-gray-500/20 bg-orange-50 overflow-hidden p-1`}
                      style={{
                        maxHeight: showUserInfo ? "500px" : "0",
                        opacity: showUserInfo ? "1" : "0",
                        transform: showUserInfo
                          ? "translateY(0)"
                          : "translateY(100%)",
                        visibility: showUserInfo ? "visible" : "hidden",
                      }}
                    >
                      {setting.map((item) => {
                        return (
                          <div
                            className="h-6 w-full hover:bg-orange-100 cursor-pointer p-1 flex items-center text-sm"
                            key={item.id}
                            onClick={item.click}
                          >
                            {item.title}
                          </div>
                        );
                      })}
                    </div>
                  </OutsideClickHandler>
                </div>
                {/* 设置 */}
                <div className="p-1 pl-2 pr-2 flex justify-between items-center">
                  <span>
                    <IconProvider.AI />
                  </span>
                  <div className="flex ver">
                    <IconProvider.Problem />
                    <span className="text-xs hover:underline cursor-pointer">
                      {t.slider.help}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`w-8 h-16 rounded-full flex flex-col justify-between items-center overflow-hidden absolute bottom-3 left-3 transition-all duration-200 max-sm:hidden ${
              isExpanded || isPinned
                ? "opacity-0 translate-x-2"
                : "opacity-100 translate-x-0"
            }`}
          >
            <div className="border rounded-full overflow-hidden p-1">
              <img
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/33.png"
                alt={t.slider.avatar}
                className="object-cover"
              />
            </div>
            <IconProvider.Drawer />
          </div>
        </nav>
      </div>
      {/* 设置 */}
      <Modal
        isOpen={showSetting}
        onClose={() => setShowSetting(false)}
        onConfirm={() => setShowSetting(false)}
      >
        <Setting t={t} />
      </Modal>
    </>
  );
}
