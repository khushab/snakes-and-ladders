import React from "react";

const Confirmation = ({ title, onNoclick, onYesClick }) => {
  return (
    <div className="p-5">
      <h2 className="text-xl mb-8">{title}</h2>
      <div className="flex items-center justify-center px-10">
        <div className="flex gap-8">
          <button className="btn-primary" onClick={onYesClick}>
            Yes
          </button>
          <button className="btn" onClick={onNoclick}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
