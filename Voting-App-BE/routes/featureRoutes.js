const express = require("express");
const router = express.Router();
const { createFeature, getFeatures } = require("../controllers/featureController");

router.post("/", createFeature);
router.get("/", getFeatures);

module.exports = router;
