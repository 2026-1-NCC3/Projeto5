import { pool } from "../config/database";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET = "supersecretkey";

export const loginUser = async (email: string, password: string) => {

  const result = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );

  const user = result.rows[0];

  if (!user) {
    throw new Error("Usuário não encontrado");
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    throw new Error("Senha inválida");
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    SECRET,
    { expiresIn: "8h" }
  );

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email
    }
  };
};