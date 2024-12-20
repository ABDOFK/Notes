import express, {  Response } from "express";
import { authenticateToken, AuthRequest } from "../middleware/auth";

const router = express.Router();

router.get("/protected", authenticateToken, (req: AuthRequest, res: Response) => {
  res.json({ message: "This is a protected route", userId: req.userId });
});

export default router;
