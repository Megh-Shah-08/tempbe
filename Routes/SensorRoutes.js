import express from "express";
import SensorData from "../Models/SensorData.js"; // Ensure the path is correct

const router = express.Router();

// Log to confirm the routes are loaded
console.log("✅ Sensor Routes Loaded Successfully");

// Route to store sensor data
router.post("/addTemps", async (req, res) => {
  try {
    const { temperature, humidity } = req.body;
    const newData = new SensorData({ temperature, humidity });
    await newData.save();
    res.status(201).json({ message: "Data stored successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to get sensor data
router.get("/data", async (req, res) => {
  try {
    const data = await SensorData.find().sort({ timestamp: -1 });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
