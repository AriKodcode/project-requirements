import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();
const SECRET = process.env.JWT_KEY;

export const checkToken = (req, res, next) => {
  const auth = req.headers["authorization"];
  if (!auth) {
    return res.status(401).json({ error: "authorization missing" });
  }
  const token = auth.split(" ");
  if (token.length !== 2 || token[0] !== "Bearer") {
    return res.status(401).json({ error: "Token required" });
  }

  try {
    const decoded = jwt.verify(token[1], SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};
