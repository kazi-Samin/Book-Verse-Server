import { Request, Response } from "express";
import { Book } from "../books/book.model";
import { ApiResponse } from "../../types";

export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const totalBooks = await Book.countDocuments();
    // Assuming simple stats
    const response: ApiResponse<any> = {
      success: true,
      message: "Dashboard stats",
      data: {
        totalBooks,
        activeReaders: 50000,
        authorsJoined: 150,
      }
    };
    res.json(response);
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message, data: null });
  }
};

export const getMonthlyStats = async (req: Request, res: Response) => {
  try {
    const response: ApiResponse<any> = {
      success: true,
      message: "Monthly stats",
      data: {
        sales: [120, 200, 150, 250, 300, 400],
        months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      }
    };
    res.json(response);
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message, data: null });
  }
};
