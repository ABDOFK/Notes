import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/auth";  
import noteRoutes from "./routes/notes"; 

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = "mongodb://127.0.0.1:27017/Notes"; 

app.use(cors());
app.use(express.json());


mongoose.connect(MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Could not connect to MongoDB", error));


app.use("/api/auth", authRoutes);  
app.use("/api/notes", noteRoutes); 

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
