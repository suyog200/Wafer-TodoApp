import express from "express";
import {
  getTasks,
  addTask,
  updateTask,
  deleteTask,
  getTaskById,
  updateTaskStatus,
} from "../controllers/taskController";

const router = express.Router();

// GET /api/tasks - Get all tasks
router.get("/", getTasks);

// GET /api/tasks/:id - Get single task by ID
router.get("/:id", getTaskById);

// POST /api/tasks - Create new task
router.post("/", addTask);

// PUT /api/tasks/:id - Update task
router.put("/:id", updateTask);

// PATCH /api/tasks/:id - Update task status
router.patch("/:id", updateTaskStatus);

// DELETE /api/tasks/:id - Delete task
router.delete("/:id", deleteTask);

export default router;
