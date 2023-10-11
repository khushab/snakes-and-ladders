const mongoose = require("mongoose");

const scoresSchema = new mongoose.Schema(
  {
    playerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    wins: {
      type: Number,
      default: 0,
    },
    losses: {
      type: Number,
      default: 0,
    },
    score: {
      // This is calculated by wins - losses
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Scores = mongoose.model("scores", scoresSchema);

module.exports = Scores;
