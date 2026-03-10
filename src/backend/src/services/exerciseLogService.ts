import { pool } from "../config/database";

export const createExerciseLog = async (
  patient_id: number,
  exercise_id: number,
  pain_level: number,
  notes: string
) => {

  const result = await pool.query(
    `INSERT INTO exercise_logs (patient_id, exercise_id, pain_level, notes)
     VALUES ($1,$2,$3,$4)
     RETURNING *`,
    [patient_id, exercise_id, pain_level, notes]
  );

  return result.rows[0];
};

export const getLogsByPatient = async (patientId: number) => {

  const result = await pool.query(
    `SELECT 
      exercise_logs.id,
      exercises.title,
      exercise_logs.pain_level,
      exercise_logs.notes,
      exercise_logs.created_at
     FROM exercise_logs
     JOIN exercises
     ON exercises.id = exercise_logs.exercise_id
     WHERE exercise_logs.patient_id = $1
     ORDER BY exercise_logs.created_at DESC`,
    [patientId]
  );

  return result.rows;
};

export const getPatientProgress = async (patientId: number) => {

  const result = await pool.query(
    `
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
    `,
    [patientId]
  );

  return result.rows;

};