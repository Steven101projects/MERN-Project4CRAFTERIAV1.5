import express from "express";
import { getProfile, getUsers, deleteUser } from "../controllers/user.controller.js";
import auth from "../middleware/auth.middleware.js";
import admin from "../middleware/admin.middleware.js";

const router = express.Router();

// logged in user profile
router.get("/me", auth, getProfile);

// admin routes
router.get("/", auth, admin, getUsers);
router.delete("/:id", auth, admin, deleteUser);

export default router;