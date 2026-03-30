"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listPatients = listPatients;
exports.getPatient = getPatient;
exports.addPatient = addPatient;
exports.editPatient = editPatient;
exports.removePatient = removePatient;
const patientService_1 = require("../services/patientService");
async function listPatients(req, res) {
    const patients = await (0, patientService_1.getPatients)();
    res.json(patients);
}
async function getPatient(req, res) {
    const id = Number(req.params.id);
    const patient = await (0, patientService_1.getPatientById)(id);
    res.json(patient);
}
async function addPatient(req, res) {
    const { name, email, phone } = req.body;
    const patient = await (0, patientService_1.createPatient)(name, email, phone);
    res.json(patient);
}
async function editPatient(req, res) {
    const id = Number(req.params.id);
    const { name, email, phone } = req.body;
    const patient = await (0, patientService_1.updatePatient)(id, name, email, phone);
    res.json(patient);
}
async function removePatient(req, res) {
    const id = Number(req.params.id);
    await (0, patientService_1.deletePatient)(id);
    res.json({ message: "Paciente deletado" });
}
