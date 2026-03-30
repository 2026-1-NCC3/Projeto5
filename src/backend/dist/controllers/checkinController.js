"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.historicoCheckins = exports.fazerCheckin = void 0;
const checkinService_1 = require("../services/checkinService");
const fazerCheckin = async (req, res) => {
    try {
        const userId = req.user.id;
        const patientId = await (0, checkinService_1.getPatientIdByUserId)(userId);
        const resultado = await (0, checkinService_1.registrarCheckin)(patientId);
        const status = resultado.jaFez ? 200 : 201;
        return res.status(status).json(resultado);
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }
};
exports.fazerCheckin = fazerCheckin;
const historicoCheckins = async (req, res) => {
    try {
        const userId = req.user.id;
        const dias = parseInt(req.query.dias) || 7;
        const patientId = await (0, checkinService_1.getPatientIdByUserId)(userId);
        const resultado = await (0, checkinService_1.getHistoricoCheckins)(patientId, dias);
        return res.status(200).json(resultado);
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }
};
exports.historicoCheckins = historicoCheckins;
