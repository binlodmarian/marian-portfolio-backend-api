import jwt from "jsonwebtoken";
import { env } from "@/config/env";

export const signAccessToken = (userId: string, role: string) => {
  return jwt.sign({ userId, role }, env.JWT_SECRET, { expiresIn: "1h" });
};

export const signRefreshToken = (userId: string) => {
  return jwt.sign({ userId }, env.JWT_REFRESH_SECRET, { expiresIn: "30d" });
};

export const verifyAccessToken = (token: string): { userId: string; role: string } | null => {
  try {
    return jwt.verify(token, env.JWT_SECRET) as { userId: string; role: string };
  } catch {
    return null;
  }
};

export const verifyRefreshToken = (token: string): { userId: string } | null => {
  try {
    return jwt.verify(token, env.JWT_REFRESH_SECRET) as { userId: string };
  } catch {
    return null;
  }
};

// Returns a human-readable reason — useful for debugging
export const getTokenError = (token: string): string => {
  try {
    jwt.verify(token, env.JWT_SECRET);
    return "valid";
  } catch (error: any) {
    if (error.name === "TokenExpiredError") return "Token has expired — use /api/auth/refresh to get a new one";
    if (error.name === "JsonWebTokenError") return "Invalid token signature — please login again";
    return "Unknown token error";
  }
};
