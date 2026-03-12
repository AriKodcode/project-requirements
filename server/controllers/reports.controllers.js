import { nanoid } from "nanoid";
import {
  createReportByCsvService,
  createReportService,
} from "../Service/reports.service.js";
import csvToObj from "../utils/csvToJson.js";
import postReport from "../dal/postReport.dal.js";
import getCsv from "../dal/getCsv.js";
import getAllReports from "../dal/getReports.dal.js";
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
    const csv = await csvToObj(await getCsv(req.file.path));
    console.log(csv);

    const reports = createReportByCsvService(csv);
    const fullRepoets = [];
    for (let report of reports) {
      const newReport = {
        id: nanoid(8),
        userId: req.user.id,
        category: report.category,
        urgency: report.urgency,
        message: report.message,
        csvPath: req.file.path,
        sourceType: "csvFile",
        createAt: new Date().toISOString(),
      };
      await postReport(newReport);
      fullRepoets.push(newReport);
    }
    console.log(fullRepoets);

    res.status(201).json({ improtCount: reports.length, reports: fullRepoets });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const getReports = async (req, res) => {
  try {
    let reports = await getAllReports();
    const decoded = req.user;
    if (decoded.role === "agent") {
      const agentReports = reports.filter(
        (report) => report.userId === decoded.id
      );
      return res.status(200).json({ reports: agentReports });
    } else {
      const { agentCode, category, urgency } = req.query;
      if (agentCode) {
        reports = reports.filter((report) => report.agentCode === agentCode);
      }
      if (category) {
        reports = reports.filter((report) => report.category === category);
      }
      if (urgency) {
        reports = reports.filter((report) => report.urgency === urgency);
      }
      res.status(200).json({ reports: reports });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const getReportById = async (req, res) => {
  try {
    const reports = await getAllReports();
    const { id } = req.params;
    const decoded = req.user;
    const findReport = reports.find((report) => report.id === id);
    if (!findReport) {
      return res.status(404).json({ error: "report not found" });
    }
    if (decoded.role === "agent" && findReport.userId !== decoded.id) {
      return res
        .status(403)
        .json({ error: "You do not have access to this report." });
    }
    res.status(200).json({ report: findReport });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
