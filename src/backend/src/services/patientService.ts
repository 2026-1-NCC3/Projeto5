import { supabase } from "../config/supabaseClient";
import { getPatientId } from "../utils/getPatientId";


function mapToDB(data: any) {
  return {
    name: data.name,
    cpf: data.cpf,
    birth_date: data.birth_date,
    email: data.email,
    phone: data.phone,
    diagnosis: data.diagnostico,
    priority: data.prioridade,
    status: data.status_conta,
    main_complaint: data.queixa_principal,
    pain_level_initial: data.nivel_dor,
    evaluation_date: data.data_avaliacao,
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