import getAgents from "../dal/getAgents.del.js";

async function findAngens(agentCode, password) {
  const agents = await getAgents();
  return agents.find(
    (agent) => agent.agentCode === agentCode && agent.passwordHash === password
  );
}
async function findAngensByCode(agentCode) {
  const agents = await getAgents();
  return agents.find((agent) => agent.agentCode === agentCode);
}
export { findAngens, findAngensByCode };
