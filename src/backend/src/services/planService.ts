import { supabase } from "../config/supabaseClient";
import { getPatientId } from "../utils/getPatientId";

export async function getMyPlans(authUserId: string) {
  const patientId = await getPatientId(authUserId);

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
    .eq("patient_id", patientId);

  if (error) throw error;

  return data;
}