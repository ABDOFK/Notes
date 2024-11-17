"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// Protected route to fetch user-specific data
router.get("/protected", auth_1.authenticateToken, (req, res) => {
    res.json({ message: "This is a protected route", userId: req.userId });
});
exports.default = router;
