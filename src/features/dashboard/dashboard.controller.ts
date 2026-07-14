import { Request, Response } from "express";
import { Book } from "../books/book.model";
import { ApiResponse } from "../../types";
import { OrderModel } from "../orders/order.model";
import mongoose from "mongoose";

export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const totalBooks = await Book.countDocuments();
    const totalOrders = await OrderModel.countDocuments();
    // better-auth creates users in 'user' collection
    const totalUsers = await mongoose.connection.db?.collection('user').countDocuments() || 0;
    
    const response: ApiResponse<any> = {
      success: true,
      message: "Dashboard stats",
      data: {
        totalBooks,
        totalOrders,
        totalUsers,
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
