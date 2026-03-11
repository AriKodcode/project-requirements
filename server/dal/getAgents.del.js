import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, "../data/agents.json");

export default async function getAgents() {
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data);
}
