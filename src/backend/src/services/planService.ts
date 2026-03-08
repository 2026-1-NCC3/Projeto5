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
      ep.id AS plan_id,
      ep.notes,
      e.id AS exercise_id,
      e.title,
      epi.frequency,
      epi.instructions
    FROM exercise_plans ep
    JOIN exercise_plan_items epi 
      ON ep.id = epi.plan_id
    JOIN exercises e 
      ON epi.exercise_id = e.id
    WHERE ep.patient_id = $1
    `,
    [patientId]
  );

  return result.rows;

};