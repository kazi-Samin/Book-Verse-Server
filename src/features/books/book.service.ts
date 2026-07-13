import { BookRepository } from "./book.repository";
import { BookQueryInput, CreateBookInput, UpdateBookInput } from "./book.validator";

export class BookService {
  private repository: BookRepository;

  constructor() {
    this.repository = new BookRepository();
  }

  async getBooks(query: BookQueryInput) {
    return this.repository.findBooks(query);
  }

  async getBookById(id: string) {
    const book = await this.repository.findById(id);
    if (!book) throw new Error("Book not found");
    return book;
  }

  async createBook(data: CreateBookInput, userId: string) {
    return this.repository.create(data, userId);
  }

  async updateBook(id: string, data: UpdateBookInput, userId: string) {
    // In a real app, you might check if userId === book.createdBy or if user is admin
    const book = await this.repository.update(id, data);
    if (!book) throw new Error("Book not found");
    return book;
  }

  async deleteBook(id: string, userId: string) {
    const book = await this.repository.delete(id);
    if (!book) throw new Error("Book not found");
    return book;
  }
}
