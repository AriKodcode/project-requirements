import getAgents from "../dal/getAgents.del.js";

async function findAngens(agentCode, password) {
  const agents = await getAgents();
  return agents.find(
    (agent) => agent.agentCode === agentCode && agent.agentPassword === password
  );
}
async function findAngensByCode(agentCode) {
  const agents = await getAgents();
  return agents.find((agent) => agent.agentCode === agentCode);
}
export { findAngens, findAngensByCode };
