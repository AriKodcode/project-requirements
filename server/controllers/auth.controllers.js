import { loginService } from "../Service/auth.service.js";
import { createToken } from "../utils/token.js";

export const login = async (req, res) => {
  try {
    const { agentCode, password } = req.body;
    if (!agentCode || !password) {
      return res.status(400).json({ error: "miss agentCode or password" });
    }
    const agent = await loginService(agentCode, password);
    console.log(agent);

    if (!agent) {
      return res.status(401).json({ error: "agent not found" });
    }
    const token = createToken(agent);
    res.status(200).json({
      token,
      user: {
        id: agent.id,
        agentCode: agent.agentCode,
        fullName: agent.fullName,
        role: agent.role,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
