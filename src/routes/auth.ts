import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { User, userValidationSchema } from "../models/User";

const router = express.Router();
const JWT_SECRET = "your_secret_key";


router.post("/register", async (req: Request, res: Response) => {
  const validation = userValidationSchema.safeParse(req.body);

  if (!validation.success) {
    return res.status(400).json({ errors: validation.error.errors });
  }

  const { username, email, password } = validation.data;

  try {
   
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);

    
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Error registering user" });
  }
});


router.post("/login", async (req: Request, res: Response) => {
  const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
  });

  const validation = loginSchema.safeParse(req.body);

  if (!validation.success) {
    return res.status(400).json({ errors: validation.error.errors });
  }

  const { email, password } = validation.data;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Error logging in" });
  }
});

export default router;
