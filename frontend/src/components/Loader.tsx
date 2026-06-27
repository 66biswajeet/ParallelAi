import React from "react";

interface LoaderProps {
  fullScreen?: boolean;
  message?: string;
}

export const Loader: React.FC<LoaderProps> = ({
  fullScreen = false,
  message = "Loading experience...",
}) => {
  const containerClass = fullScreen
    ? "fixed inset-0 bg-white/95 z-55 flex flex-col items-center justify-center backdrop-blur-sm"
    : "flex flex-col items-center justify-center p-8";

  return (
    <div className={containerClass}>
      <div className="relative flex items-center justify-center">
        {/* Decorative pulsating rings */}
        <div className="absolute w-16 h-16 bg-primary-soft rounded-full pulse-glow animate-ping opacity-75"></div>
        <div className="absolute w-12 h-12 bg-primary-yellow/20 rounded-full animate-pulse"></div>
        
        {/* Core spinner */}
        <svg
          className="animate-spin h-10 w-10 text-primary-yellow relative z-10"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-10"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="3"
          ></circle>
          <path
            className="opacity-90"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </div>
      
      {message && (
        <p className="mt-4 text-sm font-semibold tracking-wide text-dark-text animate-pulse">
          {message}
        </p>
      )}
    </div>
  );
};
