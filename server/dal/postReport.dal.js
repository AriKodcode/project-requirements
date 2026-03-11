import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, "../data/reports.json");

export default async function postReport(report) {
  const reports = JSON.parse(await fs.readFile(filePath, "utf-8"));
  reports.push(report);
  await fs.writeFile(filePath, JSON.stringify(reports, null, 2), "utf-8");
}
