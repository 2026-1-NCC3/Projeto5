"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const database_1 = require("./config/database");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const patientRoutes_1 = __importDefault(require("./routes/patientRoutes"));
const exerciseRoutes_1 = __importDefault(require("./routes/exerciseRoutes"));
const planRoutes_1 = __importDefault(require("./routes/planRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const exerciseLogRoutes_1 = __importDefault(require("./routes/exerciseLogRoutes"));
const checkinRoutes_1 = __importDefault(require("./routes/checkinRoutes"));
const app = (0, express_1.default)();
const PORT = 3001;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api", patientRoutes_1.default);
app.use("/api", exerciseRoutes_1.default);
app.use("/api", planRoutes_1.default);
app.use("/api", authRoutes_1.default);
app.use("/api", exerciseLogRoutes_1.default);
app.use("/api", checkinRoutes_1.default);
app.get("/", (req, res) => {
    res.send("API rodando");
});
app.get("/test-db", async (req, res) => {
    try {
        const result = await database_1.pool.query("SELECT NOW()");
        res.json(result.rows);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Erro ao conectar no banco");
    }
});
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
