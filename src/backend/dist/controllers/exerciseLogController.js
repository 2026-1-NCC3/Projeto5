"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProgress = exports.getPatientLogs = exports.addExerciseLog = void 0;
const exerciseLogService_1 = require("../services/exerciseLogService");
const exerciseLogService_2 = require("../services/exerciseLogService");
const addExerciseLog = async (req, res) => {
    try {
        const { patient_id, exercise_id, pain_level, notes } = req.body;
        const log = await (0, exerciseLogService_1.createExerciseLog)(patient_id, exercise_id, pain_level, notes);
        res.status(201).json(log);
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
exports.addExerciseLog = addExerciseLog;
const getPatientLogs = async (req, res) => {
    try {
        const { patientId } = req.params;
        const logs = await (0, exerciseLogService_1.getLogsByPatient)(Number(patientId));
        res.json(logs);
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
exports.getPatientLogs = getPatientLogs;
const getProgress = async (req, res) => {
    try {
        const { patientId } = req.params;
        const progress = await (0, exerciseLogService_2.getPatientProgress)(Number(patientId));
        res.json(progress);
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
exports.getProgress = getProgress;
