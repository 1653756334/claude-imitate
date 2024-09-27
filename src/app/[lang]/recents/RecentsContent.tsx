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
import { useSessionStore } from "@/app/lib/store";
import { debounce } from "@/app/lib/utils";

export default function RecentsContent({ t }: Recents.RecentsContentProps) {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [historyData, setHistoryData] = useState<Store.Session[]>([]);
  const [comfirmVisible, setComfirmVisible] = useState(false);
  const [deleteSessionId, setDeleteSessionId] = useState<string | null>(null);

  const { getReversedChatData, deleteSession } = useSessionStore();

  const chatData = getReversedChatData();

  useEffect(() => {
    setHistoryData(chatData);
  }, [chatData]);

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
    selectedItems.forEach((id) => {
      deleteSession(id);
    });
    setSelectedItems([]);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.trim() === "") {
      setHistoryData(chatData);
      return;
    }
    setHistoryData(
      historyData.filter((item) =>
        item.title.toLowerCase().includes(value.toLowerCase())
      )
    );
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
              onChange={debounce(handleSearchChange, 500)}
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

          <ul className="flex flex-col gap-2 text-gray">
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
                        <span>{new Date(item.createdAt).toLocaleString()}</span>
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
                    title={t.confirm.delete}
                    onClick={() => {
                      setComfirmVisible(true);
                      setDeleteSessionId(item.id);
                    }}
                  >
                    <DeleteOutlined />
                  </div>
                </li>
              ))
            ) : (
              <div className="text-center">{t.recents.no_data}</div>
            )}
          </ul>
        </div>
      </main>
      <Comfirm
        title={t.recents.delete_title}
        content={t.recents.delete_content}
        onCancel={() => {
          setComfirmVisible(false);
          setDeleteSessionId(null);
        }}
        onConfirm={() => {
          setComfirmVisible(false);
          if (deleteSessionId) {
            deleteSession(deleteSessionId);
          }
        }}
        visible={comfirmVisible}
        yesText={t.confirm.yes}
        noText={t.confirm.no}
      />
    </div>
  );
}
