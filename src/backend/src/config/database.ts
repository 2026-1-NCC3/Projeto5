import { Pool } from "pg";

export const pool = new Pool({
  connectionString: "postgresql://postgres:Mayarpg2026@db.ppbvjaeuwbnchritpbeb.supabase.co:5432/postgres",
  ssl: {
    rejectUnauthorized: false,
  },
});
pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Erro:", err);
  } else {
    console.log("Conectado!", res.rows);
  }
});