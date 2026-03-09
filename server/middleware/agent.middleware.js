import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();
const SECRET = process.env.SECRETKEY;

export const isAgent = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Token required" });
  }

  try {
    const decoded = jwt.verify(token, SECRET);

    if (decoded.role !== "agent") {
      return res.status(403).json({ error: "Agent only" });
    }

    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};