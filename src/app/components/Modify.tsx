import { useEffect, useState } from "react";

export default function Modify({
  title,
  content,
  onCancel,
  onConfirm,
  visible,
  yesText,
  noText,
}: Modify.ModifyProps) {
  const [value, setValue] = useState("");
  useEffect(() => {
    setValue(content);
  }, [content]);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  return (
    <div
      className={`absolute top-0 left-0 w-screen h-screen bg-black/50 z-50 transition-all duration-200 ${
        visible
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-40 bg-white rounded-xl p-4 text-black
                  flex flex-col justify-evenly `}
      >
        <h1 className="text-xl font-bold">{title}</h1>
        <div className="w-full">
          <input
            type="text"
            value={value}
            onChange={onChange}
            className="w-full h-10 px-2 rounded-md border border-gray-300 outline-none focus:border-blue-500 bg-gray-100/20 focus:bg-white"
          />
        </div>
        <div className="flex justify-end gap-2">
          <button
            className="bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300"
            onClick={onCancel}
          >
            {noText}
          </button>
          <button
            className="bg-red-700 text-white px-4 py-2 rounded-md hover:bg-red-700/60"
            onClick={() => onConfirm && onConfirm(value)}
          >
            {yesText}
          </button>
        </div>
      </div>
    </div>
  );
}
