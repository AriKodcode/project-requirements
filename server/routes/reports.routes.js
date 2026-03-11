import express from "express";
import { checkToken } from "../middleware/checkToken.middleware.js";
import {
  createRepoertByCsv,
  creatReport,
} from "../controllers/reports.controllers.js";
import { upload } from "../middleware/upload.middleware.js";

const router = express.Router();

router.post("/", checkToken, upload.single("image"), creatReport);
router.post("/csv", checkToken, upload.single("csv"), createRepoertByCsv);
export default router;
