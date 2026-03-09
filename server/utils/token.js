import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();
const SECRET = process.env.JWT_KEY;
config();
export function createToken(user) {
  return jwt.sign(
    {
      id: user.id,
      agentCode: user.agentCode,
      role: user.role,
    },
    SECRET,
    { expiresIn: "1h" }
  );
}
