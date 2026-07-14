import { Request, Response } from "express";
import { OrderModel } from "./order.model";

export const getMyOrders = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    if (!user) return res.status(401).json({ success: false, message: "Unauthorized", data: null });

    const orders = await OrderModel.find({ userId: user.id }).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      message: "Orders retrieved successfully",
      data: orders
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message, data: null });
  }
};

export const createOrder = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    if (!user) return res.status(401).json({ success: false, message: "Unauthorized", data: null });

    const orderData = req.body;
    
    const order = await OrderModel.create({
      ...orderData,
      userId: user.id,
      userEmail: user.email
    });

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: order
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message, data: null });
  }
};

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    if (!user || (user.role !== 'admin' && !["kazisamin0173@gmail.com", "starspanglefinance@gmail.com"].includes(user.email))) {
      return res.status(403).json({ success: false, message: "Forbidden", data: null });
    }

    const orders = await OrderModel.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      message: "All orders retrieved successfully",
      data: orders
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message, data: null });
  }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    if (!user || (user.role !== 'admin' && !["kazisamin0173@gmail.com", "starspanglefinance@gmail.com"].includes(user.email))) {
      return res.status(403).json({ success: false, message: "Forbidden", data: null });
    }

    const { id } = req.params;
    const { status } = req.body;

    const order = await OrderModel.findByIdAndUpdate(id, { status }, { new: true });
    
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found", data: null });
    }

    res.status(200).json({
      success: true,
      message: "Order status updated",
      data: order
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message, data: null });
  }
};
