"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const supabaseClient_1 = require("../config/supabaseClient");
const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: "Token não fornecido" });
    }
    const token = authHeader.split(" ")[1];
    const { data, error } = await supabaseClient_1.supabaseClient.auth.getUser(token);
    if (error || !data.user) {
        return res.status(401).json({ message: "Token inválido" });
    }
    req.user = data.user;
    next();
};
exports.authenticateToken = authenticateToken;
