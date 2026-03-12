import express from "express";
import { checkToken } from "../middleware/checkToken.middleware.js";
import {
  createRepoertByCsv,
  creatReport,
  getReportById,
  getReports,
} from "../controllers/reports.controllers.js";
import { uploadCsv, uploadImage } from "../middleware/upload.middleware.js";

const router = express.Router();

router.post("/", checkToken, uploadImage.single("image"), creatReport);
router.post("/csv", checkToken, uploadCsv.single("csv"), createRepoertByCsv);
router.get("/", checkToken, getReports);
router.get("/:id", checkToken, getReportById);
export default router;
