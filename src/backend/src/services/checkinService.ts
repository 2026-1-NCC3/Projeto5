import { supabase } from "../config/supabaseClient";
import { getPatientId } from "../utils/getPatientId";

interface CreateCheckinDTO {
  pain_level: number;
  notes?: string;
}

export async function createCheckin(
  authUserId: string,
  data: CreateCheckinDTO
) {
  const patientId = await getPatientId(authUserId);

  const { pain_level, notes } = data;

  // Verifica se já existe check-in hoje
  const today = new Date().toISOString().split("T")[0]; // "YYYY-MM-DD"
  const { data: existing, error: selectError } = await supabase
    .from("checkins")
    .select("id")
    .eq("patient_id", patientId)
    .gte("created_at", `${today}T00:00:00.000Z`)
    .lt("created_at", `${today}T23:59:59.999Z`)
    .limit(1);

  if (selectError) throw selectError;

  if (existing && existing.length > 0) {
    const err: any = new Error("Check-in já realizado hoje");
    err.statusCode = 409;
    throw err;
  }

  const { error } = await supabase
    .from("checkins")
    .insert({
      patient_id: patientId,
      pain_level,
      notes
    });

  if (error) throw error;

  return { message: "Check-in registrado com sucesso" };
}

export async function getMyCheckins(authUserId: string) {
  const patientId = await getPatientId(authUserId);

  const { data, error } = await supabase
    .from("checkins")
    .select("*")
    .eq("patient_id", patientId)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
}

export async function getPatientCheckins(patientId: string) {
  const { data, error } = await supabase
    .from("checkins")
    .select("*")
    .eq("patient_id", patientId)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
}