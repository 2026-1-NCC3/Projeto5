import { supabase } from "../config/supabaseClient";

function mapToDB(data: any) {
  return {
    name: data.name,
    cpf: data.cpf,
    birth_date: data.birth_date,
    email: data.email,
    phone: data.phone,
    diagnosis: data.diagnosis,
    priority: data.priority,
    status: data.status,
    main_complaint: data.main_complaint || null,
    pain_level_initial: data.pain_level_initial || null,
    evaluation_date: data.evaluation_date || null,
  };
}

export async function getAllPatients() {
  const { data, error } = await supabase.from("patients").select("*");
  if (error) throw new Error(error.message);
  return data;
}

export async function createPatient(payload: any) {
  const { data, error } = await supabase
    .from("patients")
    .insert([mapToDB(payload)])
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function updatePatient(id: string, payload: any) {
  const { data, error } = await supabase
    .from("patients")
    .update(mapToDB(payload))
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function deletePatient(id: string) {
  const { error } = await supabase
    .from("patients")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);
}