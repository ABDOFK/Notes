import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/auth";  // Ensure this path is correct
import noteRoutes from "./routes/notes";  // Ensure this path is correct

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = "mongodb://127.0.0.1:27017/Notes"; // Replace with your MongoDB URI

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Could not connect to MongoDB", error));

// Use Routes
app.use("/api/auth", authRoutes);  // Ensure routes are properly set
app.use("/api/notes", noteRoutes);  // Ensure routes are properly set

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
