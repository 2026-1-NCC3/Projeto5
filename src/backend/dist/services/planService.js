"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFullPlanByPatient = exports.addExerciseToPlan = exports.getPlansByPatient = exports.createPlan = void 0;
const database_1 = require("../config/database");
const createPlan = async (patient_id, notes) => {
    const result = await database_1.pool.query(`INSERT INTO exercise_plans (patient_id, notes)
     VALUES ($1,$2)
     RETURNING *`, [patient_id, notes]);
    return result.rows[0];
};
exports.createPlan = createPlan;
const getPlansByPatient = async (patientId) => {
    const result = await database_1.pool.query(`SELECT * FROM exercise_plans
     WHERE patient_id = $1
     ORDER BY created_at DESC`, [patientId]);
    return result.rows;
};
exports.getPlansByPatient = getPlansByPatient;
const addExerciseToPlan = async (plan_id, exercise_id, frequency, instructions) => {
    const result = await database_1.pool.query(`INSERT INTO exercise_plan_items
     (plan_id, exercise_id, frequency, instructions)
     VALUES ($1,$2,$3,$4)
     RETURNING *`, [plan_id, exercise_id, frequency, instructions]);
    return result.rows[0];
};
exports.addExerciseToPlan = addExerciseToPlan;
const getFullPlanByPatient = async (patientId) => {
    const result = await database_1.pool.query(`
    SELECT 
      patients.id AS patient_id,
      patients.name AS patient_name,
      exercise_plans.id AS plan_id,
      exercises.id AS exercise_id,
      exercises.title AS exercise_title,
      exercises.description,
      exercise_plan_items.frequency,
      exercise_plan_items.instructions,
      exercise_logs.pain_level,
      exercise_logs.created_at
    FROM patients

    JOIN exercise_plans 
    ON exercise_plans.patient_id = patients.id

    JOIN exercise_plan_items
    ON exercise_plan_items.plan_id = exercise_plans.id

    JOIN exercises
    ON exercises.id = exercise_plan_items.exercise_id

    LEFT JOIN exercise_logs
    ON exercise_logs.exercise_id = exercises.id
    AND exercise_logs.patient_id = patients.id

    WHERE patients.id = $1;
    `, [patientId]);
    return result.rows;
};
exports.getFullPlanByPatient = getFullPlanByPatient;
