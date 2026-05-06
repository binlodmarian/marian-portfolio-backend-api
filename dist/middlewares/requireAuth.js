import { verifyAccessToken, getTokenError } from "../utils/jwt.util";
import { prisma } from "../lib/prisma";
export const requireAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ error: "Unauthorized: No token provided" });
        return;
    }
    const token = authHeader.split(" ")[1];
    const payload = verifyAccessToken(token);
    if (!payload) {
        const reason = getTokenError(token);
        res.status(401).json({ error: reason });
        return;
    }
    req.userId = payload.userId;
    req.userRole = payload.role;
    next();
};
export const requireAdmin = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ error: "Unauthorized: No token provided" });
        return;
    }
    const token = authHeader.split(" ")[1];
    const payload = verifyAccessToken(token);
    if (!payload) {
        const reason = getTokenError(token);
        res.status(401).json({ error: reason });
        return;
    }
    const user = await prisma.user.findUnique({ where: { id: payload.userId } });
    if (!user || user.role !== "ADMIN") {
        res.status(403).json({ error: "Forbidden: Admins only" });
        return;
    }
    req.userId = payload.userId;
    req.userRole = user.role;
    next();
};
//# sourceMappingURL=requireAuth.js.map