import { supabaseClient } from "../config/supabaseClient";

export const getPatientIdByUserId = async (userId: number): Promise<number> => {
  const { data: user, error: userError } = await supabaseClient
    .from("users")
    .select("email")
    .eq("id", userId)
    .single();

  if (userError || !user) throw new Error("Usuário não encontrado");

  const { data: patient, error: patientError } = await supabaseClient
    .from("patients")
    .select("id")
    .eq("email", user.email)
    .single();

  if (patientError || !patient) throw new Error("Paciente não encontrado para este usuário");

  return patient.id;
};

export const registrarCheckin = async (patientId: number) => {
  const today = new Date().toISOString().split("T")[0];

  const { data: existing } = await supabaseClient
    .from("checkins")
    .select("id")
    .eq("patient_id", patientId)
    .eq("data", today)
    .single();

  if (existing) {
    return { jaFez: true, mensagem: "Check-in já realizado hoje", checkin: null };
  }

  const { data, error } = await supabaseClient
    .from("checkins")
    .insert([{ patient_id: patientId, data: today }])
    .select()
    .single();

  if (error) throw new Error(error.message);
  return { jaFez: false, mensagem: "Check-in realizado com sucesso!", checkin: data };
};

export const getHistoricoCheckins = async (patientId: number, dias: number = 7) => {
  const desde = new Date();
  desde.setDate(desde.getDate() - dias);
  const desdeStr = desde.toISOString().split("T")[0];

  const { data, error } = await supabaseClient
    .from("checkins")
    .select("data")
    .eq("patient_id", patientId)
    .gte("data", desdeStr)
    .order("data", { ascending: true });

  if (error) throw new Error(error.message);

  const datas = (data ?? []).map((row) => new Date(row.data).toISOString().split("T")[0]);
  return { historico: datas, total: datas.length };
};