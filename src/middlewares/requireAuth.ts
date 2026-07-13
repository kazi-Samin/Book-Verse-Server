import { Request, Response, NextFunction } from "express";
import { getAuth } from "../config/auth";

export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const auth = await getAuth();
    const { fromNodeHeaders } = await import("better-auth/node");
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
        data: null,
      });
    }

    // Attach user/session to request if needed
    (req as any).user = session.user;
    (req as any).session = session.session;

    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error in Authentication",
      data: null,
    });
  }
};
