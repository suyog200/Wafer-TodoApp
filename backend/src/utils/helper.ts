import mongoose from "mongoose";

// Helper function to validate MongoDB ObjectId
export const isValidObjectId = (id: string): boolean => {
  return mongoose.Types.ObjectId.isValid(id);
};

// Helper function to validate status
export const isValidStatus = (
  status: string
): status is "completed" | "incomplete" => {
  return status === "completed" || status === "incomplete";
};

// Helper function to sanitize and validate input
export const sanitizeInput = (input: string): string => {
  return input?.toString().trim() || "";
};