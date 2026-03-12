import fs from "fs/promises";
import path from "path";

export default async function getCsv(csvPath) {
  try {
    const filePath = path.resolve(csvPath);

    const data = await fs.readFile(filePath, "utf-8");
    return data;
  } catch (error) {
    throw new Error(`Failed to read CSV at ${csvPath}: ${error.message}`);
  }
}
