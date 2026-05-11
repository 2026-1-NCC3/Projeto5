import { supabase } from "../config/supabaseClient";
import { getPatientId } from "../utils/getPatientId";

export async function getMyPlans(authUserId: string) {
  const patientId = await getPatientId(authUserId);

  if (!patientId) {
    throw { status: 404, message: "Paciente não encontrado para este usuário" };
  }

  const { data, error } = await supabase
    .from("patient_plans")
    .select(`
      id,
      plans (
        id,
        title,
        description,
        plan_exercises (
          id,
          frequency,
          exercises (
            id,
            title,
            description,
            image_url
          )
        )
      )
    `)
    .eq("patient_id", patientId)
    .order("created_at", { ascending: false })
    .limit(1);

  if (error) throw error;

  return data;
}