import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="absolute inset-0 flex justify-center items-center bg-gray-100/80 backdrop-blur-sm">
      <div className="relative w-32 h-32 sm:w-40 sm:h-40">
        <svg
          className="animate-spin w-full h-full"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            className="stroke-gray-300 fill-none"
            strokeWidth="8"
            cx="50"
            cy="50"
            r="40"
            strokeLinecap="round"
            strokeDasharray="251.3"
            strokeDashoffset="50"
          />
        </svg>
      </div>
    </div>
  );
};

export default LoadingSpinner;
