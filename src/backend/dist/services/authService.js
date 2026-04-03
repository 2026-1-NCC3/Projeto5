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
    const { data: user, error } = await database_1.supabase
        .from("users")
        .select("*")
        .eq("email", email)
        .single();
    if (error || !user) {
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
            role: user.role,
        },
    };
};
exports.loginUser = loginUser;
const registerUser = async (name, email, password) => {
    // pra verificar se o usuário já existe
    const { data: existing } = await database_1.supabase
        .from("users")
        .select("id")
        .eq("email", email)
        .single();
    if (existing) {
        throw new Error("Usuário já existe");
    }
    const hashedPassword = await bcrypt_1.default.hash(password, 10);
    const { data: newUser, error } = await database_1.supabase
        .from("users")
        .insert([{ name, email, password: hashedPassword, role: "patient" }])
        .select("id, name, email, role")
        .single();
    if (error) {
        throw new Error(error.message);
    }
    return {
        message: "Usuário criado com sucesso",
        user: newUser,
    };
};
exports.registerUser = registerUser;
