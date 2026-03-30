"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPatientProgress = exports.getLogsByPatient = exports.createExerciseLog = void 0;
const database_1 = require("../config/database");
const createExerciseLog = async (patient_id, exercise_id, pain_level, notes) => {
    const result = await database_1.pool.query(`INSERT INTO exercise_logs (patient_id, exercise_id, pain_level, notes)
     VALUES ($1,$2,$3,$4)
     RETURNING *`, [patient_id, exercise_id, pain_level, notes]);
    return result.rows[0];
};
exports.createExerciseLog = createExerciseLog;
const getLogsByPatient = async (patientId) => {
    const result = await database_1.pool.query(`SELECT 
      exercise_logs.id,
      exercises.title,
      exercise_logs.pain_level,
      exercise_logs.notes,
      exercise_logs.created_at
     FROM exercise_logs
     JOIN exercises
     ON exercises.id = exercise_logs.exercise_id
     WHERE exercise_logs.patient_id = $1
     ORDER BY exercise_logs.created_at DESC`, [patientId]);
    return result.rows;
};
exports.getLogsByPatient = getLogsByPatient;
const getPatientProgress = async (patientId) => {
    const result = await database_1.pool.query(`
    SELECT
      exercises.title AS exercise,
      exercise_logs.pain_level,
      exercise_logs.notes,
      exercise_logs.created_at
    FROM exercise_logs

    JOIN exercises
    ON exercises.id = exercise_logs.exercise_id

    WHERE exercise_logs.patient_id = $1

    ORDER BY exercise_logs.created_at DESC;
    `, [patientId]);
    return result.rows;
};
exports.getPatientProgress = getPatientProgress;
