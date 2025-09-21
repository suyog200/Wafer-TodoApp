"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTaskStatus = exports.getTaskById = exports.deleteTask = exports.updateTask = exports.addTask = exports.getTasks = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Task_1 = __importDefault(require("../models/Task"));
const helper_1 = require("../utils/helper");
let taskStatus = "incomplete";
// Get all tasks ================================================================
const getTasks = async (req, res) => {
    try {
        const tasks = await Task_1.default.find({ user: req.userId }).sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: tasks.length,
            data: tasks,
        });
    }
    catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).json({
            success: false,
            error: "Internal server error while fetching tasks",
        });
    }
};
exports.getTasks = getTasks;
// Add new task ============================================================================
const addTask = async (req, res) => {
    try {
        const { name, description, status } = req.body;
        const sanitizedName = (0, helper_1.sanitizeInput)(name);
        const sanitizedDescription = (0, helper_1.sanitizeInput)(description);
        if (!sanitizedName) {
            res.status(400).json({
                success: false,
                error: "Task name is required and cannot be empty",
            });
            return;
        }
        if (!sanitizedDescription) {
            res.status(400).json({
                success: false,
                error: "Task description is required and cannot be empty",
            });
            return;
        }
        // check name length
        if (sanitizedName.length < 3 || sanitizedName.length > 100) {
            res.status(400).json({
                success: false,
                error: "Task name must be between 3 and 100 characters",
            });
            return;
        }
        // check description length
        if (sanitizedDescription.length < 5 || sanitizedDescription.length > 500) {
            res.status(400).json({
                success: false,
                error: "Task description must be between 5 and 500 characters",
            });
            return;
        }
        // check status if provided
        if (status && !(0, helper_1.isValidStatus)(status)) {
            res.status(400).json({
                success: false,
                error: "Invalid status. Must be 'completed' or 'incomplete'",
            });
            return;
        }
        else if (status) {
            taskStatus = status;
        }
        // Check for duplicate task names
        const existingTask = await Task_1.default.findOne({ name: sanitizedName });
        if (existingTask) {
            res.status(409).json({
                success: false,
                error: "A task with this name already exists",
            });
            return;
        }
        // create new task and save 
        const task = new Task_1.default({
            name: sanitizedName,
            description: sanitizedDescription,
            status: taskStatus,
            user: req.userId,
        });
        const savedTask = await task.save();
        res.status(201).json({
            success: true,
            message: "Task created successfully",
            data: savedTask,
        });
    }
    catch (error) {
        console.error("Error creating task:", error);
        // Handle validation errors from Mongoose
        if (error instanceof mongoose_1.default.Error.ValidationError) {
            const validationErrors = Object.values(error.errors).map((err) => err.message);
            res.status(400).json({
                success: false,
                error: "Validation failed",
                details: validationErrors,
            });
            return;
        }
        res.status(500).json({
            success: false,
            error: "Internal server error while creating task",
        });
    }
};
exports.addTask = addTask;
// Update task =================================================================================
const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, status } = req.body;
        //check ObjectId
        if (!(0, helper_1.isValidObjectId)(id)) {
            res.status(400).json({
                success: false,
                error: "Invalid task ID format",
            });
            return;
        }
        // Check if task exists
        const existingTask = await Task_1.default.findOne({ _id: id, user: req.userId });
        if (!existingTask) {
            res.status(404).json({
                success: false,
                error: "Task not found",
            });
            return;
        }
        // Build update object with validation
        const updateData = {};
        // Validate and update name if provided
        if (name !== undefined) {
            const sanitizedName = (0, helper_1.sanitizeInput)(name);
            if (!sanitizedName) {
                res.status(400).json({
                    success: false,
                    error: "Task name cannot be empty",
                });
                return;
            }
            if (sanitizedName.length < 3 || sanitizedName.length > 100) {
                res.status(400).json({
                    success: false,
                    error: "Task name must be between 3 and 100 characters",
                });
                return;
            }
            // Check for duplicate names (excluding current task)
            const duplicateTask = await Task_1.default.findOne({
                name: sanitizedName,
                _id: { $ne: id },
            });
            if (duplicateTask) {
                res.status(409).json({
                    success: false,
                    error: "A task with this name already exists",
                });
                return;
            }
            updateData.name = sanitizedName;
        }
        // Validate and update description if provided
        if (description !== undefined) {
            const sanitizedDescription = (0, helper_1.sanitizeInput)(description);
            if (!sanitizedDescription) {
                res.status(400).json({
                    success: false,
                    error: "Task description cannot be empty",
                });
                return;
            }
            if (sanitizedDescription.length < 5 ||
                sanitizedDescription.length > 500) {
                res.status(400).json({
                    success: false,
                    error: "Task description must be between 5 and 500 characters",
                });
                return;
            }
            updateData.description = sanitizedDescription;
        }
        // Validate and update status if provided
        if (status !== undefined) {
            if (!(0, helper_1.isValidStatus)(status)) {
                res.status(400).json({
                    success: false,
                    error: "Invalid status. Must be 'completed' or 'incomplete'",
                });
                return;
            }
            updateData.status = status;
        }
        // Check if there's anything to update
        if (Object.keys(updateData).length === 0) {
            res.status(400).json({
                success: false,
                error: "No valid fields provided for update",
            });
            return;
        }
        const updatedTask = await Task_1.default.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
        });
        res.status(200).json({
            success: true,
            message: "Task updated successfully",
            data: updatedTask,
        });
    }
    catch (error) {
        console.error("Error updating task:", error);
        // Handle validation errors from Mongoose
        if (error instanceof mongoose_1.default.Error.ValidationError) {
            const validationErrors = Object.values(error.errors).map((err) => err.message);
            res.status(400).json({
                success: false,
                error: "Validation failed",
                details: validationErrors,
            });
            return;
        }
        res.status(500).json({
            success: false,
            error: "Internal server error while updating task",
        });
    }
};
exports.updateTask = updateTask;
// Delete task
const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        // Validate ObjectId
        if (!(0, helper_1.isValidObjectId)(id)) {
            res.status(400).json({
                success: false,
                error: "Invalid task ID format",
            });
            return;
        }
        const deletedTask = await Task_1.default.findOneAndDelete({ _id: id, user: req.userId });
        if (!deletedTask) {
            res.status(404).json({
                success: false,
                error: "Task not found",
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Task deleted successfully",
            data: {
                id: deletedTask._id,
                name: deletedTask.name,
            },
        });
    }
    catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).json({
            success: false,
            error: "Internal server error while deleting task",
        });
    }
};
exports.deleteTask = deleteTask;
// Get single task by ID
const getTaskById = async (req, res) => {
    try {
        const { id } = req.params;
        // Validate ObjectId
        if (!(0, helper_1.isValidObjectId)(id)) {
            res.status(400).json({
                success: false,
                error: "Invalid task ID format",
            });
            return;
        }
        const task = await Task_1.default.findById(id);
        if (!task) {
            res.status(404).json({
                success: false,
                error: "Task not found",
            });
            return;
        }
        res.status(200).json({
            success: true,
            data: task,
        });
    }
    catch (error) {
        console.error("Error fetching task:", error);
        res.status(500).json({
            success: false,
            error: "Internal server error while fetching task",
        });
    }
};
exports.getTaskById = getTaskById;
//update task status 
const updateTaskStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        // Validate ObjectId
        if (!(0, helper_1.isValidObjectId)(id)) {
            res.status(400).json({
                success: false,
                error: "Invalid task ID format",
            });
            return;
        }
        // Validate status
        if (!(0, helper_1.isValidStatus)(status)) {
            res.status(400).json({
                success: false,
                error: "Invalid status. Must be 'completed' or 'incomplete'",
            });
            return;
        }
        const updatedTask = await Task_1.default.findByIdAndUpdate(id, { status }, { new: true });
        if (!updatedTask) {
            res.status(404).json({
                success: false,
                error: "Task not found",
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Task status updated successfully",
            data: updatedTask,
        });
    }
    catch (error) {
        console.error("Error updating task status:", error);
        res.status(500).json({
            success: false,
            error: "Internal server error while updating task status",
        });
    }
};
exports.updateTaskStatus = updateTaskStatus;
//# sourceMappingURL=taskController.js.map