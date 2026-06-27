// server/src/middlewares/auth.middleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const ACCESS_SECRET =
  process.env.JWT_ACCESS_SECRET || "super_secret_access_key_2026";

interface JwtPayload {
  userId: string;
}

// Global declaration to bind dynamic custom type extensions to Express Requests
declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export const protectRoute = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    // Read cookie token from the custom headers stream
    const token = req.cookies.auth_session;

    if (!token) {
      res.status(401).json({
        success: false,
        message: "Unauthorized: Missing authentication token.",
      });
      return;
    }

    // Cryptographically verify token validity against signature hashes
    const decoded = jwt.verify(token, ACCESS_SECRET) as JwtPayload;

    // Inject user context state explicitly down the runtime request lifecycle pipeline
    req.userId = decoded.userId;

    next(); // Pass operational control down to subsequent service layers
  } catch (error: any) {
    console.error("JWT validation intercept fault:", error.message);
    res.status(401).json({
      success: false,
      message: "Unauthorized: Token altered or expired.",
    });
  }
};
