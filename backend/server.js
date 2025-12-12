import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import materialRoutes from "./routes/material.route.js";
import projectRoutes from "./routes/project.route.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// simple test route
app.get("/", (req, res) => {
  res.send("Crafteria backend is running");
});

// api routes
app.use("/api/materials", materialRoutes);
app.use("/api/projects", projectRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
