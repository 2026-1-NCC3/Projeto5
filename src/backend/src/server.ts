import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import { supabase } from "./config/database";
import patientRoutes from "./routes/patientRoutes";
import exerciseRoutes from "./routes/exerciseRoutes";
import planRoutes from "./routes/planRoutes";
import authRoutes from "./routes/authRoutes";
import exerciseLogRoutes from "./routes/exerciseLogRoutes";
import checkinRoutes from "./routes/checkinRoutes";

const app = express();
const PORT = Number(process.env.PORT) || 3001;

app.use(cors());
app.use(express.json());

app.use("/api", patientRoutes);
app.use("/api", exerciseRoutes);
app.use("/api", planRoutes);
app.use("/api", authRoutes);
app.use("/api", exerciseLogRoutes);
app.use("/api", checkinRoutes);

app.get("/", (_req, res) => {
  res.send("API rodando");
});

// Rota de teste — verifica conexão com Supabase
app.get("/test-db", async (_req, res) => {
  const { data, error } = await supabase
    .from("patients")
    .select("count")
    .limit(1);

  if (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }

  res.json({ status: "Supabase conectado!", data });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});