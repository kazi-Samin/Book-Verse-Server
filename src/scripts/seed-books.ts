import mongoose from "mongoose";
import { Book } from "../features/books/book.model";
import { env } from "../config/env";

const CATEGORIES = ["programming", "technology", "business", "history", "fantasy", "mystery", "science fiction", "romance", "biography", "self development"];
const ADMIN_ID = "system-seed";

async function seedBooks() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(env.MONGO_URI);
    console.log("Connected.");

    let totalInserted = 0;

    for (const category of CATEGORIES) {
      console.log(`Fetching books for category: ${category}...`);
      try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=subject:${category}&maxResults=40`);
        const data = await response.json();
        const items = data.items || [];
        
        const booksToInsert = [];

        for (const item of items) {
          const info = item.volumeInfo;
          
          if (!info.title) continue;

          let isbn = "";
          if (info.industryIdentifiers) {
            const isbn13 = info.industryIdentifiers.find((id: any) => id.type === "ISBN_13");
            if (isbn13) isbn = isbn13.identifier;
          }

          const book = {
            title: info.title,
            author: info.authors ? info.authors.join(", ") : "Unknown Author",
            category: category.charAt(0).toUpperCase() + category.slice(1),
            isbn: isbn,
            price: Math.floor(Math.random() * (49 - 10 + 1) + 10) + 0.99,
            stock: Math.floor(Math.random() * 50) + 10,
            rating: Number((Math.random() * (5 - 3.5) + 3.5).toFixed(1)),
            coverImage: info.imageLinks?.thumbnail?.replace("http:", "https:") || "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&auto=format&fit=crop",
            description: info.description || `A fantastic book about ${category}. Explore the depths of this genre and discover something amazing.`,
            createdBy: ADMIN_ID,
          };

          booksToInsert.push(book);
        }

        if (booksToInsert.length > 0) {
          await Book.insertMany(booksToInsert);
          totalInserted += booksToInsert.length;
          console.log(`Inserted ${booksToInsert.length} books from API for ${category}`);
        } else {
          console.log(`API returned 0 books for ${category}. Generating dummy books...`);
          for (let i = 1; i <= 15; i++) {
            booksToInsert.push({
              title: `${category.charAt(0).toUpperCase() + category.slice(1)} Masterclass Vol ${i}`,
              author: `Author ${Math.floor(Math.random() * 100)}`,
              category: category.charAt(0).toUpperCase() + category.slice(1),
              isbn: `978-${Math.floor(Math.random() * 9000000000) + 1000000000}`,
              price: Math.floor(Math.random() * (49 - 10 + 1) + 10) + 0.99,
              stock: Math.floor(Math.random() * 50) + 10,
              rating: Number((Math.random() * (5 - 3.5) + 3.5).toFixed(1)),
              coverImage: `https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&auto=format&fit=crop&random=${i}`,
              description: `A comprehensive guide and exciting journey into ${category}. This book covers everything you need to know.`,
              createdBy: ADMIN_ID,
            });
          }
          await Book.insertMany(booksToInsert);
          totalInserted += booksToInsert.length;
          console.log(`Inserted ${booksToInsert.length} dummy books for ${category}`);
        }

      } catch (err) {
        console.error(`Error fetching/inserting category ${category}:`, err);
      }
    }

    console.log(`\n✅ Database seeding complete! Total books inserted: ${totalInserted}`);
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
}

seedBooks();
