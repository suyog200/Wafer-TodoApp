import express from "express";
import {
  getTasks,
  addTask,
  updateTask,
  deleteTask,
  getTaskById,
  updateTaskStatus,
} from "../controllers/taskController";

import { protect } from "../middleware/auth";


const router = express.Router();

// GET /api/tasks - Get all tasks
router.get("/", protect, getTasks);

// GET /api/tasks/:id - Get single task by ID
router.get("/:id", protect, getTaskById);

// POST /api/tasks - Create new task
router.post("/", protect, addTask);

// PATCH /api/tasks/edit/:id - Update task name and description
router.put("/edit/:id", protect, updateTask);

// PATCH /api/tasks/:id - Update task status
router.patch("/:id", protect, updateTaskStatus);

// DELETE /api/tasks/:id - Delete task
router.delete("/:id", protect, deleteTask);

export default router;
