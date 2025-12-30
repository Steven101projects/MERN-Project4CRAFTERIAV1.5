import express from "express";
import {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject
} from "../controllers/project.controller.js";

const router = express.Router();

// read
router.get("/", getProjects);
router.get("/:id", getProject);

// create
router.post("/", createProject);

// update
router.put("/:id", updateProject);

// delete
router.delete("/:id", deleteProject);

export default router;
