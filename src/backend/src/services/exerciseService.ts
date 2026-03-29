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
  video_url: string,
  image_url: string,
  frequency: string
) => {
const result = await pool.query(
    `INSERT INTO exercises (title, description, video_url, image_url, frequency)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [title, description, video_url, image_url, frequency]
  );
  return result.rows[0];
};
  