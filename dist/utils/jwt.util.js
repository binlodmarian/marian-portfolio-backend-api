import jwt from "jsonwebtoken";
import { env } from "../config/env";
export const signAccessToken = (userId, role) => {
    return jwt.sign({ userId, role }, env.JWT_SECRET, { expiresIn: "1h" });
};
export const signRefreshToken = (userId) => {
    return jwt.sign({ userId }, env.JWT_REFRESH_SECRET, { expiresIn: "30d" });
};
export const verifyAccessToken = (token) => {
    try {
        return jwt.verify(token, env.JWT_SECRET);
    }
    catch {
        return null;
    }
};
export const verifyRefreshToken = (token) => {
    try {
        return jwt.verify(token, env.JWT_REFRESH_SECRET);
    }
    catch {
        return null;
    }
};
// Returns a human-readable reason — useful for debugging
export const getTokenError = (token) => {
    try {
        jwt.verify(token, env.JWT_SECRET);
        return "valid";
    }
    catch (error) {
        if (error.name === "TokenExpiredError")
            return "Token has expired — use /api/auth/refresh to get a new one";
        if (error.name === "JsonWebTokenError")
            return "Invalid token signature — please login again";
        return "Unknown token error";
    }
};
//# sourceMappingURL=jwt.util.js.map