import { prisma } from "../lib/prisma";
import crypto from "crypto";
import { signAccessToken, signRefreshToken, verifyRefreshToken } from "../utils/jwt.util";
import { sendVerificationEmail } from "../utils/email.util";
export const signup = async (data) => {
    const existingUser = await prisma.user.findUnique({ where: { email: data.email } });
    if (existingUser) {
        throw new Error("Email already in use");
    }
    // Basic password hashing (for demonstration purposes, in production use bcrypt/argon2)
    const hashedPassword = crypto.createHash('sha256').update(data.password).digest('hex');
    const user = await prisma.user.create({
        data: {
            email: data.email,
            password: hashedPassword,
            name: data.name,
        },
    });
    const verificationToken = crypto.randomBytes(32).toString("hex");
    await prisma.token.create({
        data: {
            type: "EMAIL_VERIFY",
            token: verificationToken,
            userId: user.id,
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
        },
    });
    await sendVerificationEmail(user.email, verificationToken);
    return { message: "User registered successfully. Please check your email to verify your account.", token: verificationToken };
};
export const verifyEmail = async (token) => {
    const tokenRecord = await prisma.token.findUnique({
        where: { token },
        include: { user: true },
    });
    if (!tokenRecord || tokenRecord.type !== "EMAIL_VERIFY") {
        throw new Error("Invalid or expired token");
    }
    if (tokenRecord.expiresAt < new Date()) {
        throw new Error("Token expired");
    }
    if (tokenRecord.consumedAt) {
        throw new Error("Token already used");
    }
    await prisma.$transaction([
        prisma.user.update({
            where: { id: tokenRecord.userId },
            data: { emailVerified: new Date() },
        }),
        prisma.token.update({
            where: { id: tokenRecord.id },
            data: { consumedAt: new Date() },
        }),
    ]);
    return { message: "Email verified successfully" };
};
export const login = async (data) => {
    const user = await prisma.user.findUnique({ where: { email: data.email } });
    if (!user) {
        throw new Error("Invalid credentials");
    }
    const hashedPassword = crypto.createHash('sha256').update(data.password).digest('hex');
    if (user.password !== hashedPassword) {
        throw new Error("Invalid credentials");
    }
    if (!user.emailVerified) {
        throw new Error("Please verify your email before logging in");
    }
    const accessToken = signAccessToken(user.id, user.role);
    const refreshToken = signRefreshToken(user.id);
    await prisma.token.create({
        data: {
            type: "REFRESH",
            token: refreshToken,
            userId: user.id,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        },
    });
    return { accessToken, refreshToken, user: { id: user.id, email: user.email, name: user.name } };
};
export const refresh = async (refreshToken) => {
    const payload = verifyRefreshToken(refreshToken);
    if (!payload) {
        throw new Error("Invalid refresh token");
    }
    const tokenRecord = await prisma.token.findUnique({
        where: { token: refreshToken },
        include: { user: true },
    });
    if (!tokenRecord || tokenRecord.revokedAt) {
        throw new Error("Token revoked or invalid");
    }
    const newAccessToken = signAccessToken(tokenRecord.user.id, tokenRecord.user.role);
    return { accessToken: newAccessToken };
};
//# sourceMappingURL=auth.service.js.map