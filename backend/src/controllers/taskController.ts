import type { Request, Response } from "express";
import mongoose from "mongoose";
import Task from "../models/Task";

import { isValidObjectId, isValidStatus, sanitizeInput } from "../utils/helper";
let taskStatus: "completed" | "incomplete" = "incomplete";

// Get all tasks ================================================================
export const getTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error while fetching tasks",
    });
  }
};

// Add new task ============================================================================
export const addTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, status } = req.body;
    const sanitizedName = sanitizeInput(name);
    const sanitizedDescription = sanitizeInput(description);

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
    if (status && !isValidStatus(status)) {
      res.status(400).json({
        success: false,
        error: "Invalid status. Must be 'completed' or 'incomplete'",
      });
      return;
    } else if (status) {
      taskStatus = status;
    }

    // Check for duplicate task names
    const existingTask = await Task.findOne({ name: sanitizedName });
    if (existingTask) {
      res.status(409).json({
        success: false,
        error: "A task with this name already exists",
      });
      return;
    }

    // create new task and save 
    const task = new Task({
      name: sanitizedName,
      description: sanitizedDescription,
      status: taskStatus,
    });

    const savedTask = await task.save();

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: savedTask,
    });
  } catch (error) {
    console.error("Error creating task:", error);

    // Handle validation errors from Mongoose
    if (error instanceof mongoose.Error.ValidationError) {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
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

// Update task =================================================================================
export const updateTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, description, status } = req.body;

    //check ObjectId
    if (!isValidObjectId(id)) {
      res.status(400).json({
        success: false,
        error: "Invalid task ID format",
      });
      return;
    }

    // Check if task exists
    const existingTask = await Task.findById(id);
    if (!existingTask) {
      res.status(404).json({
        success: false,
        error: "Task not found",
      });
      return;
    }

    // Build update object with validation
    const updateData: Partial<{
      name: string;
      description: string;
      status: "completed" | "incomplete";
    }> = {};

    // Validate and update name if provided
    if (name !== undefined) {
      const sanitizedName = sanitizeInput(name);
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
      const duplicateTask = await Task.findOne({
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
      const sanitizedDescription = sanitizeInput(description);
      if (!sanitizedDescription) {
        res.status(400).json({
          success: false,
          error: "Task description cannot be empty",
        });
        return;
      }
      if (
        sanitizedDescription.length < 5 ||
        sanitizedDescription.length > 500
      ) {
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
      if (!isValidStatus(status)) {
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

    const updatedTask = await Task.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: updatedTask,
    });
  } catch (error) {
    console.error("Error updating task:", error);

    // Handle validation errors from Mongoose
    if (error instanceof mongoose.Error.ValidationError) {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
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

// Delete task
export const deleteTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!isValidObjectId(id)) {
      res.status(400).json({
        success: false,
        error: "Invalid task ID format",
      });
      return;
    }

    const deletedTask = await Task.findByIdAndDelete(id);

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
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error while deleting task",
    });
  }
};

// Get single task by ID
export const getTaskById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!isValidObjectId(id)) {
      res.status(400).json({
        success: false,
        error: "Invalid task ID format",
      });
      return;
    }

    const task = await Task.findById(id);

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
  } catch (error) {
    console.error("Error fetching task:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error while fetching task",
    });
  }
};

//update task status 
export const updateTaskStatus = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        // Validate ObjectId
        if (!isValidObjectId(id)) {
            res.status(400).json({
                success: false,
                error: "Invalid task ID format",
            });
            return;
        }

        // Validate status
        if (!isValidStatus(status)) {
            res.status(400).json({
                success: false,
                error: "Invalid status. Must be 'completed' or 'incomplete'",
            });
            return;
        }

        const updatedTask = await Task.findByIdAndUpdate(id, { status }, { new: true });

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
    } catch (error) {
        console.error("Error updating task status:", error);
        res.status(500).json({
            success: false,
            error: "Internal server error while updating task status",
        });
    }
}
