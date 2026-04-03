import { supabase } from "../config/database";

export const createExerciseLog = async (
  patient_id: number,
  exercise_id: number,
  pain_level: number,
  notes: string
) => {
  const { data, error } = await supabase
    .from("exercise_logs")
    .insert([{ patient_id, exercise_id, pain_level, notes }])
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
};

export const getLogsByPatient = async (patientId: number) => {
  const { data, error } = await supabase
    .from("exercise_logs")
    .select("*")
    .eq("patient_id", patientId)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data;
};

export const getPatientProgress = async (patientId: number) => {
  const { data, error } = await supabase
    .from("exercise_logs")
    .select("exercise_id, pain_level, created_at, exercises(title)")
    .eq("patient_id", patientId)
    .order("created_at", { ascending: true });

  if (error) throw new Error(error.message);
  return data;
};