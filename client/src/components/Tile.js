import React from "react";
import PlayerPos from "./PlayerPos";

const Tile = ({ num, index, playerPos }) => {
  const conditionToDisplayNum = () => {
    return (
      playerPos.p1 !== num &&
      playerPos.p2 !== num &&
      playerPos.p3 !== num &&
      playerPos.p4 !== num
    );
  };

  return (
    <div
      className={
        "w-8 h-8 md:w-20 md:h-20 border flex items-center justify-center font-medium" +
        (index % 2 === 0 ? " bg-red-300 text-white " : " bg-gray-100")
      }
    >
      {conditionToDisplayNum() && <span className="font-bold">{num}</span>}
      {!conditionToDisplayNum() && (
        <div className="flex items-center justify-center flex-wrap p-0.5">
          {playerPos.p1 === num && <PlayerPos pos={"P1"} />}
          {playerPos.p2 === num && <PlayerPos pos={"P2"} />}
          {playerPos.p3 === num && <PlayerPos pos={"P3"} />}
          {playerPos.p4 === num && <PlayerPos pos={"P4"} />}
        </div>
      )}
    </div>
  );
};

export default Tile;

/*
Max number of players - 
Single player - 

*/
