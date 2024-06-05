// src/middleware/authMiddleware.ts
import type { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/auth";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = verifyToken(token);
    (req as any).userId = (decoded as any).userId;
    return next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}
