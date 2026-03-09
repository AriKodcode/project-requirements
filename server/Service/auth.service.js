import { findAngens } from "../utils/agenst.js";

export async function loginService(agentCode, password) {
  if (typeof agentCode !== "string") {
    throw new Error("agentCode must be string");
  }
  if (typeof password !== "string") {
    throw new Error("password must be string");
  }
  return findAngens(agentCode, password);
}
