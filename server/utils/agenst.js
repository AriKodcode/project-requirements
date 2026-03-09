import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, "../data/agents.json");

async function getAgents() {
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data);
}

async function findAngens(agentCode, password) {
  const agents = await getAgents();
  return agents.find(
    (agent) => agent.agentCode === agentCode && agent.passwordHash === password
  );
}

export { findAngens, getAgents };
