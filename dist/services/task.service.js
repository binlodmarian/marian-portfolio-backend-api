import { prisma } from "../lib/prisma";
export const createTask = async (userId, data) => {
    return await prisma.task.create({
        data: {
            ...data,
            userId,
        },
    });
};
export const getTasks = async (userId) => {
    return await prisma.task.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
    });
};
export const getTaskById = async (userId, taskId) => {
    const task = await prisma.task.findFirst({
        where: { id: taskId, userId },
    });
    if (!task)
        throw new Error("Task not found");
    return task;
};
export const updateTask = async (userId, taskId, data) => {
    const task = await prisma.task.findFirst({
        where: { id: taskId, userId },
    });
    if (!task)
        throw new Error("Task not found");
    return await prisma.task.update({
        where: { id: taskId },
        data,
    });
};
export const deleteTask = async (userId, taskId) => {
    const task = await prisma.task.findFirst({
        where: { id: taskId, userId },
    });
    if (!task)
        throw new Error("Task not found");
    return await prisma.task.delete({
        where: { id: taskId },
    });
};
//# sourceMappingURL=task.service.js.map