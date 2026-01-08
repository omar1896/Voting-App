const Vote = require("../models/Vote");
const Feature = require("../models/Feature");

exports.addVote = async (req, res) => {
  try {
    const { featureId, vote } = req.body;

    if (!featureId || !vote) {
      return res.status(400).json({ message: "featureId and vote are required" });
    }
    if (!["yes", "no"].includes(vote)) {
      return res.status(400).json({ message: "vote must be yes or no" });
    }

    const featureExists = await Feature.findById(featureId);
    if (!featureExists) return res.status(404).json({ message: "Feature not found" });

    let voteDoc = await Vote.findOne({ feature: featureId });
    if (!voteDoc) voteDoc = new Vote({ feature: featureId });

    vote === "yes" ? voteDoc.yesCount++ : voteDoc.noCount++;
    await voteDoc.save();

    res.status(201).json({ message: "Vote saved", data: voteDoc });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getVotes = async (req, res) => {
  try {
    const votes = await Vote.find().populate("feature");
    res.json(votes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
