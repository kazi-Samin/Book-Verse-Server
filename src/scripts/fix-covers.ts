import mongoose from "mongoose";
import { Book } from "../features/books/book.model";
import { env } from "../config/env";

const COVERS = [
  "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1524578271613-d550eacf6090?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517770413964-df8ca61194a6?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1455390582262-044cdead27d8?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1476275466078-4007374efac4?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1535905557558-afc4877a26fc?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?q=80&w=600&auto=format&fit=crop"
];

async function fixCovers() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(env.MONGO_URI);
    console.log("Connected.");

    const books = await Book.find({});
    console.log(`Found ${books.length} books. Updating covers...`);

    let updatedCount = 0;
    for (const book of books) {
      const randomCover = COVERS[Math.floor(Math.random() * COVERS.length)];
      book.coverImage = randomCover;
      await book.save();
      updatedCount++;
    }

    console.log(`\n✅ Successfully updated covers for ${updatedCount} books!`);
    process.exit(0);
  } catch (error) {
    console.error("Failed to update covers:", error);
    process.exit(1);
  }
}

fixCovers();
