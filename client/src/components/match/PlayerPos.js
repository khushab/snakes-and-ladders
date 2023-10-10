import React from "react";

const PlayerPos = ({ pos }) => {
  const getPlayerPosColor = () => {
    switch (pos) {
      case "P1":
        return "bg-red-500";
      case "P2":
        return "bg-blue-500";
      case "P3":
        return "bg-orange-500";
      case "P4":
        return "bg-purple-500";
      default:
        break;
    }
  };

  return (
    <div
      className={
        "rounded-full flex items-center justify-center text-[8px] md:text-base md:p-2 text-white z-50 " +
        getPlayerPosColor()
      }
    >
      {pos}
    </div>
  );
};

export default PlayerPos;
