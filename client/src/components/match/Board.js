import React, { useEffect, useState } from "react";
import Tile from "./Tile";
import PlayerPos from "./PlayerPos";
import s1 from "../../images/snakes/s1.png";
import s2 from "../../images/snakes/s2.png";
import s3 from "../../images/snakes/s3.png";
import s4 from "../../images/snakes/s4.png";

import l1 from "../../images/ladders/l1.png";
import l2 from "../../images/ladders/l2.png";

const Board = ({ playersPos, numberOfPlayers }) => {
  const [boardArr, setBoardArr] = useState([]);

  const generateBoard = () => {
    let board = [];
    let num = 100;
    let row = [];
    let isEvenRow = true;

    while (num > 0) {
      if (isEvenRow) {
        row.push(num);
      } else {
        row.unshift(num);
      }

      if (row.length === 10) {
        board.push(row);
        row = [];
        isEvenRow = !isEvenRow;
      }

      num--;
    }
    setBoardArr(board);
  };

  useEffect(() => {
    generateBoard();
  }, []);

  return (
    <div className="">
      <div className="min-w-[800px] relative">
        {boardArr.map((row, index) => {
          return (
            <div key={index} className="flex z-20">
              {row.map((num, index) => {
                return (
                  <Tile
                    key={index}
                    num={num}
                    index={index}
                    playerPos={playersPos}
                  />
                );
              })}
            </div>
          );
        })}
        <img src={s1} alt="snake1" className="absolute top-0 left-0" />
        <img src={s2} alt="snake2" className="absolute bottom-0 right-0" />
        <img src={s3} alt="snake3" className="absolute bottom-0 left-0 " />
        <img
          src={s4}
          alt="snank4"
          className="absolute top-[100px] right-[20px]"
        />

        <img
          src={l1}
          alt="ladder1"
          className="absolute top-[25px] right-[148px] transform rotate-[165deg] z-10"
        />

        <img
          src={l2}
          alt="ladder2"
          className="absolute bottom-[30px] left-[107px] rotate-[17deg] z-10"
        />
      </div>
      <div className=" border-2 mt-6 h-44 w-44 flex items-center justify-center gap-2 font-medium relative">
        {Array(numberOfPlayers)
          .fill(null)
          .map((_, index) => {
            const player = `P${index + 1}`;
            return (
              playersPos[player.toLowerCase()] === 0 && (
                <PlayerPos key={index + 1} pos={player} />
              )
            );
          })}
      </div>
    </div>
  );
};

export default Board;
