import mongoose, { Schema, Document, Types } from "mongoose";
import { z } from "zod";

export const noteValidationSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  userId: z.string().uuid()  
});

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
