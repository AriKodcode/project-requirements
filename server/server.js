import express from "express";
import cors from "cors";
import "dotenv/config";
import authRouter from "./routes/auth.routes.js";
import reportsRouter from "./routes/reports.routes.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use("/api/auth/", authRouter);
app.use("/reports", reportsRouter);

app.listen(PORT, () => {
  console.log(`server run on port ${PORT}`);
});
