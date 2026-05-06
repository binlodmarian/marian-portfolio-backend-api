import { Response } from "express";
import { AuthRequest } from "@/middlewares/requireAuth";
import { createTaskSchema, updateTaskSchema } from "@/schema/task.schema";
import * as taskService from "@/services/task.service";

export const createTask = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;
    const data = createTaskSchema.parse(req.body);
    const task = await taskService.createTask(userId, data);
    res.status(201).json({
      message: "Task created successfully",
      task,
    });
  } catch (error: any) {
    if (error.name === "ZodError") {
      res.status(400).json({ error: error.errors });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
};

export const getTasks = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;
    const tasks = await taskService.getTasks(userId);
    res.json({
      message: `${tasks.length} task(s) found`,
      tasks,
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getTaskById = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;
    const { id } = req.params;
    const task = await taskService.getTaskById(userId, id as string);
    res.json({
      message: "Task retrieved successfully",
      task,
    });
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};

export const updateTask = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;
    const { id } = req.params;
    const data = updateTaskSchema.parse(req.body);
    const task = await taskService.updateTask(userId, id as string, data);
    res.json({
      message: "Task updated successfully",
      task,
    });
  } catch (error: any) {
    if (error.name === "ZodError") {
      res.status(400).json({ error: error.errors });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
};

export const deleteTask = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;
    const { id } = req.params;
    const task = await taskService.deleteTask(userId, id as string);
    res.json({
      message: "Task deleted successfully",
      task,
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
