import express from "express";
import { getProjects, getProject } from "../controllers/project.controller.js";

const router = express.Router();

// get all projects
router.get("/", getProjects);

// get one project
router.get("/:id", getProject);

export default router;
