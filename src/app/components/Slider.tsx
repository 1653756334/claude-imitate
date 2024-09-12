"use client";
import { BulbOutlined, PushpinOutlined } from "@ant-design/icons";
import Link from "next/link";
import { Playpen_Sans, Roboto_Mono} from "next/font/google"
import React, { useState, useEffect, useRef } from "react";

const playpen_Sans = Playpen_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const roboto_Mono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function Slider() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isPinned) return;
      if (e.clientX <= 50) {
        setIsExpanded(true);
      } else if (!sliderRef.current?.contains(e.target as Node)) {
        setIsExpanded(false);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isPinned]);

  return (
    <div>
      <nav
        className="z-20 h-screen max-md:pointer-events-none max-md:fixed max-md:inset-0 select-none"
        style={{ width: "4.5rem", height: "calc(100vh - 0.1rem)" }}
      >
        <div
          className="p-3 border-2 rounded-lg rounded-l-none border-orange-100 bg-gradient-to-r from-orange-100 to-orange-50 shadow-2xl shadow-orange-300 relative"
          style={{
            width: "18rem",
            height: "calc(100vh - 0.1rem)",
            marginTop: "0.1rem",
          }}
        >
          <div className="w-18rem text-xl" style={{ width: "18rem" }}>
            <Link href="/" className={playpen_Sans.className}>这里是Logo</Link>
          </div>
          <div
            className={`absolute top-3 right-3 cursor-pointer hover:bg-orange-200 rounded-md p-1 w-7 h-7 flex items-center justify-center`}
            onClick={() => setIsPinned(!isPinned)}
          >
            <PushpinOutlined
              className={isPinned ? "text-orange-500 -rotate-45" : ""}
            />
          </div>
          <div className={`mt-5 mb-5 cursor-pointer text-orange-700 ${roboto_Mono.className} hover:bg-gray-200 rounded-md p-1 -ml-1`} style={{fontSize: "1.07rem"}}>
            <BulbOutlined />
            <span className="ml-1">开启新对话</span>
          </div>
          <div className="flex flex-col gap-3">
            <div>这里是列表啊</div>
            <div>这里是列表啊</div>
            <div>这里是列表啊</div>
            <div>这里是列表啊</div>
            <div>这里是列表啊</div>
          </div>
        </div>
      </nav>
    </div>
  );
}
