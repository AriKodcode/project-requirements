import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, "../data/agents.json");

export default async function addedUser(user) {
  const users = JSON.parse(await fs.readFile(filePath, "utf-8"));
  users.push(user);
  await fs.writeFile(filePath, JSON.stringify(users, null, 2), "utf-8");
}
