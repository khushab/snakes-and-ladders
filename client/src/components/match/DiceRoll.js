import React from "react";
import diceRollGif from "../../images/gifs/dice-roll.gif";

const DiceRoll = ({
  showDiceRoll,
  diceNumSrc,
  diceRollHandler,
  disableRoll,
}) => {
  return (
    <>
      <div className="w-56 h-56 lg:w-64 lg:h-64">
        {showDiceRoll && <img src={diceRollGif} alt="dice gif" />}

        {!showDiceRoll && <img src={diceNumSrc} alt="dice number" />}
      </div>
      <button
        className="btn-primary px-12 py-4 font-bold rounded-md mt-10 text-2xl"
        onClick={diceRollHandler}
        disabled={disableRoll}
      >
        Roll the dice
      </button>
    </>
  );
};

export default DiceRoll;
