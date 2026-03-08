import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API rodando");
});

app.listen(3001, () => {
  console.log("Servidor rodando na porta 3001");
});