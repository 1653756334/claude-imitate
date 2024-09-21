import React from "react";

interface InputProps {
  label: string;
  type: string;
  id: string;
  className?: string;
}

export default function Input({ label, type, id, className }: InputProps) {
  return (
    <div className="mb-6 pt-3 rounded bg-gray-200">
      <label
        className="block text-gray-700 text-sm font-bold mb-2 ml-3"
        htmlFor="email"
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        className={`bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 py-1 ${className}`}
      />
    </div>
  );
}
