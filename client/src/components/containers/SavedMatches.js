import React from "react";
import { getFormattedDateAndTime } from "../../utils";
import { useNavigate } from "react-router-dom";

export const SavedMatches = ({ savedMatches, deleteUsersSavedMatch }) => {
  const navigate = useNavigate();

  const navigateToMatchScreen = (id) => {
    navigate(`/match?id=${id}`);
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl text-center font-semibold mb-6">Saved Matches</h2>
      {savedMatches.map((item) => (
        <div
          className="flex gap-5 items-center justify-between mb-2"
          key={item._id}
        >
          <h3 className="text-xl">{getFormattedDateAndTime(item.updatedAt)}</h3>
          <div className="flex gap-5">
            <button
              className="btn-primary py-2 px-4"
              onClick={() => navigateToMatchScreen(item._id)}
            >
              Play
            </button>
            <button
              className="btn"
              onClick={() => deleteUsersSavedMatch(item._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
      {!savedMatches.length && (
        <h3 className="text-center">No saved matches</h3>
      )}
    </div>
  );
};
