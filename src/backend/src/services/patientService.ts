import { supabaseClient } from "../config/supabaseClient";

export async function getPatients(userId: string) {
  const { data, error } = await supabaseClient
    .from("patients")
    .select("*")
    .eq("user_id", userId)
    .order("id");

  if (error) throw new Error(error.message);
  return data;
}

export async function getPatientById(id: number, userId: string) {
  const { data, error } = await supabaseClient
    .from("patients")
    .select("*")
    .eq("id", id)
    .eq("user_id", userId)
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function createPatient(
  userId: string,
  name: string, email: string, phone: string,
  cpf?: string, birth_date?: string,
  diagnostico?: string, prioridade?: string
) {
  const { data, error } = await supabaseClient
    .from("patients")
    .insert([{
      name,
      email:       email       || null,
      phone:       phone       || null,
      cpf:         cpf         || null,
      birth_date:  birth_date  || null,
      diagnostico: diagnostico || null,
      prioridade:  prioridade  || 'normal',
    }])
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function updatePatient(
  id: number, userId: string, name: string, email: string, phone: string,
  cpf?: string, birth_date?: string,
  diagnostico?: string, prioridade?: string
) {
  const { data, error } = await supabaseClient
    .from("patients")
    .update({
      name,
      email:       email       || null,
      phone:       phone       || null,
      cpf:         cpf         || null,
      birth_date:  birth_date  || null,
      diagnostico: diagnostico || null,
      prioridade:  prioridade  || 'normal',
    })
    .eq("id", id)
    .eq("user_id", userId)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function deletePatient(id: number, userId: string) {
  const { error } = await supabaseClient
    .from("patients")
    .delete()
    .eq("id", id)
    .eq("user_id", userId);

  if (error) throw new Error(error.message);
}