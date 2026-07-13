import { Request, Response, NextFunction } from "express";
import { auth } from "../config/auth";
import { fromNodeHeaders } from "better-auth/node";

export const requireAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session || session.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Forbidden: Admin access required",
        data: null,
      });
    }

    // Attach user/session to request if needed
    (req as any).user = session.user;
    (req as any).session = session.session;

    next();
  } catch (error) {
    console.error("Admin Middleware Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error in Authentication",
      data: null,
    });
  }
};
