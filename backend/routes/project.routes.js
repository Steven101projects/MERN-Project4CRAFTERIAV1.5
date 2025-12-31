import express from "express";
import {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  addComment,
  addRating
} from "../controllers/project.controller.js";

const router = express.Router();

/* READ */
router.get("/", getProjects);
router.get("/:id", getProject);

/* CREATE */
router.post("/", createProject);

/* UPDATE */
router.put("/:id", updateProject);

/* DELETE */
router.delete("/:id", deleteProject);

/* COMMENTS */
router.post("/:id/comments", addComment);

/* RATINGS */
router.post("/:id/ratings", addRating);

export default router;
