import express from "express";
import { isAdmin } from "../middleware/checkAdmin.middlewarwe.js";
import { getUsers, newUser } from "../controllers/admin.controllesr.js";

const router = express.Router();

router.post("/", isAdmin, newUser);
router.get("/", isAdmin, getUsers);

export default router;
