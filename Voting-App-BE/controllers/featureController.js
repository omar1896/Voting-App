const Feature = require("../models/Feature");

exports.createFeature = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "name is required" });

    const featureExists = await Feature.findOne({ name });
    if (featureExists) return res.status(409).json({ message: "Feature already exists" });

    const feature = await Feature.create({ name });
    res.status(201).json(feature);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getFeatures = async (req, res) => {
  try {
    const features = await Feature.find();
    res.json(features);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
