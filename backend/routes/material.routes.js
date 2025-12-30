import express from "express";
import { getMaterials, getMaterial } from "../controllers/material.controller.js";

const router = express.Router();

// get all materials
router.get("/", getMaterials);

// get one material
router.get("/:id", getMaterial);

export default router;
