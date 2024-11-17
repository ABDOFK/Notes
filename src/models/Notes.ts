import mongoose, { Schema, Document, Types } from "mongoose";
import { z } from "zod";

// Define Zod schema for Note validation
export const noteValidationSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  userId: z.string().uuid()  // Reference to the User ID
});

// Define Mongoose schema and types for Note
interface INote extends Document {
  title: string;
  content: string;
  userId: Types.ObjectId;
}

const noteSchema: Schema<INote> = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

export const Note = mongoose.model<INote>("Note", noteSchema);
