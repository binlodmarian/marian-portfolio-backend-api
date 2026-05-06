import { createTaskSchema, updateTaskSchema } from "../schema/task.schema";
import * as taskService from "../services/task.service";
export const createTask = async (req, res) => {
    try {
        const userId = req.userId;
        const data = createTaskSchema.parse(req.body);
        const result = await taskService.createTask(userId, data);
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
export const getTasks = async (req, res) => {
    try {
        const userId = req.userId;
        const result = await taskService.getTasks(userId);
        res.json(result);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
export const getTaskById = async (req, res) => {
    try {
        const userId = req.userId;
        const { id } = req.params;
        const result = await taskService.getTaskById(userId, id);
        res.json(result);
    }
    catch (error) {
        res.status(404).json({ error: error.message });
    }
};
export const updateTask = async (req, res) => {
    try {
        const userId = req.userId;
        const { id } = req.params;
        const data = updateTaskSchema.parse(req.body);
        const result = await taskService.updateTask(userId, id, data);
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
export const deleteTask = async (req, res) => {
    try {
        const userId = req.userId;
        const { id } = req.params;
        const result = await taskService.deleteTask(userId, id);
        res.json(result);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
//# sourceMappingURL=task.controller.js.map