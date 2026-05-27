import { supabase, supabaseAdmin } from "../config/supabaseClient";
import { getPatientId } from "../utils/getPatientId";

interface CreateCheckinDTO {
  pain_level: number;
  notes?: string;
}

export async function createCheckin(authUserId: string, data: CreateCheckinDTO) {
  const patientId = await getPatientId(authUserId);
  const { pain_level, notes } = data;

  const { error } = await supabaseAdmin
    .from("checkins")
    .insert({ patient_id: patientId, pain_level, notes });

  if (error) throw error;
  return { message: "Check-in registrado com sucesso" };
}

export async function cancelCheckin(authUserId: string, checkinId: string) {
  const patientId = await getPatientId(authUserId);

  const { data: existing, error: findError } = await supabaseAdmin
    .from("checkins")
    .select("id")
    .eq("id", checkinId)
    .eq("patient_id", patientId)
    .single();

  if (findError || !existing) {
    const err: any = new Error("Check-in não encontrado");
    err.status = 404;
    throw err;
  }

  const { error } = await supabaseAdmin
    .from("checkins")
    .delete()
    .eq("id", checkinId)
    .eq("patient_id", patientId);

  if (error) throw error;
  return { message: "Check-in cancelado com sucesso" };
}

export async function getMyCheckins(authUserId: string) {
  const patientId = await getPatientId(authUserId);

  const { data, error } = await supabaseAdmin
    .from("checkins")
    .select("*")
    .eq("patient_id", patientId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

// Usado pelo web (fisioterapeuta) para ver checkins de um paciente específico
export async function getCheckinsByPatientId(patientId: string) {
  const { data, error } = await supabaseAdmin
    .from("checkins")
    .select("*")
    .eq("patient_id", patientId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}