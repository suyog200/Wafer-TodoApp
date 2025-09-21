export interface Task {
  _id: string;
  name: string;
  description: string;
  status: "completed" | "incomplete";
  createdAt: string;
  updatedAt: string;
}