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

export async function createPatient(userId: string, data: any) {
  const { data: result, error } = await supabaseClient
    .from("patients")
    .insert([{
      ...data,
      user_id: userId
    }])
    .select()
    .single();

  if (error) {
    console.error("ERRO SUPABASE:", error);
    throw new Error(error.message);
  }

  return result;
}

export async function updatePatient(
  id: number,
  userId: string,
  data: any
) {
  const { data: result, error } = await supabaseClient
    .from("patients")
    .update(data)
    .eq("id", id)
    .eq("user_id", userId)
    .select()
    .single();

  if (error) throw new Error(error.message);

  return result;
}

export async function deletePatient(id: number, userId: string) {
  const { error } = await supabaseClient
    .from("patients")
    .delete()
    .eq("id", id)
    .eq("user_id", userId);

  if (error) throw new Error(error.message);
}