import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="absolute inset-0 flex justify-center items-center bg-gray-100/80 backdrop-blur-sm">
      <div className="relative w-64 h-64 sm:w-80 sm:h-80">
        <svg
          className="animate-spin w-full h-full"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            className="stroke-gray-300 fill-none"
            strokeWidth=""
            cx="50"
            cy="50"
            r="30"
            strokeLinecap="round"
            strokeDasharray="188.5"
            strokeDashoffset="50"
          />
        </svg>
      </div>
    </div>
  );
};

export default LoadingSpinner;
