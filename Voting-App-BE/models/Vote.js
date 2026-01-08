const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema({
  feature: { type: mongoose.Schema.Types.ObjectId, ref: "Feature", required: true, unique: true },
  yesCount: { type: Number, default: 0 },
  noCount: { type: Number, default: 0 }
});

module.exports = mongoose.model("Vote", voteSchema);
