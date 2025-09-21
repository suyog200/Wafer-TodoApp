"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const taskController_1 = require("../controllers/taskController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// GET /api/tasks - Get all tasks
router.get("/", auth_1.protect, taskController_1.getTasks);
// GET /api/tasks/:id - Get single task by ID
router.get("/:id", auth_1.protect, taskController_1.getTaskById);
// POST /api/tasks - Create new task
router.post("/", auth_1.protect, taskController_1.addTask);
// PATCH /api/tasks/edit/:id - Update task name and description
router.put("/edit/:id", auth_1.protect, taskController_1.updateTask);
// PATCH /api/tasks/:id - Update task status
router.patch("/:id", auth_1.protect, taskController_1.updateTaskStatus);
// DELETE /api/tasks/:id - Delete task
router.delete("/:id", auth_1.protect, taskController_1.deleteTask);
exports.default = router;
//# sourceMappingURL=task.js.map