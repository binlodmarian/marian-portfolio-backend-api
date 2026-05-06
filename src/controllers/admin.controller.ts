import { Response } from "express";
import { AuthRequest } from "@/middlewares/requireAuth";
import * as adminService from "@/services/admin.service";

// ── Users ─────────────────────────────────────────────────────────────────────

export const getAllUsers = async (_req: AuthRequest, res: Response) => {
  try {
    const result = await adminService.getAllUsers();
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const result = await adminService.getUserById(id as string);
    res.json(result);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};

export const promoteUser = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const result = await adminService.promoteUser(id as string);
    res.json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const demoteUser = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const result = await adminService.demoteUser(id as string);
    res.json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteUser = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const result = await adminService.deleteUser(id as string);
    res.json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// ── Tasks ─────────────────────────────────────────────────────────────────────

export const getAllTasks = async (_req: AuthRequest, res: Response) => {
  try {
    const result = await adminService.getAllTasks();
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteAnyTask = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const result = await adminService.deleteAnyTask(id as string);
    res.json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
