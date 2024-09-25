"use client";
import React, { useState, useEffect } from "react";
import {
  CheckOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import Link from "next/link";

import { IconProvider } from "@/app/components/IconProvider";
import Comfirm from "@/app/components/Comfirm";

const history = [
  {
    id: "1",
    title:
      "如何使用人工智能优化工作流程vwbvwrjnvewkhvuinrejibnrebnrejknrbejkew",
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

export default function RecentsContent({ t }: Recents.RecentsContentProps) {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [historyData, setHistoryData] = useState<Slider.HistoryData[]>([]);
  const [comfirmVisible, setComfirmVisible] = useState(false);

  useEffect(() => {
    setHistoryData(history);
  }, []);

  const handleSelectItem = (
    e: React.MouseEvent<HTMLDivElement>,
    id: string
  ) => {
    e.stopPropagation();
    if (selectedItems.includes(id)) {
      setSelectedItems((prev) => prev.filter((item) => item != id));
    } else {
      setSelectedItems((prev) => [...prev, id]);
    }
  };

  const handleMultiDelete = () => {
    setSelectedItems([]);
  };

  return (
    <div className="min-h-full w-full min-w-0 flex-1 text-gray-800/90 h-screen overflow-y-auto scrollbar max-md:pl-3">
      <header
        className={`flex h-12 w-full items-center md:justify-between max-md:justify-center gap-4 pr-3 pt-0.5 md:pl-20 lg:pl-24`}
      >
        <h1 className="flex items-center gap-2 font-bold">
          <div className="">
            <IconProvider.Chat width={20} height={20} />
          </div>
          <div className="tracking-wider">{t.recents.title}</div>
        </h1>
        <Link
          href={"/"}
          className="flex items-center gap-2 py-1 px-2 rounded-md bg-orange-700/80 font-bold tracking-wider text-white cursor-pointer select-none hover:bg-orange-700/90"
        >
          <div>
            <PlusCircleOutlined />
          </div>
          <div>{t.recents.new}</div>
        </Link>
      </header>
      <main className="mx-auto mt-4 w-full max-w-7xl flex-1 pb-20 lg:mt-6 lg:pl-12 md:pl-8 md:pr-14">
        <div className="mx-auto max-w-3xl">
          {/* 搜索框 */}
          <div
            className={`flex items-center w-full h-10 rounded-xl border border-gray-300 bg-white/70 hover:bg-white/90
                    hover:border-gray-400 focus-within:border-blue-400`}
          >
            <div className="flex items-center gap-2 px-2">
              <SearchOutlined className="text-gray-500" />
            </div>
            <input
              placeholder={t.recents.search}
              className="flex-1 h-full rounded-md decoration-none outline-none bg-transparent"
            />
          </div>
          {/* 选择区域 */}
          <div className="text-sm flex my-2 items-center gap-2 h-12">
            {selectedItems.length == 0 ? (
              <div className="flex items-center gap-2">
                <div>
                  {t.recents.you_have} {historyData.length}{" "}
                  {t.recents.history_chat}
                </div>
                {historyData.length ? (
                  <div
                    className="text-blue-500 cursor-pointer"
                    onClick={() => {
                      setSelectedItems([historyData[0].id]);
                    }}
                  >
                    {t.recents.multi_select}
                  </div>
                ) : (
                  ""
                )}
              </div>
            ) : (
              <div className="flex items-center justify-between w-full">
                <div className="font-bold text-blue-400">
                  {selectedItems.length} {t.recents.select_chat}
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className="cursor-pointer text-blue-400"
                    onClick={() => {
                      setSelectedItems(historyData.map((item) => item.id));
                    }}
                  >
                    {t.recents.select_all}
                  </div>
                  <div
                    className="cursor-pointer bg-gray-300/80 rounded-md px-2 py-1 hover:bg-gray-300 border border-gray-300"
                    onClick={() => {
                      setSelectedItems([]);
                    }}
                  >
                    {t.confirm.no}
                  </div>
                  <div
                    className="cursor-pointer text-white bg-orange-700/80 rounded-md px-2 py-1 hover:bg-orange-700/90"
                    onClick={handleMultiDelete}
                  >
                    {t.recents.delete_selected}
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* 历史对话记录 */}
          <ul className="flex flex-col gap-2 ">
            {historyData ? (
              historyData.map((item) => (
                <li className="list-none relative group" key={item.id}>
                  <Link href={`/chat/${item.id}`}>
                    <div
                      className={`flex group relative gap-2 p-4 pl-5 flex-col justify-between h-20 rounded-xl hover:bg-white/60 border border-gray-300 shadow-sm 
                      
                    ${
                      selectedItems.length != 0 &&
                      selectedItems.includes(item.id)
                        ? "border-blue-300 bg-blue-300/20"
                        : ""
                    }`}
                      style={{ maxWidth: "calc(100vw - 1.5rem)" }}
                    >
                      <div className="w-full overflow-hidden text-ellipsis whitespace-nowrap">
                        {item.title}
                      </div>
                      <div className="text-xs gap-2 flex items-center">
                        <span className="scale-95">上一条记录</span>
                        <span>17小时前</span>
                      </div>
                    </div>
                  </Link>
                  <div
                    className={`h-6 w-6 cursor-pointer border bg-white rounded-md absolute border-gray-300 top-10 left-0 -translate-y-1/2 
                    -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 group flex items-center justify-center text-white
                    ${
                      selectedItems.length != 0 &&
                      selectedItems.includes(item.id)
                        ? "!bg-blue-500"
                        : ""
                    }
                    ${selectedItems.length == 0 ? "opacity-0" : "opacity-100"}`}
                    onClick={(e) => {
                      handleSelectItem(e, item.id);
                    }}
                  >
                    {selectedItems.length != 0 &&
                    selectedItems.includes(item.id) ? (
                      <CheckOutlined />
                    ) : (
                      ""
                    )}
                  </div>
                  <div
                    className={`absolute top-1 right-2 group-hover:opacity-100 transition-opacity duration-200 opacity-0 cursor-pointer hover:text-red-500 ${
                      selectedItems.length == 0 ? "" : "opacity-0"
                    }`}
                    title="删除"
                    onClick={() => {
                      setComfirmVisible(true);
                    }}
                  >
                    <DeleteOutlined />
                  </div>
                </li>
              ))
            ) : (
              <div>暂无数据</div>
            )}
          </ul>
        </div>
      </main>
      <Comfirm
        title={t.recents.delete_title}
        content={t.recents.delete_content}
        onCancel={() => {
          setComfirmVisible(false);
        }}
        onConfirm={() => {
          setComfirmVisible(false);
        }}
        visible={comfirmVisible}
        yesText={t.confirm.yes}
        noText={t.confirm.no}
      />
    </div>
  );
}
