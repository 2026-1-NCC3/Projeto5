import { pool } from "../config/database";

export const getExercises = async () => {
  const result = await pool.query(
    "SELECT * FROM exercises ORDER BY id DESC"
  );

  return result.rows;
};

export const createExercise = async (
  title: string,
  description: string,
  video_url: string
) => {

  const result = await pool.query(
    `INSERT INTO exercises (title, description, video_url)
     VALUES ($1,$2,$3)
     RETURNING *`,
    [title, description, video_url]
  );

  return result.rows[0];
};