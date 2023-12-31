const Scores = require("../models/scores");

const getLeaderboard = async (req, res) => {
  try {
    // Get the top 10 players based on score in descending order of score
    const result = await Scores.find({})
      .sort({ score: -1 })
      .limit(10)
      .populate("playerId", "name");

    res.status(201).send({ success: true, result });
  } catch (error) {
    res
      .status(400)
      .send({ success: false, message: "Something went wrong!", error });
  }
};

const saveUserScore = async (req, res) => {
  try {
    const playerId = req.user._id;
    const body = req.body;

    const wins = body.wins || 0;
    const losses = body.losses || 0;

    const existingScore = await Scores.findOne({
      playerId,
    });

    const updateData = {
      wins: (existingScore?.wins ?? 0) + wins,
      losses: (existingScore?.losses ?? 0) + losses,
      score: (existingScore?.score ?? 0) + (wins - losses),
    };

    let result;

    // Update the if the score exists, else create a new one
    if (existingScore) {
      result = await Scores.updateOne(
        { playerId },
        { $set: updateData },
        { runValidators: true }
      );
    } else {
      result = await Scores.create({
        playerId,
        ...updateData,
      });
    }

    res.status(201).send({ success: true, result });
  } catch (error) {
    res
      .status(400)
      .send({ success: false, message: "Something went wrong!", error });
  }
};

module.exports = {
  getLeaderboard,
  saveUserScore,
};
