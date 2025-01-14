import { Router } from "express";
import { getTaskById, createTask, deleteTask, getTasks, updateTask } from "../controllers/taskController";

const router = Router();

router.post("/", createTask);
router.get("/", getTasks);
router.get("/:id", getTaskById);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);


export default router;