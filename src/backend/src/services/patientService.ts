import { supabase } from "../config/supabaseClient";
import { getPatientId } from "../utils/getPatientId";

function mapearCampos(form: any) {
  return {
    name:                form.name,
    cpf:                 form.cpf,
    birth_date:          form.birth_date,
    email:               form.email,
    phone:               form.phone,
    diagnosis:           form.diagnostico,
    priority:            form.prioridade,
    status:              form.status_conta,
    main_complaint:      form.queixa_principal,
    pain_level_initial:  form.nivel_dor ? Number(form.nivel_dor) : null,
    evaluation_date:     form.data_avaliacao,
  };
}

export async function getAllPatients() {
  const { data, error } = await supabase
    .from("patients")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function createPatient(form: any) {
  const { data, error } = await supabase
    .from("patients")
    .insert(mapearCampos(form))
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updatePatient(id: string, form: any) {
  const { data, error } = await supabase
    .from("patients")
    .update(mapearCampos(form))
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deletePatient(id: string) {
  const { error } = await supabase
    .from("patients")
    .delete()
    .eq("id", id);

  if (error) throw error;
}

export async function getMyPatient(authUserId: string) {
  const patientId = await getPatientId(authUserId);

  const { data, error } = await supabase
    .from("patients")
    .select("*")
    .eq("id", patientId)
    .single();

  if (error) throw error;

  return data;
}