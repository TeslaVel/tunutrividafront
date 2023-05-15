import React from "react";

type ArrowButtonProps = {
  direction: "left" | "right";
  onClick: () => void;
};

const ArrowButton: React.FC<ArrowButtonProps> = ({ direction, onClick }) => {
  const icon = direction === "left" ? "«" : "»";

  return (
    <button
      className="absolute top-1/2 transform -translate-y-1/2 text-white text-xl font-bold bg-black bg-opacity-50 rounded-full px-4 py-2 focus:outline-none hover:bg-opacity-75 transition-opacity duration-150"
      onClick={onClick}
    >
      {icon}
    </button>
  );
};

export default ArrowButton;
