import { supabase } from "../config/supabaseClient";
import { getPatientId } from "../utils/getPatientId";

interface CreateLogDTO {
  exercise_id: string;
}

export async function logExercise(
  authUserId: string,
  data: CreateLogDTO
) {
  const patientId = await getPatientId(authUserId);

  const { exercise_id } = data;

  const { error } = await supabase
    .from("exercise_progress")
    .insert({
      patient_id: patientId,
      exercise_id,
      completed_at: new Date()
    });

  if (error) throw error;

  return { message: "Exercício concluído!" };
}