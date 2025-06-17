import React from "react";
import type { MouseEventHandler } from "react";

interface CustomDotProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  index?: number;
  active?: boolean;
}

const CustomDot: React.FC<CustomDotProps> = ({ onClick, active }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="carousel-dot"
      className={`w-3 h-3 mx-1 mb-2 rounded-full transition-all duration-300 inline-block ${
        active ? "bg-[#5C3A21] scale-125" : "bg-gray-300"
      }`}
    >
      <span className="sr-only">Go to slide</span>
    </button>
  );
};

export default CustomDot;
