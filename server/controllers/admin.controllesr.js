import addedUser from "../dal/createUser.dal.js";
import ATBSh from "../utils/ATBSh.js";
import { nanoid } from "nanoid";
import { createUserService } from "../Service/admin.service.js";
import getAgents from "../dal/getAgents.del.js";
export const newUser = (req, res) => {
  try {
    const { agentCode, fullName, role, password } = req.body;
    console.log(role);

    createUserService(agentCode, fullName, role, password);
    let agentPassword;
    if (password) {
      agentPassword = password;
    } else {
      agentPassword = ATBSh(fullName);
    }
    const newUser = {
      id: nanoid(8),
      agentCode,
      fullName,
      agentPassword,
      role,
      createdAt: new Date().toISOString(),
    };
    addedUser(newUser);
    res.status(200).json({ user: newUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await getAgents();
    res.status(200).json({ users });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
