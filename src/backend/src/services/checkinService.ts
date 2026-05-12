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

  // Verifica se já existe um check-in hoje para este paciente
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  const { data: existing, error: checkError } = await supabase
    .from("checkins")
    .select("id")
    .eq("patient_id", patientId)
    .gte("created_at", startOfDay.toISOString())
    .lte("created_at", endOfDay.toISOString())
    .maybeSingle();

  if (checkError) throw checkError;

  if (existing) {
    throw { status: 409, message: "Você já realizou o check-in de hoje." };
  }

  const { pain_level, notes } = data;

  const { error } = await supabase
    .from("checkins")
    .insert({
      patient_id: patientId,
      pain_level,
      notes,
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

export async function jaFezCheckinHoje(authUserId: string): Promise<boolean> {
  const patientId = await getPatientId(authUserId);

  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  const { data, error } = await supabase
    .from("checkins")
    .select("id")
    .eq("patient_id", patientId)
    .gte("created_at", startOfDay.toISOString())
    .lte("created_at", endOfDay.toISOString())
    .maybeSingle();

  if (error) throw error;

  return data !== null;
}