import mongoose, { Schema, Document, Types } from "mongoose";
import { z } from "zod";

// Define Zod schema for validation
export const userValidationSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  notes: z.array(z.string()).optional()  // Array of note IDs
});

// Define Mongoose schema and types for User
interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  notes: Types.ObjectId[];  // References to Note documents
}

const userSchema: Schema<IUser> = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  notes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Note" }]
});

export const User = mongoose.model<IUser>("User", userSchema);
