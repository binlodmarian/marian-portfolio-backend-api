import { signupSchema, loginSchema, refreshSchema } from "../schema/auth.schema";
import * as authService from "../services/auth.service";
export const signup = async (req, res) => {
    try {
        const data = signupSchema.parse(req.body);
        const result = await authService.signup(data);
        res.status(201).json(result);
    }
    catch (error) {
        if (error.name === "ZodError") {
            res.status(400).json({ error: error.errors });
        }
        else {
            res.status(400).json({ error: error.message });
        }
    }
};
export const verifyEmail = async (req, res) => {
    try {
        const { token } = req.params;
        const result = await authService.verifyEmail(token);
        res.json(result);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
export const login = async (req, res) => {
    try {
        const data = loginSchema.parse(req.body);
        const result = await authService.login(data);
        res.json(result);
    }
    catch (error) {
        if (error.name === "ZodError") {
            res.status(400).json({ error: error.errors });
        }
        else {
            res.status(400).json({ error: error.message });
        }
    }
};
export const refresh = async (req, res) => {
    try {
        const data = refreshSchema.parse(req.body);
        const result = await authService.refresh(data.refreshToken);
        res.json(result);
    }
    catch (error) {
        if (error.name === "ZodError") {
            res.status(400).json({ error: error.errors });
        }
        else {
            res.status(400).json({ error: error.message });
        }
    }
};
//# sourceMappingURL=auth.controller.js.map