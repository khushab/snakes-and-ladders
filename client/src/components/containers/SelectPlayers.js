import React from "react";
import PlayerPos from "../PlayerPos";

const SelectPlayers = ({ onSelectPlayer }) => {
  const MAX_PLAYERS = 4;

  const handlePlayersSelect = (num) => {
    onSelectPlayer(num);
  };
  return (
    <div className="p-5 rounded-xl">
      <h2 className=" font-semibold text-xl text-center mb-4">
        Select Players
      </h2>
      <div className="flex items-center justify-center flex-wrap gap-5 max-w-md">
        {Array(MAX_PLAYERS - 1)
          .fill(null)
          .map((_, index) => (
            <div
              className="border-2 h-44 w-44 flex items-center justify-center gap-2 font-medium cursor-pointer"
              key={index + 1}
              onClick={() => handlePlayersSelect(index + 2)}
            >
              {Array(index + 2)
                .fill(null)
                .map((_, index) => (
                  <PlayerPos key={index + 1} pos={`P${index + 1}`} />
                ))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default SelectPlayers;
