export const createUserService = (agentCode, fullName, role, password) => {
  if (!agentCode || typeof agentCode !== "string") {
    const error = new Error("missing agenntCode field or wrong type");
    error.status = 400;
    throw error;
  }
  if (!fullName || typeof fullName !== "string") {
    const error = new Error("missing fullname field or wrong type");
    error.status = 400;
    throw error;
  }
  if (!role) {
    const error = new Error("missing role field");
    error.status = 400;
    throw error;
  }
  if (role !== "agent" && role !== "admin") {
    console.log(role);

    const error = new Error("role must be admin or agent");
    error.status = 400;
    throw error;
  }
  if (password) {
    if (typeof password !== "string") {
      const error = new Error("wrong password type!");
      error.status = 400;
      throw error;
    }
  }
};
