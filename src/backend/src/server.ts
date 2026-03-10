import express from "express";
import cors from "cors";
import { pool } from "./config/database";
import dotenv from "dotenv";
dotenv.config();

import patientRoutes from "./routes/patientRoutes";
import exerciseRoutes from "./routes/exerciseRoutes";
import planRoutes from "./routes/planRoutes";
import authRoutes from "./routes/authRoutes";
import exerciseLogRoutes from "./routes/exerciseLogRoutes";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", patientRoutes);
app.use("/api", exerciseRoutes);
app.use("/api", planRoutes);
app.use("/api", authRoutes);
app.use("/api", exerciseLogRoutes);

app.get("/", (req, res) => {
  res.send("API rodando");
});

app.get("/test-db", async (req, res) => { // teste pra ver se tá rodando no banco
  try {
    const result = await pool.query("SELECT NOW()");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao conectar no banco");
  }
});

app.listen(3001, () => {
  console.log("Servidor rodando na porta 3001");
});
