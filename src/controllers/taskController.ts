import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Create a new task
 */
export const createTask = async (req: Request, res: Response) => {
  const { title, priority, userId } = req.body;
 

  if (!userId) return res.status(401).json({ error: "Unauthorized" });

  try {
    const task = await prisma.task.create({
      data: {
        title,
        priority,
        userId,
      },
    });

    res.status(201).json(task);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * Get all tasks for the authenticated user
 */
export const getTasks = async (req: Request, res: Response) => {
  const { userId } = req.body;
  if (!userId) return res.status(401).json({ error: "Unauthorized" });

  try {
    const tasks = await prisma.task.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * Update a task by its ID
 */
export const updateTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, priority , userId} = req.body;

  if (!userId) return res.status(401).json({ error: "Unauthorized" });

  try {
    const task = await prisma.task.updateMany({
      where: { id, userId },
      data: { title, priority },
    });

    if (task.count === 0)
      return res.status(404).json({ error: "Task not found or not authorized" });

    res.status(200).json({ message: "Task updated successfully" });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * Delete a task by its ID
 */
export const deleteTask = async (req: Request, res: Response) => {
  const { id, userId } = req.params;

  if (!userId) return res.status(401).json({ error: "Unauthorized" });

  try {
    const task = await prisma.task.deleteMany({
      where: { id, userId },
    });

    if (task.count === 0)
      return res.status(404).json({ error: "Task not found or not authorized" });

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * Get a specific task by ID
 */
export const getTaskById = async (req: Request, res: Response) => {
  const { id, userId } = req.params;

  if (!userId) return res.status(401).json({ error: "Unauthorized" });

  try {
    const task = await prisma.task.findFirst({
      where: { id, userId },
    });

    if (!task) return res.status(404).json({ error: "Task not found" });

    res.status(200).json(task);
  } catch (error) {
    console.error("Error fetching task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


