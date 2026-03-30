import { Pool } from "pg";

export const pool = new Pool({
  connectionString: "postgresql://postgres:Mayarpg2026@db.ppbvjaeuwbnchritpbeb.supabase.co:5432/postgres?sslmode=require",
  ssl: {
    rejectUnauthorized: false, 
  },
});

// Teste de conexão
pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Erro ao conectar no banco:", err);
  } else {
    console.log("Conectado com sucesso!", res.rows);
  }
});