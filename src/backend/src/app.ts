import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import { supabase } from "./config/supabaseClient";

import patientRoutes from "./routes/patientRoutes";
import exerciseRoutes from "./routes/exerciseRoutes";
import planRoutes from "./routes/planRoutes";
import authRoutes from "./routes/authRoutes";
import exerciseLogRoutes from "./routes/exerciseLogRoutes";
import checkinRoutes from "./routes/checkinRoutes";
import activationRoutes from "./routes/activationRoutes";
import appointmentRoutes from "./routes/appointmentRoutes";

const app = express();

app.use(cors());
app.use(express.json());


app.use("/api/patients", patientRoutes);
app.use("/api/exercises", exerciseRoutes);
app.use("/api/plans", planRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/exercise-logs", exerciseLogRoutes);
app.use("/api/checkins", checkinRoutes);
app.use("/api/activation", activationRoutes);
app.use("/api/appointments", appointmentRoutes);

app.get("/", (_req, res) => {
  res.send("API rodando");
});

app.get("/test-db", async (_req, res) => {
  const { data, error } = await supabase
    .from("patients")
    .select("*", { count: "exact", head: true });

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json({ status: "Supabase conectado!", data });
});

export default app;