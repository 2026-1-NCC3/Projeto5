import { pool } from "../config/database";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET!;

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
     SECRET!,
    { expiresIn: "8h" }
  );

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  };
};

export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {

  const user = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );

  if (user.rows.length > 0) {
    throw new Error("Usuário já existe");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await pool.query(
    "INSERT INTO users (name, email, password,role) VALUES ($1,$2,$3,$4) RETURNING id, name, email, role",
    [name, email, hashedPassword, "patient"]
  );

  return {
    message: "Usuário criado com sucesso",
    user: result.rows[0]
  };
};