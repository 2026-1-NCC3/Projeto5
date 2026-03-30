"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = exports.loginUser = void 0;
const database_1 = require("../config/database");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET = process.env.JWT_SECRET;
const loginUser = async (email, password) => {
    const result = await database_1.pool.query("SELECT * FROM users WHERE email = $1", [email]);
    const user = result.rows[0];
    if (!user) {
        throw new Error("Usuário não encontrado");
    }
    const passwordMatch = await bcrypt_1.default.compare(password, user.password);
    if (!passwordMatch) {
        throw new Error("Senha inválida");
    }
    const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, role: user.role }, SECRET, { expiresIn: "8h" });
    return {
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    };
};
exports.loginUser = loginUser;
const registerUser = async (name, email, password) => {
    const user = await database_1.pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (user.rows.length > 0) {
        throw new Error("Usuário já existe");
    }
    const hashedPassword = await bcrypt_1.default.hash(password, 10);
    const result = await database_1.pool.query("INSERT INTO users (name, email, password,role) VALUES ($1,$2,$3,$4) RETURNING id, name, email, role", [name, email, hashedPassword, "patient"]);
    return {
        message: "Usuário criado com sucesso",
        user: result.rows[0]
    };
};
exports.registerUser = registerUser;
