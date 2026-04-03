import { supabase } from "../config/database";

export async function getPatients() {
  const { data, error } = await supabase
    .from("patients")
    .select("*")
    .order("id");

  if (error) throw new Error(error.message);
  return data;
}

export async function getPatientById(id: number) {
  const { data, error } = await supabase
    .from("patients")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function createPatient(name: string, email: string, phone: string) {
  const { data, error } = await supabase
    .from("patients")
    .insert([{ name, email, phone }])
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function updatePatient(
  id: number,
  name: string,
  email: string,
  phone: string
) {
  const { data, error } = await supabase
    .from("patients")
    .update({ name, email, phone })
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function deletePatient(id: number) {
  const { error } = await supabase
    .from("patients")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);
}