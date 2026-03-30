"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHistoricoCheckins = exports.registrarCheckin = exports.getPatientIdByUserId = void 0;
const database_1 = require("../config/database");
const getPatientIdByUserId = async (userId) => {
    const result = await database_1.pool.query("SELECT id FROM patients WHERE user_id = $1", [userId]);
    if (result.rows.length === 0) {
        throw new Error("Paciente não encontrado para este usuário");
    }
    return result.rows[0].id;
};
exports.getPatientIdByUserId = getPatientIdByUserId;
const registrarCheckin = async (patientId) => {
    const result = await database_1.pool.query(`INSERT INTO checkins (patient_id, data)
     VALUES ($1, CURRENT_DATE)
     ON CONFLICT (patient_id, data) DO NOTHING
     RETURNING *`, [patientId]);
    const jaFez = result.rowCount === 0;
    return {
        jaFez,
        mensagem: jaFez ? "Check-in já realizado hoje" : "Check-in realizado com sucesso!",
        checkin: jaFez ? null : result.rows[0],
    };
};
exports.registrarCheckin = registrarCheckin;
const getHistoricoCheckins = async (patientId, dias = 7) => {
    const result = await database_1.pool.query(`SELECT data
     FROM checkins
     WHERE patient_id = $1
       AND data >= CURRENT_DATE - INTERVAL '${dias} days'
     ORDER BY data ASC`, [patientId]);
    const datas = result.rows.map((row) => {
        const d = new Date(row.data);
        return d.toISOString().split("T")[0];
    });
    return { historico: datas, total: datas.length };
};
exports.getHistoricoCheckins = getHistoricoCheckins;
