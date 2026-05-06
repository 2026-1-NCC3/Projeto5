import { supabaseAdmin } from "../config/supabaseClient";
import { ActivateAccountDTO } from "../types/index";

export async function activateAccount(data: ActivateAccountDTO) {
  const { cpf, birth_date, email, password } = data;

  const { data: patient, error: patientError } = await supabaseAdmin
    .from("patients")
    .select("*")
    .eq("cpf", cpf)
    .eq("birth_date", birth_date)
    .single();

  if (patientError || !patient) {
    throw new Error("Paciente não encontrado");
  }

  if (patient.status === "active") {
    throw new Error("Paciente já ativado");
  }

  const { data: authData, error: authError } =
    await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true
    });

  if (authError || !authData.user) {
    throw new Error(authError?.message || "Erro ao criar usuário");
  }

  const { error: updateError } = await supabaseAdmin
    .from("patients")
    .update({
      email,
      status: "active"
    })
    .eq("id", patient.id);

  if (updateError) throw updateError;

  const { error: linkError } = await supabaseAdmin
    .from("patient_accounts")
    .insert({
      patient_id: patient.id,
      auth_user_id: authData.user.id
    });

  if (linkError) throw linkError;

  return {
    message: "Conta ativada com sucesso"
  };
}