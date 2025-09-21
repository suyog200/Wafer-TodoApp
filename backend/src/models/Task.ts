import mongoose from "mongoose";

export interface Task {
  name: string;
  description: string;
  status: "completed" | "incomplete";
  user: mongoose.Types.ObjectId;
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
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
  },
  { timestamps: true }
);

export default mongoose.model<Task>("Task", taskSchema);
