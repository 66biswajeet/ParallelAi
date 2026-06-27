import React from "react";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const Logo: React.FC<LogoProps> = ({ className = "", size = "md" }) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-16 h-16",
  };

  return (
    <svg
      className={`${sizeClasses[size]} ${className} shrink-0 select-none`}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer rounded container with premium dark theme shadow */}
      <rect
        x="5"
        y="5"
        width="90"
        height="90"
        rx="22"
        fill="#1F2937"
        className="fill-slate-900"
      />

      {/* Decorative grid background lines (represents grid canvas alignment) */}
      <line x1="25" y1="5" x2="25" y2="95" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="1.5" />
      <line x1="50" y1="5" x2="50" y2="95" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="1.5" />
      <line x1="75" y1="5" x2="75" y2="95" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="1.5" />
      <line x1="5" y1="25" x2="95" y2="25" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="1.5" />
      <line x1="5" y1="50" x2="95" y2="50" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="1.5" />
      <line x1="5" y1="75" x2="95" y2="75" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="1.5" />

      {/* Left Slanted Parallel Line - Primary Yellow */}
      <path
        d="M36 72L54 28"
        stroke="#F5C542"
        strokeWidth="10"
        strokeLinecap="round"
      />

      {/* Right Slanted Parallel Line - Yellow Accent */}
      <path
        d="M48 72L66 28"
        stroke="#FFD54F"
        strokeWidth="10"
        strokeLinecap="round"
      />

      {/* Connecting intelligence node dot in upper right representing AI canvas */}
      <circle
        cx="72"
        cy="26"
        r="5.5"
        fill="#FFFFFF"
        className="animate-pulse"
      />
    </svg>
  );
};
export default Logo;
