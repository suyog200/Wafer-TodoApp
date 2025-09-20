import express from "express";
import dotenv from "dotenv";


dotenv.config();

import connectDB from "./config/db";
import taskRoutes from "./routes/task";
import cors from "cors";

const PORT = process.env.PORT || 5000;

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/tasks", taskRoutes);

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
