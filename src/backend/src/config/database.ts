import { Pool } from "pg";

export const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "maya_rpg",
  password: "1009",
  port: 5432,
});