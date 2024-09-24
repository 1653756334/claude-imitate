import React, { useEffect, useState } from "react";

interface PrintWordProps {
  word: string;
}

export default function PrintWord({ word }: PrintWordProps) {
  const [key, setKey] = useState(0);

  useEffect(() => {
    setKey(prevKey => prevKey + 1);
  }, [word]);

  return (
    <div className="text-6xl flex flex-col items-center overflow-hidden justify-center">
      {word.split(/([,，])/).filter(item => !item.match(/[,，]/)).map((segment, segmentIndex) => (
        <div key={`line-${segmentIndex}`} className="flex flex-wrap justify-center mt-2 ">
          {segment.trim().split("").map((item, charIndex) => (
            <span
              key={`${key}-${segmentIndex}-${charIndex}`}
              className={`text-5xl inline-block pb-2 ${item === " " ? "w-4" : "opacity-0"}`}
              style={{
                animation: item !== " " ? `popIn 150ms ease-out ${(segmentIndex * segment.length + charIndex) * 50}ms forwards` : "none",
                textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
                color: "#3d3929",
              }}
            >
              {item !== " " ? item : "\u00A0"}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}
