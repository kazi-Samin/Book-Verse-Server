import { Request, Response } from "express";
import { WishlistModel } from "./wishlist.model";
import { AddressModel } from "./address.model";

// --- WISHLIST ---

export const getWishlist = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    if (!user) return res.status(401).json({ success: false, message: "Unauthorized", data: null });

    const wishlist = await WishlistModel.find({ userId: user.id }).populate('bookId');
    
    res.status(200).json({
      success: true,
      message: "Wishlist retrieved successfully",
      data: wishlist
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message, data: null });
  }
};

export const addToWishlist = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const { bookId } = req.body;
    
    if (!user) return res.status(401).json({ success: false, message: "Unauthorized", data: null });
    
    // Check if already in wishlist
    const existing = await WishlistModel.findOne({ userId: user.id, bookId });
    if (existing) {
      return res.status(400).json({ success: false, message: "Book already in wishlist", data: null });
    }

    const wishlistItem = await WishlistModel.create({
      userId: user.id,
      bookId
    });

    res.status(201).json({
      success: true,
      message: "Added to wishlist",
      data: wishlistItem
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message, data: null });
  }
};

export const removeFromWishlist = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const { bookId } = req.params;
    
    if (!user) return res.status(401).json({ success: false, message: "Unauthorized", data: null });

    await WishlistModel.findOneAndDelete({ userId: user.id, bookId });

    res.status(200).json({
      success: true,
      message: "Removed from wishlist",
      data: null
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message, data: null });
  }
};

// --- ADDRESSES ---

export const getAddresses = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    if (!user) return res.status(401).json({ success: false, message: "Unauthorized", data: null });

    const addresses = await AddressModel.find({ userId: user.id }).sort({ isDefault: -1, createdAt: -1 });
    
    res.status(200).json({
      success: true,
      message: "Addresses retrieved successfully",
      data: addresses
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message, data: null });
  }
};

export const addAddress = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    if (!user) return res.status(401).json({ success: false, message: "Unauthorized", data: null });

    const addressData = req.body;
    
    // If this is the first address or set to default, unset other defaults
    const addressCount = await AddressModel.countDocuments({ userId: user.id });
    if (addressCount === 0 || addressData.isDefault) {
      addressData.isDefault = true;
      if (addressCount > 0) {
        await AddressModel.updateMany({ userId: user.id }, { isDefault: false });
      }
    }

    const address = await AddressModel.create({
      ...addressData,
      userId: user.id
    });

    res.status(201).json({
      success: true,
      message: "Address added successfully",
      data: address
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message, data: null });
  }
};

export const deleteAddress = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const { id } = req.params;
    
    if (!user) return res.status(401).json({ success: false, message: "Unauthorized", data: null });

    await AddressModel.findOneAndDelete({ _id: id, userId: user.id });

    res.status(200).json({
      success: true,
      message: "Address deleted successfully",
      data: null
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message, data: null });
  }
};
