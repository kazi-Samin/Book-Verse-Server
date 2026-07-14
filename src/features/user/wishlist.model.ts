import mongoose, { Document, Schema } from 'mongoose';

export interface IWishlist extends Document {
  userId: string;
  bookId: mongoose.Types.ObjectId;
  createdAt: Date;
}

const WishlistSchema = new Schema<IWishlist>({
  userId: { type: String, required: true },
  bookId: { type: String, ref: 'Book', required: true }
}, {
  timestamps: true
});

// Ensure a user can only wishlist a book once
WishlistSchema.index({ userId: 1, bookId: 1 }, { unique: true });

export const WishlistModel = mongoose.model<IWishlist>('Wishlist', WishlistSchema);
