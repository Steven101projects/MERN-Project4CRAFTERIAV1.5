import express from "express";
import {
  getMaterials,
  getMaterial,
  updateMaterial,
  addMaterial
} from "../controllers/material.controller.js";

const router = express.Router();

// get all materials
router.get("/", getMaterials);

// get one material
router.get("/:id", getMaterial);

// update material (add linked project)
router.put("/:id", updateMaterial);

router.post("/", addMaterial);

export default router;
