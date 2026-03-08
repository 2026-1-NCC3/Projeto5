import { pool } from "../config/database";

export async function getPatients() {
  const result = await pool.query("SELECT * FROM patients ORDER BY id");
  return result.rows;
}

export async function getPatientById(id: number) {
  const result = await pool.query(
    "SELECT * FROM patients WHERE id = $1",
    [id]
  );
  return result.rows[0];
}

export async function createPatient(name: string, email: string, phone: string) {
  const result = await pool.query(
    "INSERT INTO patients (name, email, phone) VALUES ($1,$2,$3) RETURNING *",
    [name, email, phone]
  );

  return result.rows[0];
}

export async function updatePatient(id: number, name: string, email: string, phone: string) {
  const result = await pool.query(
    `UPDATE patients 
     SET name=$1, email=$2, phone=$3 
     WHERE id=$4 
     RETURNING *`,
    [name, email, phone, id]
  );

  return result.rows[0];
}

export async function deletePatient(id: number) {
  await pool.query(
    "DELETE FROM patients WHERE id=$1",
    [id]
  );
}