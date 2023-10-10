const mongoose = require("mongoose");

const savedMatches = new mongoose.Schema(
  {
    savedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    playersPos: {
      p1: { type: Number, required: true, default: 0 },
      p2: { type: Number, required: true, default: 0 },
      p3: { type: Number, required: true, default: 0 },
      p4: { type: Number, required: true, default: 0 },
    },
  },
  {
    timestamps: true,
  }
);

const SavedMatches = mongoose.model("savedMatches", savedMatches);

module.exports = SavedMatches;
