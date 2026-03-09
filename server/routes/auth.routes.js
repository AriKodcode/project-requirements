import express from "express";
import { login, me } from "../controllers/auth.controllers.js";
import { checkToken } from "../middleware/checkToken.middleware.js";

const router = express.Router();

router.post("/login", login);
router.get("/me", checkToken, me);

export default router;
