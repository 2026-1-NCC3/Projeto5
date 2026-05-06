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