"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const pg_1 = require("pg");
exports.pool = new pg_1.Pool({
    connectionString: "postgresql://postgres:Mayarpg2026@db.ppbvjaeuwbnchritpbeb.supabase.co:5432/postgres",
    ssl: {
        rejectUnauthorized: false,
    },
});
exports.pool.query("SELECT NOW()", (err, res) => {
    if (err) {
        console.error("Erro:", err);
    }
    else {
        console.log("Conectado!", res.rows);
    }
});
