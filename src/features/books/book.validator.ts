import { z } from "zod";

export const bookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  category: z.string().min(1, "Category is required"),
  isbn: z.string().optional(),
  price: z.number().min(0, "Price must be non-negative"),
  stock: z.number().min(0).default(0),
  rating: z.number().min(0).max(5).default(0),
  coverImage: z.string().url().optional(),
  description: z.string().min(1, "Description is required"),
});

export const updateBookSchema = bookSchema.partial();

export const bookQuerySchema = z.object({
  search: z.string().optional(),
  category: z.string().optional(),
  minPrice: z.coerce.number().optional(),
  maxPrice: z.coerce.number().optional(),
  rating: z.coerce.number().optional(),
  sortBy: z.enum(["price_asc", "price_desc", "rating_desc", "newest"]).optional(),
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(12),
});

export type CreateBookInput = z.infer<typeof bookSchema>;
export type UpdateBookInput = z.infer<typeof updateBookSchema>;
export type BookQueryInput = z.infer<typeof bookQuerySchema>;
