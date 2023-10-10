import React from "react";

const ActionButtons = ({ onReset, onPause, onExit, disableButtons }) => {
  return (
    <>
      <button
        className="btn-primary"
        onClick={onReset}
        disabled={disableButtons}
      >
        Reset Game
      </button>
      <button
        className="btn-primary"
        onClick={onPause}
        disabled={disableButtons}
      >
        Pause & Save
      </button>
      <button
        className="btn-primary"
        onClick={onExit}
        disabled={disableButtons}
      >
        Exit
      </button>
    </>
  );
};

export default ActionButtons;
