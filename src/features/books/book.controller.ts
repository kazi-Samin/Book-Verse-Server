import { Request, Response } from "express";
import { BookService } from "./book.service";
import { bookQuerySchema, bookSchema, updateBookSchema } from "./book.validator";
import { ApiResponse } from "../../types";

const bookService = new BookService();

export const getBooks = async (req: Request, res: Response) => {
  try {
    const query = bookQuerySchema.parse(req.query);
    const { books, total } = await bookService.getBooks(query);
    
    const response: ApiResponse<any> = {
      success: true,
      message: "Books retrieved successfully",
      data: books,
      pagination: {
        total,
        page: query.page,
        limit: query.limit,
        totalPages: Math.ceil(total / query.limit),
      }
    };
    res.json(response);
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message, data: null });
  }
};

export const getBookById = async (req: Request, res: Response) => {
  try {
    const book = await bookService.getBookById(req.params.id);
    const response: ApiResponse<any> = { success: true, message: "Book found", data: book };
    res.json(response);
  } catch (error: any) {
    res.status(404).json({ success: false, message: error.message, data: null });
  }
};

export const createBook = async (req: Request, res: Response) => {
  try {
    const data = bookSchema.parse(req.body);
    const userId = (req as any).user.id;
    const book = await bookService.createBook(data, userId);
    
    const response: ApiResponse<any> = { success: true, message: "Book created", data: book };
    res.status(201).json(response);
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message, data: null });
  }
};

export const updateBook = async (req: Request, res: Response) => {
  try {
    const data = updateBookSchema.parse(req.body);
    const userId = (req as any).user.id;
    const book = await bookService.updateBook(req.params.id, data, userId);
    
    const response: ApiResponse<any> = { success: true, message: "Book updated", data: book };
    res.json(response);
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message, data: null });
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    await bookService.deleteBook(req.params.id, userId);
    
    const response: ApiResponse<null> = { success: true, message: "Book deleted", data: null };
    res.json(response);
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message, data: null });
  }
};
