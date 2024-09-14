import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-100/80 backdrop-blur-sm">
      <div className="relative w-64 h-64 sm:w-80 sm:h-80">
        <svg
          className="animate-spin w-full h-full"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            className="stroke-gray-300 fill-none"
            strokeWidth="5"
            cx="50"
            cy="50"
            r="30"
            strokeLinecap="round"
            strokeDasharray="188.5"
            strokeDashoffset="50"
          />
        </svg>
        {/* <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-orange-500 font-semibold text-xl">
          加载中...
        </div> */}
      </div>
    </div>
  );
};

export default LoadingSpinner;
