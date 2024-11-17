"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const zod_1 = require("zod");
const User_1 = require("../models/User");
const router = express_1.default.Router();
const JWT_SECRET = "your_secret_key"; // Replace with your secret key
// Register a new user
router.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validation = User_1.userValidationSchema.safeParse(req.body);
    if (!validation.success) {
        return res.status(400).json({ errors: validation.error.errors });
    }
    const { username, email, password } = validation.data;
    try {
        // Check if the user already exists
        const existingUser = yield User_1.User.findOne({ email });
        if (existingUser)
            return res.status(400).json({ message: "User already exists" });
        // Hash the password
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        // Create the new user
        const user = new User_1.User({ username, email, password: hashedPassword });
        yield user.save();
        res.status(201).json({ message: "User registered successfully" });
    }
    catch (error) {
        res.status(500).json({ error: "Error registering user" });
    }
}));
// Login a user
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const loginSchema = zod_1.z.object({
        email: zod_1.z.string().email("Invalid email address"),
        password: zod_1.z.string().min(8, "Password must be at least 8 characters"),
    });
    const validation = loginSchema.safeParse(req.body);
    if (!validation.success) {
        return res.status(400).json({ errors: validation.error.errors });
    }
    const { email, password } = validation.data;
    try {
        const user = yield User_1.User.findOne({ email });
        if (!user)
            return res.status(400).json({ message: "User not found" });
        // Check if the password is correct
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({ message: "Incorrect password" });
        // Create a JWT token
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });
        res.json({ token });
    }
    catch (error) {
        res.status(500).json({ error: "Error logging in" });
    }
}));
exports.default = router;
