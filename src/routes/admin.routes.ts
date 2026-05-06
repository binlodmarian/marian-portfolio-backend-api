import { Router } from "express";
import { requireAdmin } from "@/middlewares/requireAuth";
import * as adminController from "@/controllers/admin.controller";

const router = Router();

// All admin routes require ADMIN role
router.use(requireAdmin);

// ── User Management ───────────────────────────────────────────────────────────
router.get("/users", adminController.getAllUsers);
router.get("/users/:id", adminController.getUserById);
router.patch("/users/:id/promote", adminController.promoteUser);
router.patch("/users/:id/demote", adminController.demoteUser);
router.delete("/users/:id", adminController.deleteUser);

// ── Task Management ───────────────────────────────────────────────────────────
router.get("/tasks", adminController.getAllTasks);
router.delete("/tasks/:id", adminController.deleteAnyTask);

export default router;
