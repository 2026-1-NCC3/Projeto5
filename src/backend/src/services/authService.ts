import { supabase } from "../config/supabaseClient";
import { LoginDTO } from "../types";

export async function login({ email, password }: LoginDTO) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error || !data.session) {
    throw new Error("Email ou senha inválidos");
  }

  return {
    token: data.session.access_token,
    user: data.user
  };
}