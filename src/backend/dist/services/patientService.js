"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPatients = getPatients;
exports.getPatientById = getPatientById;
exports.createPatient = createPatient;
exports.updatePatient = updatePatient;
exports.deletePatient = deletePatient;
const database_1 = require("../config/database");
async function getPatients() {
    const result = await database_1.pool.query("SELECT * FROM patients ORDER BY id");
    return result.rows;
}
async function getPatientById(id) {
    const result = await database_1.pool.query("SELECT * FROM patients WHERE id = $1", [id]);
    return result.rows[0];
}
async function createPatient(name, email, phone) {
    const result = await database_1.pool.query("INSERT INTO patients (name, email, phone) VALUES ($1,$2,$3) RETURNING *", [name, email, phone]);
    return result.rows[0];
}
async function updatePatient(id, name, email, phone) {
    const result = await database_1.pool.query(`UPDATE patients 
     SET name=$1, email=$2, phone=$3 
     WHERE id=$4 
     RETURNING *`, [name, email, phone, id]);
    return result.rows[0];
}
async function deletePatient(id) {
    await database_1.pool.query("DELETE FROM patients WHERE id=$1", [id]);
}
