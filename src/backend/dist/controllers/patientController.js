"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listPatients = listPatients;
exports.getPatient = getPatient;
exports.addPatient = addPatient;
exports.editPatient = editPatient;
exports.removePatient = removePatient;
const patientService_1 = require("../services/patientService");
async function listPatients(req, res) {
    const user = req.user;
    const patients = await (0, patientService_1.getPatients)(user.id);
    res.json(patients);
}
async function getPatient(req, res) {
    const user = req.user;
    const id = Number(req.params.id);
    const patient = await (0, patientService_1.getPatientById)(id, user.id);
    res.json(patient);
}
async function addPatient(req, res) {
    const user = req.user;
    console.log("USER:", user);
    console.log("BODY:", req.body);
    const patient = await (0, patientService_1.createPatient)(user.id, req.body);
    res.json(patient);
}
async function editPatient(req, res) {
    const user = req.user;
    const id = Number(req.params.id);
    const patient = await (0, patientService_1.updatePatient)(id, user.id, req.body);
    res.json(patient);
}
async function removePatient(req, res) {
    const user = req.user;
    const id = Number(req.params.id);
    await (0, patientService_1.deletePatient)(id, user.id);
    res.json({ message: "Paciente deletado" });
}
