import React from "react";

export default function HintText({
  children,
  className,
  hintText,
  more,
}: HintText.HintTextProps) {
  return (
    <div className={`${className} relative group`}>
      <div className="z-20 relative">{children}</div>
      <div
        className={`absolute -bottom-7 z-10 rounded-md bg-black/65 text-white/80 p-1 text-xs left-1/2 -translate-x-1/2
				group-hover:opacity-100 opacity-0 transition-opacity duration-300 pointer-events-none text-center whitespace-nowrap`}
        style={{
          transform: more ? `translateY(${more}px) translateX(-50%)` : "",
        }}
      >
        {hintText}
      </div>
    </div>
  );
}
