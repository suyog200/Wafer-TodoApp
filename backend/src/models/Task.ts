import mongoose from "mongoose";

export interface Task {
  name: string;
  description: string;
  status: "completed" | "incomplete";
}

const taskSchema = new mongoose.Schema<Task>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ["completed", "incomplete"],
      default: "incomplete",
    },
  },
  { timestamps: true }
);

export default mongoose.model<Task>("Task", taskSchema);
