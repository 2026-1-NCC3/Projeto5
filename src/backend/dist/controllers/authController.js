"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.login = void 0;
const authService_1 = require("../services/authService");
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await (0, authService_1.loginUser)(email, password);
        res.json(result);
    }
    catch (error) {
        res.status(401).json({
            message: error.message
        });
    }
};
exports.login = login;
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const result = await (0, authService_1.registerUser)(name, email, password);
        res.json(result);
    }
    catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};
exports.register = register;
