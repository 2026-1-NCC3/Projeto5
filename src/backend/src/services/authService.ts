import { supabaseClient } from "../config/supabaseClient";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET!;

export const loginUser = async (email: string, password: string) => {
  const { data: user, error } = await supabaseClient
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (error || !user) {
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
      email: user.email,
      role: user.role,
    },
  };
};

export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  // pra verificar se o usuário já existe
  const { data: existing } = await supabaseClient
    .from("users")
    .select("id")
    .eq("email", email)
    .single();

  if (existing) {
    throw new Error("Usuário já existe");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const { data: newUser, error } = await supabaseClient
    .from("users")
    .insert([{ name, email, password: hashedPassword, role: "patient" }])
    .select("id, name, email, role")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return {
    message: "Usuário criado com sucesso",
    user: newUser,
  };
};