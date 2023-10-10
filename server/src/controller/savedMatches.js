const SavedMatches = require("../models/savedMatches");

const saveMatch = async (req, res) => {
  try {
    const user = req.user;
    const { playersPos, gameId } = req.body;

    const existingSavedGame = await SavedMatches.findOne({
      _id: gameId,
    });

    let result;
    if (existingSavedGame) {
      result = await SavedMatches.updateOne(
        { _id: gameId },
        {
          $set: {
            savedBy: user._id,
            playersPos,
          },
        },
        { new: true, upsert: true, runValidators: true }
      );
    } else {
      result = await SavedMatches.create({
        savedBy: user._id,
        playersPos,
      });
    }

    res.status(201).send({ success: true, result });
  } catch (error) {
    res
      .status(400)
      .send({ success: false, message: "Something went wrong!", error });
  }
};

const getSavedMatchesForUser = async (req, res) => {
  try {
    const user = req.user;

    const result = await SavedMatches.find({ savedBy: user._id });

    res.status(201).send({ success: true, result });
  } catch (error) {
    res
      .status(400)
      .send({ success: false, message: "Something went wrong!", error });
  }
};

const getSavedMatch = async (req, res) => {
  try {
    const id = req.params.id;

    console.log(id);

    const result = await SavedMatches.findById(id);

    res.status(201).send({ success: true, result });
  } catch (error) {
    res
      .status(400)
      .send({ success: false, message: "Something went wrong!", error });
  }
};

const deleteSavedMatch = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await SavedMatches.findByIdAndDelete(id);
    res.status(201).send({ success: true, result });
  } catch (error) {
    res
      .status(400)
      .send({ success: false, message: "Something went wrong!", error });
  }
};

module.exports = {
  saveMatch,
  getSavedMatchesForUser,
  getSavedMatch,
  deleteSavedMatch,
};
