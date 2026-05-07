import { supabaseAdmin } from "../config/supabaseClient";

export async function verifyPatient(data: { cpf: string; birth_date: string }) {
  const { cpf, birth_date } = data;

  const { data: patient, error } = await supabaseAdmin
    .from("patients")
    .select("id, name, email, status")
    .eq("cpf", cpf.replace(/\D/g, ""))
    .eq("birth_date", birth_date)
    .single();

  if (error || !patient) {
    throw new Error("Paciente não encontrado");
  }

  if (patient.status === "active") {
    throw new Error("Paciente já possui conta ativa");
  }

  return {
    paciente_id: patient.id,
    email: patient.email ?? ""
  };
}