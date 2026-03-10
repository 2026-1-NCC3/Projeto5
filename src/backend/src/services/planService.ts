import { pool } from "../config/database";

export const createPlan = async (patient_id: number, notes: string) => {

  const result = await pool.query(
    `INSERT INTO exercise_plans (patient_id, notes)
     VALUES ($1,$2)
     RETURNING *`,
    [patient_id, notes]
  );

  return result.rows[0];

};

export const getPlansByPatient = async (patientId: number) => {

  const result = await pool.query(
    `SELECT * FROM exercise_plans
     WHERE patient_id = $1
     ORDER BY created_at DESC`,
    [patientId]
  );

  return result.rows;

};

export const addExerciseToPlan = async (
  plan_id: number,
  exercise_id: number,
  frequency: string,
  instructions: string
) => {

  const result = await pool.query(
    `INSERT INTO exercise_plan_items
     (plan_id, exercise_id, frequency, instructions)
     VALUES ($1,$2,$3,$4)
     RETURNING *`,
    [plan_id, exercise_id, frequency, instructions]
  );

  return result.rows[0];

};

export const getFullPlanByPatient = async (patientId: number) => {

  const result = await pool.query(
    `
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
    `,
    [patientId]
  );

  return result.rows;

};