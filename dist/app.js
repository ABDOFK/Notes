"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const auth_1 = __importDefault(require("./routes/auth")); // Ensure this path is correct
const notes_1 = __importDefault(require("./routes/notes")); // Ensure this path is correct
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
const MONGO_URI = "your_mongodb_connection_string"; // Replace with your MongoDB URI
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Connect to MongoDB
mongoose_1.default.connect(MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error("Could not connect to MongoDB", error));
// Use Routes
app.use("/api/auth", auth_1.default); // Ensure routes are properly set
app.use("/api/notes", notes_1.default); // Ensure routes are properly set
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
