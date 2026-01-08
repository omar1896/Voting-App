require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db"); // ✅ CORRECT

const app = express();
connectDB();

// Configure CORS to allow requests from frontend
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:8082", // Frontend origin
  credentials: true, // Allow cookies/credentials if needed
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"]
}));

app.use(express.json());

app.use("/api/features", require("./routes/featureRoutes"));
app.use("/api/votes", require("./routes/voteRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
