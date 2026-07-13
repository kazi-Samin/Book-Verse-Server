import { Book, IBook } from "./book.model";
import { BookQueryInput, CreateBookInput, UpdateBookInput } from "./book.validator";

export class BookRepository {
  async findBooks(query: BookQueryInput) {
    const filter: any = {};
    if (query.search) {
      filter.$or = [
        { title: { $regex: query.search, $options: "i" } },
        { author: { $regex: query.search, $options: "i" } },
      ];
    }
    if (query.category) filter.category = query.category;
    if (query.minPrice !== undefined || query.maxPrice !== undefined) {
      filter.price = {};
      if (query.minPrice !== undefined) filter.price.$gte = query.minPrice;
      if (query.maxPrice !== undefined) filter.price.$lte = query.maxPrice;
    }
    if (query.rating) filter.rating = { $gte: query.rating };

    let sort: any = { createdAt: -1 };
    if (query.sortBy === "price_asc") sort = { price: 1 };
    else if (query.sortBy === "price_desc") sort = { price: -1 };
    else if (query.sortBy === "rating_desc") sort = { rating: -1 };

    const skip = (query.page - 1) * query.limit;

    const [books, total] = await Promise.all([
      Book.find(filter).sort(sort).skip(skip).limit(query.limit).exec(),
      Book.countDocuments(filter).exec(),
    ]);

    return { books, total };
  }

  async findById(id: string): Promise<IBook | null> {
    return Book.findById(id).exec();
  }

  async create(data: CreateBookInput, userId: string): Promise<IBook> {
    const book = new Book({ ...data, createdBy: userId });
    return book.save();
  }

  async update(id: string, data: UpdateBookInput): Promise<IBook | null> {
    return Book.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string): Promise<IBook | null> {
    return Book.findByIdAndDelete(id).exec();
  }
}
