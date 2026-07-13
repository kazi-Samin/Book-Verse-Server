import mongoose, { Document, Schema } from "mongoose";

export interface IBook extends Document {
  title: string;
  author: string;
  category: string;
  isbn?: string;
  price: number;
  stock: number;
  rating: number;
  coverImage?: string;
  description: string;
  createdBy: string; // User ID
  createdAt: Date;
  updatedAt: Date;
}

const bookSchema = new Schema<IBook>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    category: { type: String, required: true },
    isbn: { type: String, required: false },
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, default: 0, min: 0 },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    coverImage: { type: String, required: false },
    description: { type: String, required: true },
    createdBy: { type: String, required: true }, // Store ID from better-auth as string
  },
  { timestamps: true }
);

export const Book = mongoose.model<IBook>("Book", bookSchema);
