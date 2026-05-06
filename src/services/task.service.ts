import { prisma } from "@/lib/prisma";

export const createTask = async (userId: string, data: any) => {
  return await prisma.task.create({
    data: {
      ...data,
      userId,
    },
  });
};

export const getTasks = async (userId: string) => {
  return await prisma.task.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });
};

export const getTaskById = async (userId: string, taskId: string) => {
  const task = await prisma.task.findFirst({
    where: { id: taskId, userId },
  });
  if (!task) throw new Error("Task not found");
  return task;
};

export const updateTask = async (userId: string, taskId: string, data: any) => {
  const task = await prisma.task.findFirst({
    where: { id: taskId, userId },
  });
  if (!task) throw new Error("Task not found");

  return await prisma.task.update({
    where: { id: taskId },
    data,
  });
};

export const deleteTask = async (userId: string, taskId: string) => {
  const task = await prisma.task.findFirst({
    where: { id: taskId, userId },
  });
  if (!task) throw new Error("Task not found");

  return await prisma.task.delete({
    where: { id: taskId },
  });
};
