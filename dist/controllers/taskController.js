"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTaskById = exports.deleteTask = exports.updateTask = exports.getTasks = exports.createTask = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
/**
 * Create a new task
 */
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, priority, userId } = req.body;
    if (!userId)
        return res.status(401).json({ error: "Unauthorized" });
    try {
        const task = yield prisma.task.create({
            data: {
                title,
                priority,
                userId,
            },
        });
        res.status(201).json(task);
    }
    catch (error) {
        console.error("Error creating task:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.createTask = createTask;
/**
 * Get all tasks for the authenticated user
 */
const getTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.body;
    if (!userId)
        return res.status(401).json({ error: "Unauthorized" });
    try {
        const tasks = yield prisma.task.findMany({
            where: { userId },
            orderBy: { createdAt: "desc" },
        });
        res.status(200).json(tasks);
    }
    catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.getTasks = getTasks;
/**
 * Update a task by its ID
 */
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, priority, userId } = req.body;
    if (!userId)
        return res.status(401).json({ error: "Unauthorized" });
    try {
        const task = yield prisma.task.updateMany({
            where: { id, userId },
            data: { title, priority },
        });
        if (task.count === 0)
            return res.status(404).json({ error: "Task not found or not authorized" });
        res.status(200).json({ message: "Task updated successfully" });
    }
    catch (error) {
        console.error("Error updating task:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.updateTask = updateTask;
/**
 * Delete a task by its ID
 */
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, userId } = req.params;
    if (!userId)
        return res.status(401).json({ error: "Unauthorized" });
    try {
        const task = yield prisma.task.deleteMany({
            where: { id, userId },
        });
        if (task.count === 0)
            return res.status(404).json({ error: "Task not found or not authorized" });
        res.status(200).json({ message: "Task deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.deleteTask = deleteTask;
/**
 * Get a specific task by ID
 */
const getTaskById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, userId } = req.params;
    if (!userId)
        return res.status(401).json({ error: "Unauthorized" });
    try {
        const task = yield prisma.task.findFirst({
            where: { id, userId },
        });
        if (!task)
            return res.status(404).json({ error: "Task not found" });
        res.status(200).json(task);
    }
    catch (error) {
        console.error("Error fetching task:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.getTaskById = getTaskById;
