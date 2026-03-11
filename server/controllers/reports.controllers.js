import { nanoid } from "nanoid";
import {
  createReportByCsvService,
  createReportService,
} from "../Service/reports.service.js";

import postReport from "../dal/postReport.dal.js";
export const creatReport = async (req, res) => {
  try {
    const { category, urgency, message } = req.body;
    createReportService(category, urgency, message);
    const imgPath = req.file ? req.file.path : null;
    const report = {
      id: nanoid(8),
      userId: req.user.id,
      category,
      urgency,
      message,
      imgPath,
      sourceType: "manual",
      createAt: new Date().toISOString(),
    };
    postReport(report);
    res.status(201).json({ report });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const createRepoertByCsv = async (req, res) => {
  try {
    const csv = req.file;
    const reports = createReportByCsvService(csv);
    for (let report of reports) {
      const newReport = {
        id: nanoid(8),
        category: report.category,
        urgency: report.urgency,
        message: report.message,
        sourceType: "csvFile",
        createAt: new Date().toISOString(),
      };
      postReport(newReport);
      res.status(201).json({ improtCount: reports.length, reports });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
