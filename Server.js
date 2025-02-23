import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import sensorRoutes from "./Routes/SensorRoutes.js"; // Ensure this path is correct

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;
const mongoURI = process.env.MONGO_URI;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(mongoURI)
  .then(() => console.log("✅ Connected to MongoDB Successfully"))
  .catch((err) => {
    console.error(`❌ MongoDB Connection Error: ${err.message}`);
    process.exit(1);
  });

// Routes
app.use("/temperature", sensorRoutes);

// Default Route
app.get("/", (req, res) => {
  res.status(200).json({ message: `✅ API is running on port ${PORT}` });
});

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
//changed file name from Server.js to server.js